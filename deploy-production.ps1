[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot
$buildPath = Join-Path $projectRoot ".next"
$backupPath = Join-Path $projectRoot ".next.deploy-backup"
$watchdogPath = Join-Path $projectRoot "run-production.ps1"
$port = 5000

function Write-Step([string]$Message) {
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Test-PortListening {
    $connection = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
        Select-Object -First 1
    return $null -ne $connection
}

function Stop-ProductionServer {
    Write-Step "Stopping the XIPHIAS production server"

    Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
        Where-Object {
            $_.ProcessId -ne $PID -and
            $_.Name -match "^(powershell|pwsh)(\.exe)?$" -and
            $_.CommandLine -like "*run-production.ps1*" -and
            $_.CommandLine -like "*XIPHIAS DMCC Website .ae*"
        } |
        ForEach-Object {
            Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
        }

    Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess -Unique |
        ForEach-Object {
            Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
        }

    for ($attempt = 0; $attempt -lt 20; $attempt++) {
        if (-not (Test-PortListening)) { return }
        Start-Sleep -Milliseconds 500
    }

    throw "Port $port is still occupied. Close the existing Node/npm window and try again."
}

function Start-ProductionServer {
    Write-Step "Starting the production server"
    $arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$watchdogPath`""
    Start-Process -FilePath "powershell.exe" -ArgumentList $arguments `
        -WorkingDirectory $projectRoot -WindowStyle Hidden
}

function Wait-ForWebsite([int]$Seconds = 60) {
    for ($attempt = 0; $attempt -lt ($Seconds * 2); $attempt++) {
        if (Test-PortListening) {
            try {
                $response = Invoke-WebRequest -Uri "http://127.0.0.1:$port/" `
                    -UseBasicParsing -TimeoutSec 5
                if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                    return $true
                }
            }
            catch { }
        }
        Start-Sleep -Milliseconds 500
    }
    return $false
}

function Restore-PreviousBuild {
    if (-not (Test-Path -LiteralPath $backupPath)) { return $false }
    Write-Step "Restoring the previous working build"
    if (Test-Path -LiteralPath $buildPath) {
        Remove-Item -LiteralPath $buildPath -Recurse -Force
    }
    Move-Item -LiteralPath $backupPath -Destination $buildPath
    return $true
}

Set-Location -LiteralPath $projectRoot

try {
    if (-not (Test-Path -LiteralPath $watchdogPath)) {
        throw "Missing required file: $watchdogPath"
    }
    if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
        throw "npm.cmd was not found. Install Node.js or add it to the system PATH."
    }

    Stop-ProductionServer

    Write-Step "Saving the current build for rollback"
    if (Test-Path -LiteralPath $backupPath) {
        Remove-Item -LiteralPath $backupPath -Recurse -Force
    }
    if (Test-Path -LiteralPath $buildPath) {
        Move-Item -LiteralPath $buildPath -Destination $backupPath
    }

    Write-Step "Building the updated website"
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        throw "npm run build failed with exit code $LASTEXITCODE."
    }

    Start-ProductionServer
    Write-Step "Checking the website on localhost:$port"
    if (-not (Wait-ForWebsite)) {
        Stop-ProductionServer
        $restored = Restore-PreviousBuild
        if ($restored) {
            Start-ProductionServer
            [void](Wait-ForWebsite 30)
        }
        throw "The new build did not start correctly. The previous build was restored when available."
    }

    if (Test-Path -LiteralPath $backupPath) {
        Remove-Item -LiteralPath $backupPath -Recurse -Force
    }

    Write-Host ""
    Write-Host "Deployment completed successfully." -ForegroundColor Green
    Write-Host "Live domain: https://xiphiasimmigration.ae" -ForegroundColor Green
}
catch {
    Write-Host ""
    Write-Host "DEPLOYMENT FAILED: $($_.Exception.Message)" -ForegroundColor Red
    if (-not (Test-PortListening)) {
        $restored = Restore-PreviousBuild
        if ($restored) {
            Start-ProductionServer
            [void](Wait-ForWebsite 30)
            Write-Host "The previous build has been restarted." -ForegroundColor Yellow
        }
    }
    exit 1
}

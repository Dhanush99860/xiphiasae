# Keeps the xiphiasimmigration.ae Next.js production server alive.
# Restarts automatically if the node process exits for any reason (crash, kill, server reboot via the scheduled task trigger).
Set-Location $PSScriptRoot
while ($true) {
    npm run start
    Start-Sleep -Seconds 5
}

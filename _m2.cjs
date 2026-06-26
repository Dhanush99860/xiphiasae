const puppeteer=require("puppeteer");
async function measure(p, mobile){
  await p.evaluateOnNewDocument(()=>{ window.__lcp=0; window.__cls=0;
    new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime;}).observe({type:"largest-contentful-paint",buffered:true});
    new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput)window.__cls+=e.value;}}).observe({type:"layout-shift",buffered:true});
  });
  await p.goto("http://localhost:4100/",{waitUntil:"domcontentloaded",timeout:120000});
  await new Promise(r=>setTimeout(r, mobile?14000:7000));
  return await p.evaluate(()=>{
    const res=performance.getEntriesByType("resource"); const paint=performance.getEntriesByType("paint");
    const fcp=(paint.find(x=>x.name==="first-contentful-paint")||{}).startTime||0;
    const by={}; let total=0,reqs=0, mp4=0;
    for(const r of res){ const t=/\.mp4/.test(r.name)?"media":(/\.(webp|jpg|jpeg|png|avif|svg)|\/_next\/image/.test(r.name)?"image":(/\.js/.test(r.name)?"script":(/\.css/.test(r.name)?"css":(/\.woff/.test(r.name)?"font":"other")))); const sz=r.transferSize||r.encodedBodySize||0; by[t]=(by[t]||0)+sz; total+=sz; reqs++; if(/\.mp4/.test(r.name))mp4++; }
    return { by,total,reqs,mp4, fcp:Math.round(fcp), lcp:Math.round(window.__lcp||0), cls:+(window.__cls||0).toFixed(3) };
  });
}
const mb=x=>(x/1048576).toFixed(2)+"MB";
(async()=>{
  let b; try{b=await puppeteer.launch({headless:"new",executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",args:["--no-sandbox","--disable-gpu","--autoplay-policy=no-user-gesture-required"]});}catch{b=await puppeteer.launch({headless:"new",args:["--no-sandbox","--disable-gpu","--autoplay-policy=no-user-gesture-required"]});}
  // MOBILE
  let p=await b.newPage();
  await p.emulate({viewport:{width:390,height:844,deviceScaleFactor:3,isMobile:true,hasTouch:true},userAgent:"Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1"});
  const cdp=await p.target().createCDPSession(); await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions",{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8});
  await cdp.send("Emulation.setCPUThrottlingRate",{rate:4});
  const m=await measure(p,true);
  console.log("== MOBILE (4x CPU, Slow-4G) ==");
  console.log(" LCP:",m.lcp,"ms | CLS:",m.cls,"| FCP:",m.fcp,"ms");
  console.log(" reqs:",m.reqs,"| transfer:",mb(m.total),"| mp4 files:",m.mp4,"| video:",mb(m.by.media||0),"| img:",mb(m.by.image||0),"| js:",mb(m.by.script||0));
  await p.close();
  // DESKTOP
  p=await b.newPage(); await p.setViewport({width:1440,height:900});
  const d=await measure(p,false);
  console.log("== DESKTOP (no throttle) ==");
  console.log(" LCP:",d.lcp,"ms | CLS:",d.cls,"| FCP:",d.fcp,"ms");
  console.log(" reqs:",d.reqs,"| transfer:",mb(d.total),"| mp4 files:",d.mp4,"| video:",mb(d.by.media||0),"| img:",mb(d.by.image||0),"| js:",mb(d.by.script||0));
  await b.close();
})().catch(e=>{console.log("ERR",e.message);process.exit(1);});

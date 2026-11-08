const CACHE='meu-financeiro-local-v43-liquidglass-pizza';
const FILES=[
 './','./index.html','./styles.css','./app.js','./manifest.webmanifest',
 './icon-180.png','./icon-192.png','./icon-512.png'
];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.all(FILES.map(async file=>{
   try{await cache.add(file);}catch(error){console.warn('Cache opcional não carregado:',file,error);}
  }));
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-local-')&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const cached=await cache.match(request);
  if(cached)return cached;
  try{
   const response=await fetch(request);
   if(response&&response.ok)cache.put(request,response.clone());
   return response;
  }catch(error){
   if(request.mode==='navigate')return (await cache.match('./index.html'))||Response.error();
   return cached||Response.error();
  }
 })());
});

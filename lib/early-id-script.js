// Inline <head> script that runs BEFORE Google Tag Manager (and so before the
// Meta Pixel and Vercel Analytics read the URL).
//
// Site-wide: makes sure a random first-party visitor id exists in localStorage
// ('tssc_vid'). It is a UUID, not tied to any person.
//
// Only on /sqdb and /get-sqdb pages:
//   - reads a beehiiv subscription id from ?sid= (/sqdb email links) or from the
//     beehiiv redirect params on /get-sqdb/confirmation, accepts only
//     'sub_<uuid>' or a bare UUID, and stores it as 'tssc_subscriber_ref'
//     (canonical 'sub_<uuid>');
//   - strips those params, and any email-looking value (never stored), from the
//     URL with history.replaceState, keeping UTMs and other params;
//   - queues a visitor <-> subscriber link for /api/optin-link.
// Any page: flushes a queued link (retries on the next page view if it failed).
//
// Plain ES5 on purpose: it runs before any bundle and must never throw.
export const EARLY_ID_SCRIPT = `(function(){try{
var w=window,l=w.location,ls=null;
try{ls=w.localStorage;ls.getItem('tssc_vid');}catch(e){ls=null;}
var UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var SUB=/^(?:sub_)?([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
function rid(){var c=w.crypto;if(c&&c.randomUUID)return c.randomUUID();var b=[],i,h=[];for(i=0;i<16;i++)b[i]=Math.floor(Math.random()*256);
if(c&&c.getRandomValues){var a=new Uint8Array(16);c.getRandomValues(a);for(i=0;i<16;i++)b[i]=a[i];}
b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;for(i=0;i<16;i++)h.push((b[i]+256).toString(16).slice(1));
return h.slice(0,4).join('')+'-'+h.slice(4,6).join('')+'-'+h.slice(6,8).join('')+'-'+h.slice(8,10).join('')+'-'+h.slice(10).join('');}
var vid=ls?ls.getItem('tssc_vid'):null;
if(!vid||!UUID.test(vid)){vid=w.__tsscVid&&UUID.test(w.__tsscVid)?w.__tsscVid:rid();if(ls)ls.setItem('tssc_vid',vid);}
w.__tsscVid=vid;
var path=l.pathname.replace(/\\/+$/,'')||'/';
var onSqdb=path==='/sqdb'||path.indexOf('/sqdb/')===0;
var onConfirm=path==='/get-sqdb/confirmation';
var onGet=path==='/get-sqdb'||path.indexOf('/get-sqdb/')===0;
var pend=null;
if((onSqdb||onGet)&&l.search&&w.URLSearchParams&&w.history&&w.history.replaceState){
var q=new URLSearchParams(l.search),keys=onSqdb?['sid']:(onConfirm?['subscription_id','subscriber_id','sub_id','sid','id','uuid','email']:[]),found=null,changed=false,i,k,v,m,del=[];
for(i=0;i<keys.length;i++){k=keys[i];if(q.has(k)){v=(q.get(k)||'').replace(/^\\s+|\\s+$/g,'');m=SUB.exec(v);if(m&&!found)found={r:'sub_'+m[1].toLowerCase(),p:k};q['delete'](k);changed=true;}}
q.forEach(function(val,key){if(key==='sid'||/^e-?mail$/i.test(key)||/@|%40/.test(val))del.push(key);});
for(i=0;i<del.length;i++){q['delete'](del[i]);changed=true;}
if(changed){var s=q.toString();w.history.replaceState(w.history.state,'',l.pathname+(s?'?'+s:'')+l.hash);}
if(found){w.__tsscSubRef=found.r;pend={v:vid,r:found.r,s:onSqdb?'email_link':'confirmation',p:found.p};
if(ls){ls.setItem('tssc_subscriber_ref',found.r);ls.setItem('tssc_optin_pending',JSON.stringify(pend));}}
}
if(!pend&&ls){try{pend=JSON.parse(ls.getItem('tssc_optin_pending')||'null');}catch(e){pend=null;}}
if(pend&&pend.v&&pend.r&&pend.s&&w.fetch){
w.fetch('/api/optin-link',{method:'POST',headers:{'Content-Type':'application/json'},keepalive:true,credentials:'same-origin',
body:JSON.stringify({visitor_id:pend.v,subscriber_ref:pend.r,source:pend.s,id_param:pend.p||null})})
.then(function(res){if(ls&&(res.ok||res.status===400))ls.removeItem('tssc_optin_pending');})['catch'](function(){});
}
}catch(e){}})();`;

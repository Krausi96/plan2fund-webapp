
let _id=0;
export function toast(msg,ms=3200){
  const id = `t-${++_id}`;
  const el = document.createElement('div');
  el.id=id;
  el.textContent=msg;
  Object.assign(el.style,{
    position:'fixed',right:'20px',bottom:'20px',padding:'10px 12px',
    background:'#1e293b',color:'#e2e8f0',borderRadius:'10px',boxShadow:'0 6px 18px rgba(0,0,0,.3)',zIndex:9999
  });
  document.body.appendChild(el);
  setTimeout(()=>{el.remove();},ms);
}

(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function f(c,o,a){let r=!1,e=null;const t=c.querySelectorAll("li");function n(l){r=typeof l=="boolean"?l:!r,o.setAttribute("aria-expanded",String(r)),o.classList.toggle("show",r),o.classList.toggle("hide",!r),a.textContent=r?"Menu opened":"Menu closed",t.forEach(i=>i.tabIndex=r?0:-1),r?t[0].focus():o.focus()}function d(l){let i="Select an Item",s="No item selected";e==null||e.classList.remove("selected"),e==null||e.setAttribute("aria-selected","false"),e=e!==l?l:null,e!==null&&(e.classList.add("selected"),e.setAttribute("aria-selected","true"),i=e.textContent,s=`Selected Item : ${l.textContent}`),o.textContent=i,a.textContent=s}n(!1),o.addEventListener("click",()=>n()),document.addEventListener("click",l=>{r&&!o.contains(l.target)&&!c.contains(l.target)&&n(!1)}),o.addEventListener("keydown",l=>{(l.key==="ArrowDown"||l.key==="Enter"||l.key===" ")&&(l.preventDefault(),n(!0))}),t.forEach((l,i)=>{l.addEventListener("click",()=>{d(l),n(!1)}),l.addEventListener("keydown",s=>{s.key==="ArrowDown"&&(s.preventDefault(),t[(i+1)%t.length].focus()),s.key==="ArrowUp"&&(s.preventDefault(),t[(i-1+t.length)%t.length].focus()),(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),l.click()),s.key==="Escape"&&(s.preventDefault(),n(!1))})})}document.querySelector("#app").innerHTML=`
    <nav>
      <button id="dropdown-controller" 
        aria-haspopup="listbox" aria-expanded="false" aria-label="Select an Item">
        Select an Item
      </button>
      <ul id="select-items" 
        role="listbox" aria-labelledby="dropdown-controller" tabindex="-1">
          <li class="item" role="option" aria-selected="false" tabindex="-1">First Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Second Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Third Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Fourth Item</li>
          <li class="item" role="option" aria-selected="false" tabindex="-1">Fifth Item</li>
      </ul>
      <p id="dropdown-status" class="sr-only" aria-live="polite">No item selected</p>
    </nav>
`;const u=document.querySelector("#dropdown-controller"),p=document.querySelector("#select-items"),y=document.querySelector("#dropdown-status");f(p,u,y);

(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();function i(n){let s=0;const o=r=>{s=r,n.innerHTML=`count is ${s}`};n.addEventListener("click",()=>o(s+1)),o(0)}document.querySelector("#app").innerHTML=`
  <h2>Task Tracker</h2>
  <label for="create-task"></label>
  <input id="create-task" type="text" placeholder="Start writing and press enter to create task">
  <ul id="tasks-list">
    <li class="task" id="0"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="1"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="2"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="3"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>

    <li class="task" id="4"><button class="checkbox-task"></button>une description<button class="remove-task"></button>
    </li>
  </ul>
`;i(document.querySelector("#counter"));

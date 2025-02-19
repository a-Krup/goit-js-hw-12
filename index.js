import{a as v,i as m,S as f}from"./assets/vendor-YT4DRQk6.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const g=async(a,s=1)=>{const r="48797096-f4883239ab22667ebb957e7d3",t="https://pixabay.com/api/";try{console.log("Запит до API:",t,{params:{key:r,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:40}});const e=await v.get(t,{params:{key:r,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:40}});return console.log("Відповідь від API:",e.data),e.data}catch(e){throw console.error("Помилка при отриманні зображень:",e.response?e.response.data:e.message),e}},y=a=>{const s=document.querySelector(".gallery"),r=a.map(t=>`
        <li>
          <a href="${t.largeImageURL}" target="_blank">
            <img src="${t.webformatURL}" alt="${t.tags}" />
          </a>
          <div class="info">
            <div class="stat-item">
              <p class="label">Likes</p>
              <p class="value">${t.likes}</p>
            </div>
            <div class="stat-item">
              <p class="label">Views</p>
              <p class="value">${t.views}</p>
            </div>
            <div class="stat-item">
              <p class="label">Comments</p>
              <p class="value">${t.comments}</p>
            </div>
            <div class="stat-item">
              <p class="label">Downloads</p>
              <p class="value">${t.downloads}</p>
            </div>
          </div>
        </li>
      `).join("");s.insertAdjacentHTML("beforeend",r)};function u(a,s=!1){const r=document.querySelector(".loader"),t=document.querySelector(".sub-btn"),e=document.querySelector(".sub-loader");a?r.classList.remove("hidden"):r.classList.add("hidden"),t.disabled=s,e.disabled=s}let d=1,p="",h=0;function b(a){return new Promise(s=>setTimeout(s,a))}document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector(".gallery"),s=document.querySelector(".form"),r=document.querySelector(".form-input"),t=document.querySelector(".sub-loader"),e=document.querySelector(".end-message"),o=document.querySelector(".sub-btn");if(!s||!r||!t||!e||!o)return;s.addEventListener("submit",async i=>{if(i.preventDefault(),p=r.value.trim(),!p){m.error({message:"Please enter a search term.",position:"topRight",timeout:2e3});return}a.innerHTML="",d=1,t.classList.add("hidden"),e.classList.add("hidden"),o.disabled=!0,u(!0);try{const n=await g(p,d);h=n.totalHits;const l=n.hits;if(l.length===0){m.error({message:"No images found, please try another search.",position:"topRight",timeout:2e3});return}await b(2e3),y(l),new f(".gallery a").refresh(),l.length<h?t.classList.remove("hidden"):(t.classList.add("hidden"),e.classList.remove("hidden"),e.textContent="We're sorry, but you've reached the end of search results."),setTimeout(()=>{u(!1),o.disabled=!1},500),c()}catch{m.error({message:"Something went wrong, please try again later.",position:"topRight",timeout:2e3})}finally{u(!1),o.disabled=!1}}),t.addEventListener("click",async()=>{d+=1,u(!0),t.classList.add("hidden"),await b(2e3);try{const n=(await g(p,d)).hits;if(n.length===0||d*40>=h){t.classList.add("hidden"),e.classList.remove("hidden"),e.textContent="We're sorry, but you've reached the end of search results.";return}y(n),new f(".gallery a").refresh(),d*40>=h?(t.classList.add("hidden"),e.classList.remove("hidden"),e.textContent="We're sorry, but you've reached the end of search results."):t.classList.remove("hidden"),c()}catch{m.error({message:"Something went wrong, please try again later.",position:"topRight",timeout:2e3})}finally{u(!1)}});function c(){const i=document.querySelectorAll(".gallery li");if(i.length>0){const n=i[i.length-1];if(n){const l=n.getBoundingClientRect().top;l>0&&window.scrollBy({top:l,left:0,behavior:"smooth"})}}}});
//# sourceMappingURL=index.js.map

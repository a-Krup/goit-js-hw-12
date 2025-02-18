import{a as b,i as d,S as p}from"./assets/vendor-YT4DRQk6.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const f=async(i,o=1)=>{const n="https://pixabay.com/api/";try{return(await b.get(n,{params:{key:"48797096-f4883239ab22667ebb957e7d3",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40}})).data.hits}catch(t){throw console.error("Error fetching images:",t),t}},u=i=>{const o=document.querySelector(".loader");i?o.classList.remove("hidden"):o.classList.add("hidden")},y=i=>{const o=document.querySelector(".gallery"),n=i.map(({webformatURL:t,largeImageURL:e,tags:s,likes:l,views:c,comments:r,downloads:a})=>`
        <li>
          <a href="${e}" class="gallery-item">
            <img src="${t}" alt="${s}" />
          </a>
          <div class="info">
            <div class="stat-item">
              <p class="label">Likes</p>
              <p class="value">${l}</p>
            </div>
            <div class="stat-item">
              <p class="label">Views</p>
              <p class="value">${c}</p>
            </div>
            <div class="stat-item">
              <p class="label">Comments</p>
              <p class="value">${r}</p>
            </div>
            <div class="stat-item">
              <p class="label">Downloads</p>
              <p class="value">${a}</p>
            </div>
          </div>
        </li>
      `).join("");o.insertAdjacentHTML("beforeend",n)};let m=1,g="";document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector(".gallery"),o=document.querySelector(".form"),n=document.querySelector(".form-input"),t=document.querySelector(".sub-loader"),e=document.querySelector(".end-message"),s=document.querySelector(".sub-btn");if(!o||!n||!t||!e||!s)return;function l(r){return new Promise(a=>setTimeout(a,r))}o.addEventListener("submit",async r=>{if(r.preventDefault(),g=n.value.trim(),!g){d.error({message:"Please enter a search term.",position:"topRight",timeout:2e3});return}i.innerHTML="",m=1,t.classList.add("hidden"),e.classList.add("hidden"),s.disabled=!0,u(!0);try{const a=await f(g,m);if(a.length===0){d.error({message:"No images found, please try another search.",position:"topRight",timeout:2e3});return}await l(2e3),y(a),new p(".gallery a").refresh(),setTimeout(()=>{s.disabled=!1,t.classList.remove("hidden")},500),a.length<40&&(t.classList.add("hidden"),e.classList.remove("hidden"),e.textContent="We're sorry, but you've reached the end of search results."),c()}catch{d.error({message:"Something went wrong, please try again later.",position:"topRight",timeout:2e3})}finally{u(!1),s.disabled=!1}}),t.addEventListener("click",async()=>{m+=1,t.disabled=!0,u(!0);try{const r=await f(g,m);if(r.length===0){t.classList.add("hidden"),e.classList.remove("hidden"),e.textContent="We're sorry, but you've reached the end of search results.";return}y(r),new p(".gallery a").refresh(),r.length<40&&(t.classList.add("hidden"),e.classList.remove("hidden"),e.textContent="We're sorry, but you've reached the end of search results."),c()}catch{d.error({message:"Something went wrong, please try again later.",position:"topRight",timeout:2e3})}finally{t.disabled=!1,u(!1)}});function c(){const r=document.querySelectorAll(".gallery li");if(r.length>0){const h=r[r.length-1].getBoundingClientRect().height;window.scrollBy({top:h*2,behavior:"smooth"})}}});
//# sourceMappingURL=index.js.map

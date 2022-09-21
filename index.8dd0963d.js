const n={input:document.getElementById("search-box"),list:document.querySelector(".country-list"),div:document.querySelector(".country-info")};n.input.addEventListener("input",debounce((t=>{t.preventDefault();let e=t.target.value.trim();if(!e)return n.list.innerHTML="",void(n.div.innerHTML="");fetchCountries(e).then((t=>function(t){if(t.length>10)Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");else if(t.length>1&&t.length<10){const e=t.map((n=>`<li class="country-list__item">\n        <img src=${n.flags.svg} width="50" alt="flag">\n        <span class="country-list__name">${n.name.official}</span>\n    </li>`)).join("");n.div.innerHTML="",n.list.innerHTML=e}else{const e=t.map((n=>`<div class="country-info__box" alt="flag">\n        <img src=${n.flags.svg} width="80">\n        <span class="country-info__name">${n.name.common}</span>\n        </div>\n        <p class="country-text"><span class="country-info--accent">Capital:</span> ${n.capital}</p>\n        <p class="country-text"><span class="country-info--accent">Population:</span> ${n.population}</p>\n        <p class="country-text"><span class="country-info--accent">Languages:</span> ${Object.values(n.languages).join(", ")}</p>`)).join("");n.list.innerHTML="",n.div.innerHTML=e}}(t))).catch((()=>{n.div.innerHTML="",n.list.innerHTML="",Notiflix.Notify.failure("Oops, there is no country with that name")}))}),300));
//# sourceMappingURL=index.8dd0963d.js.map

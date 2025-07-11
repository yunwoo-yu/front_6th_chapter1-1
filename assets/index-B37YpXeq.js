(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};let i=null,a=null;const o=(e=`root`)=>{i=document.getElementById(e),i||console.log(`Root element not found`)},s=(e,t)=>{if(!i){console.error(`Root element not found`);return}a=e;let n=e();i.innerHTML=n,i.offsetHeight,t&&t()},c=e=>{a&&s(a,e)};async function l(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function u(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function ee(){let e=await fetch(`/api/categories`);return await e.json()}const d=()=>`
  <footer class="bg-white shadow-sm sticky top-0 z-40">
    <div class="max-w-md mx-auto py-8 text-center text-gray-500">
      <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
    </div>
  </footer>
`,f=`shopping_cart`,p=()=>{let e=localStorage.getItem(f);return e?JSON.parse(e):[]},m=e=>{let t=JSON.stringify(e);localStorage.setItem(f,t)},h=(e,t)=>{let n=p(),r=n.findIndex(t=>t.productId===e.productId);r===-1?n.push({...e,quantity:t||1,isSelected:!1}):n[r].quantity+=e.quantity||1,m(n)},te=e=>{try{let t=p(),n=t.filter(t=>t.productId!==e);return m(n),n}catch(e){return console.error(`장바구니에서 상품을 제거하는 중 오류가 발생했습니다:`,e),p()}},ne=()=>{let e=p(),t=e.filter(e=>!e.isSelected);return m(t),t},g=(e,t)=>{try{let n=p(),r=n.findIndex(t=>t.productId===e);return r===-1?(console.error(`상품을 찾을 수 없습니다:`,e),p()):(t===`decrease`?n[r].quantity>1&&--n[r].quantity:n[r].quantity+=1,m(n),n)}catch(e){return console.error(`장바구니 수량을 변경하는 중 오류가 발생했습니다:`,e),p()}},re=()=>{try{return localStorage.removeItem(f),[]}catch(e){return console.error(`장바구니를 비우는 중 오류가 발생했습니다:`,e),[]}},_=()=>{let e=p();return e.length},v=(e,t)=>{try{let n=p(),r=n.findIndex(t=>t.productId===e);return r!==-1&&(n[r].isSelected=t),m(n),n}catch(e){return console.error(`장바구니 선택 상태를 업데이트하는 중 오류가 발생했습니다:`,e),p()}},y=e=>{try{let t=p(),n=t.map(t=>({...t,isSelected:e}));return m(n),n}catch(e){return console.error(`장바구니 전체 선택을 업데이트하는 중 오류가 발생했습니다:`,e),p()}},b=({isBackButton:e=!1,title:t=`쇼핑몰`}={})=>{let n=_();return`
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          ${e?`
                <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
              `:``}
          ${e?`<h1 class="text-xl font-bold text-gray-900">${t}</h1>`:`<h1 class="text-xl font-bold text-gray-900"><a href="/" data-link="">${t}</a></h1>`}
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              ${n>0?` <span
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    ${n}
                  </span>`:``}
            </button>
          </div>
        </div>
      </div>
    </header>
  `},x=new Map,S=(e,t)=>{x.has(e)||x.set(e,t);let n=()=>x.get(e),r=t=>{let n=x.get(e),r=typeof t==`function`?t(n):t;x.set(e,r)};return[n,r]},ie=`PARAMS`,ae=`ROUTE_PARAMS`,[C,w]=S(ie,new URLSearchParams(window.location.search)),[oe,T]=S(ae,{}),se=`TOAST`,[E,D]=S(se,{toastType:null});let O=null;const k=()=>{let e=E();return e.toastType&&!O&&(O=setTimeout(()=>{D({toastType:null}),c(),O=null},2e3)),`
    ${e.toastType===`success`?`
          <div
            class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm fixed bottom-3 -translate-x-1/2 left-1/2"
          >
            <div class="flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
            <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        `:``}
    ${e.toastType===`delete`?`
          <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
            <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        `:``}
    ${e.toastType===`error`?`
          <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p class="text-sm font-medium">오류가 발생했습니다.</p>
            <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        `:``}
  `},ce=({productId:e,title:t,quantity:n,image:r,lprice:i,isSelected:a})=>`
    <div class="p-4 space-y-4">
      <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e}">
        <!-- 선택 체크박스 -->
        <label class="flex items-center mr-3">
          <input
            type="checkbox"
            ${a?`checked`:``}
            class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
            focus:ring-blue-500"
            data-product-id="${e}"
          />
        </label>
        <!-- 상품 이미지 -->
        <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
          <img
            src="${r}"
            alt="${t}"
            class="w-full h-full object-cover cursor-pointer cart-item-image"
            data-product-id="${e}"
          />
        </div>
        <!-- 상품 정보 -->
        <div class="flex-1 min-w-0">
          <h4
            class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title"
            data-product-id="${e}"
          >
            ${t}
          </h4>
          <p class="text-sm text-gray-600 mt-1">${Number(i).toLocaleString(`ko-KR`)}원</p>
          <!-- 수량 조절 -->
          <div class="flex items-center mt-2">
            <button
              class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
             border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
              data-product-id="${e}"
              ${n===1?`disabled`:``}
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
            <input
              type="number"
              value="${n}"
              min="1"
              class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
            border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              disabled=""
              data-product-id="${e}"
            />
            <button
              class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
             border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              data-product-id="${e}"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
        <!-- 가격 및 삭제 -->
        <div class="text-right ml-3">
          <p class="text-sm font-medium text-gray-900">${(Number(i)*n).toLocaleString(`ko-KR`)}원</p>
          <button
            class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
            data-product-id="${e}"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  `,A={isOpen:!1},j=()=>{if(!A.isOpen)return``;let e=p(),t=_();return`
    <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-50 z-50 cart-modal-overlay"
    >
      ${e.length?`<div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4 cart-modal">
            <div
              class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
              data-modal-content
            >
              <!-- 헤더 -->
              <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                    ></path>
                  </svg>
                  장바구니
                  <span class="text-sm font-normal text-gray-600 ml-1">${t}</span>
                </h2>
                <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <!-- 컨텐츠 -->
              <div class="flex flex-col max-h-[calc(90vh-120px)]">
                <!-- 전체 선택 섹션 -->
                <div class="p-4 border-b border-gray-200 bg-gray-50">
                  <label class="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      id="cart-modal-select-all-checkbox"
                      ${t>0&&e.every(e=>e.isSelected)?`checked`:``}
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    전체선택 (${e.length}개)
                  </label>
                </div>
                <!-- 아이템 목록 -->
                <div class="flex-1 overflow-y-auto">${e.map(ce).join(``)}</div>
                <!-- 하단 액션 -->
                <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                  <!-- 선택된 아이템 정보 -->
                  <div class="flex justify-between items-center mb-3 text-sm">
                    <span class="text-gray-600"
                      >선택한 상품 (${e.filter(e=>e.isSelected).length}개)</span
                    >
                    <span class="font-medium"
                      >${e.filter(e=>e.isSelected).reduce((e,t)=>e+=Number(t.lprice)*t.quantity,0).toLocaleString(`ko-KR`)}원</span
                    >
                  </div>
                  <!-- 총 금액 -->
                  <div class="flex justify-between items-center mb-4">
                    <span class="text-lg font-bold text-gray-900">총 금액</span>
                    <span class="text-xl font-bold text-blue-600"
                      >${e.reduce((e,t)=>e+=Number(t.lprice)*t.quantity,0).toLocaleString(`ko-KR`)}원</span
                    >
                  </div>
                  <!-- 액션 버튼들 -->
                  <div class="space-y-2">
                    <button
                      id="cart-modal-remove-selected-btn"
                      class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                   hover:bg-red-700 transition-colors text-sm"
                    >
                      선택한 상품 삭제 (${e.filter(e=>e.isSelected).length}개)
                    </button>
                    <div class="flex gap-2">
                      <button
                        id="cart-modal-clear-cart-btn"
                        class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                   hover:bg-gray-700 transition-colors text-sm"
                      >
                        전체 비우기
                      </button>
                      <button
                        id="cart-modal-checkout-btn"
                        class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                   hover:bg-blue-700 transition-colors text-sm"
                      >
                        구매하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`:` <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4 cart-modal">
            <div
              class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
              data-modal-content
            >
              <!-- 헤더 -->
              <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                    ></path>
                  </svg>
                  장바구니
                </h2>

                <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- 컨텐츠 -->
              <div class="flex flex-col max-h-[calc(90vh-120px)]">
                <!-- 빈 장바구니 -->
                <div class="flex-1 flex items-center justify-center p-8">
                  <div class="text-center">
                    <div class="text-gray-400 mb-4">
                      <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                        ></path>
                      </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                    <p class="text-gray-600">원하는 상품을 담아보세요!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`}
    </div>
  `},le=()=>`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`,ue=({category:e,depth:t})=>{let n=F();return`
    ${t===1?`
          <button
            data-category1="${e}"
            class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ${e}
          </button>
        `:`
          <button
            data-category1="${n.category1}"
            data-category2="${e}"
            class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors ${n.category2===e?`bg-blue-100 border-blue-300 text-blue-800`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}"
          >
            ${e}
          </button>
        `}
  `},de=()=>{let e=F();return`
    <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600">카테고리:</label>
      <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
      ${e.category1?`
            <span class="text-xs text-gray-500">&gt;</span
            ><button
              data-breadcrumb="category1"
              data-category1="${e.category1}"
              class="text-xs hover:text-blue-800 hover:underline"
            >
              ${e.category1}
            </button>
          `:``}
      ${e.category2?`
            <span class="text-xs text-gray-500">&gt;</span
            ><span class="text-xs text-gray-600 cursor-default">${e.category2}</span>
          `:``}
    </div>
    <div class="flex flex-wrap gap-2">
      ${e.isLoading?le():Object.keys(e.category1.trim()?e.categories[e.category1]:e.categories).map(t=>ue({category:t,depth:e.category1?2:1})).join(``)}
    </div>
  `},fe=()=>{let e=F();return`
    <!-- 페이지당 상품 수 -->
    <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600">개수:</label>
      <select
        id="limit-select"
        class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="10" ${e.limit===`10`?`selected`:``}>10개</option>
        <option value="20" ${e.limit===`20`?`selected`:``}>20개</option>
        <option value="50" ${e.limit===`50`?`selected`:``}>50개</option>
        <option value="100" ${e.limit===`100`?`selected`:``}>100개</option>
      </select>
    </div>
    <!-- 정렬 -->
    <div class="flex items-center gap-2">
      <label class="text-sm text-gray-600">정렬:</label>
      <select
        id="sort-select"
        class="text-sm border border-gray-300 rounded px-2 py-1
                         focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="price_asc" ${e.sort===`price_asc`?`selected`:``}>가격 낮은순</option>
        <option value="price_desc" ${e.sort===`price_desc`?`selected`:``}>가격 높은순</option>
        <option value="name_asc" ${e.sort===`name_asc`?`selected`:``}>이름순</option>
        <option value="name_desc" ${e.sort===`name_desc`?`selected`:``}>이름 역순</option>
      </select>
    </div>
  `},pe=({title:e,image:t,lprice:n,productId:r,brand:i})=>`
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
    data-product-id="${r}"
  >
    <!-- 상품 이미지 -->
    <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
      <img
        src="${t}"
        alt="${e}"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        loading="lazy"
      />
    </div>
    <!-- 상품 정보 -->
    <div class="p-3">
      <div class="cursor-pointer product-info mb-3">
        <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${e}</h3>
        <p class="text-xs text-gray-500 mb-2">${i}</p>
        <p class="text-lg font-bold text-gray-900">${Number(n).toLocaleString(`ko-KR`)}원</p>
      </div>
      <!-- 장바구니 버튼 -->
      <button
        class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
      hover:bg-blue-700 transition-colors add-to-cart-btn"
        data-product-id="${r}"
      >
        장바구니 담기
      </button>
    </div>
  </div>
`,M=()=>`
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    <div class="aspect-square bg-gray-200"></div>
    <div class="p-3">
      <div class="h-4 bg-gray-200 rounded mb-2"></div>
      <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div class="h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
`,me=()=>{let e=F();return`
    <!-- 상품 개수 정보 -->
    ${e.isLoading?``:`
          <div class="mb-4 text-sm text-gray-600">
            총 <span class="font-medium text-gray-900">${e.total}개</span>의 상품
          </div>
        `}
    <!-- 상품 그리드 -->
    <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
      <!-- 로딩 스켈레톤 -->
      ${e.isLoading?Array.from({length:4}).map(M).join(``):e.products.map(e=>pe(e)).join(``)}
      ${e.isInfiniteLoading?Array.from({length:6}).map(M).join(``):``}
    </div>

    ${e.isLoading||e.isInfiniteLoading?`
          <div class="text-center py-4">
            <div class="inline-flex items-center">
              <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
            </div>
          </div>
        `:`<div class="text-center py-4 text-sm text-gray-500">모든 상품을 확인했습니다</div>`}
  `},N=()=>{let e=F();return`
    <!-- 검색창 -->
    <div class="mb-4">
      <div class="relative">
        <input
          type="text"
          id="search-input"
          placeholder="상품명을 검색해보세요..."
          value="${e.search}"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  `},P=`MAIN`,[F,I]=S(P,{products:[],isLoading:!0,isInfiniteLoading:!1,total:0,page:1,hasNext:null,categories:{},limit:C().get(`limit`)||`20`,sort:C().get(`sort`)||`price_asc`,search:C().get(`search`)||``,category1:C().get(`category1`)||``,category2:C().get(`category2`)||``}),L=()=>`
    <div class="min-h-screen bg-gray-50">
      ${b()}
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          ${N()}
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">${de()}</div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">${fe()}</div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>${me()}</div>
        </div>
      </main>
      ${d()} ${k()} ${j()}
    </div>
  `;L.onMount=async()=>{let e=C(),t=e.get(`category1`)||``,n=e.get(`category2`)||``,r=e.get(`limit`)||`20`,i=e.get(`sort`)||`price_asc`,a=e.get(`search`)||``;A.isOpen=!1,I({products:[],isLoading:!0,isInfiniteLoading:!1,total:0,page:1,hasNext:null,categories:{},category1:t,category2:n,limit:r,sort:i,search:a}),c();let[o,s]=await Promise.all([l(Object.fromEntries(e)),ee()]);I(e=>({...e,products:o.products,total:o.pagination.total,categories:s,isLoading:!1,hasNext:o.pagination.hasNext,page:o.pagination.page,category1:o.filters.category1,category2:o.filters.category2})),c()},L.onUnmount=()=>{let e=C(),t=e.get(`category1`)||``,n=e.get(`category2`)||``,r=e.get(`limit`)||`20`,i=e.get(`sort`)||`price_asc`,a=e.get(`search`)||``;A.isOpen=!1,D({toastType:null}),I({products:[],isLoading:!0,isInfiniteLoading:!1,total:0,page:1,hasNext:null,categories:{},category1:t,category2:n,limit:r,sort:i,search:a})};const R=()=>`
    <div class="py-20 bg-gray-50 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">상품 정보를 불러오는 중...</p>
      </div>
    </div>
  `,z=()=>{let{product:e}=V();return e?`
    <nav class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category1="${e.category1}">${e.category1}</button>
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
        <button class="breadcrumb-link" data-category2="${e.category2}">${e.category2}</button>
      </div>
    </nav>
  `:``},B=()=>{let{product:e,quantity:t}=V();if(!e)return``;let{productId:n,title:r,rating:i,reviewCount:a,lprice:o,stock:s,description:c,image:l}=e;return`
    <!-- 상품 상세 정보 -->
    <div class="bg-white rounded-lg shadow-sm mb-6">
      <!-- 상품 이미지 -->
      <div class="p-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img src="${l}" alt="${r}" class="w-full h-full object-cover product-detail-image" />
        </div>
        <!-- 상품 정보 -->
        <div>
          <p class="text-sm text-gray-600 mb-1"></p>
          <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>
          <!-- 평점 및 리뷰 -->
          <div class="flex items-center mb-3">
            <div class="flex items-center">
              ${Array.from({length:i}).map(()=>`
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                  `).join(``)}
              ${Array.from({length:5-i}).map(()=>`
                    <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      ></path>
                    </svg>
                  `).join(``)}
            </div>
            <span class="ml-2 text-sm text-gray-600">${i}.0 (${a}개 리뷰)</span>
          </div>
          <!-- 가격 -->
          <div class="mb-4">
            <span class="text-2xl font-bold text-blue-600">${o}원</span>
          </div>
          <!-- 재고 -->
          <div class="text-sm text-gray-600 mb-4">재고 ${s}개</div>
          <!-- 설명 -->
          <div class="text-sm text-gray-700 leading-relaxed mb-6">${c}</div>
        </div>
      </div>
      <!-- 수량 선택 및 액션 -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-medium text-gray-900">수량</span>
          <div class="flex items-center">
            <button
              id="quantity-decrease"
              class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100"
              ${t===1?`disabled`:``}
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
            <input
              type="number"
              id="quantity-input"
              value=${t}
              min="1"
              max=${s}
              class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              id="quantity-increase"
              class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
        <!-- 액션 버튼 -->
        <button
          id="add-to-cart-btn"
          data-product-id=${n}
          data-quantity=${t}
          data-page="detail"
          class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium"
        >
          장바구니 담기
        </button>
      </div>
      <div class="mb-6">
        <button
          class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
        hover:bg-gray-200 transition-colors go-to-product-list"
        >
          상품 목록으로 돌아가기
        </button>
      </div>
    </div>
  `},he=()=>{let{relatedProducts:e,isLoading:t}=V();return t||!e||e.length===0?``:`
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
        <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-2 gap-3 responsive-grid">
          ${e.map(e=>` <div
                class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                data-product-id="${e.productId}"
              >
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img
                    src="${e.image}"
                    alt="${e.title}"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                <p class="text-sm font-bold text-blue-600">
                  ${Number(e.lprice).toLocaleString(`ko-KR`)}원
                </p>
              </div>`).join(``)}
        </div>
      </div>
    </div>
  `},ge=`DETAIL`,[V,H]=S(ge,{product:null,relatedProducts:[],isLoading:!0,isRelatedLoading:!0,quantity:1}),U=()=>{let{isLoading:e,isRelatedLoading:t}=V();return e?``:`
    <div class="min-h-screen bg-gray-50">
      ${b({isBackButton:!0,title:`상품 상세`})}
      <main class="max-w-md mx-auto px-4 py-4">
        ${z()} ${B()} ${t?R():he()}
        ${d()} ${k()} ${j()}
      </main>
    </div>
  `};U.onMount=async()=>{let e=oe(),t=e.id,n=await u(t);H(e=>({...e,product:n,isLoading:!1,isRelatedLoading:!0})),c();let r=await l({category2:n.category2});H(e=>({...e,relatedProducts:r.products.filter(e=>e.productId!==t),isRelatedLoading:!1})),c()},U.onUnmount=()=>{H({product:null,relatedProducts:[],isLoading:!0,quantity:1})};const _e=`/front_6th_chapter1-1`,ve=e=>{let t=null,n=t=>{let n=t.split(`?`)[0],r=n.replace(_e,``)||`/`;return e.find(e=>{if(e.path===r)return!0;let t=e.path.split(`/`),n=r.split(`/`);return t.length===n.length?t.every((e,t)=>e.startsWith(`:`)||e===n[t]):!1})},r=(e,t)=>{let n=e.split(`/`),r=t.split(`?`)[0].split(`/`),i={};return n.forEach((e,t)=>{if(e.startsWith(`:`)){let n=e.slice(1);i[n]=r[t]}}),i},i=()=>window.location.pathname+window.location.search,a=(e,i={})=>{let a=e;e.startsWith(`?`)&&(a=window.location.pathname+e);let o=n(a);if(o){i.replace?window.history.replaceState({},``,a):window.history.pushState({},``,a),t=o;let e=r(o.path,a);T(e),s(o.component)}else console.error(`Route not found:`,a)},o=e=>{window.addEventListener(`popstate`,()=>{if(e)e();else{let e=i();a(e)}})};return{init:o,navigate:a,findRoute:n,getCurrentPath:i,getRouteParams:r,currentRoute:t}},ye=[{path:`/`,component:L},{path:`/product/:id`,component:U}],W=ve(ye),G=()=>`
    <main class="max-w-md mx-auto px-4 py-4">
      <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1" />
            </filter>
          </defs>

          <!-- 404 Numbers -->
          <text
            x="160"
            y="85"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="48"
            font-weight="600"
            fill="url(#blueGradient)"
            text-anchor="middle"
          >
            404
          </text>

          <!-- Icon decoration -->
          <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
          <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
          <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5" />
          <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5" />

          <!-- Message -->
          <text
            x="160"
            y="110"
            font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            font-size="14"
            font-weight="400"
            fill="#5f6368"
            text-anchor="middle"
          >
            페이지를 찾을 수 없습니다
          </text>

          <!-- Subtle bottom accent -->
          <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3" />
        </svg>

        <a
          href="/front_6th_chapter1-1/"
          data-link
          class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >홈으로</a
        >
      </div>
    </main>
  `;G.onMount=()=>{},G.onUnmount=()=>{};const be=async e=>{let t=F(),n=C();I({...t,limit:e,page:1}),n.set(`limit`,e),n.set(`page`,`1`),w(n),W.navigate(`?${n.toString()}`);let r=Object.fromEntries(n),i=await l(r);I({...t,products:i.products,page:i.pagination.page,hasNext:i.pagination.hasNext,limit:e})},xe=async e=>{let t=F(),n=C();I({...t,sort:e,page:1}),n.set(`sort`,e),n.set(`page`,`1`),w(n),W.navigate(`?${n.toString()}`);let r=Object.fromEntries(n),i=await l(r);I({...t,products:i.products,page:i.pagination.page,hasNext:i.pagination.hasNext,sort:e})},Se=async e=>{let t=F(),n=C();I({...t,search:e,page:1}),n.set(`search`,e),n.set(`page`,`1`),w(n),W.navigate(`?${n.toString()}`);let r=Object.fromEntries(n),i=await l(r);I({...t,products:i.products,page:i.pagination.page,hasNext:i.pagination.hasNext,total:i.pagination.total,search:e})},K=async(e,t)=>{let n=F(),r=C();t===1?(I({...n,category1:e,category2:``,page:1}),r.set(`category1`,e),r.delete(`category2`)):t===2?(I({...n,category2:e,page:1}),r.set(`category2`,e)):(I({...n,category1:``,category2:``,page:1}),r.delete(`category1`),r.delete(`category2`)),r.set(`page`,`1`),w(r),W.navigate(`?${r.toString()}`);let i=Object.fromEntries(r),a=await l(i);I({...n,products:a.products,page:a.pagination.page,hasNext:a.pagination.hasNext,total:a.pagination.total,category1:a.filters.category1,category2:a.filters.category2})},Ce=async(e,t,n=`/`)=>{let r=F(),i=C();I({...r,category1:e||``,category2:t||``,page:1}),e?i.set(`category1`,e):i.delete(`category1`),t?i.set(`category2`,t):i.delete(`category2`),i.set(`page`,`1`),w(i),W.navigate(`${n}?${i.toString()}`);let a=Object.fromEntries(i),o=await l(a);I({...r,products:o.products,page:o.pagination.page,hasNext:o.pagination.hasNext,total:o.pagination.total,category1:o.filters.category1,category2:o.filters.category2})},we=async e=>{let t=F(),n=C();e===`reset`?(I({...t,category1:``,category2:``,page:1}),n.delete(`category1`),n.delete(`category2`)):e===`category1`&&(I({...t,category2:``,page:1}),n.delete(`category2`)),n.set(`page`,`1`),w(n),W.navigate(`?${n.toString()}`);let r=Object.fromEntries(n),i=await l(r);I({...t,products:i.products,page:i.pagination.page,hasNext:i.pagination.hasNext,total:i.pagination.total,category1:i.filters.category1,category2:i.filters.category2})},Te=async()=>{let e=F(),t=C();if(e.isInfiniteLoading||!e.hasNext)return;I({...e,isInfiniteLoading:!0}),c();let n=e.page+1;t.set(`page`,n.toString()),w(t),W.navigate(`?${t.toString()}`,{replace:!0});let r=Object.fromEntries(t),i=await l(r);I({...e,products:[...e.products,...i.products],page:i.pagination.page,hasNext:i.pagination.hasNext,isInfiniteLoading:!1}),c()};let q=!1,J=!1;const Y=async e=>{if(e.target.id===`limit-select`){let t=e.target.value;await be(t)}if(e.target.id===`sort-select`){let t=e.target.value;await xe(t)}if(e.target.closest(`#cart-modal-select-all-checkbox`)){let e=p(),t=e.every(e=>e.isSelected),n=!t;y(n)}if(e.target.classList.contains(`cart-item-checkbox`)){let t=e.target.dataset.productId,n=e.target.checked;v(t,n)}c()},X=async e=>{if(e.target.id===`search-input`&&e.key===`Enter`){let t=e.target.value;await Se(t),c()}e.key===`Escape`&&A.isOpen&&(A.isOpen=!1,c())},Z=async e=>{let t=!1;if(e.target.classList.contains(`add-to-cart-btn`)){let n=e.target.dataset.productId,r=F(),i=r.products.find(e=>e.productId===n);i&&(h(i),D({toastType:`success`}),t=!0)}if(e.target.id===`add-to-cart-btn`){let e=V(),n=e.product;n&&(h(n,e.quantity),H(e=>({...e,quantity:1})),D({toastType:`success`}),t=!0)}if(e.target.closest(`#toast-close-btn`)&&(D({toastType:null}),t=!0),e.target.classList.contains(`category1-filter-btn`)?(await K(e.target.dataset.category1,1),t=!0):e.target.classList.contains(`category2-filter-btn`)&&(await K(e.target.dataset.category2,2),t=!0),e.target.dataset.breadcrumb&&(await we(e.target.dataset.breadcrumb),t=!0),e.target.classList.contains(`breadcrumb-link`)){let n=e.target.dataset.category1,r=e.target.dataset.category2;await Ce(n,r),t=!0}if(e.target.closest(`#cart-icon-btn`)&&(A.isOpen=!0,t=!0),e.target.closest(`#cart-modal-close-btn`)&&(A.isOpen=!1,t=!0),e.target.closest(`#quantity-decrease`)&&(H(e=>({...e,quantity:e.quantity-1})),t=!0),e.target.closest(`#quantity-increase`)&&(H(e=>({...e,quantity:e.quantity+1})),t=!0),e.target.closest(`.quantity-decrease-btn`)){let n=e.target.closest(`.quantity-decrease-btn`).dataset.productId,r=g(n,`decrease`),i=document.querySelector(`[data-product-id="${n}"].quantity-input`);if(i&&r){let e=r.find(e=>e.productId===n);e&&(i.value=e.quantity)}t=!0}if(e.target.closest(`.quantity-increase-btn`)){let n=e.target.closest(`.quantity-increase-btn`).dataset.productId,r=g(n,`increase`),i=document.querySelector(`[data-product-id="${n}"].quantity-input`);if(i&&r){let e=r.find(e=>e.productId===n);e&&(i.value=e.quantity)}t=!0}if(e.target.closest(`.cart-modal-overlay`)&&!e.target.closest(`[data-modal-content]`)&&(A.isOpen=!1,t=!0),e.target.closest(`.cart-item-remove-btn`)){let n=e.target.closest(`.cart-item-remove-btn`).dataset.productId;te(n),t=!0}if(e.target.closest(`#cart-modal-remove-selected-btn`)&&(ne(),t=!0),e.target.closest(`#cart-modal-clear-cart-btn`)&&(re(),t=!0),e.target.closest(`.product-image`)||e.target.closest(`.product-info`)){let n=e.target.closest(`.product-card`).dataset.productId;W.navigate(`/product/${n}`);let r=W.findRoute(W.getCurrentPath());r.component.onMount&&r.component.onMount(),t=!0}if(e.target.closest(`.related-product-card`)){let n=e.target.closest(`.related-product-card`).dataset.productId;W.navigate(`/product/${n}`);let r=W.findRoute(W.getCurrentPath());r.component.onMount&&r.component.onMount(),t=!0}t&&c()},Q=async e=>{let t=window.location.pathname;if(t!==`/`)return;let n=F();if(J||!n.hasNext)return;let r=e.target.scrollingElement||document.documentElement;if(!r)return;let{scrollTop:i,scrollHeight:a,clientHeight:o}=r;a-i<=o+100&&(J=!0,await Te(),J=!1)},Ee=()=>{q||(document.removeEventListener(`change`,Y),document.removeEventListener(`keydown`,X),document.removeEventListener(`click`,Z),document.removeEventListener(`scroll`,Q),document.addEventListener(`change`,Y),document.addEventListener(`keydown`,X),document.addEventListener(`click`,Z),window.addEventListener(`scroll`,Q),q=!0)},De=()=>r(async()=>{let{worker:e,workerOptions:t}=await import(`./browser-DvH8zzVn.js`);return{worker:e,workerOptions:t}},[]).then(({worker:e,workerOptions:t})=>e.start(t));async function $(){o(),Ee(),W.init($);let e=new URLSearchParams(window.location.search);w(e),e.has(`page`)&&(e.delete(`page`),w(e),W.navigate(`?${e.toString()}`,{replace:!0}));let t=W.getCurrentPath(),n=W.findRoute(t);if(n){let e=W.getRouteParams(n.path,t);T(e),W.navigate(t,{replace:!0}),n.component.onMount&&await n.component.onMount()}else s(G)}De().then($);
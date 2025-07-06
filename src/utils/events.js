import { getProducts } from "../api/productApi";
import { main, mainState, searchParams } from "../main";
import { MainPage } from "../pages/MainPage/MainPage";
import { render } from "./renderer";
import { addToCart } from "./cart";

// 표시 개수 변경 이벤트 핸들러
const handleLimitChange = async (value) => {
  searchParams.set("limit", value);
  searchParams.set("page", "1");
  window.history.pushState({}, "", `?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  mainState.products = data.products;
  mainState.page = data.pagination.page;
  mainState.hasNext = data.pagination.hasNext;

  render(MainPage(mainState));

  resetFormValues();
  // limit은 현재 선택한 값으로 설정
  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) limitSelect.value = value;
};

// 정렬 변경 이벤트 핸들러
const handleSortChange = async (value) => {
  searchParams.set("sort", value);
  searchParams.set("page", "1");
  window.history.pushState({}, "", `?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  mainState.products = data.products;
  mainState.page = data.pagination.page;
  mainState.hasNext = data.pagination.hasNext;

  render(MainPage(mainState));

  resetFormValues();
  // sort는 현재 선택한 값으로 설정
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = value;
};

const handleSearchChange = async (value) => {
  searchParams.set("search", value);
  searchParams.set("page", "1");
  window.history.pushState({}, "", `?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  mainState.products = data.products;
  mainState.page = data.pagination.page;
  mainState.hasNext = data.pagination.hasNext;
  mainState.total = data.pagination.total;

  render(MainPage(mainState));

  resetFormValues();
  // search는 현재 입력한 값으로 설정
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = value;
};

// 렌더링 후 폼 값 재설정 공통 함수
const resetFormValues = () => {
  const limitSelect = document.getElementById("limit-select");
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("search-input");

  if (limitSelect) limitSelect.value = searchParams.get("limit") || "20";
  if (sortSelect) sortSelect.value = searchParams.get("sort") || "price_asc";
  if (searchInput) searchInput.value = searchParams.get("search") || "";
};

// 무한 스크롤 이벤트 핸들러
const handleInfiniteScroll = async () => {
  // 이미 로딩 중이거나 다음 페이지가 없으면 리턴
  if (mainState.isInfiniteLoading || !mainState.hasNext) return;

  mainState.isInfiniteLoading = true;
  render(MainPage(mainState));

  const nextPage = mainState.page + 1;

  searchParams.set("page", nextPage.toString());
  window.history.pushState({}, "", `?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  // 기존 상품들에 새로운 상품들을 추가
  mainState.products = [...mainState.products, ...data.products];
  mainState.page = data.pagination.page;
  mainState.hasNext = data.pagination.hasNext;

  mainState.isInfiniteLoading = false;
  render(MainPage(mainState));
};

let isListenerSet = false;
let isScrolling = false;

export const initEventListeners = () => {
  if (isListenerSet) return;

  document.addEventListener("change", async (e) => {
    if (e.target.id === "limit-select") {
      const value = e.target.value;

      await handleLimitChange(value);
    }

    if (e.target.id === "sort-select") {
      const value = e.target.value;

      await handleSortChange(value);
    }
  });

  // Enter 키를 눌렀을 때 검색 실행
  document.addEventListener("keydown", async (e) => {
    if (e.target.id === "search-input" && e.key === "Enter") {
      const value = e.target.value;

      await handleSearchChange(value);
    }
  });

  // 장바구니 담기 버튼 클릭 이벤트
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = e.target.dataset.productId;
      const product = mainState.products.find((product) => product.productId === productId);

      if (product) {
        addToCart(product);
        mainState.toastType = "success";
        render(MainPage(mainState));
        resetFormValues();
      }
    }

    if (e.target.closest("#toast-close-btn")) {
      mainState.toastType = null;
      render(MainPage(mainState));
      resetFormValues();
    }
  });

  window.addEventListener("scroll", async (e) => {
    // 이미 스크롤 처리 중이거나 다음 페이지가 없으면 리턴
    if (isScrolling || !mainState.hasNext) return;

    // 테스트 환경에서 scrollingElement가 없을 수 있으므로 안전하게 처리
    const scrollingElement = e.target.scrollingElement || document.documentElement;
    if (!scrollingElement) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      isScrolling = true;

      await handleInfiniteScroll();

      isScrolling = false;
    }
  });

  // 테스트용 popstate 이벤트 리스너
  window.addEventListener("popstate", () => {
    main();
  });

  isListenerSet = true;
};

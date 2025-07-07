import { getProducts } from "../api/productApi";
import { main, mainState, searchParams } from "../main";
import { MainPage } from "../pages/MainPage/MainPage";
import { updateWithState } from "./renderer";
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

  updateWithState(MainPage);

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

  updateWithState(MainPage);

  resetFormValues();
  // sort는 현재 선택한 값으로 설정
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = value;
};

// 검색 이벤트 핸들러
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

  updateWithState(MainPage);

  resetFormValues();
  // search는 현재 입력한 값으로 설정
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = value;
};

// 카테고리 이벤트 핸들러
const handleCategoryChange = async (value, depth) => {
  console.log(`[Events] handleCategoryChange called - value: ${value}, depth: ${depth}`);

  if (depth === 1) {
    searchParams.set("category1", value);
    mainState.category1 = value;
    // category1이 변경되면 category2는 리셋
    searchParams.delete("category2");
    mainState.category2 = "";
  } else if (depth === 2) {
    searchParams.set("category2", value);
    mainState.category2 = value;
  } else {
    searchParams.delete("category1");
    searchParams.delete("category2");
    mainState.category1 = "";
    mainState.category2 = "";
  }

  searchParams.set("page", "1");
  window.history.pushState({}, "", `?${searchParams.toString()}`);
  console.log(`[Events] URL updated: ${window.location.search}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  mainState.products = data.products;
  mainState.page = data.pagination.page;
  mainState.hasNext = data.pagination.hasNext;
  mainState.total = data.pagination.total;
  mainState.category1 = data.filters.category1;
  mainState.category2 = data.filters.category2;

  // 새로운 render 시스템 사용
  updateWithState(MainPage);

  resetFormValues();
};

// 브레드크럼 클릭 이벤트 핸들러
const handleBreadcrumbClick = async (type) => {
  console.log(`[Events] handleBreadcrumbClick called - type: ${type}`);

  if (type === "reset") {
    searchParams.delete("category1");
    searchParams.delete("category2");
    mainState.category1 = "";
    mainState.category2 = "";
  } else if (type === "category1") {
    searchParams.delete("category2");
    mainState.category2 = "";
  }

  searchParams.set("page", "1");
  window.history.pushState({}, "", `?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  console.log(`[Events] Breadcrumb API response - total: ${data.pagination.total}, products: ${data.products.length}`);

  mainState.products = data.products;
  mainState.page = data.pagination.page;
  mainState.hasNext = data.pagination.hasNext;
  mainState.total = data.pagination.total;
  mainState.category1 = data.filters.category1;
  mainState.category2 = data.filters.category2;
  // categories는 유지

  console.log(
    `[Events] Breadcrumb updated state - category1: ${mainState.category1}, category2: ${mainState.category2}, total: ${mainState.total}`,
  );

  updateWithState(MainPage);

  resetFormValues();
};

// 무한 스크롤 이벤트 핸들러
const handleInfiniteScroll = async () => {
  // 이미 로딩 중이거나 다음 페이지가 없으면 리턴
  if (mainState.isInfiniteLoading || !mainState.hasNext) return;

  mainState.isInfiniteLoading = true;
  updateWithState(MainPage);

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
  updateWithState(MainPage);
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

let isListenerSet = false;
let isScrolling = false;

// 이벤트 핸들러 함수들을 모듈 레벨에서 정의
const handleChange = async (e) => {
  if (e.target.id === "limit-select") {
    const value = e.target.value;
    await handleLimitChange(value);
  }

  if (e.target.id === "sort-select") {
    const value = e.target.value;
    await handleSortChange(value);
  }
};

const handleKeydown = async (e) => {
  if (e.target.id === "search-input" && e.key === "Enter") {
    const value = e.target.value;
    await handleSearchChange(value);
  }
};

const handleClick = (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.dataset.productId;
    const product = mainState.products.find((product) => product.productId === productId);

    if (product) {
      addToCart(product);
      mainState.toastType = "success";
      updateWithState(MainPage, mainState);
      resetFormValues();
    }
  }

  if (e.target.closest("#toast-close-btn")) {
    mainState.toastType = null;
    updateWithState(MainPage, mainState);
    resetFormValues();
  }

  // 카테고리 버튼 클릭 처리 - 클래스명으로 구분
  if (e.target.classList.contains("category1-filter-btn")) {
    handleCategoryChange(e.target.dataset.category1, 1);
  } else if (e.target.classList.contains("category2-filter-btn")) {
    handleCategoryChange(e.target.dataset.category2, 2);
  }

  if (e.target.dataset.breadcrumb) {
    handleBreadcrumbClick(e.target.dataset.breadcrumb);
  }
};

const handleScroll = async (e) => {
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
};

const handlePopState = () => {
  main();
};

export const initEventListeners = () => {
  if (isListenerSet) return;

  // 기존 이벤트 리스너 제거
  document.removeEventListener("change", handleChange);
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleClick);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("popstate", handlePopState);

  // 새 이벤트 리스너 등록
  document.addEventListener("change", handleChange);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClick);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("popstate", handlePopState);

  isListenerSet = true;
};

import { getProducts } from "../api/productApi";
import { MainPage } from "../pages/MainPage/MainPage";
import { addToCart } from "./cart";
import { update } from "../core/renderer";
import { getMainState, setMainState } from "../pages/MainPage/MainPage";
import { getSearchParams, setSearchParams } from "./store";
import { router } from "../main";

// 표시 개수 변경 이벤트 핸들러
const handleLimitChange = async (value) => {
  const mainState = getMainState();
  const searchParams = getSearchParams();

  // mainState 업데이트
  setMainState({
    ...mainState,
    limit: value,
    page: 1,
  });

  // URL 업데이트
  searchParams.set("limit", value);
  searchParams.set("page", "1");
  setSearchParams(searchParams);
  router.navigate(`?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  setMainState({
    ...mainState,
    products: data.products,
    page: data.pagination.page,
    hasNext: data.pagination.hasNext,
    limit: value,
  });
};

// 정렬 변경 이벤트 핸들러
const handleSortChange = async (value) => {
  const mainState = getMainState();
  const searchParams = getSearchParams();

  // mainState 업데이트
  setMainState({
    ...mainState,
    sort: value,
    page: 1,
  });

  // URL 업데이트
  searchParams.set("sort", value);
  searchParams.set("page", "1");
  setSearchParams(searchParams);
  router.navigate(`?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  setMainState({
    ...mainState,
    products: data.products,
    page: data.pagination.page,
    hasNext: data.pagination.hasNext,
    sort: value,
  });
};

// 검색 이벤트 핸들러
const handleSearchChange = async (value) => {
  const mainState = getMainState();
  const searchParams = getSearchParams();

  // mainState 업데이트
  setMainState({
    ...mainState,
    search: value,
    page: 1,
  });

  // URL 업데이트
  searchParams.set("search", value);
  searchParams.set("page", "1");
  setSearchParams(searchParams);
  router.navigate(`?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  setMainState({
    ...mainState,
    products: data.products,
    page: data.pagination.page,
    hasNext: data.pagination.hasNext,
    total: data.pagination.total,
    search: value,
  });
};

// 카테고리 이벤트 핸들러
const handleCategoryChange = async (value, depth) => {
  const mainState = getMainState();
  const searchParams = getSearchParams();

  if (depth === 1) {
    setMainState({
      ...mainState,
      category1: value,
      category2: "",
      page: 1,
    });
    searchParams.set("category1", value);
    searchParams.delete("category2");
  } else if (depth === 2) {
    setMainState({
      ...mainState,
      category2: value,
      page: 1,
    });
    searchParams.set("category2", value);
  } else {
    setMainState({
      ...mainState,
      category1: "",
      category2: "",
      page: 1,
    });
    searchParams.delete("category1");
    searchParams.delete("category2");
  }

  searchParams.set("page", "1");
  setSearchParams(searchParams);
  router.navigate(`?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  setMainState({
    ...mainState,
    products: data.products,
    page: data.pagination.page,
    hasNext: data.pagination.hasNext,
    total: data.pagination.total,
    category1: data.filters.category1,
    category2: data.filters.category2,
  });
};

// 브레드크럼 클릭 이벤트 핸들러
const handleBreadcrumbClick = async (type) => {
  const mainState = getMainState();
  const searchParams = getSearchParams();

  if (type === "reset") {
    setMainState({
      ...mainState,
      category1: "",
      category2: "",
      page: 1,
    });
    searchParams.delete("category1");
    searchParams.delete("category2");
  } else if (type === "category1") {
    setMainState({
      ...mainState,
      category2: "",
      page: 1,
    });
    searchParams.delete("category2");
  }

  searchParams.set("page", "1");
  setSearchParams(searchParams);
  router.navigate(`?${searchParams.toString()}`);

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  setMainState({
    ...mainState,
    products: data.products,
    page: data.pagination.page,
    hasNext: data.pagination.hasNext,
    total: data.pagination.total,
    category1: data.filters.category1,
    category2: data.filters.category2,
    // categories는 유지
  });
};

// 무한 스크롤 이벤트 핸들러
const handleInfiniteScroll = async () => {
  const mainState = getMainState();
  const searchParams = getSearchParams();

  // 이미 로딩 중이거나 다음 페이지가 없으면 리턴
  if (mainState.isInfiniteLoading || !mainState.hasNext) return;

  // 로딩 상태 시작
  setMainState({
    ...mainState,
    isInfiniteLoading: true,
  });
  update(MainPage);

  const nextPage = mainState.page + 1;

  // URL 업데이트 (무한스크롤은 replaceState 사용)
  searchParams.set("page", nextPage.toString());
  setSearchParams(searchParams);
  router.navigate(`?${searchParams.toString()}`, { replace: true });

  const paramsObject = Object.fromEntries(searchParams);
  const data = await getProducts(paramsObject);

  // 기존 상품들에 새로운 상품들을 추가하고 로딩 상태 종료
  setMainState({
    ...mainState,
    products: [...mainState.products, ...data.products],
    page: data.pagination.page,
    hasNext: data.pagination.hasNext,
    isInfiniteLoading: false,
  });
  update(MainPage);
};

// resetFormValues는 콜백 시스템으로 대체되어 제거됨

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

  // 변경 후 업데이트
  update(MainPage);
};

const handleKeydown = async (e) => {
  if (e.target.id === "search-input" && e.key === "Enter") {
    const value = e.target.value;
    await handleSearchChange(value);
    // 검색 후 업데이트
    update(MainPage);
  }
};

const handleClick = async (e) => {
  let shouldUpdate = false;

  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.dataset.productId;
    const mainState = getMainState();
    const product = mainState.products.find((product) => product.productId === productId);

    if (product) {
      addToCart(product);
      setMainState({
        ...mainState,
        toastType: "success",
      });
      shouldUpdate = true;
    }
  }

  if (e.target.closest("#toast-close-btn")) {
    const mainState = getMainState();
    setMainState({
      ...mainState,
      toastType: null,
    });
    shouldUpdate = true;
  }

  // 카테고리 버튼 클릭 처리 - 클래스명으로 구분
  if (e.target.classList.contains("category1-filter-btn")) {
    await handleCategoryChange(e.target.dataset.category1, 1);
    shouldUpdate = true;
  } else if (e.target.classList.contains("category2-filter-btn")) {
    await handleCategoryChange(e.target.dataset.category2, 2);
    shouldUpdate = true;
  }

  if (e.target.dataset.breadcrumb) {
    await handleBreadcrumbClick(e.target.dataset.breadcrumb);
    shouldUpdate = true;
  }

  // 클릭 이벤트 처리 후 업데이트
  if (shouldUpdate) {
    update(MainPage);
  }
};

const handleScroll = async (e) => {
  const mainState = getMainState();

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

// handlePopState는 router에서 처리하도록 제거

export const initEventListeners = () => {
  if (isListenerSet) return;

  // 기존 이벤트 리스너 제거
  document.removeEventListener("change", handleChange);
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleClick);
  window.removeEventListener("scroll", handleScroll);

  // 새 이벤트 리스너 등록 (popstate는 router에서 처리)
  document.addEventListener("change", handleChange);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClick);
  window.addEventListener("scroll", handleScroll);

  isListenerSet = true;
};

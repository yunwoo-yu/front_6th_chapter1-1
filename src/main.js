import { getCategories, getProducts } from "./api/productApi.js";
import { initRootRenderer, update } from "./core/renderer.js";
import { MainPage } from "./pages/MainPage/MainPage.js";
import { initEventListeners } from "./utils/events.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

export let searchParams = new URLSearchParams(window.location.search);

export let mainState = {
  products: [],
  isLoading: true,
  isInfiniteLoading: false,
  total: 0,
  page: 1,
  hasNext: null,
  categories: {},
  toastType: null,
  category1: "",
  category2: "",
};

// 메인 페이지 초기화 함수
async function initMainPage() {
  // mainState 완전 초기화
  mainState.products = [];
  mainState.isLoading = true;
  mainState.isInfiniteLoading = false;
  mainState.total = 0;
  mainState.page = 1;
  mainState.hasNext = null;
  mainState.categories = {};
  mainState.toastType = null;
  mainState.category1 = "";
  mainState.category2 = "";

  searchParams = new URLSearchParams(window.location.search);

  // 새로고침 시 제거
  if (searchParams.has("page")) {
    searchParams.delete("page");
    window.history.pushState({}, "", `?${searchParams.toString()}`);
  }

  const category1FromUrl = searchParams.get("category1") || "";
  const category2FromUrl = searchParams.get("category2") || "";

  mainState.category1 = category1FromUrl;
  mainState.category2 = category2FromUrl;

  // 초기 렌더링
  update(MainPage);

  const [productsData, categoriesData] = await Promise.all([
    getProducts(Object.fromEntries(searchParams)),
    getCategories(),
  ]);

  mainState.products = productsData.products;
  mainState.total = productsData.pagination.total;
  mainState.categories = categoriesData;
  mainState.isLoading = false;
  mainState.hasNext = productsData.pagination.hasNext;
  mainState.page = productsData.pagination.page;
  mainState.category1 = productsData.filters.category1;
  mainState.category2 = productsData.filters.category2;

  // 다시 렌더링
  update(MainPage);

  // 메인 렌더링 이후 변경해줘야할 부분들
  const limitSelect = document.getElementById("limit-select");
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("search-input");

  if (limitSelect) limitSelect.value = searchParams.get("limit") || "20";
  if (sortSelect) sortSelect.value = searchParams.get("sort") || "price_asc";
  if (searchInput) searchInput.value = searchParams.get("search") || "";
}

let isMainRunning = false;

export async function main() {
  if (isMainRunning) {
    return;
  }
  isMainRunning = true;

  initRootRenderer();
  initEventListeners();
  await initMainPage();

  isMainRunning = false;
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

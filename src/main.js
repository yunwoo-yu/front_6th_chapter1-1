import { getCategories, getProducts } from "./api/productApi.js";
import { MainPage } from "./pages/MainPage/MainPage.js";
import { initEventListeners } from "./utils/events.js";
import { updateWithState } from "./utils/renderer.js";

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

let isMainRunning = false;

export async function main() {
  if (isMainRunning) {
    return;
  }

  isMainRunning = true;

  initEventListeners();

  searchParams = new URLSearchParams(window.location.search);

  const category1FromUrl = searchParams.get("category1") || "";
  const category2FromUrl = searchParams.get("category2") || "";

  mainState = {
    products: [],
    isLoading: true,
    isInfiniteLoading: false,
    total: 0,
    page: 1,
    hasNext: null,
    categories: {},
    toastType: null,
    category1: category1FromUrl,
    category2: category2FromUrl,
  };

  // 새로고침 시 제거
  if (searchParams.has("page")) {
    searchParams.delete("page");
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  }

  // 새로운 render 시스템 사용
  updateWithState(MainPage);

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

  // 새로운 render 시스템 사용
  updateWithState(MainPage);

  // 메인 렌더링 이후 변경해줘야할 부분들
  const limitSelect = document.getElementById("limit-select");
  const sortSelect = document.getElementById("sort-select");
  const searchInput = document.getElementById("search-input");

  limitSelect.value = searchParams.get("limit") || "20";
  sortSelect.value = searchParams.get("sort") || "price_asc";
  searchInput.value = searchParams.get("search") || "";

  isMainRunning = false;
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

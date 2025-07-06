import { getCategories, getProducts } from "./api/productApi.js";
import { MainPage } from "./pages/MainPage/MainPage.js";
import { initEventListeners } from "./utils/events.js";
import { render } from "./utils/renderer.js";

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
};

export async function main() {
  initEventListeners();
  searchParams = new URLSearchParams(window.location.search);

  // 새로고침 시 page 파라미터만 제거
  if (searchParams.has("page")) {
    searchParams.delete("page");
    window.history.replaceState({}, "", `?${searchParams.toString()}`);
  }

  mainState.products = [];
  mainState.isLoading = true;
  mainState.isInfiniteLoading = false;
  mainState.total = 0;
  mainState.page = 1;
  mainState.categories = {};

  render(MainPage(mainState));

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

  render(MainPage(mainState));

  // 메인 렌더링 이후 변경해줘야할 부분들

  const limitSelect = document.getElementById("limit-select");
  const sortSelect = document.getElementById("sort-select");

  limitSelect.value = searchParams.get("limit") || "20";
  sortSelect.value = searchParams.get("sort") || "price_asc";
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

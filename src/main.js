import { getCategories, getProducts } from "./api/productApi.js";
import { initRootRenderer, update } from "./core/renderer.js";
import { createRouter } from "./core/router.js";
import { MainPage } from "./pages/MainPage/MainPage.js";
import { initEventListeners } from "./utils/events.js";
import { setMainState } from "./pages/MainPage/MainPage.js";
import { setSearchParams } from "./utils/store.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

// 메인 페이지 초기화 함수
async function initMainPage() {
  const searchParams = new URLSearchParams(window.location.search);
  setSearchParams(searchParams);

  // 새로고침 시 page 파라미터 제거 (replaceState 사용)
  if (searchParams.has("page")) {
    searchParams.delete("page");
    setSearchParams(searchParams);
    router.navigate(`?${searchParams.toString()}`, { replace: true });
  }

  // URL에서 폼 값들 가져오기
  const category1FromUrl = searchParams.get("category1") || "";
  const category2FromUrl = searchParams.get("category2") || "";
  const limitFromUrl = searchParams.get("limit") || "20";
  const sortFromUrl = searchParams.get("sort") || "price_asc";
  const searchFromUrl = searchParams.get("search") || "";

  // mainState 완전 초기화
  setMainState({
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
    limit: limitFromUrl,
    sort: sortFromUrl,
    search: searchFromUrl,
  });

  // 초기 렌더링
  update(MainPage);

  const [productsData, categoriesData] = await Promise.all([
    getProducts(Object.fromEntries(searchParams)),
    getCategories(),
  ]);

  // API 응답 데이터로 store 업데이트
  setMainState((prevState) => ({
    ...prevState,
    products: productsData.products,
    total: productsData.pagination.total,
    categories: categoriesData,
    isLoading: false,
    hasNext: productsData.pagination.hasNext,
    page: productsData.pagination.page,
    category1: productsData.filters.category1,
    category2: productsData.filters.category2,
  }));

  // 최종 렌더링
  update(MainPage);
}

let isMainRunning = false;

// 라우트 정의
const routes = [
  {
    path: "/",
    component: MainPage,
  },
  // 상세페이지 라우트도 나중에 추가할 수 있음
  // {
  //   path: "/product/:id",
  //   component: ProductDetailPage,
  // },
];

export const router = createRouter(routes);

export async function main() {
  if (isMainRunning) {
    return;
  }
  isMainRunning = true;

  initRootRenderer();
  initEventListeners();
  router.init(main);
  await initMainPage();

  isMainRunning = false;
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

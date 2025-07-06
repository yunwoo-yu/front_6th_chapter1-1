import { getCategories, getProducts } from "./api/productApi.js";
import { MainPage } from "./pages/MainPage/MainPage.js";
import { render } from "./utils/renderer.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

const mainState = {
  products: [],
  isLoading: true, // ✅ 초기값 true로 변경
  total: 0,
  categories: {}, // ✅ 초기값 추가
};

async function main() {
  // 초기 로딩 상태 렌더링
  render(MainPage(mainState));

  const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()]);

  // 데이터 로딩 완료 후 상태 업데이트
  mainState.products = productsData.products;
  mainState.total = productsData.pagination.total;
  mainState.categories = categoriesData;
  mainState.isLoading = false;

  // 최종 렌더링
  render(MainPage(mainState));
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

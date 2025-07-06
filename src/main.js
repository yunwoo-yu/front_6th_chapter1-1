import { getCategories, getProducts } from "./api/productApi.js";
import { MainPage } from "./pages/MainPage/MainPage.js";

import { render } from "./utils/renderer.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

export const searchParams = new URLSearchParams();

export const mainState = {
  products: [],
  isLoading: true,
  total: 0,
  categories: {},
};

// const setUpEventListeners = () => {
//   document.addEventListener("change", (e) => {
//     if (e.target.id === "limit-select") {
//       const limit = searchParams.get("limit");

//       if (!limit) {
//         searchParams.append("limit", e.target.value);
//       } else {
//         searchParams.set("limit", e.target.value);
//       }

//       window.history.pushState({}, "", `?${searchParams.toString()}`);
//     }
//   });
// };

async function main() {
  render(MainPage(mainState));
  // setUpEventListeners();

  const [productsData, categoriesData] = await Promise.all([getProducts(searchParams), getCategories()]);

  mainState.products = productsData.products;
  mainState.total = productsData.pagination.total;
  mainState.categories = categoriesData;
  mainState.isLoading = false;

  render(MainPage(mainState));
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

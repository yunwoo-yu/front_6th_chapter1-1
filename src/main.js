import { initRootRenderer } from "./core/renderer.js";
import { createRouter } from "./core/router.js";
import { MainPage } from "./pages/MainPage/MainPage.js";
import { initEventListeners } from "./utils/events.js";
import { setSearchParams } from "./utils/store.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

let isMainRunning = false;

// 라우트 정의
const routes = [
  {
    path: "/",
    component: MainPage,
  },
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

  // 공통 초기화
  initRootRenderer();
  initEventListeners();
  router.init(main);

  // page 파라미터 정리
  const searchParams = new URLSearchParams(window.location.search);
  setSearchParams(searchParams);

  if (searchParams.has("page")) {
    searchParams.delete("page");
    setSearchParams(searchParams);
    await router.navigate(`?${searchParams.toString()}`, { replace: true });
  }

  const currentPath = router.getCurrentPath();
  const route = router.findRoute(currentPath);

  if (route && route.component.onMount) {
    // onMount에서 렌더링까지 처리하도록 위임
    await route.component.onMount();
  }

  isMainRunning = false;
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

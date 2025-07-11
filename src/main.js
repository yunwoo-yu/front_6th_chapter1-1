import { initRootRenderer } from "./core/renderer.js";
import { router } from "./core/router.js";
import { initEventListeners } from "./utils/events.js";
import { createState, setRouteParams, setSearchParams } from "./utils/store.js";

const CART = "CART";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker, workerOptions }) => worker.start(workerOptions));

let isMainRunning = false;

export const [getCartState, setCartState] = createState(CART, {
  isOpen: false,
});

// popstate 이벤트 처리 함수
const handlePopState = async () => {
  const currentPath = router.getCurrentPath();
  const route = router.findRoute(currentPath);

  if (route) {
    // 라우트 파라미터를 store에 저장
    const params = router.getRouteParams(route.path, currentPath);
    setRouteParams(params);

    // 컴포넌트 렌더링 및 onMount 호출
    await router.navigate(currentPath, { replace: true, isPopState: true });
  } else {
    // 라우트가 없을 때 NotFoundPage 렌더링
    await router.navigate(currentPath, { replace: true, isPopState: true });
  }
};

export async function main() {
  if (isMainRunning) {
    return;
  }
  isMainRunning = true;

  // 공통 초기화
  initRootRenderer();
  initEventListeners();
  router.init(handlePopState);

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

  if (route) {
    // 라우트 파라미터를 store에 저장
    const params = router.getRouteParams(route.path, currentPath);
    setRouteParams(params);

    // 컴포넌트 렌더링 및 onMount 호출
    await router.navigate(currentPath, { replace: true });
  } else {
    // 라우트가 없을 때 NotFoundPage 렌더링
    await router.navigate(currentPath, { replace: true });
  }

  isMainRunning = false;
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

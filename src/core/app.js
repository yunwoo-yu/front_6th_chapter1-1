import { detailActions, detailStore } from "../stores/detailStore.js";
import { globalActions, globalStore } from "../stores/globalStore.js";
import { mainActions, mainStore } from "../stores/mainStore.js";
import { createRenderer } from "./renderer.js";
import { navigate, router } from "./router.js";

export const createApp = () => {
  const renderer = createRenderer("root");

  const stores = {
    global: globalStore,
    main: mainStore,
    detail: detailStore,
  };

  const actions = {
    global: globalActions,
    main: mainActions,
    detail: detailActions,
  };

  // 렌더링 함수
  const renderApp = () => {
    const globalState = globalStore.getState();
    const mainState = mainStore.getState();
    const detailState = detailStore.getState();
    const { component, params } = router.getCurrentRoute();

    const combinedState = {
      ...globalState,
      main: mainState,
      detail: detailState,
      params: params || {},
    };

    if (component) {
      renderer.render(component, combinedState);
    } else {
      renderer.render(() => "<div>페이지를 찾을 수 없습니다.</div>");
    }
  };

  // 🔥 상태 변경 구독 - 렌더링만 담당
  const unsubscribeGlobal = globalStore.subscribe(() => renderApp());
  const unsubscribeMain = mainStore.subscribe(() => renderApp());
  const unsubscribeDetail = detailStore.subscribe(() => renderApp());

  // 🔥 라우트 변경 구독 - 상태 업데이트만
  const unsubscribeRouter = router.subscribe(({ path, params }) => {
    console.log("라우트 변경:", path, "파라미터:", params);
    globalActions.updateCurrentPath(path);
    globalActions.updateCurrentParams(params || {});
  });

  const init = () => {
    // 🔥 페이지 파라미터 정리 (새로고침 시 page=1로)
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("page") && searchParams.get("page") !== "1") {
      searchParams.delete("page");
      navigate(`?${searchParams.toString()}`);
      return;
    }

    router.init();
    renderApp();

    if (typeof window !== "undefined") {
      window.app = { stores, actions, renderApp };
    }
  };

  const destroy = () => {
    unsubscribeGlobal();
    unsubscribeMain();
    unsubscribeDetail();
    unsubscribeRouter();
    if (typeof window !== "undefined") {
      delete window.app;
    }
  };

  return {
    init,
    destroy,
    stores,
    actions,
    router,
    renderer,
    renderApp,
  };
};

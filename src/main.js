import { createApp } from "./core/app.js";
import { MainPage, setupMainPageEvent } from "./pages/MainPage/MainPage.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

const main = () => {
  console.log("애플리케이션 시작");

  const startApp = () => {
    const app = createApp();

    // 라우트 등록
    app.router.register("/", MainPage);
    // app.router.register("/product/:id", ProductDetailPage);
    setupMainPageEvent();
    // 애플리케이션 시작
    app.init();

    return app;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApp);
  } else {
    startApp();
  }
};

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}

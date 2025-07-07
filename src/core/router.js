import { update } from "./renderer";

export const createRouter = (routes) => {
  let currentRoute = null;

  const findRoute = (path) => {
    // 쿼리 파라미터 제거하고 pathname만으로 라우트 찾기
    const pathname = path.split("?")[0];
    return routes.find((route) => route.path === pathname);
  };

  // 현재 경로 가져오기
  const getCurrentPath = () => {
    return window.location.pathname + window.location.search;
  };

  // 페이지 이동
  const navigate = (path, options = {}) => {
    let fullPath = path;

    // 쿼리 파라미터만 전달된 경우 (예: "?limit=20&page=1")
    if (path.startsWith("?")) {
      fullPath = window.location.pathname + path;
    }

    const route = findRoute(fullPath);

    if (route) {
      // URL 변경 - replace 옵션에 따라 pushState vs replaceState 선택
      if (options.replace) {
        window.history.replaceState({}, "", fullPath);
      } else {
        window.history.pushState({}, "", fullPath);
      }
      currentRoute = route;

      // 컴포넌트 렌더링
      update(route.component);
    } else {
      console.error("Route not found:", fullPath);
    }
  };

  // 초기화
  const init = (onPopState) => {
    // popstate 이벤트 리스너 등록
    window.addEventListener("popstate", () => {
      if (onPopState) {
        onPopState();
      } else {
        // 기본 라우터 동작 testcode popState 이벤트 고려
        const fullPath = getCurrentPath();
        navigate(fullPath);
      }
    });
  };

  return {
    init,
    navigate,
    findRoute,
    getCurrentPath,
    currentRoute,
  };
};

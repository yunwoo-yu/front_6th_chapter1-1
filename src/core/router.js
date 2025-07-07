import { update } from "./renderer";

export const createRouter = (routes) => {
  let currentRoute = null;

  const findRoute = (path) => {
    return routes.find((route) => route.path === path);
  };

  // 현재 경로 가져오기
  const getCurrentPath = () => {
    return window.location.pathname + window.location.search;
  };

  // 페이지 이동
  const navigate = (path) => {
    const route = findRoute(path);

    if (route) {
      // URL 변경
      window.history.pushState({}, "", path);
      currentRoute = route;

      // 컴포넌트 렌더링
      update(route.component);
    } else {
      console.error("Route not found:", path);
    }
  };

  // 초기화
  const init = () => {
    // popstate 이벤트 리스너 등록
    window.addEventListener("popstate", () => {
      const fullPath = getCurrentPath();

      navigate(fullPath);
    });

    // 초기 라우트 렌더링
    const initialPath = getCurrentPath();

    navigate(initialPath);
  };

  return {
    init,
    navigate,
    findRoute,
    getCurrentPath,
    currentRoute,
  };
};

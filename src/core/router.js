import { MainPage } from "../pages/MainPage/MainPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ProductDetailPage } from "../pages/ProductDetailPage/ProductDetailPage";
import { setRouteParams } from "../utils/store";
import { update } from "./renderer";

export const createRouter = (routes) => {
  let currentRoute = null;

  const findRoute = (path) => {
    // 쿼리 파라미터 제거하고 pathname만으로 라우트 찾기
    const pathname = path.split("?")[0];

    return routes.find((route) => {
      // 정확히 일치하는 라우트 먼저 확인
      if (route.path === pathname) {
        return true;
      }

      // 동적 라우트 확인 (예: /product/:id)
      const routeParts = route.path.split("/");
      const pathParts = pathname.split("/");

      if (routeParts.length !== pathParts.length) {
        return false;
      }

      return routeParts.every((part, index) => {
        return part.startsWith(":") || part === pathParts[index];
      });
    });
  };

  // 라우트 파라미터 추출
  const getRouteParams = (routePath, currentPath) => {
    const routeParts = routePath.split("/");
    const pathParts = currentPath.split("?")[0].split("/");
    const params = {};

    routeParts.forEach((part, index) => {
      if (part.startsWith(":")) {
        const paramName = part.slice(1); // ':' 제거
        params[paramName] = pathParts[index];
      }
    });

    return params;
  };

  // 현재 경로 가져오기
  const getCurrentPath = () => {
    const fullPath = window.location.pathname + window.location.search;
    // PROD 환경에서 BASE_PATH 제거
    if (import.meta.env.PROD && fullPath.startsWith("/front_6th_chapter1-1")) {
      return fullPath.slice("/front_6th_chapter1-1".length) || "/";
    }
    return fullPath;
  };

  // 페이지 이동 및 렌더링
  const navigate = async (path, options = {}) => {
    let fullPath = path;

    // 쿼리 파라미터만 전달된 경우 (예: "?limit=20&page=1")
    if (path.startsWith("?")) {
      fullPath = window.location.pathname + path;
    }

    // PROD 환경에서 BASE_PATH 추가
    if (import.meta.env.PROD && !fullPath.startsWith("/front_6th_chapter1-1")) {
      fullPath = "/front_6th_chapter1-1" + fullPath;
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

      // 라우트 파라미터 store 업데이트
      const params = getRouteParams(route.path, fullPath);
      setRouteParams(params);

      // 컴포넌트 렌더링
      update(route.component);

      // onMount 호출 (isPopState가 true가 아닐 때만 호출)
      if (route.component.onMount && !options.isPopState) {
        await route.component.onMount();
      }
    } else {
      // 라우트가 없을 때 NotFoundPage 렌더링
      if (options.replace) {
        window.history.replaceState({}, "", fullPath);
      } else {
        window.history.pushState({}, "", fullPath);
      }

      update(NotFoundPage);
    }
  };

  // popstate 이벤트 처리
  const handlePopState = async () => {
    const fullPath = getCurrentPath();
    const route = findRoute(fullPath);

    if (route) {
      // 라우트 파라미터 store 업데이트
      const params = getRouteParams(route.path, fullPath);
      setRouteParams(params);

      // 컴포넌트 렌더링
      update(route.component);

      // onMount 호출 (popstate 이벤트에서도 호출)
      if (route.component.onMount) {
        await route.component.onMount();
      }
    } else {
      // 라우트가 없을 때 NotFoundPage 렌더링
      update(NotFoundPage);
    }
  };

  // 초기화
  const init = (onPopState) => {
    // popstate 이벤트 리스너 등록
    window.addEventListener("popstate", async () => {
      if (onPopState) {
        // onPopState 콜백이 있으면 그것을 사용
        await onPopState();
      } else {
        // 기본 popstate 처리
        await handlePopState();
      }
    });
  };

  return {
    init,
    navigate,
    findRoute,
    getCurrentPath,
    getRouteParams,
    currentRoute,
  };
};

const routesConfig = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/product/:id",
    component: ProductDetailPage,
  },
];

export const router = createRouter(routesConfig);

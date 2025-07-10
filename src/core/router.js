import { createObservable } from "./observer.js";

/**
 * 경로 패턴을 정규식으로 변환하는 함수
 * @param {string} pattern - 라우트 패턴 (예: '/product/:id')
 * @returns {Object} 정규식과 파라미터 키 배열
 */
const createRoutePattern = (pattern) => {
  const paramNames = [];
  const regexPattern = pattern.replace(/:([^/]+)/g, (match, paramName) => {
    paramNames.push(paramName);
    return "([^/]+)";
  });

  return {
    regex: new RegExp(`^${regexPattern}$`),
    paramNames,
  };
};

/**
 * 경로에서 파라미터를 추출하는 함수
 * @param {string} pathname - 현재 경로 (쿼리스트링 제외)
 * @param {Object} route - 라우트 정보
 * @returns {Object|null} 파라미터 객체 또는 null
 */
const extractParams = (pathname, route) => {
  const match = pathname.match(route.pattern.regex);
  if (!match) return null;

  const params = {};
  route.pattern.paramNames.forEach((paramName, index) => {
    params[paramName] = match[index + 1];
  });

  return params;
};

/**
 * 매칭되는 라우트 찾기
 * @param {string} fullPath - 전체 경로 (쿼리스트링 포함)
 * @returns {Object|null} 매칭 결과
 */
const findMatchingRoute = (fullPath, routes) => {
  // 🔥 핵심: 쿼리스트링 분리
  const url = new URL(fullPath, "http://localhost");
  const pathname = url.pathname; // 쿼리스트링 제외한 경로만

  // pathname으로 라우트 매칭
  for (const route of routes) {
    const params = extractParams(pathname, route);
    if (params !== null) {
      return { route, params };
    }
  }

  return null;
};

/**
 * SPA 라우터 생성 함수 (다이나믹 라우트 + 쿼리스트링 지원)
 * @returns {Object} register, navigate, getCurrentRoute, subscribe, init 메서드를 가진 객체
 */
export const createRouter = () => {
  const routes = [];
  const observable = createObservable();

  const register = (pattern, component) => {
    const routePattern = createRoutePattern(pattern);
    routes.push({
      pattern: routePattern,
      originalPattern: pattern,
      component,
    });
  };

  /**
   * 경로 이동
   * @param {string} path - 이동할 경로
   */
  const navigate = (path) => {
    const matchResult = findMatchingRoute(path, routes);

    if (matchResult) {
      history.pushState(null, null, path);
      observable.notify({
        path,
        component: matchResult.route.component,
        params: matchResult.params,
      });
    } else {
      console.warn(`라우트를 찾을 수 없습니다: ${path}`);
    }
  };

  const getCurrentRoute = () => {
    const fullPath = window.location.pathname + window.location.search;
    const matchResult = findMatchingRoute(fullPath, routes);

    if (matchResult) {
      return {
        path: fullPath,
        component: matchResult.route.component,
        params: matchResult.params,
      };
    }

    // 기본 라우트 찾기
    const defaultRoute = routes.find((route) => route.originalPattern === "/");
    return {
      path: "/",
      component: defaultRoute?.component,
      params: {},
    };
  };

  const subscribe = (listener) => {
    return observable.subscribe(listener);
  };

  const handlePopState = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const { path, component, params } = getCurrentRoute();

    console.log("popstate 이벤트 감지:", searchParams.toString());
    observable.notify({ path, component, params });
  };

  // 브라우저 뒤로가기/앞으로가기 처리
  const init = () => {
    // 🔥 테스트에서 dispatchEvent로 트리거되는 popstate 이벤트 처리
    window.addEventListener("popstate", handlePopState);

    // 초기 라우트도 처리
    const { path, component, params } = getCurrentRoute();
    observable.notify({ path, component, params });
  };

  return { register, navigate, getCurrentRoute, subscribe, init };
};

export const router = createRouter();

export const navigate = (to) => {
  router.navigate(to);
};

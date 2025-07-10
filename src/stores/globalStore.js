import { createStore } from "../core/store.js";

/**
 * 전역 상태 초기값
 */
const initialGlobalState = {
  currentPath: "/",
  currentParams: {},
  user: {
    name: "김개발",
    email: "kim@example.com",
    joinDate: "2024-01-15",
    posts: 42,
  },
  isLoading: false,
  error: null,
};

/**
 * 전역 스토어 생성
 */
export const globalStore = createStore(initialGlobalState);

/**
 * 전역 액션들
 */
export const globalActions = {
  // 현재 경로 업데이트
  updateCurrentPath: (path) => {
    globalStore.setState({ currentPath: path });
  },

  // 현재 파라미터 업데이트
  updateCurrentParams: (params) => {
    globalStore.setState({ currentParams: params });
  },

  // 사용자 정보 업데이트
  updateUser: (userData) => {
    const { user } = globalStore.getState();
    globalStore.setState({ user: { ...user, ...userData } });
  },

  // 로딩 상태 설정
  setLoading: (isLoading) => {
    globalStore.setState({ isLoading });
  },

  // 에러 상태 설정
  setError: (error) => {
    globalStore.setState({ error });
  },

  // 에러 초기화
  clearError: () => {
    globalStore.setState({ error: null });
  },
};

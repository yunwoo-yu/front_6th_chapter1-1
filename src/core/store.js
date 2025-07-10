import { createObservable } from "./observer.js";

/**
 * 상태 관리 스토어 생성 함수
 * @param {Object} initialState - 초기 상태
 * @returns {Object} getState, setState, subscribe 메서드를 가진 객체
 */
export const createStore = (initialState = {}) => {
  let state = { ...initialState };
  const observable = createObservable();

  const getState = () => ({ ...state });

  const setState = (newState) => {
    const prevState = { ...state };
    state = { ...state, ...newState };
    observable.notify({ prevState, currentState: { ...state } });
  };

  const subscribe = (listener) => {
    return observable.subscribe(listener);
  };

  return { getState, setState, subscribe };
};

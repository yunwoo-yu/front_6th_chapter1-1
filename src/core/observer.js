/**
 * 옵저버 패턴을 구현한 Observable 생성 함수
 * @returns {Object} subscribe, notify 메서드를 가진 객체
 */
export const createObservable = () => {
  let observers = [];

  const subscribe = (fn) => {
    observers.push(fn);
    // 구독 해제 함수 반환
    return () => {
      observers = observers.filter((observer) => observer !== fn);
    };
  };

  const notify = (data) => {
    observers.forEach((observer) => observer(data));
  };

  return { subscribe, notify };
};

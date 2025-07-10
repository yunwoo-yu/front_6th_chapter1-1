/**
 * 렌더링 시스템 생성 함수
 * @param {string} containerId - 렌더링할 컨테이너 ID
 * @returns {Object} render, createElement 메서드를 가진 객체
 */
export const createRenderer = (containerId) => {
  const container = document.getElementById(containerId);

  const render = (component, props = {}) => {
    if (!container) return;

    if (typeof component === "function") {
      container.innerHTML = component(props);
    } else {
      container.innerHTML = component;
    }
  };

  const createElement = (tag, attrs = {}, children = []) => {
    const element = document.createElement(tag);

    Object.keys(attrs).forEach((key) => {
      if (key.startsWith("on")) {
        const eventName = key.slice(2).toLowerCase();
        element.addEventListener(eventName, attrs[key]);
      } else {
        element.setAttribute(key, attrs[key]);
      }
    });

    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  };

  return { render, createElement };
};

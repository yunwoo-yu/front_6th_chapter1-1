export const render = (component) => {
  const root = document.getElementById("root");

  if (!root) {
    console.error("Root element not found");
    return;
  }

  root.innerHTML = component;
  root.offsetHeight;
};

// 상태 기반 업데이트 함수
export const updateWithState = (PageComponent) => {
  const component = PageComponent();
  render(component);
};

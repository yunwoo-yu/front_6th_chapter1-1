let root = null;

export const initRootRenderer = (id = "root") => {
  root = document.getElementById(id);

  if (!root) {
    console.log("Root element not found");
  }
};

export const update = (component, onAfterRender) => {
  if (!root) {
    console.error("Root element not found");
    return;
  }

  const targetComponent = component();

  root.innerHTML = targetComponent;
  root.offsetHeight; // DOM 강제 리플로우

  // 렌더링 완료 후 콜백 실행
  if (onAfterRender) {
    onAfterRender();
  }
};

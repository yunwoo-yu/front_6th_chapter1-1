let root = null;

export const initRootRenderer = (id = "root") => {
  root = document.getElementById(id);

  if (!root) {
    console.log("Root element not found");
  }
};

export const update = (component) => {
  if (!root) {
    console.error("Root element not found");
    return;
  }

  const targetComponent = component();

  root.innerHTML = targetComponent;
  root.offsetHeight;
};

export const rootClear = () => {
  if (root) {
    root.innerHTML = "";
  }
};

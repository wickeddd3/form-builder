import "@testing-library/jest-dom";

// mock ResizeObserver on all unit tests
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

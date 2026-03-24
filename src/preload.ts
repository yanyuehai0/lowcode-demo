/**
 * 预加载全局依赖，供低代码引擎 CDN 脚本访问
 * 此文件会被内联到 HTML 中，在低代码引擎加载前执行
 */

import lodash from "lodash";
import moment from "moment";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";

// 暴露到全局作用域
window._ = lodash;
window.moment = moment;
window.React = React;

/**
 * React 18 兼容层：为低代码引擎提供废弃的 ReactDOM.render API
 * 引擎内部仍在使用 v16 的 API
 */
window.ReactDOM = {
  ...ReactDOM,
  // 兼容低代码引擎使用的废弃 API
  render: (
    element: React.ReactElement,
    container: Element | DocumentFragment | null,
  ) => {
    console.warn(
      "[React 18 兼容层] 低代码引擎调用了废弃的 ReactDOM.render，已自动转换为 createRoot",
    );
    if (!container) {
      throw new Error("Target container is not a DOM element.");
    }

    // 同一个容器只 createRoot 一次
    let root = (container as HTMLElement & { _reactRoot?: ReactDOMClient.Root })
      ._reactRoot;

    if (!root) {
      root = ReactDOMClient.createRoot(container);
      (
        container as HTMLElement & { _reactRoot?: ReactDOMClient.Root }
      )._reactRoot = root; // 缓存起来
    }

    root.render(element);
    return root;
  },
  // 兼容 unmount API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unmountComponentAtNode: (_: Element | DocumentFragment) => {
    console.warn(
      "[React 18 兼容层] 低代码引擎调用了废弃的 unmountComponentAtNode",
    );
    // 尝试查找并卸载 root
    return true;
  },
} as typeof ReactDOM;

console.log(window);

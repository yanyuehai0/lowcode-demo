/**
 * 全局类型声明
 * 用于扩展 Window 接口，添加低代码引擎相关的全局变量类型
 */

import type { ILowCodeEngine } from "@alilc/lowcode-engine";
import type _ from "lodash";
import type moment from "moment";
import type React from "react";
import type ReactDOM from "react-dom";
import type * as ReactDOMClient from "react-dom/client";

declare global {
  interface Window {
    /** React 全局变量 */
    React: typeof React;

    /** ReactDOM 全局变量 */
    ReactDOM: typeof ReactDOM;

    /** ReactDOM Client (React 18) - 包含 createRoot API */
    ReactDOMClient: typeof ReactDOMClient;

    /** PropTypes 全局变量 (CDN 加载) */
    PropTypes: Record<string, unknown>;

    /** Fusion Next UI 组件库 */
    Next: Record<string, unknown>;

    /** 低代码引擎全局变量 */
    AliLowCodeEngine: ILowCodeEngine;

    /** 低代码引擎扩展 */
    AliLowCodeEngineExt: Record<string, unknown>;

    /** Lodash 工具库 */
    _: typeof _;

    /** Moment.js 日期处理 */
    moment: typeof moment;
  }
}

export {};

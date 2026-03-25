import nextJsUrl from '@/lib/alifd-next/next.min.js?url';
import engineExtCssUrl from '@/lib/lowcode-engine-ext/engine-ext.css?url';
import engineExtJsUrl from '@/lib/lowcode-engine-ext/engine-ext.js?url';
import engineCoreCssUrl from '@/lib/lowcode-engine/engine-core.css?url';
import engineCoreJsUrl from '@/lib/lowcode-engine/engine-core.js?url';
import propTypesUrl from '@/lib/prop-types/prop-types.js?url';
import nextThemeCssUrl from '@/lib/theme-lowcode-light/next.var.min.css?url';
import lodash from 'lodash';
import moment from 'moment';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { renderPortal, unmountPortal } from './portalStore';

const styleUrls = [nextThemeCssUrl, engineCoreCssUrl, engineExtCssUrl];
const scriptUrls = [propTypesUrl, nextJsUrl, engineCoreJsUrl, engineExtJsUrl];

let loadedPromise: Promise<void> | null = null;

function setupGlobals() {
    // 低代码引擎 资源依赖这些全局变量，首次进入低代码页时再挂到 window 上。
    if (window.ReactDOMClient) {
        return;
    }

    window._ = lodash;
    window.moment = moment;
    window.React = React;
    window.ReactDOMClient = ReactDOMClient;
    window.ReactDOM = {
        ...ReactDOM,
        // 兼容低代码引擎中React16的 render API。
        render: (element: React.ReactElement, container: Element | DocumentFragment | null) => {
            console.warn('[React 18 兼容层] 低代码引擎调用了废弃的 ReactDOM.render，已自动转换为 renderPortal');

            if (!container) {
                throw new Error('Target container is not a DOM element.');
            }

            renderPortal(element, container);
        },

        // 兼容低代码引擎中React16的 unmountComponentAtNode API。
        unmountComponentAtNode: (container: Element | DocumentFragment) => {
            console.warn('[React 18 兼容层] 低代码引擎调用了废弃的 unmountComponentAtNode，已自动转换为 unmountPortal');

            unmountPortal(container);
        },
    } as typeof ReactDOM;
}

function loadStyle(href: string) {
    return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`link[href="${href}"]`) as HTMLLinkElement | null;
        if (existing) {
            resolve();
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
        document.head.appendChild(link);
    });
}

function loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
        if (existing) {
            // 同一份资源只注入一次，重复进入页面时直接复用。
            if (existing.dataset.loaded === 'true') {
                resolve();
                return;
            }

            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(new Error(`Failed to load script: ${src}`)), {
                once: true,
            });
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => {
            script.dataset.loaded = 'true';
            resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

export function loadLowcodeAssets() {
    if (window.AliLowCodeEngine) {
        return Promise.resolve();
    }

    if (loadedPromise) {
        return loadedPromise;
    }

    loadedPromise = (async () => {
        setupGlobals();

        // 样式先于脚本加载，避免引擎初始化时出现明显闪动。
        for (const href of styleUrls) {
            await loadStyle(href);
        }

        // 脚本按依赖顺序串行加载，后面的 UMD 会读取前面挂好的全局变量。
        for (const src of scriptUrls) {
            await loadScript(src);
        }
    })().catch((error) => {
        loadedPromise = null;
        throw error;
    });

    return loadedPromise;
}

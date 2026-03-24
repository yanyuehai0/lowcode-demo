# Lowcode Engine API 全文整理

来源：[https://lowcode-engine.cn/site/docs/api/](https://lowcode-engine.cn/site/docs/api/)

说明：按官方侧边栏目录顺序抓取正文全文，并按 Markdown 结构重新排版。

## 目录

- [API 总览](#api-总览)
- [init - 初始化 API](#init---初始化-api)
- [plugins - 插件 API](#plugins---插件-api)
- [config - 配置 API](#config---配置-api)
- [config options - 配置列表](#config-options---配置列表)
- [canvas - 画布 API](#canvas---画布-api)
- [command - 指令 API](#command---指令-api)
- [common - 通用 API](#common---通用-api)
- [commonUI - UI 组件库](#commonui---ui-组件库)
- [event - 事件 API](#event---事件-api)
- [hotkey - 快捷键 API](#hotkey---快捷键-api)
- [logger - 日志 API](#logger---日志-api)
- [material - 物料 API](#material---物料-api)
- [project - 模型 API](#project---模型-api)
- [setters - 设置器 API](#setters---设置器-api)
- [simulatorHost - 模拟器 API](#simulatorhost---模拟器-api)
- [skeleton - 面板 API](#skeleton---面板-api)
- [workspace - 应用级 API](#workspace---应用级-api)
- [DocumentModel](#documentmodel)
- [Node](#node)
- [NodeChildren](#nodechildren)
- [Prop](#prop)
- [Props](#props)
- [History](#history)
- [Detecting](#detecting)
- [Selection](#selection)
- [SettingField](#settingfield)
- [SettingTopEntry](#settingtopentry)
- [SimulatorRender](#simulatorrender)
- [ModalNodesManager](#modalnodesmanager)
- [EditorView](#editorview)
- [PluginInstance](#plugininstance)
- [Window](#window)
- [DropLocation](#droplocation)
- [Resource](#resource)
- [Clipboard](#clipboard)
- [ComponentMeta](#componentmeta)
- [Dragon](#dragon)

## API 总览
来源：[https://lowcode-engine.cn/site/docs/api/](https://lowcode-engine.cn/site/docs/api/)
API 总览

引擎提供的公开 API 分为`命名空间`和`模型`两类，其中`命名空间`用于聚合一大类的 API，`模型`为各 API 涉及到的对象模型。

### 命名空间

引擎直接提供以下几大类 API

- skeleton 面板 API
- material 物料 API
- project 模型 API
- simulator-host 模拟器 API
- hotkey 快捷键 API
- setters 设置器 API
- event 事件 API
- config 配置 API
- common 通用 API
- logger 日志 API
- init 初始化 API

### 模型

以下模型通过前面的 API 以返回值等形式间接透出。

- document-model 文档
- node 节点
- node-children 节点孩子
- props 属性集
- prop 属性
- setting-field 设置属性
- setting-top-entry 设置属性集
- component-meta 物料元数据
- selection 画布选中
- detecting 画布 hover
- history 操作历史
- window 低代码设计器窗口模型
- detecting 画布节点悬停模型
- modal-nodes-manager 模态节点管理器模型
- plugin-instance 插件实例
- drop-location 拖拽放置位置模型

### API 设计约定

一些 API 设计约定：

1. 所有 API 命名空间都按照 variables / functions / events 来组织
2. 事件（events）的命名格式为：on [Will|Did] VerbNoun?，参考 [https://code.visualstudio.com/api/references/vscode-api#events](https://code.visualstudio.com/api/references/vscode-api#events)
3. 基于 Disposable 模式，对于事件的绑定、快捷键的绑定函数，返回值则是解绑函数
4. 对于属性的导出，统一用 .xxx 的 getter 模式，（尽量）不使用 .getXxx()

### experimental

说明此模块处于公测阶段, API 可能会发生改变.

## init - 初始化 API
来源：[https://lowcode-engine.cn/site/docs/api/init](https://lowcode-engine.cn/site/docs/api/init)
init - 初始化 API

> **@since** v1.0.0

### 模块简介

提供 init 等方法

### 方法

##### init

初始化引擎

**方法定义**

```
function init(container?: Element, options?: IPublicTypeEngineOptions): void;
```

[初始化引擎配置参数列表](https://lowcode-engine.cn/site/docs/api/configOptions)

### 使用示例

```
import { init } from '@alilc/lowcode-engine';

init(document.getElementById('engine'), {
  enableCondition: false,
});
```

#### 默认打开移动端画布

```
import { init } from '@alilc/lowcode-engine';

init({
  device: 'mobile',
});
```

#### 使用 utils 第三方工具扩展

```
import { init } from '@alilc/lowcode-engine';

init({
  device: 'mobile',

  appHelper: {
    utils: {
      xxx: () => {
        console.log('123');
      },
    },
  },
});
```

在引擎中即可这样使用。

## plugins - 插件 API
来源：[https://lowcode-engine.cn/site/docs/api/plugins](https://lowcode-engine.cn/site/docs/api/plugins)
plugins - 插件 API

> **@types** [IPublicApiPlugins](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/plugins.ts)
> **@since** v1.0.0

### 模块简介

插件管理器，提供编排模块中管理插件的能力。

### 方法

#### register

注册插件

```
async function register(
  plugin: IPublicTypePlugin,
  options?: IPublicTypePluginRegisterOptions,
): Promise<void>;
```

相关 types:

- [IPublicTypePlugin](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/plugin.ts)
- [IPublicTypePluginRegisterOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/plugin-register-options.ts)

其中第一个参数 plugin 通过低代码工具链的插件脚手架生成编写模板，开发者可以参考[这个章节](https://lowcode-engine.cn/site/docs/guide/expand/editor/cli)进行创建

##### 简单示例

```
import { plugins } from '@alilc/lowcode-engine';

import { IPublicModelPluginContext } from '@alilc/lowcode-types';

const builtinPluginRegistry = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;

      // 注册组件面板
      const componentsPane = skeleton.add({
        area: 'leftArea',

        type: 'PanelDock',

        name: 'componentsPane',

        content: ComponentsPane,

        contentProps: {},

        props: {
          align: 'top',

          icon: 'zujianku',

          description: '组件库',
        },
      });

      componentsPane?.disable?.();

      project.onSimulatorRendererReady(() => {
        componentsPane?.enable?.();
      });
    },
  };
};

builtinPluginRegistry.pluginName = 'builtinPluginRegistry';

await plugins.register(builtinPluginRegistry);
```

##### 使用 exports 示例

```
import { plugins } from '@alilc/lowcode-engine';

import { IPublicModelPluginContext } from '@alilc/lowcode-types';

const PluginA = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {},

    exports() {
      return {
        x: 1,
      };
    },
  };
};

PluginA.pluginName = 'PluginA';

const PluginB = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      // 获取 pluginA 的导出值
      console.log(ctx.plugins.PluginA.x);

      // => 1
    },
  };
};

PluginA.pluginName = 'pluginA';

PluginB.pluginName = 'PluginB';

PluginB.meta = {
  dependencies: ['PluginA'],
};

await plugins.register(PluginA);

await plugins.register(PluginB);
```

> 注：ctx 是在插件中获取引擎 API 的唯一渠道，具体定义参见 [IPublicModelPluginContext](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-context.ts)

##### 设置兼容引擎版本示例

```
import {

     plugins
} from '@alilc/lowcode-engine';

import {

     IPublicModelPluginContext
} from '@alilc/lowcode-types';

const BuiltinPluginRegistry = (ctx: IPublicModelPluginContext) => {

      return {

            async init() {

                  ...

    },

  };

}

BuiltinPluginRegistry.pluginName = 'BuiltinPluginRegistry';

BuiltinPluginRegistry.meta = {

      engines: {

            lowcodeEngine: '^1.0.0',

         // 插件需要配合 ^1.0.0 的引擎才可运行

  },

}

await plugins.register(BuiltinPluginRegistry);
```

##### 设置插件参数版本示例

```
import {

     plugins
} from '@alilc/lowcode-engine';

import {

     IPublicModelPluginContext
} from '@alilc/lowcode-types';

const BuiltinPluginRegistry = (ctx: IPublicModelPluginContext,   options: any) => {

      return {

            async init() {

                  // 直接传值方式：      //   通过 register(xxx,

             options) 传入      //   通过 options 取出      // 引擎初始化时也可以设置某插件的全局配置项：      //   通过 engine.init(...,

             preference) 传入      //   通过 ctx.preference.getValue() 取出

    },

  };

}

BuiltinPluginRegistry.pluginName = 'BuiltinPluginRegistry';

BuiltinPluginRegistry.meta = {

    preferenceDeclaration: {

            title: 'pluginA 的参数定义',

            properties: [

                  {

                        key: 'key1',

                        type: 'string',

                        description: 'this is description for key1',

      },

                  {

                        key: 'key2',

                        type: 'boolean',

                        description: 'this is description for key2',

      },

                  {

                        key: 'key3',

                        type: 'number',

                        description: 'this is description for key3',

      },

                  {

                        key: 'key4',

                        type: 'string',

                        description: 'this is description for key4',

      },

    ],

  },

}

await plugins.register(BuiltinPluginRegistry,   {

     key1: 'abc',

     key5: 'willNotPassToPlugin'

});
```

#### get

获取指定插件

```
/**
 * 获取指定插件
 * get plugin instance by name
 * /get(pluginName: string): IPublicModelPluginInstance | null;
```

关联模型 [IPublicModelPluginInstance](https://lowcode-engine.cn/site/docs/api/model/plugin-instance)

#### getAll

获取所有的插件实例

```
/**
 * 获取所有的插件实例
 * get all plugin instances
 * /getAll(): IPublicModelPluginInstance[

    
  
];
```

关联模型 [IPublicModelPluginInstance](https://lowcode-engine.cn/site/docs/api/model/plugin-instance)

#### has

判断是否有指定插件

```
/**
 * 判断是否有指定插件
 * check if plugin with certain name exists
 * /has(pluginName: string): boolean;
```

#### delete

删除指定插件

```
/**
 * 删除指定插件
 * delete plugin instance by name
 * /delete(pluginName: string): void;
```

#### getPluginPreference

引擎初始化时可以提供全局配置给到各插件，通过这个方法可以获得本插件对应的配置

```
/**
 * 引擎初始化时可以提供全局配置给到各插件，通过这个方法可以获得本插件对应的配置
 * use this to get preference config for this plugin when engine.init() called
 * /getPluginPreference(    pluginName: string,    ): Record<string,   IPublicTypePreferenceValueType> | null | undefined;
```

### 相关类型定义

- [IPublicModelPluginContext](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-context.ts)
- [IPublicTypePluginConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/plugin-config.ts)
- [IPublicModelPluginInstance](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-instance.ts)

### 插件元数据工程转化示例

your-plugin/package.json

```
{

        "name": "@alilc/lowcode-plugin-debug",

      "lcMeta": {

            "pluginName": "debug",

            "meta": {

                  "engines": {

                        "lowcodeEgnine": "^1.0.0"

      },

                  "preferenceDeclaration": {

                 ...

      }

    }

  }

}
```

转换后的结构：

```
const debug = (ctx: IPublicModelPluginContext,   options: any) => {

        return {

  };

}

debug.pluginName = 'debug';

debug.meta = {

      engines: {

            lowcodeEgnine: '^1.51.0',

  },

      preferenceDeclaration: {

         ...

  }

};
```

## config - 配置 API
来源：[https://lowcode-engine.cn/site/docs/api/config](https://lowcode-engine.cn/site/docs/api/config)
config - 配置 API

> **@types** [IPublicModelEngineConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/engine-config.ts)
> **@since** v1.0.0

### 模块简介

配置模块，负责配置的读、写等操作。

### 方法

#### get

获取指定 key 的值

```
/**
 * 获取指定 key 的值
 * get value by key
 * @param key
 * @param defaultValue
 * @returns
 * /get(key: string,   defaultValue?: any): any;
```

**示例**

```
import { config } from '@alilc/lowcode-engine';

config.get('keyA', true);

config.get('keyB', {
  a: 1,
});
```

#### set

设置指定 key 的值

```
/**
 * 设置指定 key 的值
 * set value for certain key
 * @param key
 * @param value
 * /set(key: string,   value: any): void;
```

**示例**

```
import { config } from '@alilc/lowcode-engine';

config.set('keyC', 1);
```

#### has

判断指定 key 是否有值

```
/**
 * 判断指定 key 是否有值
 * check if config has certain key configed
 * @param key
 * @returns
 * /has(key: string): boolean;
```

**示例**

```
import { config } from '@alilc/lowcode-engine';

config.has('keyD');
```

#### setConfig

批量设值，set 的对象版本

```
/**
 * 批量设值，set 的对象版本
 * set multiple config key-values
 * @param config
 * /setConfig(config: {

     [

        key: string
      
  ]

    : any 
  
}): void;
```

**示例**

```
import { config } from '@alilc/lowcode-engine';

config.setConfig({
  keyA: false,

  keyB: 2,
});
```

#### getPreference

获取全局 Preference 管理器，用于管理全局浏览器侧用户 Preference，如 Panel 是否钉住

```
/**
 * 获取全局 Preference,   用于管理全局浏览器侧用户 Preference，如 Panel 是否钉住
 * get global user preference manager,   which can be use to store
 * user`s preference in user localstorage, such as a panel is pinned or not.
 * @returns {IPublicModelPreference}
 * @since v1.1.0
 * /getPreference(): IPublicModelPreference;
```

相关类型：[IPublicModelPreference](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/preference.ts)

**@since v1.1.0**

示例

```
import { config } from '@alilc/lowcode-engine';

const panelName = 'outline-master-pane';

// 设置大纲树面板钉住，在大纲树下次重新打开时生效config.getPreference().set(`${panelName}-pinned-status-isFloat`,   false,   'skeleton')
```

### 事件

#### onceGot

获取指定 key 的值，若此时还未赋值，则等待，若已有值，则直接返回值
注：此函数返回 Promise 实例

```
/**
 * 获取指定 key 的值，若此时还未赋值，则等待，若已有值，则直接返回值
 * 注：此函数返回 Promise 实例，只会执行（fullfill）一次
 * wait until value of certain key is set,   will only be
 * triggered once.
 * @param key
 * @returns
 * /onceGot(key: string): Promise<any>;
```

**示例**

```
import { config } from '@alilc/lowcode-engine';

config.onceGot('keyA').then((value) => {
  console.log(`The value of keyA is ${value}`);
});

// orconst value = await config.onceGot('keyA');
```

#### onGot

获取指定 key 的值，函数回调模式，若多次被赋值，回调会被多次调用

```
/**
 * 获取指定 key 的值，函数回调模式，若多次被赋值，回调会被多次调用
 * set callback for event of value set for some key
 * this will be called each time the value is set
 * @param key
 * @param fn
 * @returns
 * /  onGot(key: string,   fn: (data: any) => void): () => void;
```

**示例**

```
import {

     config
} from '@alilc/lowcode-engine';

config.onGot('keyA',   (value) => {

      console.log(`The value of keyA is ${value}`);

});

const.set('keyA',   1);

 // 'The value of keyA is 1'const.set('keyA',   2);

 // 'The value of keyA is 2'
```

## config options - 配置列表
来源：[https://lowcode-engine.cn/site/docs/api/configOptions](https://lowcode-engine.cn/site/docs/api/configOptions)
config options - 配置列表

> **@types** [IPublicTypeEngineOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/engine-options.ts)

### 配置方式

##### init API

```
import { init } from '@alilc/lowcode-engine';

init(document.getElementById('engine'), {
  enableCondition: false,
});
```

[init api](https://lowcode-engine.cn/site/docs/api/init)

##### config API

```
import { config } from '@alilc/lowcode-engine';

config.set('enableCondition', false);
```

[config api](https://lowcode-engine.cn/site/docs/api/config)

### 配置详情

> 源码详见 [IPublicTypeEngineOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/engine-options.ts)

#### 画布

##### locale - 语言

`@type {string}`、`@default {zh-CN}`

语言

##### device - 设备类型

`@type {string}`

引擎默认支持的 device 类型有 `default`、`mobile`、`iphonex`、`iphone6`。

插件 `@alilc/lowcode-plugin-simulator-select` 支持的 device 类型有 `default`、`phone`、`tablet`、`desktop`。

如果需要自定义的 device 类型，需要补充 device 类型对应的样式，例如 device 为 phone 时，需要补充样式如下：

```
.lc-simulator-device-phone {
  top: 16px;

  bottom: 16px;

  left: 50%;

  width: 375px;

  transform: translateX(-50%);

  margin: auto;
}
```

##### deviceClassName

`@type {string}`

指定初始化的 deviceClassName，挂载到画布的顶层节点上

##### appHelper

与 react-renderer 的 appHelper 一致，[https://lowcode-engine.cn/site/docs/guide/expand/runtime/renderer#apphelper](https://lowcode-engine.cn/site/docs/guide/expand/runtime/renderer#apphelper)

##### enableCondition

`@type {boolean}`

是否开启 condition 的能力，默认在设计器中不管 condition 是啥都正常展示

##### disableAutoRender

`@type {boolean}` `@default {false}`

关闭画布自动渲染，在资产包多重异步加载的场景有效

##### renderEnv - 渲染器类型

渲染器类型

`@type {string}`、`@default {react}`

##### simulatorUrl

`@type {string[]}`

设置 simulator 相关的 url

##### enableStrictNotFoundMode

`@type {boolean}` `@default {false}`

当开启组件未找到严格模式时，渲染模块不会默认给一个容器组件

#### 编排

##### focusNodeSelector - 指定根组件

配置指定节点为根组件

类型定义

```
focusNodeSelector?: (rootNode: IPublicModelNode) => Node;
```

##### supportVariableGlobally - 全局变量配置

`@type {boolean}` `@default {false}`

设置所有属性支持变量配置

开启拖拽组件时，即将被放入的容器是否有视觉反馈

##### customizeIgnoreSelectors - 点击忽略

配置画布中，需要屏蔽点击事件的元素，即配置的元素默认点击行为均不生效。

类型定义:

```
customizeIgnoreSelectors?: (defaultIgnoreSelectors: string[

],   e: MouseEvent) => string[

];
```

默认值:

```
() => {
  return [
    '.next-input-group',

    '.next-checkbox-group',

    '.next-checkbox-wrapper',

    '.next-date-picker',

    '.next-input',

    '.next-month-picker',

    '.next-number-picker',

    '.next-radio-group',

    '.next-range',

    '.next-range-picker',

    '.next-rating',

    '.next-select',

    '.next-switch',

    '.next-time-picker',

    '.next-upload',

    '.next-year-picker',

    '.next-breadcrumb-item',

    '.next-calendar-header',

    '.next-calendar-table',

    '.editor-container',

    // 富文本组件
  ];
};
```

##### enableCanvasLock

`@type {boolean}` `@default {false}`

打开画布的锁定操作

##### enableLockedNodeSetting

`@type {boolean}` `@default {false}`

容器锁定后，容器本身是否可以设置属性，仅当画布锁定特性开启时生效

##### enableMouseEventPropagationInCanvas

`@type {boolean}` `@default {false}`

鼠标事件（mouseover、mouseleave、mousemove）在画布中是否允许冒泡，默认不允许。

##### enableReactiveContainer

`@type {boolean}` `@default {false}`

##### enableContextMenu - 开启右键菜单

`@type {boolean}` `@default {false}`

是否开启右键菜单

##### disableDetecting

`@type {boolean}` `@default {false}`

关闭拖拽组件时的虚线响应，性能考虑

##### disableDefaultSettingPanel

`@type {boolean}` `@default {false}`

禁止默认的设置面板

##### disableDefaultSetters

`@type {boolean}` `@default {false}`

禁止默认的设置器

##### stayOnTheSameSettingTab

`@type {boolean}` `@default {false}`

当选中节点切换时，是否停留在相同的设置 tab 上

##### hideSettingsTabsWhenOnlyOneItem

`@type {boolean}` `@default {false}`

是否在只有一个 item 的时候隐藏设置 tabs

##### hideComponentAction

`@type {boolean}` `@default {false}`

隐藏设计器辅助层

##### thisRequiredInJSE

`@type {boolean}` `@default {true}`

JSExpression 是否只支持使用 this 来访问上下文变量，假如需要兼容原来的 'state.xxx'，则设置为 false

#### 应用级设计器

##### enableWorkspaceMode - 应用级设计模式

`@type {boolean}` `@default {false}`

开启应用级设计模式

##### enableAutoOpenFirstWindow

`@type {boolean}` `@default {true}`

应用级设计模式下，自动打开第一个窗口

##### workspaceEmptyComponent

应用级设计模式下，当窗口为空时，展示的占位组件

#### 定制组件

##### faultComponent

组件渲染错误时的占位组件

##### notFoundComponent

组件不存在时的占位组件

##### loadingComponent - loading 组件

自定义 loading 组件

#### 插件

##### defaultSettingPanelProps

内置设置面板插件的 panelProps

##### defaultOutlinePaneProps

内置大纲树面板插件的 panelProps

#### 其他

##### enableStrictPluginMode

`@type {boolean}`

开启严格插件模式，默认值：STRICT_PLUGIN_MODE_DEFAULT , 严格模式下，插件将无法通过 engineOptions 传递自定义配置项

##### requestHandlersMap

数据源引擎的请求处理器映射

##### customPluginTransducer

插件处理中间件，方便提供插件调试能力

类型定义

```
customPluginTransducer: async (originPlugin: IPublicTypePlugin,   ctx: IPublicModelPluginContext,   options): IPublicTypePlugin;
```

##### defaultOutlinePaneProps

`@type {object}`

大纲树插件面板默认 props

## canvas - 画布 API
来源：[https://lowcode-engine.cn/site/docs/api/canvas](https://lowcode-engine.cn/site/docs/api/canvas)
canvas - 画布 API

> **@types** [IPublicApiCanvas](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/canvas.ts)
> **@since** v1.1.0

### 模块简介

通过该模块可以触达对画布拖拽相关的一些能力。

### 变量

#### dragon

获取拖拽操作对象的实例

`@type {IPublicModelDragon | null}`

相关类型：[IPublicModelDragon](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/dragon.ts)

#### activeTracker

获取活动追踪器实例

`@type {IPublicModelActiveTracker | null}`

相关类型：[IPublicModelActiveTracker](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/active-tracker.ts)

#### isInLiveEditing

是否处于 LiveEditing 状态

`@type {boolean}`

#### clipboard

全局剪贴板实例

`@type {IPublicModelClipboard}`

相关类型：[IPublicModelClipboard](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/clipboard.ts)

### 方法

#### createLocation

创建一个文档插入位置对象，该对象用来描述一个即将插入的节点在文档中的位置

```
/**
 * 创建一个文档插入位置对象，该对象用来描述一个即将插入的节点在文档中的位置
 * create a drop location for document,   drop location describes a location in document
 * @since v1.1.0
 * /createLocation(locationData: IPublicTypeLocationData): IPublicModelDropLocation;
```

#### createScroller

创建一个滚动控制器 Scroller，赋予一个视图滚动的基本能力，

```
/**
 * 创建一个滚动控制器 Scroller，赋予一个视图滚动的基本能力，
 * a Scroller is a controller that gives a view (IPublicTypeScrollable) the ability scrolling
 * to some cordination by api scrollTo.
 * * when a scroller is inited,   will need to pass is a scrollable,   which has a scrollTarget.
 * and when scrollTo(options: {

     left?: number;

     top?: number 
  
}) is called,   scroller will
 * move scrollTarget`s top-left corner to (options.left, options.top) that passed in.
 * @since v1.1.0
 * /createScroller(scrollable: IPublicTypeScrollable): IPublicModelScroller;
```

#### createScrollTarget

创建一个 ScrollTarget，与 Scroller 一起发挥作用，详见 [createScroller](https://lowcode-engine.cn/site/docs/api/canvas#createscroller) 中的描述

```
/**
 * 创建一个 ScrollTarget，与 Scroller 一起发挥作用，详见 createScroller 中的描述
 * this works with Scroller,   refer to createScroller`s description
 * @since v1.1.0
 * /createScrollTarget(shell: HTMLDivElement): IPublicModelScrollTarget;
```

## command - 指令 API
来源：[https://lowcode-engine.cn/site/docs/api/command](https://lowcode-engine.cn/site/docs/api/command)
command - 指令 API

### 模块概览

该模块使得与命令系统的交互成为可能，提供了一种全面的方式来处理、执行和管理应用程序中的命令。

### 接口

#### IPublicApiCommand

与命令交互的接口。它提供了注册、注销、执行和管理命令的方法。

### 方法

#### registerCommand

注册一个新命令及其处理函数。

```
/**
 * 注册一个新的命令及其处理程序。
 * @param command {

    IPublicTypeCommand
  
}

 - 要注册的命令。
 * /registerCommand(command: IPublicTypeCommand): void;
```

#### unregisterCommand

注销一个已存在的命令。

```
/**
 * 注销一个已存在的命令。
 * @param name {

    string
  
}

 - 要注销的命令的名称。
 * /unregisterCommand(name: string): void;
```

#### executeCommand

根据名称和提供的参数执行命令，确保参数符合命令的定义。

```
/**
 * 根据名称和提供的参数执行命令。
 * @param name {

    string
  
}

 - 要执行的命令的名称。
 * @param args {

    IPublicTypeCommandHandlerArgs
  
}

 - 命令的参数。
 * /executeCommand(name: string,   args?: IPublicTypeCommandHandlerArgs): void;
```

#### batchExecuteCommand

批量执行命令，在所有命令执行后进行重绘，历史记录中只记录一次。

```
/**
 * 批量执行命令，随后进行重绘，历史记录中只记录一次。
 * @param commands {

    Array
  
}

 - 命令对象的数组，包含名称和可选参数。
 * /batchExecuteCommand(commands: {

     name: string;

     args?: IPublicTypeCommandHandlerArgs 
  
}

[

    
  
]): void;
```

#### listCommands

列出所有已注册的命令。

```
/**
 * 列出所有已注册的命令。
 * @returns {

    IPublicTypeListCommand[

        
      
  ]

    
  
}

 - 已注册命令的数组。
 * /listCommands(): IPublicTypeListCommand[

    
  
];
```

#### onCommandError

为命令执行过程中的错误注册错误处理回调函数。

```
/**
 * 为命令执行过程中的错误注册一个回调函数。
 * @param callback {

    (name: string,

     error: Error) => void

}

 - 错误处理的回调函数。
 * /onCommandError(callback: (name: string,   error: Error) => void): void;
```

## common - 通用 API
来源：[https://lowcode-engine.cn/site/docs/api/common](https://lowcode-engine.cn/site/docs/api/common)
common - 通用 API

> **@types** [IPublicApiCommon](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/common.ts)
> **@since** v1.0.0

### 模块简介

通用模块里包含除了几大核心模块 API 之外的所有 API，比如通用 utils、面板扩展相关 等。

> 高能预警：之所以叫 skeletonCabin / designerCabin 跟兼容上一个版本的引擎有关系。若有必要，后面将用更有意义的命名空间来组织这些 API。

### 变量

##### utils

通用 utils，详见下方方法签名

相关类型：[IPublicApiCommonUtils](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/common.ts)

##### skeletonCabin

面板扩展相关，详见下方方法签名

### 方法

#### utils

##### isNodeSchema

是否为合法的 schema 结构

```
/**
 * 是否为合法的 schema 结构
 * check if data is valid NodeSchema
 * * @param {

    *
  
}

 data
 * @returns {

    boolean
  
}

 * /isNodeSchema(data: any): boolean;
```

##### isFormEvent

是否为表单事件类型

```
/**
 * 是否为表单事件类型
 * check if e is a form event
 * @param {

    (KeyboardEvent | MouseEvent)
  
}

 e
 * @returns {

    boolean
  
}

 * /isFormEvent(e: KeyboardEvent | MouseEvent): boolean;
```

##### getNodeSchemaById

从 schema 结构中查找指定 id 节点

```
/**
 * 从 schema 结构中查找指定 id 节点
 * get node schema from a larger schema with node id
 * @param {

    IPublicTypeNodeSchema
  
}

 schema
 * @param {

    string
  
}

 nodeId
 * @returns {

    (IPublicTypeNodeSchema | undefined)
  
}

 * /getNodeSchemaById(    schema: IPublicTypeNodeSchema,      nodeId: string,    ): IPublicTypeNodeSchema | undefined;
```

相关类型：[IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

##### executeTransaction

批处理事务，用于优化特定场景的性能

```
/**
 * 批处理事务，用于优化特定场景的性能
 * excute something in a transaction for performence
 * * @param {

    () => void

}

 fn
 * @param {

    IPublicEnumTransitionType

}

 type
 * @since v1.0.16
 * /executeTransaction(fn: () => void,   type: IPublicEnumTransitionType): void;
```

**@since v1.0.16**

**示例**

```
import { common } from '@alilc/lowcode-engine';

import { IPublicEnumTransitionType } from '@alilc/lowcode-types';

common.utils.startTransaction(() => {
  node1.setProps();

  node2.setProps();

  node3.setProps();

  // ...
}, IPublicEnumTransitionType.repaint);
```

##### getConvertedExtraKey

props key 转化工具

```
getConvertedExtraKey(key: string): string
```

**@since v1.0.17**

##### createIntl

i18n 相关工具

```
/**
 * i18n 相关工具
 * i18n tools
 * * @param {

    (string | object)
  
}

 instance
 * @returns {

    {

         * intlNode(id: string,

         params?: object): ReactNode;

         * intl(id: string,

         params?: object): string;

         * getLocale(): string;

         * setLocale(locale: string): void;

         * 
      
  }

    
  
}

 * @since v1.0.17
 * /createIntl(instance: string | object): {

      intlNode(id: string,

     params?: object): ReactNode;

      intl(id: string,

     params?: object): string;

      getLocale(): string;

      setLocale(locale: string): void;

    
  
};
```

**@since v1.0.17**

**示例**

```
import { common } from '@alilc/lowcode-engine';

import enUS from './en-US.json';

import zhCN from './zh-CN.json';

const {
  intl,

  getLocale,

  setLocale,
} = common.utils.createIntl({
  'en-US': enUS,

  'zh-CN': zhCN,
});
```

##### intl

i18n 转换方法

```
/**
 * i18n 转换方法
 * /intl(data: IPublicTypeI18nData | string,   params?: object): string;
```

**示例**

```
const title = common.utils.intl(node.title);
```

#### skeletonCabin

##### Workbench

编辑器框架 View

```
/**
 * 编辑器框架 View
 * get Workbench Component
 * /get Workbench(): Component;
```

## commonUI - UI 组件库
来源：[https://lowcode-engine.cn/site/docs/api/commonUI](https://lowcode-engine.cn/site/docs/api/commonUI)
commonUI - UI 组件库

> **@since** v1.3.0

### 简介

CommonUI API 是一个专为低代码引擎设计的组件 UI 库，使用它开发的插件，可以保证在不同项目和主题切换中能够保持一致性和兼容性。

### 组件列表

#### Tip

提示组件

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | className | string (optional) |  |
| children | tip 的内容 | IPublicTypeI18nData | ReactNode |  |
| direction | tip 的方向 | 'top' | 'bottom' | 'left' | 'right' |  |

#### HelpTip

带 help icon 的提示组件

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| help | 描述 | IPublicTypeHelpTipConfig |  |
| direction | 方向 | IPublicTypeTipConfig['direction'] | 'top' |
| size | 方向 | IconProps['size'] | 'small' |

#### Title

标题组件

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题内容 | IPublicTypeTitleContent |  |
| className | className | string (optional) |  |
| onClick | 点击事件 | () => void (optional) |  |

#### ContextMenu

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| menus | 定义上下文菜单的动作数组 | IPublicTypeContextMenuAction[] |  |
| children | 组件的子元素 | React.ReactElement[] |  |

**IPublicTypeContextMenuAction Interface**

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 动作的唯一标识符Unique identifier for the action | string |  |
| title | 显示的标题，可以是字符串或国际化数据Display title, can be a string or internationalized data | string | IPublicTypeI18nData (optional) |  |
| type | 菜单项类型Menu item type | IPublicEnumContextMenuType (optional) | IPublicEnumContextMenuType.MENU_ITEM |
| action | 点击时执行的动作，可选Action to execute on click, optional | (nodes: IPublicModelNode[]) => void (optional) |  |
| items | 子菜单项或生成子节点的函数，可选，仅支持两级Sub-menu items or function to generate child node, optional | Omit<IPublicTypeContextMenuAction, 'items'>[] | ((nodes: IPublicModelNode[]) => Omit<IPublicTypeContextMenuAction, 'items'>[]) (optional) |  |
| condition | 显示条件函数Function to determine display condition | (nodes: IPublicModelNode[]) => boolean (optional) |  |
| disabled | 禁用条件函数，可选Function to determine disabled condition, optional | (nodes: IPublicModelNode[]) => boolean (optional) |  |

**ContextMenu 示例**

```
const App = () => {
  const menuItems: IPublicTypeContextMenuAction[] = [
    {
      name: 'a',

      title: '选项 1',

      action: () => console.log('选项 1 被点击'),
    },

    {
      name: 'b',

      title: '选项 2',

      action: () => console.log('选项 2 被点击'),
    },
  ];

  const ContextMenu = ctx.commonUI.ContextMenu;

  return (
    <div>
      {' '}
      <ContextMenu menus={menuItems}>
        {' '}
        <div>右键点击这里</div>{' '}
      </ContextMenu>{' '}
    </div>
  );
};

export default App;
```

**ContextMenu.create 示例**

```
const App = () => {
  const menuItems: IPublicTypeContextMenuAction[] = [
    {
      name: 'a',

      title: '选项 1',

      action: () => console.log('选项 1 被点击'),
    },

    {
      name: 'b',

      title: '选项 2',

      action: () => console.log('选项 2 被点击'),
    },
  ];

  const ContextMenu = ctx.commonUI.ContextMenu;

  return (
    <div>
      {' '}
      <div
        onClick={(e) => {
          ContextMenu.create(
            menuItems,

            e,
          );
        }}
      >
        点击这里
      </div>{' '}
    </div>
  );
};

export default App;
```

#### Balloon

详细文档： [Balloon Documentation](https://fusion.design/pc/component/balloon)

#### Breadcrumb

详细文档： [Breadcrumb Documentation](https://fusion.design/pc/component/breadcrumb)

#### Button

详细文档： [Button Documentation](https://fusion.design/pc/component/button)

#### Card

详细文档：[Card Documentation](https://fusion.design/pc/component/card)

#### Checkbox

详细文档：[Checkbox Documentation](https://fusion.design/pc/component/checkbox)

#### DatePicker

详细文档：[DatePicker Documentation](https://fusion.design/pc/component/datepicker)

#### Dialog

详细文档：[Dialog Documentation](https://fusion.design/pc/component/dialog)

#### Dropdown

详细文档：[Dropdown Documentation](https://fusion.design/pc/component/dropdown)

#### Form

详细文档：[Form Documentation](https://fusion.design/pc/component/form)

#### Icon

详细文档：[Icon Documentation](https://fusion.design/pc/component/icon)

引擎默认主题支持的 icon 列表：[https://fusion.design/64063/component/icon?themeid=20133](https://fusion.design/64063/component/icon?themeid=20133)

#### Input

详细文档：[Input Documentation](https://fusion.design/pc/component/input)

#### Loading

详细文档：[Loading Documentation](https://fusion.design/pc/component/loading)

#### Message

详细文档：[Message Documentation](https://fusion.design/pc/component/message)

#### Overlay

详细文档：[Overlay Documentation](https://fusion.design/pc/component/overlay)

#### Pagination

详细文档：[Pagination Documentation](https://fusion.design/pc/component/pagination)

#### Radio

详细文档：[Radio Documentation](https://fusion.design/pc/component/radio)

#### Search

详细文档：[Search Documentation](https://fusion.design/pc/component/search)

#### Select

详细文档：[Select Documentation](https://fusion.design/pc/component/select)

#### SplitButton

详细文档：[SplitButton Documentation](https://fusion.design/pc/component/splitbutton)

#### Step

详细文档：[Step Documentation](https://fusion.design/pc/component/step)

#### Switch

详细文档：[Switch Documentation](https://fusion.design/pc/component/switch)

#### Tab

详细文档：[Tab Documentation](https://fusion.design/pc/component/tab)

#### Table

详细文档：[Table Documentation](https://fusion.design/pc/component/table)

#### Tree

详细文档：[Tree Documentation](https://fusion.design/pc/component/tree)

#### TreeSelect

详细文档：[TreeSelect Documentation](https://fusion.design/pc/component/treeselect)

#### Upload

详细文档：[Upload Documentation](https://fusion.design/pc/component/upload)

#### Divider

详细文档：[Divider Documentation](https://fusion.design/pc/component/divider)

### 说明

如果需要其他组件，可以提 issue 给我们。

## event - 事件 API
来源：[https://lowcode-engine.cn/site/docs/api/event](https://lowcode-engine.cn/site/docs/api/event)
event - 事件 API

> **@types** [IPublicApiEvent](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/event.ts)
> **@since** v1.0.0

### 模块简介

负责事件处理 API，支持自定义监听事件、触发事件。

### 方法

#### on

监听事件

```
/**
 * 监听事件
 * add monitor to a event
 * @param event 事件名称
 * @param listener 事件回调
 * /on(event: string,   listener: (...args: any[

]) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### prependListener

监听事件，会在其他回调函数之前执行

```
/**
 * 监听事件，会在其他回调函数之前执行
 * @param event 事件名称
 * @param listener 事件回调
 * /prependListener(event: string,   listener: (...args: any[

]) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### off

取消监听事件

```
/**
 * 取消监听事件
 * cancel a monitor from a event
 * @param event 事件名称
 * @param listener 事件回调
 * /off(event: string,   listener: (...args: any[

]) => void): void;
```

#### emit

触发事件

```
/**
 * 触发事件
 * emit a message for a event
 * @param event 事件名称
 * @param args 事件参数
 * @returns
 * /emit(event: string,   ...args: any[

    
  
]): void;
```

### 使用示例

#### 事件触发和监听

```
const eventName = 'eventName';

// 事件监听// 插件中发出的事件，默认以 `common` 为前缀，监听时需要注意下event.on(`common:${eventName}`);

// 触发事件event.emit(eventName);
```

#### setter 和 setter/plugin 之间的联动

在 A setter 中进行事件注册：

```
import { event } from '@alilc/lowcode-engine';

const SETTER_NAME = 'SetterA';

class SetterA extends React.Component {
  componentDidMount() {
    // 这里由于面板上会有多个 setter，使用 field.id 来标记 setter 名
    this.emitEventName = `${SETTER_NAME}-${this.props.field.id}`;

    event.on(
      `common:${this.emitEventName}.bindEvent`,

      this.bindEvent,
    );
  }

  bindEvent = (eventName) => {
    // do someting
  };

  componentWillUnmount() {
    // setter 是以实例为单位的，每个 setter 注销的时候需要把事件也注销掉，避免事件池过多
    event.off(
      `common:${this.emitEventName}.bindEvent`,

      this.bindEvent,
    );
  }
}
```

在 B setter 中触发事件，来完成通信：

```
import { event } from '@alilc/lowcode-engine';

class SetterB extends React.Component {
  bindFunction = () => {
    const {
      field,

      value,
    } = this.props;

    // 这里展示的和插件进行通信，事件规则是插件名 + 方法
    event.emit(
      'eventBindDialog.openDialog',

      field.name,

      this.emitEventName,
    );
  };
}
```

## hotkey - 快捷键 API
来源：[https://lowcode-engine.cn/site/docs/api/hotkey](https://lowcode-engine.cn/site/docs/api/hotkey)
hotkey - 快捷键 API

> **@types** [IPublicApiHotkey](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/hotkey.ts)
> **@since** v1.0.0

### 模块简介

绑定快捷键 API，可以自定义项目快捷键使用。

### 方法

#### bind

绑定快捷键

```
/**
 * 绑定快捷键
 * bind hotkey/hotkeys,  
 * @param combos 快捷键，格式如：[

    'command + s'
  
]

 、[

    'ctrl + shift + s'
  
]

 等
 * @param callback 回调函数
 * @param action
 * @returns
 * /bind(    combos: string[

    
  
]

 | string,      callback: IPublicTypeHotkeyCallback,      action?: string,    ): IPublicTypeDisposable;
```

相关 types

- [IPublicTypeHotkeyCallback](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/hotkey-callback.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### mount

给指定窗口绑定快捷键

```
/**
 * 给指定窗口绑定快捷键
 * @param window 窗口的 window 对象
 * /mount(window: Window): IPublicTypeDisposable;
```

### 使用示例

#### 基础示例

```
hotkey.bind('command+s', (e) => {
  e.preventDefault();

  // command+s 快捷键按下时需要执行的逻辑
});
```

#### 同时绑定多个快捷键

```
hotkey.bind(['command+s', 'command+c'], (e) => {
  e.preventDefault();

  // command+s 或者 command+c 快捷键按下时需要执行的逻辑
});
```

#### 保存快捷键配置

```
import { hotkey } from '@alilc/lowcode-engine';

function saveSchema(schema) {
  // 保存 schema 相关操作
}

const saveSampleHotKey = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'saveSample',

    async init() {
      hotkey.bind(
        'command+s',

        (e) => {
          e.preventDefault();

          saveSchema();
        },
      );
    },
  };
};

saveSampleHotKey.pluginName = 'saveSampleHotKey';

plugins.register(saveSampleHotKey);
```

## logger - 日志 API
来源：[https://lowcode-engine.cn/site/docs/api/logger](https://lowcode-engine.cn/site/docs/api/logger)
logger - 日志 API

> **@types** [IPublicApiLogger](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/logger.ts)
> **@since** v1.0.0

### 模块简介

引擎日志模块，可以按照 **日志级别**和**业务类型**两个维度来定制日志。

> 注：日志级别可以通过 url query 动态调整，详见下方[查看示例](https://lowcode-engine.cn/site/docs/api/logger#%E6%9F%A5%E7%9C%8B%E7%A4%BA%E4%BE%8B)。
> 参考 [zen-logger](https://web.npm.alibaba-inc.com/package/zen-logger) 实现进行封装

### 方法

日志记录方法

```
/**
 * debug info
 * /debug(...args: any | any[

    
  
]): void;

/**
 * normal info output
 * /info(...args: any | any[

    
  
]): void;

/**
 * warning info output
 * /warn(...args: any | any[

    
  
]): void;

/**
 * error info output
 * /error(...args: any | any[

    
  
]): void;

/**
 * log info output
 * /log(...args: any | any[

    
  
]): void;
```

### 输出示例

```
import { Logger } from '@alilc/lowcode-utils';

const logger = new Logger({
  level: 'warn',

  bizName: 'myPlugin:moduleA',
});

logger.log('Awesome Low-Code Engine');
```

### 查看示例

开启查看方式：

- 方式 1：所有 logger 创建时会有默认输出的 level, 默认为 warn , 即只展示 warn , error
- 方式 2：url 上追加 **logConf** 进行开启，示例如下

```
https://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn// 开启所有 bizName的 warn 和 errorhttps://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=debug// 开启所有 bizName的 debug, log, info, warn 和 errorhttps://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=log// 开启所有 bizName的 log, info, warn 和 errorhttps://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn|*// 同 __logConf__=warnhttps://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn|bizName// 开启 bizName 的 debug, log, info, warn 和 errorhttps://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn|partOfBizName// 开启 bizName like '%partOfBizName%' 的 debug, log, info, warn 和 error
```

## material - 物料 API
来源：[https://lowcode-engine.cn/site/docs/api/material](https://lowcode-engine.cn/site/docs/api/material)
material - 物料 API

> **@types** [IPublicApiMaterial](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/material.ts)
> **@since** v1.0.0

### 模块简介

负责物料相关的 API，包括资产包、设计器辅助层、物料元数据和物料元数据管道函数。

### 变量

#### componentsMap

获取组件 map 结构

```
/**
 * 获取组件 map 结构
 * get map of components
 * /get componentsMap(): {

     [

        key: string
      
  ]

    : IPublicTypeNpmInfo | ComponentType<any> | object 
  
}

 ;
```

相关类型：[IPublicTypeNpmInfo](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/npm-info.ts)

### 方法

#### 资产包

##### setAssets

设置「[资产包](https://lowcode-engine.cn/site/docs/specs/lowcode-spec#2-%E5%8D%8F%E8%AE%AE%E7%BB%93%E6%9E%84)」结构

```
/**
 * 设置「资产包」结构
 * set data for Assets
 * @returns void
 * /setAssets(assets: IPublicTypeAssetsJson): void;
```

相关类型：[IPublicTypeAssetsJson](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/assets-json.ts)

**示例**
直接在项目中引用 npm 包

```
import { material } from '@alilc/lowcode-engine';

import assets from '@alilc/mc-assets-<siteId>/assets.json';

material.setAssets(assets);
```

通过接口动态引入资产包

```
import {

     material,

     plugins
} from '@alilc/lowcode-engine';

import {

     IPublicModelPluginContext
} from '@alilc/lowcode-types';

// 动态加载 assetsplugins.register((ctx: IPublicModelPluginContext) => {

    return {

            name: 'ext-assets',

            async init() {

                  try {

                        // 将下述链接替换为您的物料描述地址即可。
                const res = await window.fetch('https:// fusion.alicdn.com/assets/default@0.1.95/assets.json');

                const assets = await res.text();

                        material.setAssets(assets);

      }

             catch (err) {

                        console.error(err);

      };

    },

  };

}).catch(err => console.error(err));
```

##### getAssets

获取「资产包」结构

```
/**
 * 获取「资产包」结构
 * get AssetsJson data
 * @returns IPublicTypeAssetsJson
 * /getAssets(): IPublicTypeAssetsJson;
```

相关类型：[IPublicTypeAssetsJson](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/assets-json.ts)

**示例**

```
import { material } from '@alilc/lowcode-engine';

material.getAssets();
```

##### loadIncrementalAssets

加载增量的「资产包」结构，该增量包会与原有的合并

```
/**
 * 加载增量的「资产包」结构，该增量包会与原有的合并
 * load Assets incrementally,   and will merge this with exiting assets
 * @param incrementalAssets
 * @returns
 * /loadIncrementalAssets(incrementalAssets: IPublicTypeAssetsJson): Promise<void>;
```

相关类型：[IPublicTypeAssetsJson](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/assets-json.ts)

**示例**

```
import { material } from '@alilc/lowcode-engine';

import assets1 from '@alilc/mc-assets-<siteId>/assets.json';

import assets2 from '@alilc/mc-assets-<siteId>/assets.json';

material.setAssets(assets1);

material.loadIncrementalAssets(assets2);
```

更新特定物料的描述文件

```
import { material } from '@alilc/lowcode-engine';

material.loadIncrementalAssets({
  version: '',

  components: [
    {
      componentName: 'Button',

      props: [
        {
          name: 'new',

          title: 'new',

          propType: 'string',
        },
      ],
    },
  ],
});
```

#### 设计器辅助层

##### addBuiltinComponentAction

在设计器辅助层增加一个扩展 action

```
/**
 * 在设计器辅助层增加一个扩展 action
 * add an action button in canvas context menu area
 * @param action
 * /addBuiltinComponentAction(action: IPublicTypeComponentAction): void;
```

相关类型：[IPublicTypeComponentAction](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/component-action.ts)

**示例**
新增设计扩展位，并绑定事件

```
import { material } from '@alilc/lowcode-engine';

material.addBuiltinComponentAction({
  name: 'myIconName',

  content: {
    icon: () => 'x',

    title: 'hover title',

    action(node) {
      console.log('myIconName 扩展位被点击');
    },
  },

  important: true,

  condition: true,
});
```

##### removeBuiltinComponentAction

移除设计器辅助层的指定 action

```
/**
 * 移除设计器辅助层的指定 action
 * remove a builtin action button from canvas context menu area
 * @param name
 * /removeBuiltinComponentAction(name: string): void;
```

###### 内置设计器辅助 name

- remove：删除
- hide：隐藏
- copy：复制
- lock：锁定，不可编辑
- unlock：解锁，可编辑

**示例**

```
import { material } from '@alilc/lowcode-engine';

material.removeBuiltinComponentAction('myIconName');
```

##### modifyBuiltinComponentAction

修改已有的设计器辅助层的指定 action

```
/**
 * 修改已有的设计器辅助层的指定 action
 * modify a builtin action button in canvas context menu area
 * @param actionName
 * @param handle
 * /modifyBuiltinComponentAction(    actionName: string,      handle: (action: IPublicTypeComponentAction) => void,    ): void;
```

相关类型：[IPublicTypeComponentAction](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/component-action.ts)

###### 内置设计器辅助 name

- remove：删除
- hide：隐藏
- copy：复制
- lock：锁定，不可编辑
- unlock：解锁，可编辑

**示例**
给原始的 remove 扩展时间添加执行前后的日志

```
import { material } from '@alilc/lowcode-engine';

material.modifyBuiltinComponentAction('remove', (action) => {
  const originAction = action.content.action;

  action.content.action = (node) => {
    console.log('before reomve!');

    originAction(node);

    console.log('after remove!');
  };
});
```

#### 右键菜单项

##### addContextMenuOption

添加右键菜单项

```
/**
 * 添加右键菜单项
 * @param action
 * /addContextMenuOption(action: IPublicTypeContextMenuAction): void;
```

示例

```
import {

     IPublicEnumContextMenuType
} from '@alilc/lowcode-types';

material.addContextMenuOption({

      name: 'parentItem',

      title: 'Parent Item',

      condition: (nodes) => true,

      items: [

            {

                  name: 'childItem1',

                  title: 'Child Item 1',

                  action: (nodes) => console.log('Child Item 1 clicked',

             nodes),

                  condition: (nodes) => true

    },

            // 分割线    {

            type: IPublicEnumContextMenuType.SEPARATOR      name: 'separator.1'

    }

            // 更多子菜单项...

  ]

});
```

##### removeContextMenuOption

删除特定右键菜单项

```
/**
 * 删除特定右键菜单项
 * @param name
 * /removeContextMenuOption(name: string): void;
```

##### adjustContextMenuLayout

调整右键菜单项布局，每次调用都会覆盖之前注册的调整函数，只有最后注册的函数会被应用。

```
/**
 * 调整右键菜单项布局
 * @param actions
 * /adjustContextMenuLayout(fn: (actions: IPublicTypeContextMenuItem[

]) => IPublicTypeContextMenuItem[

]): void;
```

**示例**

通过 adjustContextMenuLayout 补充分割线

```
material.adjustContextMenuLayout((actions: IPublicTypeContextMenuAction) => {
  const names = ['a', 'b'];

  const newActions = [];

  actions.forEach((d) => {
    newActions.push(d);

    if (names.include(d.name)) {
      newActions.push({
        type: 'separator',
      });
    }
  });

  return newActions;
});
```

#### 物料元数据

##### getComponentMeta

获取指定名称的物料元数据

```
/**
 * 获取指定名称的物料元数据
 * get component meta by component name
 * @param componentName
 * @returns
 * /getComponentMeta(componentName: string): IPublicModelComponentMeta | null;
```

相关类型：[IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

**示例**

```
import { material } from '@alilc/lowcode-engine';

material.getComponentMeta('Input');
```

##### getComponentMetasMap

获取所有已注册的物料元数据

```
/**
 * 获取所有已注册的物料元数据
 * get map of all component metas
 * @returns
 * /  getComponentMetasMap(): Map<string,   IPublicModelComponentMeta>;
```

相关类型：[IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

**示例**

```
import { material } from '@alilc/lowcode-engine';

material.getComponentMetasMap();
```

##### refreshComponentMetasMap

刷新 componentMetasMap，可触发模拟器里的 components 重新构建

**@since v1.1.7**

```
refreshComponentMetasMap(): void;
```

#### 物料元数据管道函数

##### registerMetadataTransducer

注册物料元数据管道函数，在物料信息初始化时执行。

```
/**
 * 注册物料元数据管道函数，在物料信息初始化时执行。
 * register transducer to process component meta,   which will be
 * excuted during component meta`s initialization
 * @param transducer
 * @param level
 * @param id
 * /registerMetadataTransducer(  transducer: IPublicTypeMetadataTransducer,  level?: number,  id?: string | undefined): void;
```

**示例**
给每一个组件的配置添加高级配置面板，其中有一个是否渲染配置项

```
import {

     material
} from '@alilc/lowcode-engine'function addonCombine(metadata: TransformedComponentMetadata) {

      const {

         componentName,

         configure = {

    }

  }

     = metadata;

      const advanceGroup = [

  ];

      const combined: FieldConfig[

  ]

     = [

  ];

      advanceGroup.push({

            name: getConvertedExtraKey('condition'),

            title: {

             type: 'i18n',

             'zh-CN': '是否渲染',

             'en-US': 'Condition'

    },

            defaultValue: true,

            setter: [

                  {

                        componentName: 'BoolSetter',

      },

                  {

                        componentName: 'VariableSetter',

      },

    ],

            extraProps: {

                  display: 'block',

    },

  });

      combined.push({

            name: '#advanced',

            title: {

             type: 'i18n',

             'zh-CN': '高级',

             'en-US': 'Advanced'

    },

            items: advanceGroup,

  });

      return {

            ...metadata,

            configure: {

                  ...configure,

                  combined,

    },

  };

}

material.registerMetadataTransducer(addonCombine,   1,   'parse-func');
```

删除高级 Tab

```
import { material } from '@alilc/lowcode-engine';

import { IPublicTypeFieldConfig } from '@alilc/lowcode-types';

material.registerMetadataTransducer(
  (transducer) => {
    const combined: IPublicTypeFieldConfig[] = [];

    transducer.configure.combined?.forEach((d) => {
      if (d.name !== '#advanced') {
        combined.push(d);
      }
    });

    return {
      ...transducer,

      configure: {
        ...transducer.configure,

        combined,
      },
    };
  },
  111,
  'parse-func',
);
```

##### getRegisteredMetadataTransducers

获取所有物料元数据管道函数

```
/**
 * 获取所有物料元数据管道函数
 * get all registered metadata transducers
 * @returns {

    IPublicTypeMetadataTransducer[

        
      
  ]

    
  
}

 * /getRegisteredMetadataTransducers(): IPublicTypeMetadataTransducer[

    
  
];
```

**示例**

```
import {

     material
} from '@alilc/lowcode-engine'material.getRegisteredMetadataTransducers();
```

### 事件

#### onChangeAssets

监听 assets 变化的事件

```
/**
 * 监听 assets 变化的事件
 * add callback for assets changed event
 * @param fn
 * /onChangeAssets(fn: () => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**示例**

```
import { material } from '@alilc/lowcode-engine';

material.onChangeAssets(() => {
  console.log('asset changed');
});
```

## project - 模型 API
来源：[https://lowcode-engine.cn/site/docs/api/project](https://lowcode-engine.cn/site/docs/api/project)
project - 模型 API

### 模块简介

引擎编排模块中包含多种模型，包括：

- [文档模型 DocumentModel](https://lowcode-engine.cn/site/docs/api/model/document-model)
- [节点模型 Node](https://lowcode-engine.cn/site/docs/api/model/node)
- [节点孩子模型 NodeChildren](https://lowcode-engine.cn/site/docs/api/model/node-children)
- [属性模型 Prop](https://lowcode-engine.cn/site/docs/api/model/prop)
- [属性集模型 Props](https://lowcode-engine.cn/site/docs/api/model/props)

他们的依赖关系如下图：

在文档模型内部，又有一些引申模型，比如：

- [历史操作 History）](https://lowcode-engine.cn/site/docs/api/model/history)
- [画布节点选中 Selection）](https://lowcode-engine.cn/site/docs/api/model/selection)
- [画布节点悬停 Detecting）](https://lowcode-engine.cn/site/docs/api/model/detecting)
- [模态节点管理器 ModalNodesManager](https://lowcode-engine.cn/site/docs/api/model/modal-nodes-manager)

整个模型系统，以 project API 为入口，所有模型实例均需要通过 project 来获得，比如 project.currentDocument 来获取当前的文档模型，project.currentDocument.nodesMap 来获取当前文档模型里所有的节点列表。

下面来看看 project API 的具体介绍

### 变量

#### currentDocument

获取当前的 document 实例

```
/**
 * 获取当前的 document
 * get current document
 * /get currentDocument(): IPublicModelDocumentModel | null;
```

相关类型：[IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)

#### documents

获取当前 project 下所有 documents

```
/**
 * 获取当前 project 下所有 documents
 * get all documents of this project
 * @returns
 * /get documents(): IPublicModelDocumentModel[

    
  
];
```

相关类型：[IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)

#### simulatorHost

获取模拟器的 host

```
/**
 * 获取模拟器的 host
 * get simulator host
 * /get simulatorHost(): IPublicApiSimulatorHost | null;
```

相关类型：[IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

### 方法

#### openDocument

打开一个 document

```
/**
 * 打开一个 document
 * @param doc
 * @returns
 * /openDocument(doc?: string | IPublicTypeRootSchema | undefined): IPublicModelDocumentModel | null;
```

相关类型：

- [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

#### createDocument

创建一个 document

```
/**
 * 创建一个 document
 * create a document
 * @param data
 * @returns
 * /createDocument(data?: IPublicTypeRootSchema): IPublicModelDocumentModel | null;
```

相关类型：

- [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

#### removeDocument

删除一个 document

```
/**
 * 删除一个 document
 * remove a document
 * @param doc
 * /removeDocument(doc: IPublicModelDocumentModel): void;
```

相关类型：[IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

#### getDocumentByFileName

根据 fileName 获取 document

```
/**
 * 根据 fileName 获取 document
 * get a document by filename
 * @param fileName
 * @returns
 * /getDocumentByFileName(fileName: string): IPublicModelDocumentModel | null;
```

相关类型：[IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

#### getDocumentById

根据 id 获取 document

```
/**
 * 根据 id 获取 document
 * get a document by id
 * @param id
 * @returns
 * /getDocumentById(id: string): IPublicModelDocumentModel | null;
```

相关类型：[IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

#### exportSchema

导出 project schema

```
/**
 * 导出 project
 * export project to schema
 * @returns
 * /exportSchema(stage: IPublicEnumTransformStage): IPublicTypeProjectSchema;
```

相关类型：

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeProjectSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/project-schema.ts)

#### importSchema

导入 project

```
/**
 * 导入 project schema
 * import schema to project
 * @param schema 待导入的 project 数据
 * /importSchema(schema?: IPublicTypeProjectSchema): void;
```

相关类型：[IPublicTypeProjectSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/project-schema.ts)

#### addPropsTransducer

增加一个属性的管道处理函数

```
/**
 * 增加一个属性的管道处理函数
 * add a transducer to process prop
 * @param transducer
 * @param stage
 * /addPropsTransducer(    transducer: IPublicTypePropsTransducer,      stage: IPublicEnumTransformStage,    ): void;
```

相关类型：

- [IPublicTypePropsTransducer](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/props-transducer.ts)
- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)

**示例**
在保存的时候删除每一个组件的 props.hidden

```
import { project } from '@alilc/lowcode-engine';

import {
  IPublicTypeCompositeObject,
  IPublicEnumTransformStage,
  IPublicModelPluginContext,
} from '@alilc/lowcode-types';

export const DeleteHiddenTransducer = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { project } = ctx;

      project.addPropsTransducer(
        (props: IPublicTypeCompositeObject): IPublicTypeCompositeObject => {
          delete props.hidden;

          return props;
        },

        IPublicEnumTransformStage.Save,
      );
    },
  };
};

DeleteHiddenTransducer.pluginName = 'DeleteHiddenTransducer';
```

#### setI18n

设置多语言语料

```
/**
 * 设置多语言语料
 * 数据格式参考 https: //github.com/alibaba/lowcode-engine/blob/main/specs/lowcode-spec.md#2434%E5%9B%BD%E9%99%85%E5%8C%96%E5%A4%9A%E8%AF%AD%E8%A8%80%E7%B1%BB%E5%9E%8Baa
 * * set I18n data for this project
 * @param value object
 * @since v1.0.17
 * /setI18n(value: object): void;
```

**@since v1.0.17**

#### setConfig

设置当前项目配置

```
/**
 * 设置当前项目配置
 * set config for this project
 * @param value object
 * @since v1.1.4
 * /  setConfig(value: IPublicTypeAppConfig): void;

  setConfig<T extends keyof IPublicTypeAppConfig>(key: T,   value: IPublicTypeAppConfig[

    T
  
]): void;
```

**@since v1.1.4**

##### 如何扩展项目配置

```
/* shims.d.tsdeclare module '@alilc/lowcode-types' { export interface IPublicTypeAppConfig { customProp: CustomPropType } } export { }; */
```

### 事件

#### onRemoveDocument

绑定删除文档事件

```
/**
 * 绑定删除文档事件
 * set callback for event onDocumentRemoved
 * @param fn
 * @since v1.0.16
 * /onRemoveDocument(fn: (data: {

     id: string

}) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.0.16**

#### onChangeDocument

当前 project 内的 document 变更事件

```
/**
 * 当前 project 内的 document 变更事件
 * set callback for event onDocumentChanged
 * /onChangeDocument(fn: (doc: IPublicModelDocumentModel) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onSimulatorHostReady

当前 project 的模拟器 ready 事件

```
/**
 * 当前 project 的模拟器 ready 事件
 * set callback for event onSimulatorHostReady
 * /onSimulatorHostReady(fn: (host: IPublicApiSimulatorHost) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onSimulatorRendererReady

当前 project 的渲染器 ready 事件

```
/**
 * 当前 project 的渲染器 ready 事件
 * set callback for event onSimulatorRendererReady
 * /onSimulatorRendererReady(fn: () => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

## setters - 设置器 API
来源：[https://lowcode-engine.cn/site/docs/api/setters](https://lowcode-engine.cn/site/docs/api/setters)
setters - 设置器 API

> **@types** [IPublicApiSetters](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/setters.ts)
> **@since** v1.0.0

### 模块简介

负责注册设置器、管理设置器的 API。注册自定义设置器之后可以在物料中进行使用。

### 方法

#### getSetter

获取指定 setter

```
/**
 * 获取指定 setter
 * get setter by type
 * @param type
 * @returns
 * /getSetter(type: string): IPublicTypeRegisteredSetter | null;
```

相关类型：[IPublicTypeRegisteredSetter](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/registerd-setter.ts)

#### getSettersMap

获取已注册的所有 settersMap

```
/**
 * 获取已注册的所有 settersMap
 * get map of all registered setters
 * @returns
 * /getSettersMap(): Map<string,   IPublicTypeRegisteredSetter & {

      type: string;

    
  
}

>;
```

相关类型：[IPublicTypeRegisteredSetter](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/registerd-setter.ts)

#### registerSetter

注册一个 setter

```
/**
 * 注册一个 setter
 * register a setter
 * @param typeOrMaps
 * @param setter
 * @returns
 * /registerSetter(  typeOrMaps: string | {

     [

        key: string
      
  ]

    : IPublicTypeCustomView | IPublicTypeRegisteredSetter 
  
},    setter?: IPublicTypeCustomView | IPublicTypeRegisteredSetter | undefined): void;
```

相关类型：

- [IPublicTypeRegisteredSetter](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/registerd-setter.ts)
- [IPublicTypeCustomView](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/custom-view.ts)

### 使用示例

#### 注册官方内置 Setter 到设计器中

```
import { setters, skeleton } from '@alilc/lowcode-engine';

import { setterMap, pluginMap } from '@alilc/lowcode-engine-ext';

import { IPublicModelPluginContext } from '@alilc/lowcode-types';

const SetterRegistry = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'ext-setters-registry',

    async init() {
      // 注册 setterMap
      setters.registerSetter(setterMap);

      // 注册插件      // 注册事件绑定面板
      skeleton.add({
        area: 'centerArea',

        type: 'Widget',

        content: pluginMap.EventBindDialog,

        name: 'eventBindDialog',

        props: {},
      });

      // 注册变量绑定面板
      skeleton.add({
        area: 'centerArea',

        type: 'Widget',

        content: pluginMap.VariableBindDialog,

        name: 'variableBindDialog',

        props: {},
      });
    },
  };
};

SetterRegistry.pluginName = 'SetterRegistry';

await plugins.register(SetterRegistry);
```

#### 开发自定义 Setter

AltStringSetter 代码如下：

```
import * as React from 'react';

import { Input } from '@alifd/next';

import './index.scss';

interface AltStringSetterProps {
  // 当前值
  value: string;

  // 默认值
  initialValue: string;

  // setter 唯一输出
  onChange: (val: string) => void;

  // AltStringSetter 特殊配置
  placeholder: string;
}

export default class AltStringSetter extends React.PureComponent<AltStringSetterProps> {
  componentDidMount() {
    const {
      onChange,

      value,

      defaultValue,
    } = this.props;

    if (value == undefined && defaultValue) {
      onChange(defaultValue);
    }
  }

  // 声明 Setter 的 title
  static displayName = 'AltStringSetter';

  render() {
    const {
      onChange,

      value,

      placeholder,
    } = this.props;

    return (
      <Input
        value={value}
        placeholder={placeholder || ''}
        onChange={(val: any) => onChange(val)}
      ></Input>
    );
  }
}
```

开发完毕之后，注册 AltStringSetter 到设计器中：

```
import AltStringSetter from './AltStringSetter';

import { setters } from '@alilc/lowcode-engine';

const { registerSetter } = setters;

registerSetter('AltStringSetter', AltStringSetter);
```

注册之后，我们就可以在物料中使用了，其中核心配置如下：

```
{
  "props": {
    "isExtends": true,

    "override": [
      {
        "name": "type",

        "setter": "AltStringSetter"
      }
    ]
  }
}
```

完整配置如下：

```
{
  "componentName": "Message",

  "title": "Message",

  "props": [
    {
      "name": "title",

      "propType": "string",

      "description": "标题",

      "defaultValue": "标题"
    },

    {
      "name": "type",

      "propType": {
        "type": "oneOf",

        "value": ["success", "warning", "error", "notice", "help", "loading"]
      },

      "description": "反馈类型",

      "defaultValue": "success"
    }
  ],

  "configure": {
    "props": {
      "isExtends": true,

      "override": [
        {
          "name": "type",

          "setter": "AltStringSetter"
        }
      ]
    }
  }
}
```

## simulatorHost - 模拟器 API
来源：[https://lowcode-engine.cn/site/docs/api/simulatorHost](https://lowcode-engine.cn/site/docs/api/simulatorHost)
simulatorHost - 模拟器 API

> **@types** [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)
> **@since** v1.0.0

### 模块简介

负责模拟器相关的 API，包括画布尺寸、语言等。

### 方法

#### set

设置 host 配置值

```
/**
 * 设置若干用于画布渲染的变量，比如画布大小、locale 等。
 * set config for simulator host,   eg. device locale and so on.
 * @param key
 * @param value
 * /set(key: string,   value: any): void;
```

**示例**
设置若干用于画布渲染的变量，比如画布大小、locale 等。

以设置画布大小为例：
目前支持 3 种定制方式：

```
// 直接使用内置设备类型project.simulator
Host.set('device',   'mobile' / 'iphonex' / 'iphone6' / 'default');

// 定制 canvas 的样式类project.simulator
Host.set('deviceClassName',   'my-canvas-class');

// 最灵活的方式，直接设置 canvas / viewport 的样式（canvas 是外框，viewport 是内框，可以在 canvas 设置手机 / 平板背景图）project.simulator
Host.set('deviceStyle',   {

     canvas: {

         width: '300px',

         backgroundColor: 'red' 
      
  },

     viewport: {

         width: '280px' 
      
  }

     
  
});
```

#### get

获取模拟器中设置的变量，比如画布大小、locale 等。

```
/**
 * 获取模拟器中设置的变量，比如画布大小、locale 等。
 * set config value by key
 * @param key
 * @returns
 * /get(key: string): any;
```

#### rerender

触发组件构建，并刷新渲染画布

```
/**
 * 触发组件构建，并刷新渲染画布
 * make simulator render again
 * /rerender(): void;
```

#### scrollToNode

滚动到指定节点

```
/**
 * 滚动到指定节点
 * scroll to specific node
 * @param node
 * @since v1.1.0
 * /scrollToNode(node: IPublicModelNode): void;
```

**@since v1.1.0**

## skeleton - 面板 API
来源：[https://lowcode-engine.cn/site/docs/api/skeleton](https://lowcode-engine.cn/site/docs/api/skeleton)
skeleton - 面板 API

> **@types** [IPublicApiSkeleton](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/skeleton.ts)
> **@since** v1.0.0

### 模块简介

面板 API 提供了面板扩展和管理的能力，如下图蓝色内容都是扩展出来的。

页面上可以扩展的区域共 5 个，具体如下：

#### 基本概念

##### 扩展区域位置 (area)

###### topArea

展示在设计器的顶部区域，常见的相关区域的插件主要是：

1. 注册设计器 Logo；
2. 设计器操作回退和撤销按钮；
3. 全局操作按钮，例如：保存、预览等；

###### leftArea

左侧区域的展示形式大多数是 Icon 和对应的面板，通过点击 Icon 可以展示对应的面板并隐藏其他的面板。

该区域相关插件的主要有：

1. 大纲树展示，展示该设计器设计页面的大纲。
2. 组件库，展示注册到设计器中的组件，点击之后，可以从组件库面板中拖拽到设计器的画布中。
3. 数据源面板
4. JS 等代码面板。

可以发现，这个区域的面板大多数操作时是不需要同时并存的，且交互比较复杂的，需要一个更整块的区域来进行操作。

###### centerArea

画布区域，由于画布大多数是展示作用，所以一般扩展的种类比较少。常见的扩展有：

1. 画布大小修改
2. 物料选中扩展区域修改

###### rightArea

右侧区域，常用于组件的配置。常见的扩展有：统一处理组件的配置项，例如统一删除某一个配置项，统一添加某一个配置项的。

###### toolbar

跟 topArea 类似，按需放置面板插件~

##### 展示类型 (type)

展示类型用于区分插件在设计器内可操作的几种不同界面类型。主要的几种类型为 PanelDock、Widget、Dock，另有 Panel 类型目前不推荐使用。

###### PanelDock

PanelDock 是以面板的形式展示在设计器的左侧区域的。其中主要有两个部分组成，一个是图标，一个是面板。当点击图标时可以控制面板的显示和隐藏。

下图是组件库插件的展示效果。

其中右上角可以进行固定，可以对弹出的宽度做设定

接入可以参考代码

```
import { skeleton } from '@alilc/lowcode-engine';

skeleton.add({
  area: 'leftArea',

  // 插件区域
  type: 'PanelDock',

  // 插件类型，弹出面板
  name: 'sourceEditor',

  content: SourceEditor,

  // 插件组件实例
  props: {
    align: 'left',

    icon: 'wenjian',

    title: '标题',

    // 图标下方展示的标题
    description: 'JS 面板',
  },

  panelProps: {
    floatable: true,

    // 是否可浮动
    height: 300,

    hideTitleBar: false,

    maxHeight: 800,

    maxWidth: 1200,

    title: 'JS 面板',

    width: 600,
  },
});
```

###### Widget

Widget 形式是直接渲染在当前编辑器的对应位置上。如 demo 中在设计器顶部的所有组件都是这种展现形式。

接入可以参考代码：

```
import { skeleton } from '@alilc/lowcode-engine'; /* 注册 logo 面板skeleton.add({ area: "topArea", type: "Widget", name: "logo", content: Logo, // Widget 组件实例 contentProps: { // Widget 插件 props logo: "https:// img.alicdn.com/tfs/TB1_SocGkT2gK0jSZFkXXcIQFXa-66-66.png", href: "/", }, props: { align: "left", width: 100, }, }); */
```

###### Dock

一个图标的表现形式，可以用于语言切换、跳转到外部链接、打开一个 widget 等场景。

```
import { skeleton } from '@alilc/lowcode-engine';

skeleton.add({
  area: 'leftArea',

  type: 'Dock',

  name: 'opener',

  props: {
    icon: Icon,

    // Icon 组件实例
    align: 'bottom',

    onClick: function () {
      // 打开外部链接
      window.open('https:// lowcode-engine.cn');

      // 显示 widget
      skeleton.showWidget('xxx');
    },
  },
});
```

### 方法

#### add

往指定扩展区加入一块面板

```
/**
 * 增加一个面板实例
 * add a new panel
 * @param config
 * @param extraConfig
 * @returns
 * /add(config: IPublicTypeWidgetBaseConfig,   extraConfig?: Record<string,   any>): any;
```

IWidgetBaseConfig 定义如下：

| 属性名 | 含义 | 备注 |
| --- | --- | --- |
| name | 面板名称 |  |
| area | 扩展区位置，可选值：'topArea' | 'leftArea' | 'rightArea' | 'toolbar' | 'bottomArea' | 'mainArea' |  |
| type | 面板类型，可选值：'Widget' | 'PanelDock' | 'Panel' | Dock | 详见前文中对**展示类型**的描述 |
| content | 面板的实现类/节点，类型是 ReactClass | ReactElement |  |
| props | 面板属性 | align: 'top' | 'bottom' | 'left' | 'center' | 'right'; // 指定面板 icon 位置区域icon: string | ReactElement; // icon 为字符串时，请确定当前 fusion 主题包中包含该 icondescription: string;condition: Function; // 指定当前面板的显影状态 |
| contentProps | 面板的实现类/节点的参数 |  |
| panelProps | 假如 type: 'Panel' | 'PanelDock' 时有效，传给 Panel 类的参数 | keepVisibleWhileDragging: boolean; // 当有元素在当前 panel 拖拽时，是否保持 panel 为展开状态，默认值：falsearea: 'leftFloatArea' | 'leftFixedArea' // 指定 panel 位于浮动面板还是钉住面板 |
| index | 面板的位置，不传默认按插件注册顺序 |  |

#### remove

移除一个面板实例

```
/**
 * 移除一个面板实例
 * remove a panel
 * @param config
 * @returns
 * /remove(config: IPublicTypeWidgetBaseConfig): number | undefined;
```

#### getPanel

获取面板实例

```
/**
 * 获取面板实例
 * @param name 面板名称
 * /getPanel(name: string): IPublicModelSkeletonItem | undefined;
```

相关类型：[IPublicModelSkeletonItem](https://github.com/alibaba/lowcode-engine/blob/main/packages/shell/src/model/skeleton-item.ts)

@since v1.1.10

#### showPanel

展示指定 Panel 实例

```
/**
 * 展示指定 Panel 实例
 * show panel by name
 * @param name
 * /showPanel(name: string): void;
```

#### hidePanel

隐藏面板

```
/**
 * 隐藏面板
 * hide panel by name
 * @param name
 * /hidePanel(name: string): void;
```

#### showWidget

展示指定 Widget 实例

```
/**
 * 展示指定 Widget 实例
 * show widget by name
 * @param name
 * /showWidget(name: string): void;
```

#### enableWidget

将 widget 启用。

```
/**
 * 将 widget 启用
 * enable widget
 * @param name
 * /enableWidget(name: string): void;
```

#### hideWidget

隐藏指定 widget 实例。

```
/**
 * 隐藏指定 widget 实例
 * hide widget by name
 * @param name
 * /hideWidget(name: string): void;
```

#### disableWidget

将 widget 禁用掉，禁用后，所有鼠标事件都会被禁止掉。

适用场景：在该面板还在进行初始化构造时，可以先禁止掉，防止用户点击报错，待初始化完成，重新启用。

```
/**
 * 将 widget 禁用掉，禁用后，所有鼠标事件都会被禁止掉。
 * disable widget，and make it not responding any click event.
 * @param name
 * /disableWidget(name: string): void;
```

#### showArea

显示某个 Area

```
/**
 * 显示某个 Area
 * show area
 * @param areaName name of area
 * /showArea(areaName: string): void;
```

#### hideArea

隐藏某个 Area

```
/**
 * 隐藏某个 Area
 * hide area
 * @param areaName name of area
 * /hideArea(areaName: string): void;
```

#### getAreaItems

获取某个区域下的所有面板实例

```
/**
 * 获取某个区域下的所有面板实例
 * @param areaName IPublicTypeWidgetConfigArea
 * /getAreaItems(areaName: IPublicTypeWidgetConfigArea): IPublicModelSkeletonItem[

    
  
]

 | undefined;
```

相关类型：[IPublicModelSkeletonItem](https://github.com/alibaba/lowcode-engine/blob/main/packages/shell/src/model/skeleton-item.ts)

#### registerConfigTransducer

注册一个面板的配置转换器（transducer）。

```
/**
 * 注册一个面板的配置转换器（transducer）。
 * Registers a configuration transducer for a panel.
 * @param {

    IPublicTypeConfigTransducer

}

 transducer
 * - 要注册的转换器函数。该函数接受一个配置对象（类型为 IPublicTypeSkeletonConfig）作为输入，并返回修改后的配置对象。
 * - The transducer function to be registered. This function takes a configuration object
 * * @param {

    number

}

 level
 * - 转换器的优先级。优先级较高的转换器会先执行。
 * - The priority level of the transducer. Transducers with higher priority levels are executed first.
 * * @param {

    string

}

 [

    id

]

 * - （可选）转换器的唯一标识符。用于在需要时引用或操作特定的转换器。
 * - (Optional) A unique identifier for the transducer. Used for referencing or manipulating a specific transducer when needed.
 * /registerConfigTransducer(transducer: IPublicTypeConfigTransducer,   level: number,   id?: string): void;
```

使用示例

```
import { IPublicModelPluginContext, IPublicTypeSkeletonConfig } from '@alilc/lowcode-types';

function updatePanelWidth(config: IPublicTypeSkeletonConfig) {
  if (config.type === 'PanelDock') {
    return {
      ...config,

      panelProps: {
        ...(config.panelProps || {}),

        width: 240,
      },
    };
  }

  return config;
}

const controlPanelWidthPlugin = (ctx: IPublicModelPluginContext) => {
  const { skeleton } = ctx;

  (skeleton as any).registerConfigTransducer?.(
    updatePanelWidth,

    1,

    'update-panel-width',
  );

  return {
    init() {},
  };
};

controlPanelWidthPlugin.pluginName = 'controlPanelWidthPlugin';

controlPanelWidthPlugin.meta = {
  dependencies: [],

  engines: {
    lowcodeEngine: '^1.2.3',

    // 插件需要配合 ^1.0.0 的引擎才可运行
  },
};

export default controlPanelWidthPlugin;
```

### 事件

#### onShowPanel

监听 Panel 实例显示事件

```
/**
 * 监听 panel 显示事件
 * set callback for panel shown event
 * @param listener
 * @returns
 * /onShowPanel(listener: (paneName?: string,   panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onHidePanel

监听 Panel 实例隐藏事件

```
/**
 * 监听 Panel 实例隐藏事件
 * set callback for panel hidden event
 * @param listener
 * @returns
 * /onHidePanel(listener: (paneName?: string,   panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onDisableWidget

监听 Widget 实例 Disable 事件

```
/**
 * 监听 Widget 实例 Disable 事件
 * @param listener
 * /onDisableWidget(listener: (paneName?: string,   panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onEnableWidget

监听 Widget 实例 Enable 事件

```
/**
 * 监听 Widget 实例 Enable 事件
 * @param listener
 * /onEnableWidget(listener: (paneName?: string,   panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onShowWidget

监听 Widget 实例显示事件

```
/**
 * 监听 Widget 显示事件
 * set callback for widget shown event
 * @param listener
 * @returns
 * /onShowWidget(listener: (paneName?: string,   panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onHideWidget

监听 Widget 实例隐藏事件

```
/**
 * 监听 Widget 隐藏事件
 * set callback for widget hidden event
 * @param listener
 * @returns
 * /onHideWidget(listener: (paneName?: string,   panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### 使用示例

```
import { skeleton } from '@alilc/lowcode-engine';
skeleton.add({
  name: 'logo',
  area: 'topArea',
  type: 'Widget',
  contentProps: {},
  content: LogoContent,
});
skeleton.add({
  name: 'sourceEditor',
  type: 'PanelDock',
  area: 'leftArea',
  props: { align: 'top', icon: 'wenjian', description: 'JS 面板' },
  panelProps: {
    floatable: true,
    height: 300,
    help: undefined,
    hideTitleBar: false,
    maxHeight: 800,
    maxWidth: 1200,
    title: 'JS 面板',
    width: 600,
  },
  content: SourceEditor,
});
/* 显隐 panelskeleton.showPanel('sourceEditor'); */ skeleton.hidePanel('sourceEditor');
/* 创建一个浮动的 widgetskeleton.add({ name: 'floatingWidget', type: 'Widget', area: 'mainArea', props: { }, content: React.createElement('div', { }, 'haha'), contentProps: { style: { position: 'fixed', top: '200px', bottom: 0, width: 'calc(100% - 46px)', 'background-color': 'lightblue' } } }); */ /* 显隐 widgetskeleton.showWidget('floatingWidget'); */ skeleton.hideWidget(
  'floatingWidget',
);
/* 控制 widget 的可点击态skeleton.enableWidget('sourceEditor'); */ skeleton.disableWidget(
  'sourceEditor',
);
```

#### bottomArea 示例

```
import { skeleton } from '@alilc/lowcode-engine';

skeleton.add({
  name: 'bottomAreaPanelName',

  area: 'bottomArea',

  type: 'Panel',

  content: () => 'demoText',
});

skeleton.showPanel('bottomAreaPanelName');
```

#### widget 示例

```
// 注册 logo 面板skeleton.add({

    area: 'topArea',

      type: 'Widget',

      name: 'logo',

      content: Logo,

      contentProps: {

            logo: 'https:// img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg',

        href: 'https:// lowcode-engine.cn',

          
      
  },

    props: {

            align: 'left',

          
      
  },

    
  
});
```

## workspace - 应用级 API
来源：[https://lowcode-engine.cn/site/docs/api/workspace](https://lowcode-engine.cn/site/docs/api/workspace)
workspace - 应用级 API

> **[@experimental](https://lowcode-engine.cn/site/docs/api/#experimental)**
> **@types** [IPublicApiWorkspace](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/workspace.ts)
> **@since** v1.1.0

### 模块简介

通过该模块可以开发应用级低代码设计器。

### 变量

#### isActive

是否启用 workspace 模式

#### window

当前设计器窗口模型

```
get window(): IPublicModelWindow
```

关联模型 [IPublicModelWindow](https://lowcode-engine.cn/site/docs/api/model/window)

#### plugins

应用级别的插件注册

```
get plugins(): IPublicApiPlugins
```

关联模型 [IPublicApiPlugins](https://lowcode-engine.cn/site/docs/api/plugins)

#### skeleton

应用级别的面板管理

```
get skeleton(): IPublicApiSkeleton
```

关联模型 [IPublicApiSkeleton](https://lowcode-engine.cn/site/docs/api/skeleton)

#### windows

当前设计器的编辑窗口

```
get window(): IPublicModelWindow[]
```

关联模型 [IPublicModelWindow](https://lowcode-engine.cn/site/docs/api/model/window)

#### resourceList

当前设计器的资源列表数据

```
get resourceList(): IPublicModelResource;
```

关联模型 [IPublicModelResource](https://lowcode-engine.cn/site/docs/api/model/resource)

### 方法

#### registerResourceType

注册资源

```
/** 注册资源
 * /registerResourceType(resourceTypeModel: IPublicTypeResourceType): void;
```

相关类型：[IPublicTypeResourceType](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/resource-type.ts)

#### setResourceList

设置设计器资源列表数据

```
setResourceList(resourceList: IPublicResourceList) {

    
  
}
```

相关类型：[IPublicResourceData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/resource-list.ts)

#### openEditorWindow

打开视图窗口

```
/**
 * 打开视图窗口
 * @deprecated
 * /openEditorWindow(resourceName: string,   id: string,   extra: Object,   viewName?: string,   sleep?: boolean): Promise<void>;

/** 打开视图窗口
 * /openEditorWindow(resource: Resource,   sleep?: boolean): Promise<void>;
```

#### openEditorWindowById

通过视图 id 打开窗口

```
openEditorWindowById(id: string): void;
```

#### removeEditorWindow

移除视图窗口

```
/**
 * 移除视图窗口
 * @deprecated
 * /removeEditorWindow(resourceName: string,   id: string): void;

/**
 * 移除视图窗口
 * /removeEditorWindow(resource: Resource): void;
```

#### removeEditorWindowById

通过视图 id 移除窗口

```
removeEditorWindowById(id: string): void;
```

### 事件

#### onChangeWindows

窗口新增/删除的事件

```
function onChangeWindows(fn: () => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onChangeActiveWindow

active 窗口变更事件

```
function onChangeActiveWindow(fn: () => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onResourceListChange

设计器资源列表数据变更事件

```
onResourceListChange(fn: (resourceList: IPublicResourceList): void): (): IPublicTypeDisposable;
```

- 相关类型： [IPublicResourceOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/resource-options.ts)
- 相关类型： [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

## DocumentModel
来源：[https://lowcode-engine.cn/site/docs/api/model/document-model](https://lowcode-engine.cn/site/docs/api/model/document-model)
DocumentModel

> **@types** [IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)
> **@since** v1.0.0

### 基本介绍

文档模型

### 属性

#### id

唯一 ID

`@type {string}`

#### selection

画布节点选中区模型实例

`@type {IPublicModelSelection}`

相关章节：[节点选中区模型](https://lowcode-engine.cn/site/docs/api/model/selection)

相关类型：[IPublicModelSelection](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/selection.ts)

#### detecting

画布节点 hover 区模型实例

`@type {IPublicModelDetecting}`

相关章节：[画布节点悬停模型](https://lowcode-engine.cn/site/docs/api/model/detecting)

相关类型：[IPublicModelDetecting](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/detecting.ts)

#### history

操作历史模型实例

`@type {IPublicModelHistory}`

相关章节：[操作历史模型](https://lowcode-engine.cn/site/docs/api/model/history)

相关类型：[IPublicModelHistory](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/history.ts)

#### project

获取当前文档模型所属的 project

`@type {IPublicApiProject}`

相关类型：[IPublicApiProject](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/project.ts)

#### root

获取文档的根节点

`@type {IPublicModelNode | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### nodesMap

获取文档下所有节点 Map, key 为 nodeId

`@type {Map<string, IPublicModelNode>}`

相关章节：[节点模型](https://lowcode-engine.cn/site/docs/api/model/node)

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### modalNodesManager

模态节点管理器

`@type {IPublicModelModalNodesManager | null}`

相关章节：[模态节点管理](https://lowcode-engine.cn/site/docs/api/model/modal-nodes-manager)

相关类型：[IPublicModelModalNodesManager](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/modal-nodes-manager.ts)

#### dropLocation

文档的 dropLocation

`@type {IPublicModelDropLocation | null}`

相关类型：[IPublicModelDropLocation](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/drop-location.ts)

**@since v1.1.0**

### 方法

#### getNodeById

根据 nodeId 返回 [Node](https://lowcode-engine.cn/site/docs/api/model/node) 实例

```
/**
 * 根据 nodeId 返回 Node 实例
 * get node by nodeId
 * @param nodeId
 * @returns
 * /getNodeById(nodeId: string): IPublicModelNode | null;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### importSchema

导入 schema

```
/**
 * 导入 schema
 * import schema data
 * @param schema
 * /importSchema(schema: IPublicTypeRootSchema): void;
```

相关类型：[IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

#### exportSchema

导出 schema

```
/**
 * 导出 schema
 * export schema
 * @param stage
 * @returns
 * /exportSchema(stage: IPublicEnumTransformStage): IPublicTypeRootSchema | undefined;
```

相关类型：

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

#### insertNode

插入节点

```
/**
 * 插入节点
 * insert a node
 * /insertNode(  parent: IPublicModelNode,    thing: IPublicModelNode,    at?: number | null | undefined,    copy?: boolean | undefined): IPublicModelNode | null;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### createNode

创建一个节点

```
/**
 * 创建一个节点
 * create a node
 * @param data
 * @returns
 * /createNode(data: any): IPublicModelNode | null;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### removeNode

移除指定节点/节点id

```
/**
 * 移除指定节点/节点id
 * remove a node by node instance or nodeId
 * @param idOrNode
 * /removeNode(idOrNode: string | IPublicModelNode): void;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### checkNesting

检查拖拽放置的目标节点是否可以放置该拖拽对象

```
/**
 * 检查拖拽放置的目标节点是否可以放置该拖拽对象
 * check if dragOjbect can be put in this dragTarget
 * @param dropTarget 拖拽放置的目标节点
 * @param dragObject 拖拽的对象
 * @returns boolean 是否可以放置
 * @since v1.0.16
 * /checkNesting(  dropTarget: IPublicModelNode,    dragObject: IPublicTypeDragNodeObject | IPublicTypeDragNodeDataObject): boolean;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDragNodeObject](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/drag-node-object.ts)
- [IPublicTypeDragNodeDataObject](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/drag-node-object-data.ts)

**@since v1.0.16**

#### isDetectingNode

判断是否当前节点处于被探测状态

```
/**
 * 判断是否当前节点处于被探测状态
 * check is node being detected
 * @param node
 * @since v1.1.0
 * /isDetectingNode(node: IPublicModelNode): boolean;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.1.0**

### 事件

#### onAddNode

当前 document 新增节点事件

```
/**
 * 当前 document 新增节点事件
 * set callback for event on node is created for a document
 * /onAddNode(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onMountNode

当前 document 新增节点事件，此时节点已经挂载到 document 上

```
/**
 * 当前 document 新增节点事件，此时节点已经挂载到 document 上
 * set callback for event on node is mounted to canvas
 * /onMountNode(fn: (payload: {

     node: IPublicModelNode

}) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onRemoveNode

当前 document 删除节点事件

```
/**
 * 当前 document 删除节点事件
 * set callback for event on node is removed
 * /onRemoveNode(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onChangeDetecting

当前 document 的 hover 变更事件

```
/**
 * 当前 document 的 hover 变更事件
 * * set callback for event on detecting changed
 * /onChangeDetecting(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onChangeSelection

当前 document 的选中变更事件

```
/**
 * 当前 document 的选中变更事件
 * set callback for event on selection changed
 * /onChangeSelection(fn: (ids: string[

]) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onChangeNodeVisible

当前 document 的节点显隐状态变更事件

```
/**
 * 当前 document 的节点显隐状态变更事件
 * set callback for event on visibility changed for certain node
 * @param fn
 * /onChangeNodeVisible(fn: (node: IPublicModelNode,   visible: boolean) => void): IPublicTypeDisposable;
```

- 相关类型： [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- 相关类型： [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onChangeNodeChildren

当前 document 的节点 children 变更事件

```
onChangeNodeChildren(fn: (info?: IPublicTypeOnChangeOptions) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onChangeNodeProp

当前 document 节点属性修改事件

```
onChangeNodeProp(fn: (info: IPublicTypePropChangeOptions) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onImportSchema

当前 document 导入新的 schema 事件

```
/**
 * import schema event
 * @param fn
 * @since v1.0.15
 * /onImportSchema(fn: (schema: IPublicTypeRootSchema) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

**@since v1.0.15**

#### onFocusNodeChanged

设置聚焦节点变化的回调

```
/**
 * 设置聚焦节点变化的回调
 * triggered focused node is set mannually from plugin
 * @param fn
 * @since v1.1.0
 * /onFocusNodeChanged(  fn: (doc: IPublicModelDocumentModel,   focusNode: IPublicModelNode) => void,  ): IPublicTypeDisposable;
```

相关类型：

- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.1.0**

#### onDropLocationChanged

设置 DropLocation 变化的回调

```
/**
 * 设置 DropLocation 变化的回调
 * triggered when drop location changed
 * @param fn
 * @since v1.1.0
 * /onDropLocationChanged(fn: (doc: IPublicModelDocumentModel) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.0**

## Node
来源：[https://lowcode-engine.cn/site/docs/api/model/node](https://lowcode-engine.cn/site/docs/api/model/node)
Node

> **@types** [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
> **@since** v1.0.0

### 基本介绍

节点模型

### 属性

#### id

节点 id

`@type {string}`

#### title

节点标题

`@type {string | IPublicTypeI18nData | ReactElement}`

相关类型：[IPublicTypeI18nData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/i18n-data.ts)

#### isContainerNode

是否为「容器型」节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isContainer`

#### isRootNode

是否为根节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isRoot`

#### isEmptyNode

是否为空节点（无 children 或者 children 为空）

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isEmpty`

#### isPageNode

是否为 Page 节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isPage`

#### isComponentNode

是否为 Component 节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isComponent`

#### isModalNode

是否为「模态框」节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isModal`

#### isSlotNode

是否为插槽节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isSlot`

#### isParentalNode

是否为父类/分支节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isParental`

#### isLeafNode

是否为叶子节点

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isLeaf`

#### isLocked

获取当前节点的锁定状态

**@since v1.0.16**

#### isRGLContainerNode

设置为磁贴布局节点，使用方式可参考：[磁贴布局在钉钉宜搭报表设计引擎中的实现](https://mp.weixin.qq.com/s/PSTut5ahAB8nlJ9kBpBaxw)

`@type {boolean}`

**@since v1.1.0**

> v1.0.16 - v1.1.0 请使用 `isRGLContainer`

#### index

下标

`@type {number}`

#### icon

图标

`@type {IPublicTypeIconType}`

相关类型：[IPublicTypeIconType](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/icon-type.ts)

#### zLevel

节点所在树的层级深度，根节点深度为 0

`@type {number}`

#### componentName

节点 componentName

`@type {string}`

#### componentMeta

节点的物料元数据

`@type {IPublicModelComponentMeta | null}`

相关类型：[IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

#### document

获取节点所属的[文档模型](https://lowcode-engine.cn/site/docs/api/model/document-model)对象

`@type {IPublicModelDocumentModel | null}`

相关类型：[IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)

#### prevSibling

获取当前节点的前一个兄弟节点

`@type {IPublicModelNode | null}`

#### nextSibling

获取当前节点的后一个兄弟节点

`@type {IPublicModelNode | null}`

#### parent

获取当前节点的父亲节点

`@type {IPublicModelNode | null}`

#### children

获取当前节点的孩子节点模型

`@type {IPublicModelNodeChildren | null}`

相关类型：[IPublicModelNodeChildren](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node-children.ts)

#### slots

节点上挂载的插槽节点们

`@type {IPublicModelNode[]}`

#### slotFor

当前节点为插槽节点时，返回节点对应的属性实例

`@type {IPublicModelProp | null}`

相关类型：[IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

#### props

返回节点的属性集

`@type {IPublicModelProps | null}`

相关类型：[IPublicModelProps](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/props.ts)

#### propsData

返回节点的属性集值

`@type {IPublicTypePropsMap | IPublicTypePropsList | null}`

相关类型：

- [IPublicTypePropsMap](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/props-map.ts)
- [IPublicTypePropsList](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/props-list.ts)

#### conditionGroup

获取条件组

`@type {IPublicModelExclusiveGroup | null}`

相关类型：[IPublicModelExclusiveGroup](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/exclusive-group.ts)

**@since v1.1.0**

#### schema

获取符合搭建协议 - 节点 schema 结构

`@type {IPublicTypeNodeSchema | null}`

相关类型：[IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### settingEntry

获取对应的 setting entry

`@type {IPublicModelSettingTopEntry}`

相关章节：[设置器顶层操作对象](https://lowcode-engine.cn/site/docs/api/model/setting-top-entry)

相关类型：[IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

#### visible

当前节点是否可见

`@type {boolean}`

**@since v1.1.0**

### 方法

#### getRect

返回节点的尺寸、位置信息

```
/**
 * 返回节点的尺寸、位置信息
 * get rect information for this node
 * /getRect(): DOMRect | null;
```

#### hasSlots

是否有挂载插槽节点

```
/**
 * 是否有挂载插槽节点
 * check if current node has slots
 * /hasSlots(): boolean;
```

#### hasCondition

是否设定了渲染条件

```
/**
 * 是否设定了渲染条件
 * check if current node has condition value set
 * /hasCondition(): boolean;
```

#### hasLoop

是否设定了循环数据

```
/**
 * 是否设定了循环数据
 * check if loop is set for this node
 * /hasLoop(): boolean;
```

#### getProp

获取指定 path 的属性模型实例

```
/**
 * 获取指定 path 的属性模型实例
 * get prop by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * /getProp(path: string,   createIfNone: boolean): IPublicModelProp | null;
```

相关类型：[IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

#### getPropValue

获取指定 path 的属性模型实例值

```
/**
 * 获取指定 path 的属性模型实例值
 * get prop value by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * /getPropValue(path: string): any;
```

#### getExtraProp

获取指定 path 的属性模型实例，注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级

```
/**
 * 获取指定 path 的属性模型实例，
 * 注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级
 * * get extra prop by path,   an extra prop means a prop not exists in the `props`
 * but as siblint of the `props`
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * @param createIfNone 当没有属性的时候，是否创建一个属性
 * /getExtraProp(path: string,   createIfNone?: boolean): IPublicModelProp | null;
```

相关类型：[IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

#### getExtraPropValue

获取指定 path 的属性模型实例，注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级

```
/**
 * 获取指定 path 的属性模型实例，
 * 注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级
 * * get extra prop value by path,   an extra prop means a prop not exists in the `props`
 * but as siblint of the `props`
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * @returns
 * /getExtraPropValue(path: string): any;
```

#### setPropValue

setPropValue(path: string, value: CompositeValue)

设置指定 path 的属性模型实例值

```
/**
 * 设置指定 path 的属性模型实例值
 * set value for prop with path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * @param value 值
 * /setPropValue(path: string,   value: IPublicTypeCompositeValue): void;
```

相关类型：[IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

#### setExtraPropValue

设置指定 path 的属性模型实例值

```
/**
 * 设置指定 path 的属性模型实例值
 * set value for extra prop with path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * @param value 值
 * /setExtraPropValue(path: string,   value: IPublicTypeCompositeValue): void;
```

相关类型：[IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

#### importSchema

导入节点数据

```
/**
 * 导入节点数据
 * import node schema
 * @param data
 * /importSchema(data: IPublicTypeNodeSchema): void;
```

相关类型：[IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### exportSchema

导出节点数据

```
/**
 * 导出节点数据
 * export schema from this node
 * @param stage
 * @param options
 * /exportSchema(stage: IPublicEnumTransformStage,   options?: any): IPublicTypeNodeSchema;
```

相关类型：

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### insertBefore

在指定位置之前插入一个节点

```
/**
 * 在指定位置之前插入一个节点
 * insert a node befor current node
 * @param node
 * @param ref
 * @param useMutator
 * /insertBefore(    node: IPublicModelNode,      ref?: IPublicModelNode | undefined,      useMutator?: boolean,    ): void;
```

#### insertAfter

在指定位置之后插入一个节点

```
/**
 * 在指定位置之后插入一个节点
 * insert a node after this node
 * @param node
 * @param ref
 * @param useMutator
 * /insertAfter(    node: IPublicModelNode,      ref?: IPublicModelNode | undefined,      useMutator?: boolean,    ): void;
```

#### replaceChild

替换指定子节点

```
/**
 * 替换指定子节点
 * replace a child node with data provided
 * @param node 待替换的子节点
 * @param data 用作替换的节点对象或者节点描述
 * @returns
 * /replaceChild(node: IPublicModelNode,   data: any): IPublicModelNode | null;
```

#### replaceWith

将当前节点替换成指定节点描述

```
/**
 * 将当前节点替换成指定节点描述
 * replace current node with a new node schema
 * @param schema
 * /replaceWith(schema: IPublicTypeNodeSchema): any;
```

相关类型：[IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### select

选中当前节点实例

```
/**
 * 选中当前节点实例
 * select current node
 * /select(): void;
```

#### hover

设置悬停态

```
/**
 * 设置悬停态
 * set hover value for current node
 * @param flag
 * /hover(flag: boolean): void;
```

#### lock

设置节点锁定状态

```
/**
 * 设置节点锁定状态
 * set lock value for current node
 * @param flag
 * @since v1.0.16
 * /lock(flag?: boolean): void;
```

**@since v1.0.16**

#### remove

删除当前节点实例

```
/**
 * 删除当前节点实例
 * remove current node
 * /remove(): void;
```

#### mergeChildren

执行新增、删除、排序等操作

```
/**
 * 执行新增、删除、排序等操作
 * excute remove/add/sort operations on node`s children
 * * @since v1.1.0
 * /mergeChildren(  remover: (node: IPublicModelNode, idx: number) => boolean,  adder: (children: IPublicModelNode[]) => any,  sorter: (firstNode: IPublicModelNode, secondNode: IPublicModelNode) => number): any;
```

**@since v1.1.0**

#### contains

当前节点是否包含某子节点

```
/**
 * 当前节点是否包含某子节点
 * check if current node contains another node as a child
 * @param node
 * @since v1.1.0
 * /contains(node: IPublicModelNode): boolean;
```

**@since v1.1.0**

#### canPerformAction

是否可执行某 action

```
/**
 * 是否可执行某 action
 * check if current node can perform certain aciton with actionName
 * @param actionName action 名字
 * @since v1.1.0
 * /canPerformAction(actionName: string): boolean;
```

**@since v1.1.0**

#### isConditionalVisible

获取该节点的 ConditionalVisible 值

```
/**
 * 获取该节点的 ConditionalVisible 值
 * check if current node ConditionalVisible
 * @since v1.1.0
 * /isConditionalVisible(): boolean | undefined;
```

**@since v1.1.0**

#### setConditionalVisible

设置该节点的 ConditionalVisible 为 true

```
/**
 * 设置该节点的 ConditionalVisible 为 true
 * make this node as conditionalVisible === true
 * @since v1.1.0
 * /setConditionalVisible(): void;
```

**@since v1.1.0**

#### getDOMNode

获取节点实例对应的 dom 节点

```
/**
 * 获取节点实例对应的 dom 节点
 * /getDOMNode(): HTMLElement;
```

#### getRGL

获取磁贴相关信息

```
/**
 * 获取磁贴相关信息
 * /getRGL(): {

      isContainerNode: boolean;

      isEmptyNode: boolean;

      isRGLContainerNode: boolean;

      isRGLNode: boolean;

      isRGL: boolean;

      rglNode: IPublicModelNode | null;

    
  
}
```

## NodeChildren
来源：[https://lowcode-engine.cn/site/docs/api/model/node-children](https://lowcode-engine.cn/site/docs/api/model/node-children)
NodeChildren

> **@types** [IPublicModelNodeChildren](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node-children.ts)
> **@since** v1.0.0

### 基本介绍

节点孩子模型

### 属性

#### owner

返回当前 children 实例所属的节点实例

`@type {IPublicModelNode | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### size

children 内的节点实例数

`@type {number}`

#### isEmptyNode

是否为空

`@type {boolean}`

**@since v1.1.0**

> v1.1.0 之前请使用 `isEmpty`

#### notEmptyNode

是否不为空

`@type {boolean}`

**@since v1.1.0**

### 方法

#### delete

删除指定节点

```
/**
 * 删除指定节点
 * delete the node
 * @param node
 * /delete(node: IPublicModelNode): boolean;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### insert

插入一个节点

```
/**
 * 插入一个节点
 * insert the node
 * @param node
 * /insert(node: IPublicModelNode): boolean;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### indexOf

返回指定节点的下标

```
/**
 * 返回指定节点的下标
 * get index of node in current children
 * @param node
 * @returns
 * /indexOf(node: IPublicModelNode): number;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### splice

类似数组 splice 操作

```
/**
 * 类似数组 splice 操作
 * provide the same function with {

    Array.prototype.splice

}

 * @param start
 * @param deleteCount
 * @param node
 * /splice(start: number,   deleteCount: number,   node?: IPublicModelNode): any;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### get

返回指定下标的节点

```
/**
 * 返回指定下标的节点
 * get node with index
 * @param index
 * @returns
 * /get(index: number): IPublicModelNode | null;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### has

是否包含指定节点

```
/**
 * 是否包含指定节点
 * check if node exists in current children
 * @param node
 * @returns
 * /has(node: IPublicModelNode): boolean;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### forEach

类似数组的 forEach

```
/**
 * 类似数组的 forEach
 * provide the same function with {

    Array.prototype.forEach

}

 * @param fn
 * /forEach(fn: (node: IPublicModelNode,   index: number) => void): void;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### reverse

类似数组的 reverse

```
/**
 * 类似数组的 reverse
 * provide the same function with {

    Array.prototype.reverse

}

 * /reverse(): IPublicModelNode[

];
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### map

类似数组的 map

```
/**
 * 类似数组的 map
 * provide the same function with {

    Array.prototype.map

}

 * @param fn
 * /map<T>(fn: (node: IPublicModelNode,   index: number) => T[

]): any[

]

 | null;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### every

类似数组的 every

```
/**
 * 类似数组的 every
 * provide the same function with {

    Array.prototype.every

}

 * @param fn
 * /every(fn: (node: IPublicModelNode,   index: number) => boolean): boolean;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### some

类似数组的 some

```
/**
 * 类似数组的 some
 * provide the same function with {

    Array.prototype.some

}

 * @param fn
 * /some(fn: (node: IPublicModelNode,   index: number) => boolean): boolean;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### filter

类似数组的 filter

```
/**
 * 类似数组的 filter
 * provide the same function with {

    Array.prototype.filter

}

 * @param fn
 * /filter(fn: (node: IPublicModelNode,   index: number) => boolean): any;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### find

类似数组的 find

```
/**
 * 类似数组的 find
 * provide the same function with {

    Array.prototype.find

}

 * @param fn
 * /find(fn: (node: IPublicModelNode,   index: number) => boolean): IPublicModelNode | null;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### reduce

类似数组的 reduce

```
/**
 * 类似数组的 reduce
 * provide the same function with {

    Array.prototype.reduce

}

 * @param fn
 * /reduce(fn: (acc: any,   cur: IPublicModelNode) => any,   initialValue: any): void;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### importSchema

导入 schema

```
/**
 * 导入 schema
 * import schema
 * @param data
 * /importSchema(data?: IPublicTypeNodeData | IPublicTypeNodeData[

]): void;
```

相关类型：[IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)

#### exportSchema

导出 schema

```
/**
 * 导出 schema
 * export schema
 * @param stage
 * /exportSchema(stage: IPublicEnumTransformStage): IPublicTypeNodeSchema;
```

相关类型：

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### mergeChildren

执行新增、删除、排序等操作

```
/**
 * 执行新增、删除、排序等操作
 * excute remove/add/sort operations
 * @param remover
 * @param adder
 * @param sorter
 * /mergeChildren(  remover: (node: IPublicModelNode,   idx: number) => boolean,    adder: (children: IPublicModelNode[

]) => IPublicTypeNodeData[

]

 | null,    sorter: (firstNode: IPublicModelNode,   secondNode: IPublicModelNode) => number): any;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)

## Prop
来源：[https://lowcode-engine.cn/site/docs/api/model/prop](https://lowcode-engine.cn/site/docs/api/model/prop)
Prop

> **@types** [IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)
> **@since** v1.0.0

### 基本介绍

属性模型

### 属性

#### id

id

`@type {string}`

#### key

key 值

`@type {string | number | undefined}`

#### path

返回当前 prop 的路径

`@type {string[]}`

#### node

返回所属的节点实例

`@type {IPublicModelNode | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### slotNode

当本 prop 代表一个 Slot 时，返回对应的 slotNode

`@type {IPublicModelNode | undefined | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### 方法

#### setValue

设置值

```
/**
 * 设置值
 * set value for this prop
 * @param val
 * /setValue(val: IPublicTypeCompositeValue): void;
```

相关类型：[IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

#### getValue

获取值

```
/**
 * 获取值
 * get value of this prop
 * /getValue(): any;
```

#### remove

移除值

```
/**
 * 移除值
 * remove value of this prop
 * @since v1.0.16
 * /remove(): void;
```

**@since v1.0.16**

#### exportSchema

导出值

```
/**
 * 导出值
 * export schema
 * @param stage
 * /exportSchema(stage: IPublicEnumTransformStage): IPublicTypeCompositeValue;
```

相关类型：

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

## Props
来源：[https://lowcode-engine.cn/site/docs/api/model/props](https://lowcode-engine.cn/site/docs/api/model/props)
Props

> **@types** [IPublicModelProps](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/props.ts)
> **@since** v1.0.0

### 基本介绍

属性集模型

### 属性

#### id

id

`@type {string}`

#### path

返回当前 props 的路径

`@type {string[]}`

#### node

返回当前属性集所属的节点实例

`@type {IPublicModelNode | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### 方法

#### getProp

获取指定 path 的属性模型实例

```
/**
 * 获取指定 path 的属性模型实例
 * get prop by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * /getProp(path: string): IPublicModelProp | null;
```

相关类型：[IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

#### getPropValue

获取指定 path 的属性模型实例值

```
/**
 * 获取指定 path 的属性模型实例值
 * get value of prop by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * /getPropValue(path: string): any;
```

#### getExtraProp

获取指定 path 的属性模型实例，注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级

```
/**
 * 获取指定 path 的属性模型实例，
 * 注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级
 * get extra prop by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * /getExtraProp(path: string): IPublicModelProp | null;
```

相关类型：[IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

#### getExtraPropValue

获取指定 path 的属性模型实例值，注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级

```
/**
 * 获取指定 path 的属性模型实例值
 * 注：导出时，不同于普通属性，该属性并不挂载在 props 之下，而是与 props 同级
 * get value of extra prop by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * /getExtraPropValue(path: string): any;
```

#### setPropValue

设置指定 path 的属性模型实例值

```
/**
 * 设置指定 path 的属性模型实例值
 * set value of prop by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * @param value 值
 * /setPropValue(path: string,   value: IPublicTypeCompositeValue): void;
```

相关类型：[IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

#### setExtraPropValue

设置指定 path 的属性模型实例值

```
/**
 * 设置指定 path 的属性模型实例值
 * set value of extra prop by path
 * @param path 属性路径，支持 a / a.b / a.0 等格式
 * @param value 值
 * /setExtraPropValue(path: string,   value: IPublicTypeCompositeValue): void;
```

相关类型：[IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

#### has

当前 props 是否包含某 prop

```
/**
 * 当前 props 是否包含某 prop
 * check if the specified key is existing or not.
 * @param key
 * @since v1.1.0
 * /has(key: string): boolean;
```

**@since v1.1.0**

#### add

添加一个 prop

```
/**
 * 添加一个 prop
 * add a key with given value
 * @param value
 * @param key
 * @since v1.1.0
 * /add(value: IPublicTypeCompositeValue,   key?: string | number | undefined): any;
```

相关类型：[IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

**@since v1.1.0**

## History
来源：[https://lowcode-engine.cn/site/docs/api/model/history](https://lowcode-engine.cn/site/docs/api/model/history)
History

> **@types** [IPublicModelHistory](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/history.ts)
> **@since** v1.0.0

### 基本介绍

操作历史记录模型

### 方法

#### go

历史记录跳转到指定位置

```
/**
 * 历史记录跳转到指定位置
 * go to a specific history
 * @param cursor
 * /go(cursor: number): void;
```

#### back

历史记录后退

```
/**
 * 历史记录后退
 * go backward in history
 * /back(): void;
```

#### forward

forward()

历史记录前进

```
/**
 * 历史记录前进
 * go forward in history
 * /forward(): void;
```

#### savePoint

保存当前状态

```
/**
 * 保存当前状态
 * do save current change as a record in history
 * /savePoint(): void;
```

#### isSavePoint

当前是否是「保存点」，即是否有状态变更但未保存

```
/**
 * 当前是否是「保存点」，即是否有状态变更但未保存
 * check if there is unsaved change for history
 * /isSavePoint(): boolean;
```

#### getState

获取 state，判断当前是否为「可回退」、「可前进」的状态

```
/**
 * 获取 state，判断当前是否为「可回退」、「可前进」的状态
 * get flags in number which indicat current change state
 * *  |    1     |     1    |    1     |
 * | -------- | -------- | -------- |
 * | modified | redoable | undoable |
 * eg:
 * 7 means : modified && redoable && undoable
 * 5 means : modified && undoable
 * /getState(): number;
```

### 事件

#### onChangeState

监听 state 变更事件

```
/**
 * 监听 state 变更事件
 * monitor on stateChange event
 * @param func
 * /onChangeState(func: () => any): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onChangeCursor

监听历史记录游标位置变更事件

```
/**
 * 监听历史记录游标位置变更事件
 * monitor on cursorChange event
 * @param func
 * /onChangeCursor(func: () => any): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

## Detecting
来源：[https://lowcode-engine.cn/site/docs/api/model/detecting](https://lowcode-engine.cn/site/docs/api/model/detecting)
Detecting

> **@types** [IPublicModelDetecting](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/detecting.ts)
> **@since** v1.0.0

### 基本介绍

画布节点悬停模型

### 属性

#### current

当前 hover 的节点

`@type {IPublicModelNode | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.0.16**

#### enable

是否启用

`@type {boolean}`

### 方法

#### capture

hover 指定节点

```
/**
 * hover 指定节点
 * capture node with nodeId
 * @param id 节点 id
 * /capture(id: string): void;
```

#### release

hover 离开指定节点

```
/**
 * hover 离开指定节点
 * release node with nodeId
 * @param id 节点 id
 * /release(id: string): void;
```

#### leave

清空 hover 态

```
/**
 * 清空 hover 态
 * clear all hover state
 * /leave(): void;
```

### 事件

#### onDetectingChange

hover 节点变化事件

```
/**
 * hover 节点变化事件
 * set callback which will be called when hovering object changed.
 * @since v1.1.0
 * /onDetectingChange(fn: (node: IPublicModelNode | null) => void): IPublicTypeDisposable;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.0**

## Selection
来源：[https://lowcode-engine.cn/site/docs/api/model/selection](https://lowcode-engine.cn/site/docs/api/model/selection)
Selection

> **@types** [IPublicModelSelection](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/selection.ts)
> **@since** v1.0.0

### 基本介绍

画布节点选中模型

### 属性

#### selected

返回选中的节点 id

`@type {string[]}`

#### node

返回选中的节点（如多个节点只返回第一个）

`@type {IPublicModelNode | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.1.0**

### 方法

#### select

选中指定节点（覆盖方式）

```
/**
 * 选中指定节点（覆盖方式）* select node with id,   this will override current selection* @param id
 */
select(id: string): void;
```

#### selectAll

批量选中指定节点们

```
/**
 * 批量选中指定节点们* select node with ids,   this will override current selection** @param ids
 */
selectAll(ids: string[

    
  
]): void;
```

#### remove

**取消选中**选中的指定节点，不会删除组件

```
/**
 * 移除选中的指定节点* remove node from selection with node id* @param id
 */
remove(id: string): void;
```

#### clear

**取消选中**所有选中节点，不会删除组件

```
/**
 * 清除所有选中节点* clear current selection
 */
clear(): void;
```

#### has

判断是否选中了指定节点

```
/**
 * 判断是否选中了指定节点* check if node with specific id is selected* @param id
 */
has(id: string): boolean;
```

#### add

选中指定节点（增量方式）

```
/**
 * 选中指定节点（增量方式）* add node with specific id to selection* @param id
 */
add(id: string): void;
```

#### getNodes

获取选中的节点实例

```
/**
 * 获取选中的节点实例* get selected nodes
 */
getNodes(): IPublicModelNode[

    
  
];
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### getTopNodes

获取选区的顶层节点
例如选中的节点为：

- DivA
  - ChildrenA
- DivB

getNodes 返回的是 [DivA、ChildrenA、DivB]，getTopNodes 返回的是 [DivA、DivB]，其中 ChildrenA 由于是二层节点，getTopNodes 不会返回

```
/**
 * 获取选区的顶层节点* get seleted top nodes* for example: *  getNodes() returns [

    A,

     subA,

     B
  
],   then*  getTopNodes() will return [

    A,

     B
  
],   subA will be removed* @since v1.0.16
 */
getTopNodes(includeRoot?: boolean): IPublicModelNode[

    
  
];
```

**@since v1.0.16**

### 事件

#### onSelectionChange

注册 selection 变化事件回调

```
/**
 * 注册 selection 变化事件回调* set callback which will be called when selection is changed* @since v1.1.0
 */
onSelectionChange(fn: (ids: string[

]) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.0**

## SettingField
来源：[https://lowcode-engine.cn/site/docs/api/model/setting-field](https://lowcode-engine.cn/site/docs/api/model/setting-field)
SettingField

> **@types** [IPublicModelSettingField](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-field.ts)

### 基本介绍

setter 设置器操作对象

### 属性

##### isGroup

获取设置属性的 isGroup

`@type {boolean}`

##### id

获取设置属性的 id

`@type {string}`

##### name

获取设置属性的 name

`@type {string | number | undefined}`

##### key

获取设置属性的 key

`@type {string | number | undefined}`

##### path

获取设置属性的 path

`@type {(string | number)[]}`

##### title

获取设置属性的 title

`@type {string}`

##### setter

获取设置属性的 setter

`@type {IPublicTypeSetterType | null}`

##### expanded

获取设置属性的 expanded

`@type {boolean}`

##### extraProps

获取设置属性的 extraProps

`@type {IPublicTypeFieldExtraProps}`

##### props

`@type {IPublicModelSettingTopEntry}`

相关章节：[设置器顶层操作对象](https://lowcode-engine.cn/site/docs/api/model/setting-top-entry)

相关类型：[IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

##### node

获取设置属性对应的节点实例

`@type {IPublicModelNode | null}`

##### parent

获取设置属性的父设置属性

`@type {IPublicModelSettingTopEntry | IPublicModelSettingField}`

相关章节：[设置器顶层操作对象](https://lowcode-engine.cn/site/docs/api/model/setting-top-entry)

相关类型：[IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

##### top

获取顶级设置属性

`@type {IPublicModelSettingTopEntry}`

相关章节：[设置器顶层操作对象](https://lowcode-engine.cn/site/docs/api/model/setting-top-entry)

相关类型：[IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

##### isSettingField

是否是 SettingField 实例

`@type {boolean}`

##### componentMeta

`@type {IPublicModelComponentMeta}`

相关类型：[IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

##### items

获取设置属性的 items

`@type {Array<IPublicModelSettingField | IPublicTypeCustomView>}`

相关类型：[IPublicTypeCustomView](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/custom-view.ts)

### 方法

##### setKey

设置 key 值

```
/**
 * 设置 key 值
 * @param key
 * /setKey(key: string | number): void;
```

##### setValue

设置值

```
/**
 * 设置值
 * @param val 值
 * /setValue(val: IPublicTypeCompositeValue,   extraOptions?: IPublicTypeSetValueOptions): void;
```

相关类型：

- [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)
- [IPublicTypeSetValueOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/set-value-options.ts)

##### setPropValue

设置子级属性值

```
/**
 * 设置子级属性值
 * @param propName 子属性名
 * @param value 值
 * /setPropValue(propName: string | number,   value: any): void;
```

##### clearPropValue

清空指定属性值

```
/**
 * 清空指定属性值
 * @param propName
 * /clearPropValue(propName: string | number): void;
```

##### getDefaultValue

获取配置的默认值

```
/**
 * 获取配置的默认值
 * @returns
 * /getDefaultValue(): any;
```

##### getValue

获取值

```
/**
 * 获取值
 * @returns
 * /getValue(): any;
```

##### getPropValue

获取子级属性值

```
/**
 * 获取子级属性值
 * @param propName 子属性名
 * @returns
 * /getPropValue(propName: string | number): any;
```

##### getExtraPropValue

获取顶层附属属性值

```
/**
 * 获取顶层附属属性值
 * /getExtraPropValue(propName: string): any;
```

##### setExtraPropValue

设置顶层附属属性值

```
/**
 * 设置顶层附属属性值
 * /setExtraPropValue(propName: string,   value: any): void;
```

##### getProps

获取设置属性集

```
/**
 * 获取设置属性集
 * @returns
 * /getProps(): IPublicModelSettingTopEntry;
```

相关章节：[设置器顶层操作对象](https://lowcode-engine.cn/site/docs/api/model/setting-top-entry)

相关类型：[IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

##### isUseVariable

是否绑定了变量

```
/**
 * 是否绑定了变量
 * @returns
 * /isUseVariable(): boolean;
```

##### setUseVariable

设置绑定变量

```
/**
 * 设置绑定变量
 * @param flag
 * /setUseVariable(flag: boolean): void;
```

##### createField

创建一个设置 field 实例

```
/**
 * 创建一个设置 field 实例
 * @param config
 * @returns
 * /createField(config: IPublicTypeFieldConfig): IPublicModelSettingField;
```

相关类型：[IPublicTypeFieldConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/field-config.ts)

##### getMockOrValue

获取值，当为变量时，返回 mock

```
/**
 * 获取值，当为变量时，返回 mock
 * @returns
 * /getMockOrValue(): any;
```

##### purge

销毁当前 field 实例

```
/**
 * 销毁当前 field 实例
 * /purge(): void;
```

##### remove

移除当前 field 实例

```
/**
 * 移除当前 field 实例
 * /remove(): void;
```

### 事件

##### onEffect

设置 autorun

```
/**
 * 设置 autorun
 * @param action
 * @returns
 * /onEffect(action: () => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

## SettingTopEntry
来源：[https://lowcode-engine.cn/site/docs/api/model/setting-top-entry](https://lowcode-engine.cn/site/docs/api/model/setting-top-entry)
SettingTopEntry

> **@types** [IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

### 基本介绍

setter 设置器顶层操作对象

### 属性

##### node

返回所属的节点实例

`@type {IPublicModelNode | null}`

### 方法

##### get

获取子级属性对象

```
/**
 * 获取子级属性对象
 * @param propName
 * @returns
 * /get(propName: string | number): IPublicModelSettingField | null;
```

相关章节：[设置器操作对象](https://lowcode-engine.cn/site/docs/api/model/setting-field)

相关类型：[IPublicModelSettingField](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-field.ts)

##### getPropValue

获取指定 propName 的值

```
/**
 * 获取指定 propName 的值
 * @param propName
 * @returns
 * /getPropValue(propName: string | number): any;
```

##### setPropValue

设置指定 propName 的值

```
/**
 * 设置指定 propName 的值
 * @param propName
 * @param value
 * /setPropValue(propName: string | number,   value: any): void;
```

##### clearPropValue

清除指定 propName 的值

```
/**
 * 清除指定 propName 的值
 * @param propName
 * /clearPropValue(propName: string | number): void;
```

## SimulatorRender
来源：[https://lowcode-engine.cn/site/docs/api/model/simulatorRender](https://lowcode-engine.cn/site/docs/api/model/simulatorRender)
SimulatorRender

> **@types** [IPublicModelSimulatorRender](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/simulator-render.ts)
> **@since** v1.0.0

### 基本介绍

画布节点选中模型

### 属性

#### components

画布组件列表

```
/**
 * 画布组件列表
 * /components: {

      [

        key: string
      
  ]

    : any;

    
  
}
```

### 方法

#### rerender

触发画布重新渲染

```
/**
 * 触发画布重新渲染
 * /rerender: () => void;
```

## ModalNodesManager
来源：[https://lowcode-engine.cn/site/docs/api/model/modal-nodes-manager](https://lowcode-engine.cn/site/docs/api/model/modal-nodes-manager)
ModalNodesManager

> **@types** [IPublicModelModalNodesManager](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/modal-nodes-manager.ts)
> **@since** v1.0.0

### 基本介绍

模态节点管理器模型

### 方法

#### setNodes

设置模态节点，触发内部事件

```
/**
 * 设置模态节点，触发内部事件
 * set modal nodes,   trigger internal events
 * /setNodes(): void;
```

#### getModalNodes

获取模态节点（们）

```
/**
 * 获取模态节点（们）
 * get modal nodes
 * /getModalNodes(): IPublicModelNode[

    
  
];
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### getVisibleModalNode

获取当前可见的模态节点

```
/**
 * 获取当前可见的模态节点
 * get current visible modal node
 * /getVisibleModalNode(): IPublicModelNode | null;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### hideModalNodes

隐藏模态节点（们）

```
/**
 * 隐藏模态节点（们）
 * hide modal nodes
 * /hideModalNodes(): void;
```

#### setVisible

设置指定节点为可见态

```
/**
 * 设置指定节点为可见态
 * set specific model node as visible
 * @param node IPublicModelNode
 * /setVisible(node: IPublicModelNode): void;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### setInvisible

设置指定节点为不可见态

```
/**
 * 设置指定节点为不可见态
 * set specific model node as invisible
 * @param node IPublicModelNode
 * /setInvisible(node: IPublicModelNode): void;
```

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

## EditorView
来源：[https://lowcode-engine.cn/site/docs/api/model/editor-view](https://lowcode-engine.cn/site/docs/api/model/editor-view)
EditorView

> **[@experimental](https://lowcode-engine.cn/site/docs/api/model/#experimental)**
> **@types** [IPublicModelEditorView](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/editor-view.ts)
> **@since** v1.1.7

窗口编辑视图

### 类型定义

```
import { IPublicModelPluginContext } from './plugin-context';

export interface IPublicModelEditorView extends IPublicModelPluginContext {}
```

相关类型定义: [IPublicModelPluginContext](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-context.ts)

## PluginInstance
来源：[https://lowcode-engine.cn/site/docs/api/model/plugin-instance](https://lowcode-engine.cn/site/docs/api/model/plugin-instance)
PluginInstance

> **@types** [IPublicModelPluginInstance](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-instance.ts)
> **@since** v1.1.0

### 基本介绍

插件实例

### 属性

#### pluginName

插件名字

`@type {string}`

#### dep

插件依赖

`@type {string[]}`

#### disabled

插件是否禁用

`@type {boolean}`

#### meta

插件 meta 信息

`@type {IPublicTypePluginMeta}`

相关类型：[IPublicTypePluginMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/plugin-meta.ts)

## Window
来源：[https://lowcode-engine.cn/site/docs/api/model/window](https://lowcode-engine.cn/site/docs/api/model/window)
Window

> **[@experimental](https://lowcode-engine.cn/site/docs/api/model/#experimental)**
> **@types** [IPublicModelWindow](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/window.ts)
> **@since** v1.1.0

### 基本介绍

低代码设计器窗口模型

### 属性

#### id

窗口唯一 id

`@type {string}`

#### title

窗口标题

`@type {string}`

#### icon

`@type {ReactElement}`

#### resource

窗口对应资源

`@type {IPublicModelResource}`

关联模型 [IPublicModelResource](https://lowcode-engine.cn/site/docs/api/model/resource)

#### currentEditorView

窗口当前视图

`@type {IPublicModelEditorView}`

关联模型 [IPublicModelEditorView](https://lowcode-engine.cn/site/docs/api/model/editor-view)

**@since v1.1.7**

#### editorViews

窗口所有视图

`@type {IPublicModelEditorView[]}`

关联模型 [IPublicModelEditorView](https://lowcode-engine.cn/site/docs/api/model/editor-view)

**@since v1.1.7**

### 方法

#### importSchema

当前窗口导入 schema, 会调用当前窗口对应资源的 import 钩子

```
function importSchema(schema: IPublicTypeNodeSchema): void;
```

相关类型：[IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### changeViewType

修改当前窗口视图类型

```
function changeViewType(viewName: string): void;
```

#### save

当前窗口的保存方法，会调用当前窗口对应资源的 save 钩子

```
function save(): Promise(void)
```

### 事件

#### onChangeViewType

窗口视图变更事件

```
onChangeViewType(fn: (viewName: string) => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

#### onSave

窗口视图保存事件

```
onSave(fn: () => void): IPublicTypeDisposable;
```

相关类型：[IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.7**

## DropLocation
来源：[https://lowcode-engine.cn/site/docs/api/model/drop-location](https://lowcode-engine.cn/site/docs/api/model/drop-location)
DropLocation

> **@types** [IPublicModelDropLocation](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/drop-location.ts)
> **@since** v1.1.0

### 基本介绍

拖拽放置位置模型

### 属性

#### target

拖拽放置位置目标

`@type {IPublicModelNode | null}`

相关类型：[IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

#### detail

拖拽放置位置详情

`@type {IPublicTypeLocationDetail}`

相关类型：[IPublicTypeLocationDetail](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/location-detail.ts)

#### event

拖拽放置位置对应的事件

`@type {IPublicTypeLocationDetail}`

相关类型：[IPublicModelLocateEvent](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/location-event.ts)

### 方法

#### clone

获取一份当前对象的克隆

```
/**
 * 获取一份当前对象的克隆
 * get a clone object of current dropLocation
 * /clone(event: IPublicModelLocateEvent): IPublicModelDropLocation;
```

相关类型：[IPublicModelLocateEvent](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/location-event.ts)

## Resource
来源：[https://lowcode-engine.cn/site/docs/api/model/resource](https://lowcode-engine.cn/site/docs/api/model/resource)
Resource

> **[@experimental](https://lowcode-engine.cn/site/docs/api/model/#experimental)**
> **@types** [IPublicModelResource](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/resource.ts)
> **@since** v1.1.0

### 属性

#### title

资源标题

`@type {string}`

#### id

资源 id

`@type {string}`

#### name

资源名字

`@type {string}`

#### type

资源类型

`@type {string}`

#### category

资源分类

`@type {string}`

#### icon

资源 icon

`@type {ReactElement}`

#### options

资源配置信息

`@type {Object}`

#### config

资源配置信息

`@type {Object}`

## Clipboard
来源：[https://lowcode-engine.cn/site/docs/api/model/clipboard](https://lowcode-engine.cn/site/docs/api/model/clipboard)
Clipboard

> **@types** [IPublicModelClipboard](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/clipboard.ts)
> **@since** v1.1.0

### 方法

#### setData

给剪贴板赋值

```
/**
 * 给剪贴板赋值
 * set data to clipboard
 * * @param {

    *
  
}

 data
 * @since v1.1.0
 * /setData(data: any): void;
```

#### waitPasteData

设置剪贴板数据设置的回调

```
/**
 * 设置剪贴板数据设置的回调
 * set callback for clipboard provide paste data
 * * @param {

    KeyboardEvent

}

 keyboardEvent
 * @param {

    (data: any,

     clipboardEvent: ClipboardEvent) => void

}

 cb
 * @since v1.1.0
 * /waitPasteData(    keyboardEvent: KeyboardEvent,      cb: (data: any,   clipboardEvent: ClipboardEvent) => void,    ): void;
```

## ComponentMeta
来源：[https://lowcode-engine.cn/site/docs/api/model/component-meta](https://lowcode-engine.cn/site/docs/api/model/component-meta)
ComponentMeta

> **@types** [IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)
> **@since** v1.0.0

### 基本介绍

组件元数据信息模型

### 属性

#### componentName

组件名

`@type {string}`

#### isContainer

是否是「容器型」组件

`@type {boolean}`

#### isMinimalRenderUnit

是否是最小渲染单元

当组件需要重新渲染时：

- 若为最小渲染单元，则只渲染当前组件，
- 若不为最小渲染单元，则寻找到上层最近的最小渲染单元进行重新渲染，直至根节点。

`@type {boolean}`

#### isModal

是否为「模态框」组件

`@type {boolean}`

#### configure

获取用于设置面板显示用的配置

`@type {IPublicTypeFieldConfig[]}`

相关类型：[IPublicTypeFieldConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/field-config.ts)

#### title

标题

`@type {string | IPublicTypeI18nData | ReactElement}`

相关类型：[IPublicTypeI18nData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/i18n-data.ts)

#### icon

图标

`@type {IPublicTypeIconType}`

相关类型：[IPublicTypeIconType](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/icon-type.ts)

#### npm

组件 npm 信息

`@type {IPublicTypeNpmInfo}`

相关类型：[IPublicTypeNpmInfo](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/npm-info.ts)

#### availableActions

获取元数据

`@type {IPublicTypeTransformedComponentMetadata}`

相关类型：[IPublicTypeTransformedComponentMetadata](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/transformed-component-metadata.ts)

#### advanced

组件元数据中高级配置部分

`@type {IPublicTypeAdvanced}`

相关类型：[IPublicTypeAdvanced](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/advanced.ts)

### 方法

#### setNpm

设置 npm 信息

```
/**
 * 设置 npm 信息
 * set method for npm inforamtion
 * @param npm
 * /setNpm(npm: IPublicTypeNpmInfo): void;
```

相关类型：[IPublicTypeNpmInfo](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/npm-info.ts)

#### getMetadata

获取元数据

```
/**
 * 获取元数据
 * get component metadata
 * /getMetadata(): IPublicTypeTransformedComponentMetadata;
```

相关类型：[IPublicTypeTransformedComponentMetadata](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/transformed-component-metadata.ts)

#### checkNestingUp

检测当前对应节点是否可被放置在父节点中

```
/**
 * 检测当前对应节点是否可被放置在父节点中
 * check if the current node could be placed in parent node
 * @param my 当前节点
 * @param parent 父节点
 * /checkNestingUp(my: IPublicModelNode | IPublicTypeNodeData,   parent: any): boolean;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)

#### checkNestingDown

检测目标节点是否可被放置在父节点中

```
/**
 * 检测目标节点是否可被放置在父节点中
 * check if the target node(s) could be placed in current node
 * @param my 当前节点
 * @param parent 父节点
 * /checkNestingDown(    my: IPublicModelNode | IPublicTypeNodeData,      target: IPublicTypeNodeSchema | IPublicModelNode | IPublicTypeNodeSchema[

    
  
],    ): boolean;
```

相关类型：

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)
- [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### refreshMetadata

刷新元数据，会触发元数据的重新解析和刷新

```
/**
 * 刷新元数据，会触发元数据的重新解析和刷新
 * refresh metadata
 * /refreshMetadata(): void;
```

## Dragon
来源：[https://lowcode-engine.cn/site/docs/api/model/dragon](https://lowcode-engine.cn/site/docs/api/model/dragon)
Dragon

> **@types** [IPublicModelDragon](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/dragon.ts)
> **@since** v1.0.0

### 基本介绍

拖拽对象

#### 对应接口

```
import { IPublicModelDragon } from '@alilc/lowcode-types';
```

#### 支持版本

**@since** v1.1.0

### 属性

#### dragging

是否正在拖动

```
/**
 * is dragging or not
 * /get dragging(): boolean;
```

### 方法

#### onDragstart

绑定 dragstart 事件

```
/**
 * 绑定 dragstart 事件
 * bind a callback function which will be called on dragging start
 * @param func
 * @returns
 * /onDragstart(func: (e: IPublicModelLocateEvent) => any): () => void;
```

#### onDrag

绑定 drag 事件

```
/**
 * 绑定 drag 事件
 * bind a callback function which will be called on dragging
 * @param func
 * @returns
 * /onDrag(func: (e: IPublicModelLocateEvent) => any): () => void;
```

#### onDragend

绑定 dragend 事件

```
/**
 * 绑定 dragend 事件
 * bind a callback function which will be called on dragging end
 * @param func
 * @returns
 * /onDragend(func: (o: {

     dragObject: IPublicModelDragObject;

     copy?: boolean

}) => any): () => void;
```

#### from

设置拖拽监听的区域 shell，以及自定义拖拽转换函数 boost

```
/**
 * 设置拖拽监听的区域 shell，以及自定义拖拽转换函数 boost* set a html element as shell to dragon as monitoring target,   and* set boost function which is used to transform a MouseEvent to type* IPublicTypeDragNodeDataObject.
 * @param shell 拖拽监听的区域
 * @param boost 拖拽转换函数
 * /from(shell: Element,   boost: (e: MouseEvent) => IPublicTypeDragNodeDataObject | null): any;
```

#### boost

发射拖拽对象

```
/**
 * 发射拖拽对象
 * boost your dragObject for dragging(flying)
 * * @param dragObject 拖拽对象
 * @param boostEvent 拖拽初始时事件
 * /boost(dragObject: IPublicTypeDragObject,   boostEvent: MouseEvent | DragEvent,   fromRglNode?: IPublicModelNode): void;
```

#### addSensor

添加投放感应区

```
/**
 * 添加投放感应区
 * add sensor area
 * /addSensor(sensor: any): void;
```

#### removeSensor

移除投放感应

```
/**
 * 移除投放感应
 * remove sensor area
 * /removeSensor(sensor: any): void;
```



# Lowcode Engine Guide 全文整理

来源：[https://lowcode-engine.cn/site/docs/guide/quickStart/intro](https://lowcode-engine.cn/site/docs/guide/quickStart/intro)

说明：按官方侧边栏目录顺序抓取正文全文，并按 Markdown 结构重新排版。

## 目录

- [阿里低代码引擎简介](#阿里低代码引擎简介)
- [试用低代码引擎 Demo](#试用低代码引擎-demo)
- [快速开始](#快速开始)
- [接入编辑器](#接入编辑器)
- [接入运行时](#接入运行时)
- [编辑态扩展简述](#编辑态扩展简述)
- [物料扩展](#物料扩展)
- [物料描述详解](#物料描述详解)
- [插件扩展 - 面板扩展](#插件扩展---面板扩展)
- [插件扩展 - 编排扩展](#插件扩展---编排扩展)
- [设置器扩展](#设置器扩展)
- [图编排扩展](#图编排扩展)
- [主题色扩展](#主题色扩展)
- [低代码生态脚手架 & 调试机制](#低代码生态脚手架-调试机制)
- [介绍](#介绍)
- [低代码组件](#低代码组件)
- [React 组件导入](#react-组件导入)
- [资产包管理](#资产包管理)
- [使用渲染模块](#使用渲染模块)
- [使用出码功能](#使用出码功能)
- [架构综述](#架构综述)
- [协议栈简介](#协议栈简介)
- [入料模块设计](#入料模块设计)
- [编排模块设计](#编排模块设计)
- [渲染模块设计](#渲染模块设计)
- [出码模块设计](#出码模块设计)
- [设置器设计](#设置器设计)
- [数据源引擎设计](#数据源引擎设计)
- [名词解释](#名词解释)
- [搭建组件协议结构](#搭建组件协议结构)
- [低代码仓库列表](#低代码仓库列表)
- [NPM 包对应源码位置汇总](#npm-包对应源码位置汇总)
- [预置设置器列表](#预置设置器列表)

## 阿里低代码引擎简介
来源：[https://lowcode-engine.cn/site/docs/guide/quickStart/intro](https://lowcode-engine.cn/site/docs/guide/quickStart/intro)
### 低代码介绍

零代码、低代码的概念在整个全球行业内已经流行了很长一段时间。通常意义上的低代码定义会有三个关键点：

1. 一个用于生产软件的可视化编辑器
2. 中间包含了一些用于组装的物料，可以通过编排、组合和配置它们以生成丰富的功能或表现
3. 最后的实施结果是成本降低

通常情况下低代码平台会具备以下的几个能力：

- **可视化页面搭建** ，通过简单的拖拽完成应用页面开发，对前端技能没有要求或不需要特别专业的了解；
- **可视化模型设计** ，与业务相关的数据存储变得更容易理解，甚至大多数简单场景可以做到表单即模型，模型字段的类型更加业务化；
- **可视化流程设计** ，不管是业务流程还是审批流程，都可以通过简单的点线连接来进行配置；
- **可视化报表及数据分析** ，BI 数据分析能力成为标配，随时随地通过拖拽选择来定义自定义分析报表；
- **可视化服务与数据开放、集成** ，具备与其他系统互联互通的配置；
- **权限、角色设置标准化和业务化** ，通过策略规则配置来将数据、操作的权限进行精细化管理；
- **无需关心服务器、数据库等底层运维、计算设施设备、网络等等复杂技术概念** ，具备安全、性能的统一解决方案，开发者只需要专注于业务本身；

有了上面这些，你会发现即使是个技术小白，只要你了解业务，就能不受束缚的完成大多数业务应用的搭建。但低代码本身也不仅仅是为技术小白准备的。在实践中，低代码因为通过组件化、模块化的思路让业务的抽象更加容易，而且在扩展及配置化上带来了更加新鲜的模式探索，技术人员的架构设计成本和实施成本也就降了很多。

市面上常见的低代码产品[可以看 Golden 的梳理](https://golden.com/wiki/No-code_%2F_low-code_development-NMGMEA6)。

### 低代码引擎介绍

**低代码引擎是一款为低代码平台开发者提供的，具备强大定制扩展能力的低代码设计器研发框架。**

下面简单描述定义中的子部分：

**低代码设计器**
现如今低代码平台越来越多，而每一个低代码平台中都会有的一个能力就是搭建和配置页面、模块的页面，这个页面我们称为设计器。例如，下图是中后台低代码平台的设计器。

设计器承载着低代码平台的核心功能，包括入料、编排、组件配置、画布渲染等等。由于其功能多，打磨精细难，也是低代码平台建设最耗时的地方。

**定制扩展能力**

什么是扩展能力呢，一方面我们可以快速拥有一份标准的低代码设计器，另外一方面如果有业务独特的功能需要，我们可以不用看它的源码、不用关心其实现，可以使用 API、插件等方式快速完成能力的开发。
而低代码引擎对于设计器的扩展能力支持基本上覆盖了低代码设计器的所有功能点。下图是针对标准的设计器提供了扩展功能的区域。

**低代码设计器研发框架**

低代码引擎的核心是设计器，通过扩展、周边生态等可以产出各式各样的设计器。它不是一套可以适合所有人的低代码平台，而是帮助低代码平台的开发者，快速生产低代码平台的工具。

### 寻找适合您的低代码解决方案

帮助用户根据个人或企业需求选择合适的低代码产品。

| 特性/产品 | 低代码引擎 | Lab平台 | UIPaaS |
| --- | --- | --- | --- |
| **适用用户** | 前端开发者 | 需要快速搭建应用/页面的用户 | 企业用户，需要大规模部署低代码解决方案的组织 |
| **产品特点** | 设计器研发框架，适合定制开发 | 低代码平台, 可视化操作界面，易于上手 | 低代码平台孵化器，企业级功能 |
| **使用场景** | 定制和开发低代码平台的设计器部分 | 通过可视化, 快速开发应用或页面 | 帮助具有一定规模软件研发团队的的企业低成本定制低代码平台 |
| **产品关系** | 开源产品 | 基于UIPaaS技术实现, 展示了UIPaaS的部分能力 | 提供完整的低代码平台解决方案，商业产品 |
| **收费情况** | 免费 | 可免费使用（有额度限制），不提供私有化部署售卖 | 仅提供私有化部署售卖 |
| **官方网站** | [低代码引擎官网](https://lowcode-engine.cn/) | [Lab平台官网](https://lab.lowcode-engine.cn/) | [UIPaaS官网](https://uipaas.net/) |

*注：请根据您的具体需求和条件选择合适的产品。如需更详细的信息，请访问各产品的官方网站。*

## 试用低代码引擎 Demo
来源：[https://lowcode-engine.cn/site/docs/guide/quickStart/demo](https://lowcode-engine.cn/site/docs/guide/quickStart/demo)
试用低代码引擎 Demo

### 访问地址

低代码引擎的 Demo 可以通过如下永久链接访问到：

[设计器 demo](https://lowcode-engine.cn/demo/demo-general/index.html)

> 注意我们会经常更新 demo，所以您可以通过上述链接得到最新版地址。

### 低代码引擎 Demo 功能概览

我们可以从 Demo 的项目中看到页面中有很多的区块：

它主要包含这些功能点：

#### 顶部：操作区

- 右侧：撤回和重做、保存到本地、重置页面、预览、异步加载资源

#### 左侧：面板与操作区

- 大纲面板：可以调整页面内的组件树结构
- 物料面板：可以查找组件，并在此拖动组件到编辑器画布中
- 源码面板：可以编辑页面级别的 JavaScript 代码和 CSS 配置
- 提交 Issue：可以给引擎开发提 bug
- Schema 编辑：可以编辑页面的底层数据
- 中英文切换：可以切换编辑器的语言

#### 中部：可视化页面编辑画布区域

- 点击组件在右侧面板中能够显示出对应组件的属性配置选项
- 拖拽修改组件的排列顺序
- 将组件拖拽到容器类型的组件中
- 复制组件：点击组件右上角的复制按钮
- 删除组件：点击组件右上角的 X 或者直接使用 `Delete` 键

#### 右侧：组件级别配置

- 选中的组件：从页面开始一直到当前选中的组件位置，点击对应的名称可以切换到对应的组件上
- 选中组件的配置：当前组件的大类目选项，根据组件类型不同，包含如下子类目：
  - 属性：组件的基础属性值设置
  - 样式：组件的样式配置
  - 事件：绑定组件对外暴露的事件
  - 高级：循环、条件渲染与 key 设置

### 深入使用低代码引擎 Demo

我们在低代码引擎 Demo 中直接内置了产品使用文档，对常见场景中的使用进行了向导，它的入口如下：

如果暂时没有看到对应的产品使用文档，可以通过此永久链接直接访问：[https://lowcode-engine.cn/site/docs/demoUsage/intro](https://lowcode-engine.cn/site/docs/demoUsage/intro)

## 快速开始
来源：[https://lowcode-engine.cn/site/docs/guide/quickStart/start](https://lowcode-engine.cn/site/docs/guide/quickStart/start)
快速开始

### 前置知识

我们假定你已经对 HTML 和 JavaScript 都比较熟悉了。即便你之前使用其他编程语言，你也可以跟上这篇教程的。除此之外，我们假定你也已经熟悉了一些编程的概念，例如，函数、对象、数组，以及 class 的一些内容。

如果你想回顾一下 JavaScript，你可以阅读[这篇教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript)。注意，我们也用到了一些 ES6（较新的 JavaScript 版本）的特性。在这篇教程里，我们主要使用了[箭头函数（arrow functions）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)、[class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)、[let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 语句和 [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 语句。你可以使用 [Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA) 在线预览 ES6 的编译结果。

### 环境准备

#### WSL（Windows 电脑）

Window 环境需要使用 WSL 在 windows 下进行低代码引擎相关的开发。安装教程 ➡️ [WSL 安装教程](https://docs.microsoft.com/zh-cn/windows/wsl/install)。**对于 Window 环境来说，之后所有需要执行命令的操作都是在 WSL 终端执行的。**

#### Node

node 版本推荐 16.18.0。

##### 查看 Node 版本

##### 通过 n 来管理 node 版本

可以安装 [n](https://www.npmjs.com/package/n) 来管理和变更 node 版本。

###### 安装 n

```
npm install -g n
```

###### 变更 node 版本

```
n 14.17.0
```

#### React

低代码引擎的扩展能力都是基于 React 来研发的，在继续阅读之前最好有一定的 React 基础，React 学习教程 ➡️ [React 快速开始教程](https://zh-hans.reactjs.org/docs/getting-started.html)。

#### 下载 Demo

可以前往 github（[https://github.com/alibaba/lowcode-demo](https://github.com/alibaba/lowcode-demo)）将 DEMO 下载到本地。

##### git clone

###### HTTPS

需要使用到 git 工具

```
git clone https://github.com/alibaba/lowcode-demo.git
```

###### SSH

需要配置 SSH key，如果没有配置可以

```
git clone git@github.com:alibaba/lowcode-demo.git
```

##### 下载 Zip 包

#### 选择一个 demo 项目

在 以 `demo-general` 为例：

```
cd demo-general
```

#### 安装依赖

在 `lowcode-demo/demo-general` 目录下执行：

```
npm install
```

#### 启动 demo

在 `lowcode-demo/demo-general` 目录下执行：

```
npm run start
```

之后就可以通过 [http://localhost:5556/](http://localhost:5556/) 来访问我们的 DEMO 了。

### 认识 Demo

我们的 Demo 是一个**低代码平台的设计器**。它是一个低代码平台中最重要的一环，用户可以在这里通过拖拽、配置、写代码等等来完成一个页面的开发。由于用户的人群不同、场景不同、诉求不同等等，这个页面的功能就会有所差异。

这里记住**设计器**这个词，它描述的就是下面的这个页面，后面我们会经常看到它。

#### 场景介绍

Demo 根据**不同的设计器所需要的物料不同**，分为了下面的 8 个场景：

- 综合场景
- 基础 fusion 组件
- 基础 fusion 组件 + 单自定义组件
- 基础 antd 组件
- 自定义初始化引擎
- 扩展节点操作项
- 基于 next 实现的高级表单低代码物料
- antd 高级组件 + formily 表单组件

可以点开不同的场景，看看他们使用的物料。

#### 目录介绍

仓库下每个 demo-xxx-xxx 目录都是一个可独立运行的 demo 工程，分别对应到刚刚介绍的场景。

不同场景的目录结构实际上都是类似的，这里我们主要介绍一下综合场景的目录结构即可。

介绍下其中主要的内容

- 设计器入口文件 `src/index.ts` 这个文件做了下述几个事情：
  - 通过 plugins.register 注册各种插件，包括官方插件 (已发布 npm 包形式的插件) 和 `plugins` 目录下内置的示例插件
  - 通过 init 初始化低代码设计器
- plugins 目录，存放的都是示例插件，方便用户从中看到一个插件是如何实现的
- services 目录，模拟数据请求、提供默认 schema、默认资产包等，此目录下内容在真实项目中应替换成真实的与服务端交互的服务。
- 预览页面入口文件 `preview.tsx`

剩下的各位看官可以通过源码来进一步了解。

做了这些事情之后，我们的低代码设计器就已经有了基本的能力了。也就是最开始我们看到的这样。

接下来我们就根据我们自己的诉求通过对设计器进行扩展，改动成我们需要的设计器功能。

### 开发一个插件

#### 方式 1：在 DEMO 中直接新增插件

可以在 demo/sample-plugins 直接新增插件，这里我新增的插件目录是 plugin-demo。并且新增了 index.tsx 文件，将下面的代码粘贴到 index.tsx 中。

```
import * as React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
const LowcodePluginPluginDemo = (ctx: IPublicModelPluginContext) => {
  return {
    /* 插件对外暴露的数据和方法 */ exports() {
      return {
        data: '你可以把插件的数据这样对外暴露',
        func: () => {
          console.log('方法也是一样');
        },
      };
    },
    /* 插件的初始化函数，在引擎初始化之后会立刻调用 */ init() {
      /* 你可以拿到其他插件暴露的方法和属性 // const { data, func } = ctx.plugins.pluginA; */ /* func(); */ /* console.log(options.name); */ /* 往引擎增加面板 */ ctx.skeleton.add(
        {
          area: 'leftArea',
          name: 'LowcodePluginPluginDemoPane',
          type: 'PanelDock',
          props: { description: 'Demo' },
          content: <div>这是一个 Demo 面板</div>,
        },
      );
      ctx.logger.log('打个日志');
    },
  };
};
/* 插件名，注册环境下唯一 */ LowcodePluginPluginDemo.pluginName = 'LowcodePluginPluginDemo';
LowcodePluginPluginDemo.meta = {
  /* 依赖的插件（插件名数组） */ dependencies: [],
  engines: { lowcodeEngine: '^1.0.0' /* 插件需要配合 ^1.0.0 的引擎才可运行 */ },
};
export default LowcodePluginPluginDemo;
```

在 src/index.ts 中新增下面代码

这样在我们的设计器中就新增了一个 Demo 面板。

#### 方式 2：在新的仓库下开发插件

初始化

```
npm init @alilc/element your-plugin-name
```

选择设计器插件（plugin）

根据操作完善信息

插件项目就初始化完成了

在插件项目下安装依赖

```
npm install
```

启动项目

```
npm run start
```

调试项目

在 Demo 中调试项目

在 build.json 下面新增 "inject": true，就可以在 [https://lowcode-engine.cn/demo/demo-general/index.html?debug](https://lowcode-engine.cn/demo/demo-general/index.html?debug) 页面下进行调试了。

### 开发一个自定义物料

#### 初始化物料

```
npm init @alilc/element your-material-demo
```

选择组件/物料栏

配置其他信息

这样我们就初始化好了一个 React 物料。

#### 启动并调试物料

##### 安装依赖

```
npm i
```

##### 启动

```
npm run lowcode:dev
```

我们就可以通过 [http://localhost:3333/](http://localhost:3333/) 看到我们的研发的物料了。

##### 在 Demo 中调试

```
npm i @alilc/build-plugin-alt
```

修改 build.lowcode.js

如图，新增如下代码

```
[

      '@alilc/build-plugin-alt',

      {

            type: 'component',

            inject: true,

            library,

            // 配置要打开的页面，在注入调试模式下，不配置此项的话不会打开浏览器    // 支持直接使用官方 demo 项目：https: //lowcode-engine.cn/demo/index.html
        openUrl: 'https://lowcode-engine.cn/demo/index.html?debug',

  },

],
```

我们重新启动项目，就可以在 Demo 中找到我们的自定义组件。

#### 发布

首先进行构建

```
npm run lowcode:build
```

发布组件

```
npm publish
```

这里我发布的组件是 [my-material-demo](https://www.npmjs.com/package/my-material-demo)。在发布之后我们就会有两个重要的文件：

- 低代码描述： [https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js](https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js)
- 组件代码： [https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js](https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js)

我们也可以从 [https://unpkg.com/my-material-demo@0.1.0/build/lowcode/assets-prod.json](https://unpkg.com/my-material-demo@0.1.0/build/lowcode/assets-prod.json) 找到我们的资产包描述。

```
{
  "packages": [
    {
      "package": "my-material-demo",

      "version": "0.1.0",

      "library": "BizComp",

      "urls": [
        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js",

        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.css"
      ],

      "editUrls": [
        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/view.js",

        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/view.css"
      ],

      "advancedUrls": {
        "default": [
          "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js",

          "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.css"
        ]
      },

      "advancedEditUrls": {}
    }
  ],

  "components": [
    {
      "exportName": "MyMaterialDemoMeta",

      "npm": {
        "package": "my-material-demo",

        "version": "0.1.0"
      },

      "url": "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js",

      "urls": {
        "default": "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js"
      },

      "advancedUrls": {
        "default": ["https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js"]
      }
    }
  ]
}
```

#### 使用

我们将刚刚发布的组件的 assets-prod.json 的内容放到 demo 的 src/universal/assets.json 中。

> 最好放到最后，防止因为资源加载顺序问题导致出现报错。

如图，新增 packages 配置

如图，新增 components 配置

这时候再启动 DEMO 项目，就会有新的低代码物料了。接下来就按照你们的需求，继续扩展物料吧。

### 总结

这里只是简单的介绍了一些低代码引擎的基础能力，带大家简单的对低代码 DEMO 进行扩展，定制一些新的功能。低代码引擎的能力还有很多很多，可以继续去探索更多的功能。

## 接入编辑器
来源：[https://lowcode-engine.cn/site/docs/guide/create/useEditor](https://lowcode-engine.cn/site/docs/guide/create/useEditor)
接入编辑器

您有两种方式初始化低代码编辑器：

1. clone 低代码项目的官方 demo，直接启动项目。适合普通人。
2. 手工引入低代码 UMD 包，手工配置、打包和启动。适合 Webpack 配置工程师。

### 方法 1：通过官方命令行工具创建编辑器

1. 确保本地安装了 Node.js 和 npm，如果没有，[您可以通过 nvm 进行快捷的安装](https://github.com/nvm-sh/nvm)
2. 确保为 npm [设置了可以访问的 npm 源，保证安装过程无网络问题](https://npmmirror.com/)
3. 安装官方命令行工具 ```
npm install -g @alilc/create-element@latest
```
4. 通过命令行工具创建 ```
npm init @alilc/element editor-project-name
``` 这时会看到一个选项列表 选择`编辑器`，并填写对应的问题，即可完成创建。 > 注 @alilc/create-element 版本需 >= 1.0.4，若看不到`编辑器`选项，请重新执行步骤 3
5. 进入创建后的目录 ```
cd editor-project-name
```
6. 安装依赖 ```
npm install
```
7. 安装依赖成功后，启动项目 (注意观察上一步的输出，如有 error 等失败信息，请先进行排查) ```
npm start
``` 执行后如果看到这个界面，说明项目启动成功。您可以继续看后续章节了。本章节后续内容均为高级配置方式。

### 方法 2: 使用 UMD 包方式配置

如果您不是从零开始的项目，您可能需要手工引入低代码引擎。

#### 引入 UMD 包资源

我们需要在启动前，正确在项目中通过 UMD 包方式直接依赖如下内容：

> 亦可使用异步加载工具，如果您按照正确的顺序进行加载

```
<!-- 低代码引擎的页面框架样式 -->
<link
  rel="stylesheet"
  href="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.0.18/dist/css/engine-core.css"
/>
<!-- Fusion Next 控件样式 -->
<link rel="stylesheet" href="https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.css" />
<!-- 低代码引擎的页面主题样式，可以替换为 theme-lowcode-dark -->
<link
  rel="stylesheet"
  href="https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light/0.2.0/next.min.css"
/>
<!-- 低代码引擎官方扩展的样式 -->
<link
  rel="stylesheet"
  href="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.5/dist/css/engine-ext.css"
/>
<!-- React，可替换为 production 包 -->
<script src="https://g.alicdn.com/code/lib/react/16.14.0/umd/react.development.js">
</script>
<!-- React DOM，可替换为 production 包 -->
<script src="https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.development.js">
</script>
<!-- React 向下兼容，预防物料层的依赖 -->
<script src="https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js">
</script>
<script src="https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js">
</script>
<!-- lodash，低代码编辑器的依赖 -->
<script src="https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js">
</script>
<!-- 日期处理包，Fusion Next 的依赖 -->
<script src="https://g.alicdn.com/code/lib/moment.js/2.29.1/moment-with-locales.min.js">
</script>
<!-- Fusion Next 的主包，低代码编辑器的依赖 -->
<script src="https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js">
</script>
<!-- 低代码引擎的主包 -->
<script
  crossorigin="anonymous"
  src="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.0.18/dist/js/engine-core.js"
>
</script>
<!-- 低代码引擎官方扩展的主包 -->
<script
  crossorigin="anonymous"
  src="https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine-ext/1.0.5/dist/js/engine-ext.js"
>
</script>
```

> 注：如果 unpkg 的服务比较缓慢，您可以使用官方 CDN 来获得确定版本的低代码引擎，如对于引擎的 1.0.18 版本，可用以下官方 CDN 替代
>
>   - [https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.0.18/dist/js/engine-core.js](https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.0.18/dist/js/engine-core.js)

#### 配置打包

因为这些资源已经通过 UMD 方式引入，所以在 webpack 等构建工具中需要配置它们为 external，不再重复打包：

```
{
  "externals": {
    "react": "var window.React",

    "react-dom": "var window.ReactDOM",

    "prop-types": "var window.PropTypes",

    "@alifd/next": "var window.Next",

    "@alilc/lowcode-engine": "var window.AliLowCodeEngine",

    "@alilc/lowcode-engine-ext": "var window.AliLowCodeEngineExt",

    "moment": "var window.moment",

    "lodash": "var window._"
  }
}
```

#### 初始化低代码编辑器

正确引入后，我们可以直接通过 window 上的变量进行引用，如 `window.AliLowCodeEngine.init`。您可以直接通过此方式初始化低代码引擎：

```
// 确保在执行此命令前，在 <body> 中已有一个 id 为 lce-container 的 <div />window.
AliLowCodeEngine.init(document.getElementById('lce-container'),   {

    enableCondition: true,

      enableCanvasLock: true,

    
  
});
```

如果您的项目中使用了 TypeScript，您可以通过如下 devDependencies 引入相关包，并获得对应的类型推断。

```
// package.json{

      "devDependencies": {

            "@alilc/lowcode-engine": "^1.0.0"  
      
  }

    
  
}
```

```
// src/index.tsximport {

     init 
  
}
 from '@alilc/lowcode-engine';

init(document.getElementById('lce-container'),   {

    enableCondition: true,

      enableCanvasLock: true,

    
  
});
```

init 的功能包括但不限于：

1. 传递 options 并设置 config 对象；
2. 传递 preference 并设置 plugins 入参；
3. 初始化 Workbench；

> 本节中的低代码编辑器例子可以在 demo 中找到：[https://github.com/alibaba/lowcode-demo/blob/main/demo-general/src/index.ts](https://github.com/alibaba/lowcode-demo/blob/main/demo-general/src/index.ts)

### 配置低代码编辑器

详见[低代码扩展简述](https://lowcode-engine.cn/site/docs/guide/expand/editor/summary)章节。

## 接入运行时
来源：[https://lowcode-engine.cn/site/docs/guide/create/useRenderer](https://lowcode-engine.cn/site/docs/guide/create/useRenderer)
接入运行时

低代码引擎的编辑器将产出两份数据：

- 资产包数据 assets：包含物料名称、包名及其获取方式，对应协议中的 [《低代码引擎资产包协议规范》](https://lowcode-engine.cn/site/docs/specs/assets-spec)
- 页面数据 schema：包含页面结构信息、生命周期和代码信息，对应协议中的 [《低代码引擎搭建协议规范》](https://lowcode-engine.cn/site/docs/specs/lowcode-spec)

经过上述两份数据，可以直接交由渲染模块或者出码模块来运行，二者的区别在于：

- 渲染模块：使用资产包数据、页面数据和低代码运行时，并且允许维护者在低代码编辑器中用 `低代码（LowCode）` 的方式继续维护；
- 出码模块：不依赖低代码运行时和页面数据，直接生成可直接运行的代码，并且允许维护者用 `源码（ProCode）` 的方式继续维护，但无法再利用低代码编辑器；

> 渲染和出码的详细阐述可参考此文：[低代码技术在研发团队的应用模式探讨](https://mp.weixin.qq.com/s/Ynk_wjJbmNw7fEG6UtGZbQ)

### 渲染模块

[在 Demo 中](https://lowcode-engine.cn/demo/demo-general/index.html)，右上角有渲染模块的示例使用方式：

基于官方提供的渲染模块 [@alilc/lowcode-react-renderer](https://github.com/alibaba/lowcode-engine/tree/main/packages/react-renderer)，你可以在 React 上下文渲染低代码编辑器产出的页面。

#### 构造渲染模块所需数据

渲染模块所需要的数据需要通过编辑器产出的数据进行一定的转换，规则如下：

- schema：从编辑器产出的 projectSchema 中拿到 componentsTree 中的首项，即 `projectSchema.componentsTree[0]` ；
- components：需要根据编辑器产出的资产包 assets 中，根据页面 projectSchema 中声明依赖的 componentsMap，来加载所有依赖的资产包，最后获取资产包的实例并生成物料 - 资产包的键值对 components。

这个过程可以参考 demo 项目中的 `src/preview.tsx`：

```
async function getSchemaAndComponents() {
  const packages = JSON.parse(window.localStorage.getItem('packages') || '');

  const projectSchema = JSON.parse(window.localStorage.getItem('projectSchema') || '');

  const {
    componentsMap: componentsMapArray,

    componentsTree,
  } = projectSchema;

  const componentsMap: any = {};

  componentsMapArray.forEach((component: any) => {
    componentsMap[component.componentName] = component;
  });

  const schema = componentsTree[0];

  const libraryMap = {};

  const libraryAsset = [];

  packages.forEach(
    ({
      package: _package,

      library,

      urls,

      renderUrls,
    }) => {
      libraryMap[_package] = library;

      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    },
  );

  const vendors = [
    assetBundle(
      libraryAsset,

      AssetLevel.Library,
    ),
  ];

  const assetLoader = new AssetLoader();

  await assetLoader.load(libraryAsset);

  const components = await injectComponents(
    buildComponents(
      libraryMap,

      componentsMap,
    ),
  );

  return {
    schema,

    components,
  };
}
```

#### 进行渲染

拿到 schema 和 components 以后，您可以借由资产包数据和页面数据来完成页面的渲染：

```
import React from 'react';

import ReactRenderer from '@alilc/lowcode-react-renderer';

const SamplePreview = () => {
  return <ReactRenderer schema={schema} components={components} />;
};
```

> 注 1：您可以注意到，此处是依赖了 React 进行渲染的，对于 Vue 形态的渲染或编辑器支持，详见[对应公告](https://github.com/alibaba/lowcode-engine/issues/236)。
>
> 注 2：本节示例可在 Demo 代码里找到更完整的版本：[https://github.com/alibaba/lowcode-demo/blob/main/demo-general/src/preview.tsx](https://github.com/alibaba/lowcode-demo/blob/main/demo-general/src/preview.tsx)

### 出码模块

[在 Demo 中](https://lowcode-engine.cn/demo/demo-general/index.html)，右上角有出码模块的示例使用方式：

> 本节示例可在出码插件里找到：[https://github.com/alibaba/lowcode-code-generator-demo](https://github.com/alibaba/lowcode-code-generator-demo)

### 低代码的生产和消费流程总览

经过“接入编辑器” - “接入运行时”这两节的介绍，我们已经可以了解到低代码所构建的生产和消费流程了，梳理如下图：

如上述流程所示，您一般需要一个后端项目来保存页面数据信息，如果资产包信息是动态的，也需要保存资产包信息。

## 编辑态扩展简述
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/summary](https://lowcode-engine.cn/site/docs/guide/expand/editor/summary)
编辑态扩展简述

### 扩展点简述

我们可以从 Demo 的项目中看到页面中有很多的区块：

这些功能点背后都是可扩展项目，如下图所示：

- 插件定制：可以配置低代码编辑器的功能和面板
- 物料定制：可以配置能够拖入的物料
- 操作辅助区定制：可以配置编辑器画布中的操作辅助区功能
- 设置器定制：可以配置编辑器中组件的配置表单

我们从可扩展项目的视角，可以把低代码引擎架构理解为下图：

（注：引擎内核中大量数据交互的细节被简化，这张图仅仅强调编辑器和外部扩展的交互）

### 配置扩展点

#### 配置物料

通过配置注入物料，这里的配置是物料中心根据物料资产包协议生成的，后面“物料扩展”章节会有详细说明。

```
import { material } from '@alilc/lowcode-engine';
import assets from './assets.json';

// 假设您已把物料配置在本地，静态加载 assets
material.setAssets(assets);
```

也可以通过异步加载物料中心上的物料。

```
import { material, plugins } from '@alilc/lowcode-engine';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';

// 动态加载 assets
plugins
  .register((ctx: IPublicModelPluginContext) => {
    return {
      name: 'ext-assets',
      async init() {
        try {
          // 将下述链接替换为您的物料即可。无论是通过 utils 从物料中心引入，还是通过其他途径如直接引入物料描述
          const res = await window.fetch(
            'https://fusion.alicdn.com/assets/default@0.1.95/assets.json',
          );
          const assets = await res.text();
          material.setAssets(assets);
        } catch (err) {
          console.error(err);
        }
      },
    };
  })
  .catch((err) => console.error(err));
```

#### 配置插件

可以通过 npm 包的方式引入社区插件，配置如下所示：

```
import { plugins } from '@alilc/lowcode-engine';

import { IPublicModelPluginContext } from '@alilc/lowcode-types';

import PluginIssueTracker from '@alilc/lowcode-plugin-issue-tracker';

// 注册一个提 issue 组件到您的编辑器中，方位默认在左栏下侧plugins.register(PluginIssueTracker)  .catch(err => console.error(err));
```

后续“插件扩展”章节会详细说明。

#### 配置设置器

低代码引擎默认内置了设置器（详见“配置设置器”章节）。您可以通过 npm 包的方式引入自定义的设置器，配置如下所示：

```
import { setters } from '@alilc/lowcode-engine'; /* 假设您自定义了一个 setterimport MuxMonacoEditorSetter from './components/setters/MuxMonacoEditorSetter'; */ /* 注册设置器setters.registerSetter({ MuxMonacoEditorSetter: { component: MuxMonacoEditorSetter, title: 'Textarea', condition: (field) => { const v = field.getValue() return typeof v === 'string' }, }, }); */
```

后续“设置器扩展”章节会详细说明。

> 本章节所有可扩展配置内容在 demo 中均可找到：[https://github.com/alibaba/lowcode-demo/tree/main/demo-general](https://github.com/alibaba/lowcode-demo/tree/main/demo-general)

## 物料扩展
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/material](https://lowcode-engine.cn/site/docs/guide/expand/editor/material)
物料扩展

### 物料简述

物料是页面搭建的原料，按照粒度可分为组件、区块和模板：

1. 组件：组件是页面搭建最小的可复用单元，其只对外暴露配置项，用户无需感知其内部实现；
2. 区块：区块是一小段符合低代码协议的 schema，其内部会包含一个或多个组件，用户向设计器中拖入一个区块后可以随意修改其内部内容；
3. 模板：模板和区块类似，也是一段符合低代码协议的 schema，不过其根节点的 componentName 需固定为 Page，它常常用于初始化一个页面；

低代码编辑器中的物料需要进行一定的配置和处理，才能让用户在低代码平台使用起来。这个过程中，需要一份一份配置文件，也就是资产包。资产包文件中，针对每个物料定义了它们在低代码编辑器中的使用描述。

### 资产包配置

#### 什么是低代码资产包

在低代码 Demo 中，我们可以看到，组件面板不只提供一个组件，组件是以集合的形式提供给低代码平台的，而低代码资产包正是这些组件构成集合的形式。
***它背后的 Interface，***[在引擎中的定义摘抄如下](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/assets.ts)***：***

```
export interface Assets {

      version: string;

     // 资产包协议版本号
    packages?: Array<Package>;

     // 大包列表，external 与 package 的概念相似，融合在一起
    components: Array<ComponentDescription> | Array<RemoteComponentDescription>;

     // 所有组件的描述协议列表
    sort: ComponentSort;

     // 新增字段，用于描述组件面板中的 tab 和 category

}

export interface ComponentSort {

    groupList?: String[

  ];

     // 用于描述组件面板的 tab 项及其排序，例如：[

        "精选组件",

         "原子组件"

  ]

    categoryList?: String[

  ];

     // 组件面板中同一个 tab 下的不同区间用 category 区分，category 的排序依照 categoryList 顺序排列；

}

export interface RemoteComponentDescription {

    exportName: string;

     // 组件描述导出名字，可以通过 window[

        exportName

  ]

     获取到组件描述的 Object 内容；
    url: string;

     // 组件描述的资源链接；
    package: {

         // 组件 (库) 的 npm 信息；
        npm: string;

  }

}
```

资产包协议 TS 描述

#### Demo 中的资产包

在 Demo 项目中，自带了一份默认的资产包：

> [https://github.com/alibaba/lowcode-demo/blob/main/demo-general/src/services/assets.json](https://github.com/alibaba/lowcode-demo/blob/main/demo-general/src/services/assets.json)

这份资产包里的物料是我们内部沉淀出的，用户可以通过这套资产包体验引擎提供的搭建、配置能力。
***在项目中正常注册资产包：***

```
import { material } from '@alilc/lowcode-engine';

// 以任何方式引入 assetsmaterial.setAssets(assets);
```

***以支持调试的方式注册资产包：***

> 这样启动并部署出来的项目，可以通过在预览地址加上 ?debug 来调试本地物料。
> 例如：
>
>   - 通过插件初始化一个物料
>   - 按照参考文章配置物料支持调试
>   - 启动物料
>   - 访问： [https://lowcode-engine.cn/demo/demo-general/index.html?debug](https://lowcode-engine.cn/demo/demo-general/index.html)
>
> 详细参考：[低代码生态脚手架 & 调试机制](https://lowcode-engine.cn/site/docs/guide/expand/editor/cli)

```
import { material } from '@alilc/lowcode-engine';

import Inject, { injectAssets } from '@alilc/lowcode-plugin-inject';

await material.setAssets(await injectAssets(assets));
```

#### 手工配置资产包

参考 Demo 中的[基础 Fusion Assets 定义](https://github.com/alibaba/lowcode-demo/blob/main/demo-basic-fusion/src/services/assets.json)，如果我们修改 assets.json，我们就能做到配置资产包：

- packages 对象：我们需要在其中定义这个包的获取方式，如果不定义，就不会被低代码引擎动态加载并对应上组件实例。定义方式是 UMD 的包，低代码引擎会尝试在 window 上寻找对应 library 的实例；
- components 对象：我们需要在其中定义物料描述，物料描述我们将在下一节继续讲解。

### 物料描述配置

#### 什么是物料描述

在低代码平台中，用户是不同的，有可能是开发、测试、运营、设计，也有可能是销售、行政、HR 等等各种角色。他们大多数不具备专业的前端开发知识，对于低代码平台来说，我们使用组件的流程如下：

1. 用户通过拖拽/选择组件，在画布中看到组件；
2. 选中组件，出现组件的配置项；
3. 修改组件配置项；
4. 画布更新生效。

***当我们选中一个组件，我们可以看到面板右侧会显示组件的配置项。***

***它包含以下内容：***

1. 基础信息：描述组件的基础信息，通常包含包信息、组件名称、标题、描述等。
2. 组件属性信息：描述组件属性信息，通常包含参数、说明、类型、默认值 4 项内容。
3. 能力配置/体验增强：推荐用于优化搭建产品编辑体验，定制编辑能力的配置信息。

因此，我们设计了[《中后台低代码组件描述协议》](https://lowcode-engine.cn/site/docs/specs/material-spec)来描述一个低代码编辑器中可被配置的内容。

#### Demo 中的物料描述

我们可以从 Demo 中的 assets.json 找到如下三个物料描述：

- @alifd/pro-layout：布局组件，放在 `window.AlifdProLayoutMeta` ， [meta 文件地址](https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/meta.js) ；
- @alifd/fusion-ui：精选组件，放在 `window.AlifdFusionUiMeta` ， [meta 文件地址](https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.5-beta.1/build/lowcode/meta.js) ；
- @alilc/lowcode-materials：原子组件，放在 `window.AlilcLowcodeMaterialsMeta` ， [meta 文件地址](https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.0.1/build/lowcode/meta.js) ；

***引擎中，会尝试调用对应 meta 文件，并注入到全局：***

```
const src = 'https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.5/build/lowcode/meta.js';

const script = document.createElement('script');

script.src = src;

document.head.appendChild(script);
```

然后在 window 上就能拿到对应的物料描述内容了：

手工配置物料描述时，可以用这样的方式参考一下 Demo 中的物料描述是如何实现的。

#### 手工配置物料描述

详见：“物料描述详解”章节。

### 物料的低代码开发

> ***注意：引擎提供的 cli 并未对 windows 系统做适配，windows 环境必须使用***[WSL](https://docs.microsoft.com/zh-cn/windows/wsl/install)***，其他终端不保证能正常运行***

您可以通过本节内容，完成一个组件在低代码编辑器中的配置和调试。

#### 前言（必读）

引擎提供的物料开发脚手架内置了***入料模块***，初始化的时候会自动根据源码解析出一份***低代码描述***，但是从源码解析出来的低代码描述让用户直接使用是不够精细的，因为源码包含的信息不够，它没办法完全包含配置项的交互；

比如设计师出了上面的设计稿，这里面除了有哪些 props 可被配置，通过哪个设置器配置，还包含了 props 之间的聚合、排序，甚至有自定义 setter，这些信息源码里是不具备的，需要在低代码描述里进行开发；
***因此我们建议只把 cli 初始化的低代码描述作为启动，要根据用户习惯对配置项进行设计，然后人工地去开发调试直接的低代码描述。***

#### 新开发组件

##### 组件项目初始化

```
npm init @alilc/element your-material-name
```

##### 选择组件类型

> 组件 -> <组件组织方式>

这里我们选择 react-组件库，之后便生出我们的组件库项目，目录结构如下：

```
my-materials├── README.md├── components  (业务组件目录）│   ├── ExampleComponent              // 业务组件1│   │   ├── build                     // 【编译生成】【必选】│   │   │   └── index.html                      // 【编译生成】【必选】可直接预览文件│   │   ├── lib                       // 【编译生成】【必选】│   │   │   ├── index.js              // 【编译生成】【必选】js 入口文件│   │   │   ├── index.scss            // 【编译生成】【必选】css 入口文件│   │   │   └── style.js                            // 【编译生成】【必选】js 版本 css 入口文件，方便去重│   │   ├── demo                      // 【必选】组件文档，用于生成组件开发预览，以及生成组件文档│   │   │   └── basic.md│   │   ├── src                       // 【必选】组件源码│   │   │   ├── index.js              // 【必选】，组件出口文件│   │   │   └── main.scss             // 【必选】，仅包含组件自身样式的源码文件│   │   ├── README.md                 // 【必选】，组件说明及API│   │   └── package.json              // 【必选】└── └── ExampleComponent2             // 业务组件2
```

##### 组件开发与调试

```
# 安装依赖npm install# 启动 lowcode 环境进行调试预览npm run lowcode:dev# 构建低代码产物npm run lowcode:build
```

执行上述命令后会在组件 (库) 根目录生成一个 `lowcode` 文件夹，里面会包含每个组件的低代码描述：

在 src/components 目录新增一个组件并在 src/index.tsx 中导出，然后再执行 npm run lowcode:dev 时，低代码插件会在 lowcode/<component-name> 目录自动生成新增组件的低代码描述（meta.ts）。

用户可以直接修改低代码描述来修改组件的配置：

- 设置组件的 setter（上一个章节介绍的设置器，也可以定制设置器用到物料中）；
- 新增组件配置项;
- 更改当前配置项；

##### 配置示例

隐藏一个 prop

```
{

      name: 'dataSource',

      condition: () => false,

}
```

展示样式

```
{

      name: 'dataSource',

      display: 'accordion' | 'inline' | 'block' | 'plain' | 'popup' | 'entry',

     // 常用的是 inline(默认),

     block、entry

}
```

##### 编辑态视图

用户可以在 lowcode/<component-name> 目录下新增 view.tsx 来增加编辑态视图。编辑态视图用于在编辑态时展示与真实预览不一样的视图。
view.tsx 输出的也是一个 React 组件。

注意：如果是单组件，而非组件库模式的话，view.tsx 应置于 lowcode 而非 lowcode/<component-name> 目录下

##### 发布组件

```
# 在组件根目录下，执行$ npm publish
```

#### 现存组件低代码化

组件低代码化是指，在引入低代码平台之前，我们大多数都是使用源码开发的组件，也就是 ProCode 组件。

在引入低代码平台之后，原来的源码组件是需要转化为低代码物料，这样才能在低代码平台进行消费。

所以接下来会说明，对于已有的源码组件，我们如何把它低代码化。

##### 配置低代码开发环境

在您的组件开发环境中，安装 [build-scripts](https://github.com/ice-lab/build-scripts) 和它的低代码开发插件：

```
npm install -D @alifd/build-plugin-lowcode @alib/build-scripts --save-dev
```

新增 build-scripts 配置文件：build.lowcode.js

```
module.exports = {

      alias: {

            '@': './src',

          
      
  },

      plugins: [

            [

                  "@alifd/build-plugin-lowcode",

                  {

                        engineScope: '@alilc',

                      
              
      }

                
          
    ]

          
      
  ],

    
  
};
```

在 package.json 中定义低代码开发相关命令

```
"lowcode:dev": "build-scripts start --config ./build.lowcode.js","lowcode:build": "build-scripts build --config ./build.lowcode.js",
```

##### 开发调试

```
# 启动低代码开发调试环境npm run lowcode:dev
```

组件开发形式还和原来的保持一致，但是新增了一份组件的配置文件，其中配置方式和低代码物料的配置是一样的。

##### 构建

```
# 构建低代码产物npm run lowcode:build
```

##### 发布组件

```
# 在组件根目录下，执行npm publish
```

### 在项目中引入组件 (库)

> 以下内容可观看[《阿里巴巴低代码引擎项目实战 (3)-自定义组件接入》](https://www.bilibili.com/video/BV1dZ4y1m76S/)直播回放

对于平台或者用户来说，可能所需要的组件集合是不同的。如果需要自定义组件集合，就需要定制资产包，定制的资产包是配置了一系列组件的，将这份资产包用于引擎即可在引擎中使用自定义的组件集合。

#### 管理一份资产包

项目中使用的组件相关资源都需要在资产包中定义，那么我们自己开发的组件库如果要在项目中使用，只需要把组件构建好的相关资源 merge 到 assets.json 中就可以；

##### 自定义组件加入到资产包

通过官方脚手架自定义组件构建发布之后，npm 包里会出现一个 `build/lowcode/assets-prod.json`文件，我们只需要把该文件的内容 merge 到项目的 assets.json 中就可以；

##### 资产包托管

- 最简单的方式就是类似 [引擎 demo 项目](https://github.com/alibaba/lowcode-demo/blob/main/demo-general/src/services/assets.json) 的做法，在项目中维护一份 assets.json，新增组件或者组件版本更新都需要修改这份资产包；
- 灵活一点的做法是通过 oss 等服务维护一份远程可配置的 assets.json，新增组件或者组件更新只需要修改这份远程的资产包，项目无需更新；
- 再高级一点的做法是实现一个资产包管理的服务，能够通过用户界面去更新资产包的内容；

#### 在项目中引入资产包

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

                        // 将下述链接替换为您的物料即可。无论是通过 utils 从物料中心引入，还是通过其他途径如直接引入物料描述
                const res = await window.fetch('https:// fusion.alicdn.com/assets/default@0.1.95/assets.json');

                const assets = await res.text();

                        material.setAssets(assets);

      }

             catch (err) {

                        console.error(err);

      }

    },

  }

}).catch(err => console.error(err));
```

## 物料描述详解
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/metaSpec](https://lowcode-engine.cn/site/docs/guide/expand/editor/metaSpec)
物料描述详解

### 物料描述概述

中后台前端体系中，存在大量的组件，程序员可以通过阅读文档，知悉组件的用法。可是搭建平台无法理解 README，而且很多时候，README 里并没有属性列表。这时，我们需要一份额外的描述，来告诉低代码搭建平台，组件接受哪些属性，又是该用怎样的方式来配置这些属性，于是，[《中后台低代码组件描述协议》](https://lowcode-engine.cn/site/docs/specs/material-spec)应运而生。协议主要包含三部分：基础信息、属性信息 props、能力配置/体验增强 configure。

物料配置，就是产出一份符合[《中后台低代码组件描述协议》](https://lowcode-engine.cn/site/docs/specs/material-spec)的 JSON Schema。如果需要补充属性描述信息，或需要定制体验增强部分（如修改 Setter、调整展示顺序等），就可以通过修改这份 Schema 来实现。目前有自动生成、手工配置这两种方式生成物料描述配置。

### 可视化生成物料描述

使用 Parts 造物平台：[使用文档](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsIntro)

### 自动生成物料描述

可以使用官方提供的 `@alilc/lowcode-material-parser` 解析本地组件，自动生成物料描述。把物料描述放到资产包定义中，就能让低代码引擎理解如何制作物料。详见上一个章节“物料扩展”。

下面以某个组件代码片段为例：

```
// /path/to/componentimport {

     PureComponent
} from 'react';

import PropTypes from 'prop-types';

export default class FusionForm extends PureComponent {

    static displayName = 'FusionForm';

      static defaultProps = {

            name: '张三',

            age: 18,

            friends: [

            '李四',

            '王五',

            '赵六'

    ],

  }

      static propTypes = {

            /**
         * 这是用于描述姓名
         * /    name: PropTypes.string.isRequired,

            /**
         * 这是用于描述年龄
         * /    age: PropTypes.number,

            /**
         * 这是用于描述好友列表
         * /    friends: PropTypes.array

  };

      render() {

            return <div>dumb</div>;

  }

}
```

引入 parse 工具自动解析

```
import parse from '@alilc/lowcode-material-parser';

(async () => {
  const result = await parse({
    entry: '/path/to/component',
  });

  console.log(
    JSON.stringify(
      result,

      null,

      2,
    ),
  );
})();
```

因为一个组件可能输出多个子组件，所以解析结果是个数组。

```
[
  {
    "componentName": "FusionForm",

    "title": "",

    "docUrl": "",

    "screenshot": "",

    "devMode": "proCode",

    "npm": {
      "package": "",

      "version": "",

      "exportName": "default",

      "main": "",

      "destructuring": false,

      "subName": ""
    },

    "props": [
      {
        "name": "name",

        "propType": "string",

        "description": "这是用于描述姓名",

        "defaultValue": "张三"
      },

      {
        "name": "age",

        "propType": "number",

        "description": "这是用于描述年龄",

        "defaultValue": 18
      },

      {
        "name": "friends",

        "propType": "array",

        "description": "这是用于描述好友列表",

        "defaultValue": ["李四", "王五", "赵六"]
      }
    ]
  }
]
```

### 手工配置物料描述

如果自动生成的物料无法满足需求，我们就需要手动配置物料描述。本节将分场景描述物料配置的内容。

#### 常见配置

##### 组件的属性只有有限的值

增加一个 size 属性，只能从 'large'、'normal'、'small' 这个候选值中选择。

以上面自动解析的物料为例，在此基础上手工加上 size 属性：

```
[

      {

            "componentName": "FusionForm",

            "title": "",

            "docUrl": "",

            "screenshot": "",

            "devMode": "proCode",

            "npm": {

                  "package": "",

                  "version": "",

                  "exportName": "default",

                  "main": "",

                  "destructuring": false,

                  "subName": ""

    },

            "props": [

                  {

                        "name": "name",

                        "propType": "string",

                        "description": "这是用于描述姓名",

                        "defaultValue": "张三"

      },

                  {

                        "name": "age",

                        "propType": "number",

                        "description": "这是用于描述年龄",

                        "defaultValue": 18

      },

                  {

                        "name": "friends",

                        "propType": "array",

                        "description": "这是用于描述好友列表",

                        "defaultValue": [

                              "李四",

                              "王五",

                              "赵六"

        ]

      }

    ],

            // 手工增加的 size 属性    "configure": {

                  "isExtend": true,

                  "props": [

                        {

                              "title": "尺寸",

                              "name": "size",

                              "setter": {

                                    "componentName": 'RadioGroupSetter',

                                    "isRequired": true,

                                    "props": {

                                          "options": [

                                                {

                                     "title": "大",

                                     "value": "large"

                },

                                                {

                                     "title": "中",

                                     "value": "normal"

                },

                                                {

                                     "title": "小",

                                     "value": "small"

                }

              ]

            },

          }

        }

      ]

    }

  }

]
```

##### 组件的属性既可以设置固定值，也可以绑定到变量

我们知道一种属性形式就需要一种 setter 来设置，如果想要将 value 属性允许输入字符串，那就需要设置为 `StringSetter`，如果允许绑定变量，就需要设置为 `VariableSetter`，具体设置器请参考[预置设置器列表](https://lowcode-engine.cn/site/docs/guide/appendix/setters)。

那如果都想要呢？可以使用 `MixedSetter` 来实现。

```
{
  // ...
  "configure": {
    "isExtend": true,

    "props": [
      {
        "title": "输入框的值",

        "name": "activeValue",

        "setter": {
          "componentName": "MixedSetter",

          "isRequired": true,

          "props": {
            "setters": ["StringSetter", "NumberSetter", "VariableSetter"]
          }
        }
      }
    ]
  }
}
```

设置后，就会出现“切换设置器”的操作项了

##### 开启组件样式设置

```
{
  "configure": {
    // ...,

    "supports": {
      "style": true
    }

    // ...
  }
}
```

##### 设置组件的默认事件

```
{
  "configure": {
    // ...
    "supports": {
      "events": ["onPressEnter", "onClear", "onChange", "onKeyDown", "onFocus", "onBlur"]
    }

    // ...
  }
}
```

##### 设置 prop 标题的 tip

```
{
  "name": "label",

  "setter": "StringSetter",

  "title": {
    "label": {
      "type": "i18n",

      "zh_CN": "标签文本",

      "en_US": "Label"
    },

    "tip": {
      "type": "i18n",

      "zh_CN": "属性：label | 说明：标签文本内容",

      "en_US": "prop: label | description: label content"
    }
  }
}
```

##### 配置 prop 对应 setter 在配置面板的展示方式

###### inline

```
{
  "configure": {
    "props": [
      {
        "description": "标签文本",

        "display": "inline"
      }
    ]
  }
}
```

###### block

```
{
  "configure": {
    "props": [
      {
        "description": "高级",

        "display": "block"
      }
    ]
  }
}
```

###### accordion

```
{
  "configure": {
    "props": [
      {
        "description": "表单项配置",

        "display": "accordion"
      }
    ]
  }
}
```

###### entry

```
{
  "configure": {
    "props": [
      {
        "description": "风格与样式",

        "display": "entry"
      }
    ]
  }
}
```

###### plain

```
{
  "configure": {
    "props": [
      {
        "description": "返回上级",

        "display": "plain"
      }
    ]
  }
}
```

#### 进阶配置

##### 组件的 children 属性允许传入 ReactNode

例如有一个如下的 Tab 选项卡组件，每个 TabPane 的 children 都是一个组件

只需要增加 `isContainer` 配置即可

```
{
  // ...
  "configure": {
    // ...
    "component": {
      // 新增，设置组件为容器组件，可拖入组件
      "isContainer": true
    }
  }
}
```

假设我们希望只允许拖拽 Table、Button 等内容放在 TabPane 里。配置白名单 `childWhitelist` 即可

```
{
  // ...
  "configure": {
    // ...
    "component": {
      "isContainer": true,

      "nestingRule": {
        // 允许拖入的组件白名单
        "childWhitelist": ["Table", "Button"],

        // 同理也可以设置该组件允许被拖入哪些父组件里
        "parentWhitelist": ["Tab"]
      }
    }
  }
}
```

##### 组件的非 children 属性允许传入 ReactNode

这就需要使用 `SlotSetter` 开启插槽了，如下面示例，给 Tab 的 title 开启插槽，允许拖拽组件

```
{
  // ...
  "configure": {
    "isExtend": true,

    "props": [
      {
        "title": "选项卡标题",

        "name": "title",

        "setter": {
          "componentName": "MixedSetter",

          "props": {
            "setters": ["StringSetter", "SlotSetter", "VariableSetter"]
          }
        }
      }
    ]
  }
}
```

##### 屏蔽组件在设计器中的操作按钮

正常情况下，组件允许复制：

如果希望禁止组件的复制行为，我们可以这样做：

```
{
  "configure": {
    "component": {
      "disableBehaviors": ["copy"]
    }
  }
}
```

##### 实现一个 BackwardSetter

```
{

      name: 'back',

      title: ' ',

      display: 'plain',

      setter: BackwardSetter,

}

// BackwardSetterimport {

     SettingTarget,

     DynamicSetter
} from '@alilc/lowcode-types';

const BackwardSetter: DynamicSetter = (target: SettingTarget) => {

    return {

            componentName: (      <Button        onClick={

            () => {

                          target.getNode().parent.select();

      }

    }

              >        <Icon type="arrow-left" /> 返回上级      </Button>    ),

  };

};
```

#### 高级配置

##### 不展现一个 prop 配置

- 始终隐藏当前 prop

```
{

      // 始终隐藏当前 prop 配置
    condition: () => false,

}
```

- 根据其它 prop 的值展示/隐藏当前 prop

```
{

      // direction 为 hoz 则展示当前 prop 配置
    condition: (target) => {

            return target.getProps().getPropValue('direction') === 'hoz';

  }

}
```

##### props 联动

```
// 根据当前 prop 的值动态设置其它 prop 的值{

    name: 'labelAlign',

      // ...
    extraProps: {

            setValue: (target,

         value) => {

                  if (value === 'inset') {

                        target.getProps().setPropValue('labelCol',

                 null);

                        target.getProps().setPropValue('wrapperCol',

                 null);

      }

             else if (value === 'left') {

                         target.getProps().setPropValue('labelCol',

                 {

                     fixedSpan: 4

        });

                         target.getProps().setPropValue('wrapperCol',

                 null);

      }

                  return target.getProps().setPropValue('labelAlign',

             value);

    },

  },

}

// 根据其它 prop 的值来设置当前 prop 的值{

    name: 'status',

      // ...
    extraProps: {

            getValue: (target) => {

                  const isPreview = target.getProps().getPropValue('isPreview');

                  return isPreview ? 'readonly' : 'editable';

    }

  }

}
```

##### 动态 setter 配置

可以通过 DynamicSetter 传入的 target 获取一些引擎暴露的数据，例如当前有哪些组件被加载到引擎中，将这个数据作为 SelectSetter 的选项，让用户选择：

```
{

      setter: (target) => {

            return {

                  componentName: 'SelectSetter',

                  props: {

                        options: target.designer.props.componentMetadatas.filter(          (item) => item.isFormItemComponent).map(            (item) => {

                                  return {

                                        title: item.title || item.componentName,

                                        value: item.componentName,

          };

        }

                          ),

                        ),

      },

    };

  }

}
```

## 插件扩展 - 面板扩展
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/pluginWidget](https://lowcode-engine.cn/site/docs/guide/expand/editor/pluginWidget)
插件扩展 - 面板扩展

### 插件简述

插件功能赋予低代码引擎更高的灵活性，低代码引擎的生态提供了一些官方的插件，但是无法满足所有人的需求，所以提供了强大的插件定制功能。

通过定制插件，在和低代码引擎解耦的基础上，我们可以和引擎核心模块进行交互，从而满足多样化的功能。不仅可以自定义插件的 UI，还可以实现一些非 UI 的逻辑：

1. 调用编辑器框架提供的 API 进行编辑器操作或者 schema 操作；
2. 通过插件类的生命周期函数实现一些插件初始化的逻辑；
3. 通过实现监听编辑器内的消息实现特定的切片逻辑（例如面板打开、面板关闭等）；

> 本文仅介绍面板层面的扩展，编辑器插件层面的扩展可以参考 ["插件扩展 - 编排扩展"](https://lowcode-engine.cn/site/docs/guide/expand/editor/pluginContextMenu) 章节。

### 注册插件 API

```
import { plugins } from '@alilc/lowcode-engine';

import { IPublicModelPluginContext } from '@alilc/lowcode-types';

const pluginA = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    init() {
      console.log(options.key);

      // 往引擎增加面板
      ctx.skeleton.add({
        // area 配置见下方说明
        area: 'leftArea',

        // type 配置见下方说明
        type: 'PanelDock',

        content: <div>demo</div>,
      });

      ctx.logger.log('打个日志');
    },

    destroy() {
      console.log('我被销毁了~');
    },
  };
};

pluginA.pluginName = 'pluginA';

plugins.register(pluginA, {
  key: 'test',
});
```

> 如果您想了解抽取出来的插件如何封装成为一个 npm 包并提供给社区，可以参考[“低代码生态脚手架 & 调试机制”](https://lowcode-engine.cn/site/docs/guide/expand/editor/cli)章节。

### 面板插件配置说明

面板插件是作用于设计器的，主要是通过按钮、图标等展示在设计器的骨架中。设计器的骨架我们分为下面的几个区域，而我们的插件大多数都是作用于这几个区域的。

#### 展示区域 area

##### topArea

展示在设计器的顶部区域，常见的相关区域的插件主要是：、

1. 注册设计器 Logo；
2. 设计器操作回退和撤销按钮；
3. 全局操作按钮，例如：保存、预览等；

##### leftArea

左侧区域的展示形式大多数是 Icon 和对应的面板，通过点击 Icon 可以展示对应的面板并隐藏其他的面板。

该区域相关插件的主要有：

1. 大纲树展示，展示该设计器设计页面的大纲。
2. 组件库，展示注册到设计器中的组件，点击之后，可以从组件库面板中拖拽到设计器的画布中。
3. 数据源面板
4. JS 等代码面板。

可以发现，这个区域的面板大多数操作时是不需要同时并存的，且交互比较复杂的，需要一个更整块的区域来进行操作。

##### centerArea

画布区域，由于画布大多数是展示作用，所以一般扩展的种类比较少。常见的扩展有：

1. 画布大小修改
2. 物料选中扩展区域修改

##### rightArea

右侧区域，常用于组件的配置。常见的扩展有：统一处理组件的配置项，例如统一删除某一个配置项，统一添加某一个配置项的。

##### toolbar

跟 topArea 类似，按需放置面板插件~

#### 展示形式 type

##### PanelDock

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

##### Widget

Widget 形式是直接渲染在当前编辑器的对应位置上。如 demo 中在设计器顶部的所有组件都是这种展现形式。

接入可以参考代码：

```
import { skeleton } from '@alilc/lowcode-engine'; /* 注册 logo 面板skeleton.add({ area: 'topArea', type: 'Widget', name: 'logo', content: Logo, // Widget 组件实例 contentProps: { // Widget 插件 props logo: "https:// img.alicdn.com/tfs/TB1_SocGkT2gK0jSZFkXXcIQFXa-66-66.png", href: "/", }, props: { align: 'left', width: 100, }, }); */
```

##### Dock

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

##### Panel

一般不建议单独使用，通过 PanelDock 使用~

### 实际案例

#### 页面管理面板

- 仓库地址： [https://github.com/mark-ck/lowcode-portal](https://github.com/mark-ck/lowcode-portal)
- 具体代码： [https://github.com/mark-ck/lowcode-portal/blob/master/src/plugins/pages-plugin/index.tsx](https://github.com/mark-ck/lowcode-portal/blob/master/src/plugins/pages-plugin/index.tsx)
- 直播回放：
  - [低代码引擎项目实战 (4)-自定义插件 - 页面管理](https://www.bilibili.com/video/BV17a411i73f/)
  - [低代码引擎项目实战 (4)-自定义插件 - 页面管理 - 后端](https://www.bilibili.com/video/BV1uZ4y1U7Ly/)
  - [低代码引擎项目实战 (4)-自定义插件 - 页面管理 - 前端](https://www.bilibili.com/video/BV1Yq4y1a74P/)
  - [低代码引擎项目实战 (4)-自定义插件 - 页面管理 - 完结](https://www.bilibili.com/video/BV13Y4y1e7EV/)

#### 区块面板

- 仓库地址： [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins)
- 具体代码： [https://github.com/alibaba/lowcode-plugins/tree/main/packages/plugin-block](https://github.com/alibaba/lowcode-plugins/tree/main/packages/plugin-block)
- 直播回放：
  - [低代码引擎项目实战 (9)-区块管理 (1)-保存为区块](https://www.bilibili.com/video/BV1YF411M7RK/)
  - [低代码引擎项目实战 (10)-区块管理 - 区块面板](https://www.bilibili.com/video/BV1FB4y1S7tu/)
  - [阿里巴巴低代码引擎项目实战 (11)-区块管理 - ICON 优化](https://www.bilibili.com/video/BV1zr4y1H7Km/)
  - [阿里巴巴低代码引擎项目实战 (11)-区块管理 - 自动截图](https://www.bilibili.com/video/BV1GZ4y117VH/)
  - [阿里巴巴低代码引擎项目实战 (11)-区块管理 - 样式优化](https://www.bilibili.com/video/BV1Pi4y1S7ZT/)
  - [阿里低代码引擎项目实战 (12)-区块管理 (完结)-给引擎插件提个 PR](https://www.bilibili.com/video/BV1hB4y1277o/)

## 插件扩展 - 编排扩展
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/pluginContextMenu](https://lowcode-engine.cn/site/docs/guide/expand/editor/pluginContextMenu)
插件扩展 - 编排扩展

### 场景一：扩展选中节点操作项

#### 增加节点操作项

选中节点后，在选中框的右上角有操作按钮，编排模块默认实现了查看组件直系父节点、复制节点和删除节点按钮外，还可以通过相关 API 来扩展更多操作，如下代码：

```
import { plugins } from '@alilc/lowcode-engine';

import { IPublicModelPluginContext, IPublicModelNode } from '@alilc/lowcode-types';

import { Icon, Message } from '@alifd/next';

const addHelloAction = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      ctx.material.addBuiltinComponentAction({
        name: 'hello',

        content: {
          icon: <Icon type="atm" />,

          title: 'hello',

          action(node: IPublicModelNode) {
            Message.show('Welcome to Low-Code engine');
          },
        },

        condition: (node: IPublicModelNode) => {
          return node.componentMeta.componentName === 'NextTable';
        },

        important: true,
      });
    },
  };
};

addHelloAction.pluginName = 'addHelloAction';

await plugins.register(addHelloAction);
```

***效果如下：***

具体 API 参考：[API 文档](https://lowcode-engine.cn/site/docs/api/material#addbuiltincomponentaction)

#### 删除节点操作项

```
import { plugins } from '@alilc/lowcode-engine';

import { IPublicModelPluginContext } from '@alilc/lowcode-types';

const removeCopyAction = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      ctx.material.removeBuiltinComponentAction('copy');
    },
  };
};

removeCopyAction.pluginName = 'removeCopyAction';

await plugins.register(removeCopyAction);
```

***效果如下：***

具体 API 参考：[API 文档](https://lowcode-engine.cn/site/docs/api/material#removebuiltincomponentaction)

### 实际案例

#### 区块管理

- 仓库地址： [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins)
- 具体代码： [https://github.com/alibaba/lowcode-plugins/tree/main/packages/action-block](https://github.com/alibaba/lowcode-plugins/tree/main/packages/action-block)
- 直播回放：
  - [低代码引擎项目实战 (9)-区块管理 (1)-保存为区块](https://www.bilibili.com/video/BV1YF411M7RK/)
  - [低代码引擎项目实战 (10)-区块管理 - 区块面板](https://www.bilibili.com/video/BV1FB4y1S7tu/)
  - [阿里巴巴低代码引擎项目实战 (11)-区块管理 - ICON 优化](https://www.bilibili.com/video/BV1zr4y1H7Km/)
  - [阿里巴巴低代码引擎项目实战 (11)-区块管理 - 自动截图](https://www.bilibili.com/video/BV1GZ4y117VH/)
  - [阿里巴巴低代码引擎项目实战 (11)-区块管理 - 样式优化](https://www.bilibili.com/video/BV1Pi4y1S7ZT/)
  - [阿里低代码引擎项目实战 (12)-区块管理 (完结)-给引擎插件提个 PR](https://www.bilibili.com/video/BV1hB4y1277o/)

## 设置器扩展
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/setter](https://lowcode-engine.cn/site/docs/guide/expand/editor/setter)
设置器扩展

### 设置器简述

设置器主要用于低代码组件属性值的设置，顾名思义叫"设置器"，又称为 Setter。由于组件的属性有各种类型，需要有与之对应的设置器支持，每一个设置器对应一个值的类型。

#### 设计器展示位置

设置器展示在编辑器的右边区域，如下图：

其中包含四类设置器：

- 属性：展示该物料常规的属性
- 样式：展示该物料样式的属性
- 事件：如果该物料有声明事件，则会出现事件面板，用于绑定事件。
- 高级：两个逻辑相关的属性， **条件渲染** 和 **循环**

#### 设置器类型

上述区域中是有多项设置器的，对于一个组件来说，每一项配置都对应一个设置器，比如我们的配置是一个文本，我们需要的是文本设置器，我们需要配置的是数字，我们需要的就是数字设置器。
下图中的标题和按钮类型配置就分别是文本设置器和下拉框设置器。

我们提供了常用的设置器作为内置设置器，也提供了定制能力帮助大家开发特定需求的设置器。

### 为物料配置设置器

我们提供了[常用的设置器](https://lowcode-engine.cn/site/docs/guide/appendix/setters)作为内置设置器。

我们可以将目标组件的属性值类型值配置到物料资源配置文件中：

```
{
  "componentName": "Message",

  "title": "Message",

  "configure": {
    "props": [
      {
        "name": "type",

        "setter": "InputSetter"
      }
    ]
  }
}
```

props 字段是入料模块扫描自动填入的类型，用户可以通过 configure 节点进行配置通过 override 节点对属性的声明重新定义，setter 就是注册在引擎中的 setter。

为物料配置引擎内置的 setter 时，均可以使用对应 setter 的高级功能，对应功能参考“全部内置设置器”章节下的对应 setter 文章。

#### 对高级功能的配置如下：

例如我们需要在 NumberSetter 中配置 units 属性，可以在 asset.json 中声明。

```
"configure": {

      "component": {

            "isContainer": true,

            "nestingRule": {

                  "parentWhitelist": [

                        "NextP"

      ]

    }

  },

      "props": [

            {

                  "name": "width",

                  "title": "宽度",

                  "initialValue": "auto",

                  "defaultValue": "auto",

                  "condition": {

                        "type": "JSFunction",

                        "value": "() => false"

      },

                  "setter": {

                        "componentName": "NumberSetter",

                        "props": {

                              "units": [

                                    {

                                          "type": "px",

                                          "list": true

            },

                                    {

                                          "type": "%",

                                          "list": true

            }

          ]

        }

      }

    },

  ],

      "supports": {

            "style": true

  }

},
```

### 自定义设置器

#### 编写 AltStringSetter

我们编写一个简单的 Setter，它的功能如下：

**代码如下：**

```
import * as React from 'react';

import { Input } from '@alifd/next';

import './index.scss';

interface AltStringSetterProps {
  // 当前值
  value: string;

  // 默认值
  defaultValue: string;

  // setter 唯一输出
  onChange: (val: string) => void;

  // AltStringSetter 特殊配置
  placeholder: string;
}

export default class AltStringSetter extends React.PureComponent<AltStringSetterProps> {
  // 声明 Setter 的 title
  static displayName = 'AltStringSetter';

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

##### setter 和 setter/plugin 之间的联动

我们采用 emit 来进行相互之前的通信，首先我们在 A setter 中进行事件注册：

```
import {

     event
} from '@alilc/lowcode-engine';

componentDidMount() {

            // 这里由于面板上会有多个 setter，这里我用 field.id 来标记 setter 名
    this.emitEventName = `${SETTER_NAME}-${this.props.field.id}`;

        event.on(`${this.emitEventName}.bindEvent`,

     this.bindEvent);

}

bindEvent = (eventName) => {

      // do someting

}

componentWillUnmount() {

      // setter 是以实例为单位的，每个 setter 注销的时候需要把事件也注销掉，避免事件池过多
    event.off(`${this.emitEventName}.bindEvent`,

     this.bindEvent);

}
```

在 B setter 中触发事件，来完成通信：

```
import { event } from '@alilc/lowcode-engine';

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
```

##### 修改同级 props 的其他属性值

setter 本身只影响其中一个 props 的值，如果需要影响其他组件的 props 的值，需要使用 field 的 props：

```
bindFunction = () => {
  const {
    field,

    value,
  } = this.props;

  const propsField = field.parent;

  // 获取同级其他属性 showJump 的值
  const otherValue = propsField.getPropValue('showJump');

  // set 同级其他属性 showJump 的值
  propsField.setPropValue(
    'showJump',

    false,
  );
};
```

#### 注册 AltStringSetter

我们需要在低代码引擎中注册 Setter，这样就可以通过 AltStringSetter 的名字在物料中使用了。

```
import AltStringSetter from './AltStringSetter';

const registerSetter = window.AliLowCodeEngine.setters.registerSetter;

registerSetter('AltStringSetter', AltStringSetter);
```

#### 物料中使用

我们需要将目标组件的属性值类型值配置到物料资源配置文件中，其中核心配置如下：

```
{
  "props": [
    {
      "name": "type",

      "setter": "AltStringSetter"
    }
  ]
}
```

在物料中的相关配置如下：

```
{
  "componentName": "Message",

  "title": "Message",

  "configure": {
    "props": [
      {
        "name": "type",

        "setter": "AltStringSetter"
      }
    ]
  }
}
```

## 图编排扩展
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/graph](https://lowcode-engine.cn/site/docs/guide/expand/editor/graph)
图编排扩展

### 项目运行

#### 前置准备

1. 参考 [https://lowcode-engine.cn/site/docs/guide/quickStart/start](https://lowcode-engine.cn/site/docs/guide/quickStart/start)
2. 参考至Demo下载 [https://lowcode-engine.cn/site/docs/guide/quickStart/start#%E4%B8%8B%E8%BD%BD-demo](https://lowcode-engine.cn/site/docs/guide/quickStart/start#%E4%B8%8B%E8%BD%BD-demo)

#### 选择demo-graph-x6

在根目录下执行：

```
cd demo-graph-x6
```

#### 安装依赖

在 lowcode-demo/demo-graph-x6目录下执行：

```
npm install
```

#### 启动Demo

在 lowcode-demo/demo-graph-x6 目录下执行：

```
npm run start
```

之后就可以通过 http://localhost:5556/ 来访问我们的 DEMO 了。

### 认识Demo

这里的Demo即通过图编排引擎加入了几个简单的物料而来，已经是可以面向真是用户的产品界面。

#### 区域组成

##### 顶部：操作区

- 右侧：保存到本地、重置页面、自定义按钮

##### 顶部：工具区

- 左侧：删除、撤销、重做、放大、缩小

##### 左侧：面板与操作区

- 物料面板：可以查找节点，并在此拖动节点到编辑器画布中

##### 中部：可视化页面编辑画布区域

- 点击节点/边在右侧面板中能够显示出对应组件的属性配置选项
- 拖拽修改节点的排列顺序

##### 右侧：组件级别配置

- 选中的组件：从页面开始一直到当前选中的节点/边位置，点击对应的名称可以切换到对应的节点上
- 选中组件的配置：属性：节点的基础属性值设置

> 每个区域的组成都可以被替换和自定义来生成开发者需要的业务产品。

### 目录介绍

- public：与其他demo保持一致，均是lowcode engine所必要依赖
- src
  - plugins:：自定义插件，完成了x6的切面回调处理功能
  - services：mock数据，真实场景中可能为异步获取数据

### 开发插件

```
function pluginX6DesignerExtension(ctx: IPublicModelPluginContext) {

      return {

            init() {

                  // 获取 x6 designer 内置插件的导出 api
            const x6Designer = ctx.plugins[

                'plugin-x6-designer'

      ]

             as IDesigner;

                  x6Designer.onNodeRender((model,

             node) => {

                        // @ts-ignore        // 自定义 node 渲染逻辑
                const {

                     name,

                     title

        }

                 = model.propsData;

                        node.attr('text/textWrap/text',

                 title || name);

      });

                  x6Designer.onEdgeRender((model,

             edge) => {

                        // @ts-ignore
                const {

                     source,

                     target,

                     sourcePortId,

                     targetPortId

        }

                 = model.propsData;

                        console.log(sourcePortId,

                 targetPortId);

                        requestAnimationFrame(() => {

                              edge.setSource({

                         cell: source,

                         port: sourcePortId

          });

                              edge.setTarget({

                         cell: target,

                         port: targetPortId

          });

        });

                        // https: //x6.antv.vision/zh/docs/tutorial/intermediate/edge-labels x6 标签模块        // appendLabel 会触发 onEdgeLabelRender
                edge.appendLabel({

                              markup: Markup.getForeignObjectMarkup(),

                              attrs: {

                                    fo: {

                                          width: 120,

                                          height: 30,

                                          x: -60,

                                          y: -15,

            },

          },

        });

      });

                  x6Designer.onEdgeLabelRender((args) => {

                        const {

                     selectors

        }

                 = args        const content = selectors.foContent as HTMLDivElement        if (content) {

                              ReactDOM.render(<div>自定义 react 标签</div>,

                     content)

        }

      })

    }

  }

}

pluginX6DesignerExtension.pluginName = 'plugin-x6-designer-extension';

export default pluginX6DesignerExtension;
```

x6Designer为图实例暴露出来的一些接口，可基于此进行一些图的必要插件的封装，整个插件的封装完全follow低代码引擎的插件，详情可参考 [https://lowcode-engine.cn/site/docs/guide/expand/editor/pluginWidget](https://lowcode-engine.cn/site/docs/guide/expand/editor/pluginWidget)

### 开发物料

```
npm init @alilc/element your-material-demo
```

仓库初始化完成

接下来即可编写物料内容了
图物料与低代码的dom场景存在画布的差异，因此暂不支持物料单独调试，须通过项目demo进行物料调试

#### 资产描述

```
npm run lowcode:build
```

如果物料是个React组件，则在执行上述命令时会自动生成对应的meta.ts，**但图物料很多时候并非一个React组件，因此须手动生产meta.ts**

可参考： [https://github.com/alibaba/lowcode-materials/blob/main/packages/graph-x6-materials/lowcode/send-email/meta.ts](https://github.com/alibaba/lowcode-materials/blob/main/packages/graph-x6-materials/lowcode/send-email/meta.ts)
同时会自动生成物料描述文件

#### 物料调试

##### 物料侧

物料想要支持被项目动态inject调试，须在build.lowcode.js中加入

```
[

      '@alilc/build-plugin-alt',

      {

            type: 'component',

            inject: true,

            library

  },

]
```

本地启动

```
npm run lowcode:dev
```

##### 项目侧

通过@alilc/lce-graph-core加载物料的天然支持了debug，因此无须特殊处理。
若项目中自行加载，则参考 [https://lowcode-engine.cn/site/docs/guide/expand/editor/cli](https://lowcode-engine.cn/site/docs/guide/expand/editor/cli)
项目访问地址后拼接query "?debug"即可进入物料调试

## 主题色扩展
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/theme](https://lowcode-engine.cn/site/docs/guide/expand/editor/theme)
主题色扩展

### 简介

主题色扩展允许用户定制多样的设计器主题，增加界面的个性化和品牌识别度。

### 设计器主题色定制

在 CSS 的根级别定义主题色变量可以确保这些变量在整个应用中都可用。例如：

```
: root {

      --color-brand: rgba(0,

     108,

     255,

     1);

     /* 主品牌色
     * /  --color-brand-light: rgba(25,

     122,

     255,

     1);

     /* 浅色品牌色
     * /  --color-brand-dark: rgba(0,

     96,

     229,

     1);

     /* 深色品牌色
     * /
  
}
```

将样式文件引入到你的设计器中，定义的 CSS 变量就可以改变设计器的主题色了。

#### 主题色变量

以下是低代码引擎设计器支持的主题色变量列表，以及它们的用途说明：

##### 品牌相关颜色

- `--color-brand` : 主品牌色
- `--color-brand-light` : 浅色品牌色
- `--color-brand-dark` : 深色品牌色

##### Icon 相关颜色

- `--color-icon-normal` : 默认状态
- `--color-icon-light` : icon light 状态
- `--color-icon-hover` : 鼠标悬停状态
- `--color-icon-active` : 激活状态
- `--color-icon-reverse` : 反色状态
- `--color-icon-disabled` : 禁用状态
- `--color-icon-pane` : 面板颜色

##### 线条和文本颜色

- `--color-line-normal` : 线条颜色
- `--color-line-darken` : 线条颜色(darken)
- `--color-title` : 标题颜色
- `--color-text` : 文字颜色
- `--color-text-dark` : 文字颜色(dark)
- `--color-text-light` : 文字颜色(light)
- `--color-text-reverse` : 反色情况下，文字颜色
- `--color-text-disabled` : 禁用态文字颜色

##### 菜单颜色

- `--color-context-menu-text` : 菜单项颜色
- `--color-context-menu-text-hover` : 菜单项 hover 颜色
- `--color-context-menu-text-disabled` : 菜单项 disabled 颜色

##### 字段和边框颜色

- `--color-field-label` : field 标签颜色
- `--color-field-text` : field 文本颜色
- `--color-field-placeholder` : field placeholder 颜色
- `--color-field-border` : field 边框颜色
- `--color-field-border-hover` : hover 态下，field 边框颜色
- `--color-field-border-active` : active 态下，field 边框颜色
- `--color-field-background` : field 背景色

##### 状态颜色

- `--color-success` : success 颜色
- `--colo-success-dark` : success 颜色(dark)
- `--color-success-light` : success 颜色(light)
- `--color-warning` : warning 颜色
- `--color-warning-dark` : warning 颜色(dark)
- `--color-warning-light` : warning 颜色(light)
- `--color-information` : information 颜色
- `--color-information-dark` : information 颜色(dark)
- `--color-information-light` : information 颜色(light)
- `--color-error` : error 颜色
- `--color-error-dark` : error 颜色(dark)
- `--color-error-light` : error 颜色(light)
- `--color-purple` : purple 颜色
- `--color-brown` : brown 颜色

##### 区块背景色

- `--color-block-background-normal` : 区块背景色
- `--color-block-background-light` : 区块背景色(light)。
- `--color-block-background-shallow` : 区块背景色 shallow
- `--color-block-background-dark` : 区块背景色(dark)
- `--color-block-background-disabled` : 区块背景色(disabled)
- `--color-block-background-active` : 区块背景色(active)
- `--color-block-background-active-light` : 区块背景色(active light)
- `--color-block-background-warning` : 区块背景色(warning)
- `--color-block-background-error` : 区块背景色(error)
- `--color-block-background-success` : 区块背景色(success)
- `--color-block-background-deep-dark` : 区块背景色(deep-dark)，作用于多个组件同时拖拽的背景色。

##### 引擎相关颜色

- `--color-canvas-detecting-background` : 画布组件 hover 时遮罩背景色。

##### 其他区域背景色

- `--color-layer-mask-background` : 拖拽元素时，元素原来位置的遮罩背景色
- `--color-layer-tooltip-background` : tooltip 背景色
- `--color-pane-background` : 面板背景色
- `--color-background` : 设计器主要背景色
- `--color-top-area-background` : topArea 背景色，优先级大于 `--color-pane-background`
- `--color-left-area-background` : leftArea 背景色，优先级大于 `--color-pane-background`
- `--color-toolbar-background` : toolbar 背景色，优先级大于 `--color-pane-background`
- `--color-workspace-left-area-background` : 应用级 leftArea 背景色，优先级大于 `--color-pane-background`
- `--color-workspace-top-area-background` : 应用级 topArea 背景色，优先级大于 `--color-pane-background`
- `--color-workspace-sub-top-area-background` : 应用级二级 topArea 背景色，优先级大于 `--color-pane-background`

##### 其他变量

- `--workspace-sub-top-area-height` : 应用级二级 topArea 高度
- `--top-area-height` : 顶部区域的高度
- `--workspace-sub-top-area-margin` : 应用级二级 topArea margin
- `--workspace-sub-top-area-padding` : 应用级二级 topArea padding
- `--workspace-left-area-width` : 应用级 leftArea width
- `--left-area-width` : leftArea width
- `--simulator-top-distance` : simulator 距离容器顶部的距离
- `--simulator-bottom-distance` : simulator 距离容器底部的距离
- `--simulator-left-distance` : simulator 距离容器左边的距离
- `--simulator-right-distance` : simulator 距离容器右边的距离
- `--toolbar-padding` : toolbar 的 padding
- `--toolbar-height` : toolbar 的高度
- `--pane-title-height` : 面板标题高度
- `--pane-title-font-size` : 面板标题字体大小
- `--pane-title-padding` : 面板标题边距
- `--context-menu-item-height` : 右键菜单项高度

#### 低代码引擎生态主题色定制

插件、物料、设置器等生态为了支持主题色需要对样式进行改造，需要对生态中的样式升级为 css 变量。例如：

```
/* before
 * /background: #006cff;

/* after
 * /background: var(--color-brand,   #006cff);
```

这里 `var(--color-brand, #默认色)` 表示使用 `--color-brand` 变量，如果该变量未定义，则使用默认颜色（#默认色）。

#### fusion 物料进行主题色扩展

如果使用了 fusion 组件时，可以通过 [fusion 平台](https://fusion.design/) 进行主题色定制。在平台上，您可以选择不同的主题颜色，并直接应用于您的 fusion 组件，这样可以无缝地集成到您的应用设计中。

## 低代码生态脚手架 & 调试机制
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/cli](https://lowcode-engine.cn/site/docs/guide/expand/editor/cli)
低代码生态脚手架 & 调试机制

### 脚手架简述

在 fork 低代码编辑器 demo 项目后，您可以直接在项目中任意扩展低代码编辑器。如果您想要将自己的组件/插件/设置器封装成一个独立的 npm 包并提供给社区，您可以使用我们的低代码脚手架建立低代码扩展。

> Windows 开发者请在 WSL 环境下使用开发工具
>
> WSL 中文 doc：[https://docs.microsoft.com/zh-cn/windows/wsl/install](https://docs.microsoft.com/zh-cn/windows/wsl/install)
>
> 中文教程：[https://blog.csdn.net/weixin_45027467/article/details/106862520](https://blog.csdn.net/weixin_45027467/article/details/106862520)

### 脚手架功能

#### 脚手架初始化

```
npm init @alilc/element your-element-name
```

不写 your-element-name 的情况下，则在当前目录创建。

> 注 1：如遇错误提示 `sh: create-element: command not found` 可先执行下述命令
>
> ```
> npm install -g @alilc/create-element
> ```

> 注 2：觉得安装速度比较慢的同学，可以设置 npm 国内镜像，如
>
> ```
> npm init @alilc/element your-element-name --registry=https: //registry.npmmirror.com
> ```

选择对应的元素类型，并填写对应的问题，即可完成创建。

#### 脚手架本地环境调试
```
cd your-element-namenpm installnpm start
```
#### 脚手架构建
```
npm run build
```
#### 脚手架发布

修改版本号后，执行如下指令即可：
```
npm publish
```
### 🔥🔥🔥 在低代码项目中调试物料/插件/设置器

> 📢📢📢 低代码生态脚手架提供的调试利器，在启动 setter/插件/物料 项目后，直接在已有的低代码平台就可以调试，不需要 npm link / 手改 npm main 入口等传统方式，轻松上手，强烈推荐使用！！

#### 组件/插件/Setter 侧

1. 插件/setter 在原有 alt 的配置中添加相关的调试配置 ```
// build.json 中{ "plugins": [ [ "@alilc/build-plugin-alt", { "type": "plugin", "inject": true, // 开启注入调试 // 配置要打开的页面，在注入调试模式下，不配置此项的话不会打开浏览器 // 支持直接使用官方 demo 项目：https://lowcode-engine.cn/demo/index.html "openUrl": "https://lowcode-engine.cn/demo/index.html?debug" } ], ]}
```
2. 组件需先安装 @alilc/build-plugin-alt，再将组件内的 `build.lowcode.js`文件修改如下 ```
const { library } = require('./build.json');

module.exports = {
  alias: {
    '@': './src',
  },

  plugins: [
    [
      // lowcode 的配置保持不变，这里仅为示意。 '@alifd/build-plugin-lowcode',

      {
        library,

        engineScope: '@alilc',
      },
    ],

    [
      '@alilc/build-plugin-alt',

      {
        type: 'component',

        inject: true,

        library,

        // 配置要打开的页面，在注入调试模式下，不配置此项的话不会打开浏览器 // 支持直接使用官方 demo 项目：https: //lowcode-engine.cn/demo/index.html openUrl: "https://lowcode-engine.cn/demo/index.html?debug"
      },
    ],
  ],
};
```
3. 本地组件/插件/Setter正常启动调试，在项目的访问地址增加 debug，即可开启注入调试。 ```
https://lowcode-engine.cn/demo/demo-general/index.html?debug
```

#### 项目侧的准备

> 如果你的低代码项目 fork 自官方 demo，那么项目侧的准备已经就绪，不用再看以下内容~

1. 安装 @alilc/lowcode-plugin-inject ```
npm i @alilc/lowcode-plugin-inject --save-dev
```
2. 在引擎初始化侧引入插件 ```
import Inject, { injectAssets } from '@alilc/lowcode-plugin-inject';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
export default async () => {
  /* 注意 Inject 插件必须在其他插件前注册，且所有插件的注册必须 await await plugins.register(Inject); */ await plugins.register(
    OtherPlugin,
  );
  await plugins.register((ctx: IPublicModelPluginContext) => {
    return {
      name: 'editor-init',
      async init() {
        /* 设置物料描述前，使用插件提供的 injectAssets 进行处理 const { material, project } = ctx; */ material.setAssets(
          await injectAssets(assets),
        );
      },
    };
  });
};
```
3. 在 saveSchema 时过滤掉插入的 url，避免影响渲染态 ```
import { filterPackages } from '@alilc/lowcode-plugin-inject';

export const saveSchema = async () => {
  // ... const packages = await filterPackages(editor.get('assets').packages);

  window.local;
  Storage.setItem(
    'packages',

    JSON.stringify(packages),
  );

  // ...
};
```
4. 如果希望预览态也可以注入调试组件，则需要在 preview 逻辑里插入组件 ```
import {

     injectComponents
} from '@alilc/lowcode-plugin-inject';

async function init() {

     // 在传递给 ReactRenderer 前，先通过 injectComponents 进行处理 const components = await injectComponents(buildComponents(libraryMap,

     componentsMap));

     // ...

}
```

注：若控制台出现如下错误，直接访问一次该 url 即可~

### Meta 信息

meta 信息是放在生态元素 package.json 中的一小段 json，用户可以通过 meta 了解到这个元素的一些基本信息，如元素类型，一些入口信息等。

```
interface LcMeta {
  type: 'plugin' | 'setter' | 'component';

  // 元素类型，尚未实现
  pluginName: string;

  // 插件名，仅插件包含
  meta: {
    dependencies: string[];

    // 插件依赖的其他插件列表，仅插件包含
    engines: {
      lowcodeEngine: string;

      // 适配的引擎版本
    };

    prototype: string;

    // 物料描述入口，仅组件包含，尚未实现
    prototypeView: string;

    // 物料设计态入口，仅组件包含，尚未实现
  };
}
```

## 介绍
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsIntro](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsIntro)
介绍

### 介绍

「Parts·造物」是基于开源低代码引擎打造的次时代物料研发和集成工具，一方面作为低代码引擎搭建低代码平台的一个样板展示开源生态下的各个组件如何集合在一起形成生产力，另一方面也可以生产低代码平台所需的物料。

目前「Parts·造物」主要提供两大产品功能：

1. React 组件导入低代码引擎：通过在线可视化的「物料描述」配置，任意工具开发的 React 组件都可以快速完成对低代码引擎的适配，导入到低代码引擎项目中进行使用。不必额外开发新的组件。
2. 低代码生产组件：通过低代码的形式生产组件，极低上手门槛，提供丰富的原子组件用于组合，完善的调试预览和组件生命周期控制。生产的组件既可以在低代码引擎项目中使用，也可以出码后在普通源码项目中使用。

### 联系我们

## 低代码组件
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partslcc](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partslcc)
低代码组件

### 什么是低代码组件

我们先了解一下什么是低代码组件，为什么要用低代码组件。

低代码组件是通过可视化的方式生产的组件，这些组件既可以用于低代码搭建体系，也可以用于 ProCode 开发体系（后续迭代）。

那么为什么我们要使用低代码的形式来开发组件：

- **首先** ： **轻快** ，低代码组件只需通过浏览器秒级完成初始化工作，不需要 ProCode 繁重的环境准备； **环境一致（低代码环境）** ，同时能够保证物料的开发环境和真实的运行环境是一致的，不会存在开发和运行环境不一致的问题。
- **其次** ： **通用能力可视化方式抽象，提升研发效能** ，比如获取远程数据、视图开发、依赖管理、生命周期、事件绑定等功能。

低代码组件不是用来替代 ProCode 的开发方式

，而是让开发者可以从 ProCode 中重复的工作脱离出来，抽象更多业务垂直的能力，从而起到提效的作用。

### 创建组件

环境准备：我们可以通过 Parts 提供的通用[低代码组件开发环境](https://parts.lowcode-engine.cn/material#/)开发。

点击开发新组件 --> 填写组件标题 --> 填写组件名称 --> 点击确定，完成组件创建工作。

### 组件开发

一张图速览低代码组件开发的功能模块，其中大部分功能可以参考[低代码引擎文档](https://lowcode-engine.cn/site/docs/guide/quickStart/intro)。

#### 依赖管理

依赖管理用于管理低代码组件本身的依赖（类似于 dependencies）。步骤：点击添加组件 --> 选择安装的组件 --> 保存并构建 (需要等待几分钟构建)。

#### 属性定义

用于定义组件接收外部传入的 propTypes，组件内部可以通过this.props.${属性名称}的方式获取属性值。

属性定义前建议先阅读 [物料描述详解](https://lowcode-engine.cn/site/docs/guide/expand/editor/metaSpec)、[预置设置器](https://lowcode-engine.cn/site/docs/guide/appendix/setters)。

#### 生命周期

低代码组件的开发支持 componentDidMount、componentDidUpdate、componentDidCatch、componentWillUnmount 几个生命周期

#### 组件调试

我们提供了一套线上实时调试的方案，只需点击右上角的调试按钮，就能自动创建一个低代码应用，在这个应用中可以实时调试当前的低代码组件。

在低代码应用中使用，组件面板 --> 低代码组件，找到对应的低代码组件拖入画布即可。

#### 组件发布

同时我们提供了组件发布的功能，用于组件版本管理，点击右上角的发布按钮即可发布组件

### 组件使用

组件的消费是通过资产包来管理的，详情请参考 [资产包管理](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsassets)。

### 组件导出

开发好的低代码组件可以导出成为 React 组件，脱离低代码引擎独立使用。同时导出功能也为您的组件留出一份备份，您可以放心使用本产品的服务，而不用担心万一出现的不能服务的场景。

在物料列表页面，低代码组件会有一个导出的动作。

点击导出后，就会开启导出低代码组件的过程。这个过程持续 10s+，导出完成后会为您自动下载对应的 zip 包。

zip 包解压后可以看到一个完整的组件脚手架工程，您可以在这个工程里继续开发调试，或者发布到合适的 npm 源中。

注意：目前导出功能暂不支持 低代码组件嵌套。

### 联系我们

## React 组件导入
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/prototype](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/prototype)
React 组件导入

### 介绍

大家在使用[低代码引擎](https://lowcode-engine.cn/)构建低代码应用平台时，遇到的一个主要问题是如何让已有的 React 组件能够快速低成本地接入进来。这个问题拆解下来主要包括两个子问题：

1. 如何给已有组件 [配置物料描述](https://lowcode-engine.cn/site/docs/specs/material-spec) ，
2. 如何构建出一个低代码引擎能够识别的资产包 (Assets)。

我们的产品「[Parts·造物](https://parts.lowcode-engine.cn/)」可以帮助大家解决这个问题。我们通过在线可视化的方式完成物料描述配置，并且提供一键打包的功能生成引擎可以识别的资产包。

### 导入物料

首先，我们需要在 [物料管理](https://lowcode-engine.cn/site/docs/specs/material-spec) 页面导入我们需要进行在线物料描述配置的物料。

- 点击列表左上方的 导入已有物料 按钮
- 在弹框中输入 npm 包名
- 点击 获取包信息 按钮，获取 npm 包基本信息
- 点击确定，导入成功

### 配置管理

第二步：物料导入以后，我们就可以为导入的物料新增[物料描述配置](https://lowcode-engine.cn/site/docs/specs/material-spec)，点击右侧的组件配置开始配置。

#### 新增配置

- 点击配置管理右上角的 新增配置
  - 选择组件的版本号
  - 填写组件路径，一般和 npm 包的 package.json 里的 main 字段相同（如果填写错误，后面会渲染不出来）
  - 描述字段用于给这份配置增加一些备注信息。

为了降低配置成本，第一次新增配置的时候会自动解析组件代码，生成一份初始化组件物料描述。所以需要等待片刻，用于代码解析。解析完成后，点击配置按钮即可进入在线配置界面。

#### 组件描述配置

操作界面如下，接下来讲具体的配置流程

##### 新增组件

如果新增配置的过程中，代码自动解析失败或者解析出来的组件列表不满足开发要求，我们可以点击左侧组件列表插件 新增 按钮，添加新的组件，具体的字段描述可以参考提示内容，以 [react-color](https://github.com/casesandberg/react-color) 为例：

##### 给组件增加物料描述

- 打开左侧 Setter 面板
- 按照组件的属性拖入需要 Setter 类型（如图中组件的 width 属性，拖入数字 Setter）
- 各种 Setter 的介绍可以参看这篇文档： [预置设置器列表](https://lowcode-engine.cn/site/docs/guide/appendix/setters)
- 配置属性的基本信息（如图所示）
- 配置完成后点击右上角的保存

##### 高级配置（属性联动）

举个栗子：如图所示，如果期望“设置器”这个配置项的值“被修改”的时候，下面的“默认值”跟着变化。

如何使用

组件的属性配置目前支持 3 个基本的联动函数：

- 显示状态：返回 true | false，如果返回 true，表示组件配置显示，否则配置时不显示
- 获取值：当调用该配置节点的 getValue 方法时触发的方法
- 值变化：当调用该配置节点的 setValue 方法时触发的方法

方法的第一个参数都是当前配置节点的对象，常用到的有以下几个：

- getValue(): 获取当前节点的值，如果当前节点是子节点的话，否则为 undefined
- setValue(): 设置当前节点的值，如果当前节点是子节点的话
- parent: 当前节点的父节点
- getPropValue(propName): 父节点获取子节点的属性值，propName 为子节点的属性名称
- setPropValue(propName, value): 父节点设置子节点的属性值，propName 为子节点的属性名称，value 为设置的值
- getConfig: 获取当前节点的配置，如 title、setter 等

##### 调试物料描述

点击右上角的预览按钮，开始调试我们刚刚配置的属性，如果是组件的首次预览，会有一段组件构建的过程（构建出 umd 包的过程），构建完成后就可以调试我们的配置了。

##### 发布物料描述

物料描述调试没问题后，就可以到项目中去使用了，使用前需要先发布物料描述

- 点击右上角的发布按钮
- 选择需要发布的组件
- 点击确定发布完成

### 资产包

第三步：物料描述发布完成后，接下来我们就需要构建出可用的资产包用于低代码应用中。

##### 资产包构建

有两种方式可以构建资产包：

- 一种是通过 [`我的资产包`] 资产包管理模块进行整个资产包生命周期的管理，当然也包括资产包的构建，可参考 [资产包管理](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsassets)
- 一种是通过 [`我的物料`] 组件物料管理模块的 `资产包构建` 进行构建, 具体操作如下：
  - 选择需要构建的组件
  - 点击构建资产包按钮
  - 选择刚刚的物料描述配置
  - 开始构建，构建完成后你将得到一份 json 文件（里面包含了物料描述和 umd 包），就可以到项目中使用了

##### 资产包使用

详情请参考 [资产包管理](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsassets#%E4%BD%BF%E7%94%A8%E8%B5%84%E4%BA%A7%E5%8C%85)

### 联系我们

## 资产包管理
来源：[https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsassets](https://lowcode-engine.cn/site/docs/guide/expand/editor/parts/partsassets)
资产包管理

### 介绍

通过前述介绍，相信大家已经了解如何使用「[Parts·造物](https://parts.lowcode-engine.cn/)」来将已有的 React 组件快速接入低代码引擎，以及生产低代码组件。

大家在使用的过程中，可能会希望构建出来的资产包可以后续随时访问下载，或者希望构建资产包时各个组件的版本等信息可以持久化起来并且能够多人维护。

通过「[Parts·造物](https://parts.lowcode-engine.cn/)」的 `资产包` 管理功能帮助大家解决这个问题

### 新建资产包

首先，我们在 我的资产包 tab 中点击 `新建资产包`

- 填写资产包名称
- 配置资产包管理员，管理员拥有该资产包的所有权限，初始默认为资产包的创建者，还可以添加其他人作为管理员，
- 配置资产包描述 (可选)
- 点击 `确定` , 即可完成资产包的创建

接下来需要为资产包添加一个或者多个组件。

### 添加组件

第二步：新建完资产包以后，我们就可以为其添加组件了，如果是新建资产包流程，新建完成之后会自动弹出组件配置的弹窗，当然，你可可以通过点击资产包卡片的方式打开组件配置的弹窗。

- 点击弹窗中 `添加组件` 按钮，在弹出的组件选择面板中，选中需要添加的组件并点击 `下一步` 。
- 进入组件版本以及描述协议版本选择界面，选择所需要的正确版本，点击 `安装` 即可完成一个组件的添加。

### 构建资产包

添加完组件以后就点击 `保存并构建资产包` 进入资产包构建配置弹窗

- `开启缓存` : 可充分利用之前的构建结果缓存来加速资产包的生成，我们会将每个组件的构建结果以 包名和版本号为 key 进行缓存。
- `任务描述` : 当前构建任务的一些描述信息。

点击 `确认` 按钮 会自动跳转到当前资产包的构建历史界面：

构建历史界面会显示当前资产包所有的构建历史记录，表格状态栏展示了构建的状态：`成功`,`失败`,`正在运行` 三种状态，操作列可以在构建成功时复制或者下载资产包结果

### 使用资产包

你可以在 [lowcode-demo](https://github.com/alibaba/lowcode-demo) 中直接引用，可直接替换 demo 中原来的资产包文件：
例如，在 [demo-lowcode-component](https://github.com/alibaba/lowcode-demo/tree/main/demo-lowcode-component) 中，直接用你的资产包文件替换文件[assets.json](https://github.com/alibaba/lowcode-demo/blob/main/demo-lowcode-component/src/services/assets.json)，即可快速使用自己的物料了。

#### 在编辑器中使用资产包

在使用含有低代码组件的资产包注意 注意引擎版本必须大于等于 `1.1.0-beta.9`。
然后直接替换 [lowcode-demo](https://github.com/alibaba/lowcode-demo) demo 中的 `assets.json` 文件即可。

#### 在预览中使用资产包

在预览中使用资产包的整体思路是从 `资产包` 中提取并转换出 `ReactRenderer` 渲染所需要的 react 组件列表 (`components` 参数)，然后将 `schema` 以及 `components` 传入到 `ReactRenderer` 中进行渲染，需要注意的是，在 `资产包` 的转换过程中，我们也需要将 `低代码组件` 转换成 react 组件，具体逻辑可以参考下 [demo-lowcode-component](https://github.com/alibaba/lowcode-demo/tree/main/demo-lowcode-component) 中 `src/parse-assets.ts` 文件的实现。
基于资产包进行预览的整体逻辑如下： [详见](https://github.com/alibaba/lowcode-demo/blob/main/demo-lowcode-component/src/preview.tsx)：

```
import ReactDOM from 'react-dom';

import React, { useState } from 'react';

import { Loading } from '@alifd/next';

import ReactRenderer from '@alilc/lowcode-react-renderer';

import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { getProjectSchemaFromLocalStorage } from './services/mockService';

import assets from './services/assets.json';

import { parseAssets } from './parse-assets';

const getScenarioName = function () {
  if (location.search) {
    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'index';
  }

  return 'index';
};

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const scenarioName = getScenarioName();

    const projectSchema = getProjectSchemaFromLocalStorage(scenarioName);

    const {
      componentsMap: componentsMapArray,

      componentsTree,
    } = projectSchema;

    const schema = componentsTree[0];

    const componentsMap: any = {};

    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });

    // 特别提醒重点注意！！！：从资产包中解析出所有的 react 组件列表
    const { components } = await parseAssets(assets);

    setData({
      schema,

      components,
    });
  }

  const {
    schema,

    components,
  } = data;

  if (!schema || !components) {
    init();

    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      {' '}
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        // // 将 react 组件列表传入 ReactRenderer 进行渲染
        components={components}
        appHelper={{
          requestHandlersMap: {
            fetch: createFetchHandler(),
          },
        }}
      />{' '}
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
```

从资产包中解析 react 组件列表的逻辑如下，[详见](https://github.com/alibaba/lowcode-demo/blob/main/demo-lowcode-component/src/parse-assets.ts)：

```
import {

     ComponentDescription,

     ComponentSchema,

     RemoteComponentDescription
} from '@alilc/lowcode-types';

import {

     buildComponents,

     AssetsJson,

     AssetLoader
} from '@alilc/lowcode-utils';

import ReactRenderer from '@alilc/lowcode-react-renderer';

import {

     injectComponents
} from '@alilc/lowcode-plugin-inject';

import React,   {

     createElement
} from 'react';

export async function parseAssets(assets: AssetsJson) {

      const {

         components: rawComponents,

         packages

  }

     = assets;

      const libraryAsset = [

  ];

      const libraryMap = {

  };

      const packagesMap = {

  };

      packages.forEach(pkg => {

            const {

             package: _package,

             library,

             urls,

             renderUrls,

             id

    }

         = pkg;

            if (_package) {

                  libraryMap[

                id || _package

      ]

             = library;

    }

            packagesMap[

            id || _package

    ]

         = pkg;

            if (renderUrls) {

                  libraryAsset.push(renderUrls);

    }

         else if (urls) {

                  libraryAsset.push(urls);

    }

  });

      const assetLoader = new AssetLoader();

      await assetLoader.load(libraryAsset);

      let newComponents = rawComponents;

      if (rawComponents && rawComponents.length) {

            const componentDescriptions: ComponentDescription[

    ]

         = [

    ];

            const remoteComponentDescriptions: RemoteComponentDescription[

    ]

         = [

    ];

            rawComponents.forEach((component: any) => {

                  if (!component) {

                        return;

      }

                  if (component.exportName && component.url) {

                        remoteComponentDescriptions.push(component);

      }

             else {

                        componentDescriptions.push(component);

      }

    });

            newComponents = [

            ...componentDescriptions

    ];

            // 如果有远程组件描述协议，则自动加载并补充到资产包中，同时出发 designer.incrementalAssetsReady 通知组件面板更新数据
        if (remoteComponentDescriptions && remoteComponentDescriptions.length) {

                  await Promise.all(        remoteComponentDescriptions.map(async (component: any) => {

                          const {

                     exportName,

                     url,

                     npm

        }

                 = component;

                          await (new AssetLoader()).load(url);

                          function setAssetsComponent(component: any,

                 extraNpmInfo: any = {

        }) {

                                const components = component.components;

                                if (Array.isArray(components)) {

                                      components.forEach(d => {

                                            newComponents = newComponents.concat({

                                                  npm: {

                                                        ...npm,

                                                        ...extraNpmInfo,

                },

                                                  ...d,

              }

                             || [

              ]);

            });

                                      return;

          }

                                newComponents = newComponents.concat({

                                      npm: {

                                            ...npm,

                                            ...extraNpmInfo,

            },

                                      ...component.components,

          }

                     || [

          ]);

        }

                          function setArrayAssets(value: any[

        ],

                 preExportName: string = '',

                 preSubName: string = '') {

                                value.forEach((d: any,

                     i: number) => {

                                      const exportName = [

                            preExportName,

                             i.toString()

            ].filter(d => !!d).join('.');

                                      const subName = [

                            preSubName,

                             i.toString()

            ].filter(d => !!d).join('.');

                                      Array.isArray(d) ? setArrayAssets(d,

                         exportName,

                         subName) : setAssetsComponent(d,

                         {

                                            exportName,

                                            subName,

            });

          });

        }

                          if (window[

                    exportName

        ]) {

                                if (Array.isArray(window[

                        exportName

          ])) {

                                      setArrayAssets(window[

                            exportName

            ]

                         as any);

          }

                     else {

                                      setAssetsComponent(window[

                            exportName

            ]

                         as any);

          }

        }

                          return window[

                    exportName

        ];

      }),

                  );

    }

  }

      const lowcodeComponentsArray = [

  ];

      const proCodeComponentsMap = newComponents.reduce((acc,

     cur) => {

            if ((cur.devMode || '').toLowerCase() === 'lowcode') {

                  lowcodeComponentsArray.push(cur);

    }

         else {

                  acc[

                cur.componentName

      ]

             = {

                        ...(cur.reference || cur.npm),

                        componentName: cur.componentName,

      };

    }

            return acc;

  },

     {

  })  function genLowCodeComponentsMap(components) {

            const lowcodeComponentsMap = {

    };

            lowcodeComponentsArray.forEach((lowcode) => {

                  const id = lowcode.reference?.id;

                  const schema = packagesMap[

                id

      ]

            ?.schema;

                  const comp = genLowcodeComp(schema,

             {

                ...components,

                 ...lowcodeComponentsMap

      });

                  lowcodeComponentsMap[

                lowcode.componentName

      ]

             = comp;

    });

            return lowcodeComponentsMap;

  }

      let components = await injectComponents(buildComponents(libraryMap,

     proCodeComponentsMap));

      const lowCodeComponents = genLowCodeComponentsMap(components);

      return {

            components: {

             ...components,

             ...lowCodeComponents

    }

  }

}

function genLowcodeComp(schema: ComponentSchema,   components: any) {

      return class LowcodeComp extends React.Component {

            render(): React.ReactNode {

                  return createElement(ReactRenderer,

             {

                        ...this.props,

                        schema,

                        components,

                        designMode: '',

      });

    }

  };

}
```

### 联系我们

## 使用渲染模块
来源：[https://lowcode-engine.cn/site/docs/guide/expand/runtime/renderer](https://lowcode-engine.cn/site/docs/guide/expand/runtime/renderer)
使用渲染模块

### 快速使用

渲染依赖于 schema 和 components。其中 schema 和 components 需要一一对应，schema 中使用到的组件都需要在 components 中进行声明，否则无法正常渲染。

#### 简单示例

```
import ReactRenderer from '@alilc/lowcode-react-renderer';

import ReactDOM from 'react-dom';

import { Button } from '@alifd/next';

const schema = {
  componentName: 'Page',

  props: {},

  children: [
    {
      componentName: 'Button',

      props: {
        type: 'primary',

        style: {
          color: '#2077ff',
        },
      },

      children: '确定',
    },
  ],
};

const components = {
  Button,
};

ReactDOM.render(
  <ReactRenderer schema={schema} components={components} />,
  document.getElementById('root'),
);
```

#### 项目使用示例

> [设计器 demo](https://lowcode-engine.cn/demo/demo-general/index.html)
> 项目代码完整示例：[https://github.com/alibaba/lowcode-demo](https://github.com/alibaba/lowcode-demo)

**step 1：在设计器中获取组件列表**

```
import { material, project } from '@alilc/lowcode-engine';

const packages = material.getAssets().packages;
```

**step 2：在设计器中获取当前配置页面的 schema**

```
import { material, project } from '@alilc/lowcode-engine';

const schema = project.exportSchema();
```

**step 3：以某种方式存储 schema 和 packages**
这里用 localStorage 作为存储示例，真实项目中使用数据库或者其他存储方式。

```
window.localStorage.setItem('projectSchema', JSON.stringify(project.exportSchema()));

const packages = await filterPackages(material.getAssets().packages);

window.localStorage.setItem('packages', JSON.stringify(packages));
```

**step 4：预览时，获取存储的 schema 和 packages**

```
const packages = JSON.parse(window.localStorage.getItem('packages') || '');

const projectSchema = JSON.parse(window.localStorage.getItem('projectSchema') || '');

const {
  componentsMap: componentsMapArray,

  componentsTree,
} = projectSchema;
```

**step 5：通过整合 schema 和 packages 信息，进行渲染**

```
import ReactDOM from 'react-dom';

import React, { useState } from 'react';

import { Loading } from '@alifd/next';

import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';

import ReactRenderer from '@alilc/lowcode-react-renderer';

import { injectComponents } from '@alilc/lowcode-plugin-inject';

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    // 渲染前置处理，初始化项目 schema 和资产包为渲染模块所需的 schema prop 和 components prop
    const packages = JSON.parse(window.localStorage.getItem('packages') || '');

    const projectSchema = JSON.parse(window.localStorage.getItem('projectSchema') || '');

    const {
      componentsMap: componentsMapArray,

      componentsTree,
    } = projectSchema;

    const componentsMap: any = {};

    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });

    const schema = componentsTree[0];

    const libraryMap = {};

    const libraryAsset = [];

    packages.forEach(
      ({
        package: _package,

        library,

        urls,

        renderUrls,
      }) => {
        libraryMap[_package] = library;

        if (renderUrls) {
          libraryAsset.push(renderUrls);
        } else if (urls) {
          libraryAsset.push(urls);
        }
      },
    );

    const vendors = [
      assetBundle(
        libraryAsset,

        AssetLevel.Library,
      ),
    ];

    const assetLoader = new AssetLoader();

    await assetLoader.load(libraryAsset);

    const components = await injectComponents(
      buildComponents(
        libraryMap,

        componentsMap,
      ),
    );

    setData({
      schema,

      components,
    });
  }

  const {
    schema,

    components,
  } = data;

  if (!schema || !components) {
    init();

    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      {' '}
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
      />{' '}
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
```

#### 国际化示例

```
class Demo extends PureComponent {

      static displayName = 'renderer-demo';

      render() {

            return (      <div className="demo">        <ReactRenderer          key={

            schema.fileName
          
    }

                  schema={

            schema
          
    }

                  components={

            components
          
    }

                  appHelper={

            {

                            utils,

                            constants          
              
      }

            
          
    }

                  locale="zh-CN"          messages={

            {

                            "hello": "你好",

                            "china": "中国"          
              
      }

            
          
    }

                />      </div>    );

          
      
  }

    
  
}
```

### API

| 参数 | 说明 | 类型 | 必选 |
| --- | --- | --- | --- |
| schema | 符合[搭建协议](https://lowcode-engine.cn/lowcode)的数据 | Object | 是 |
| components | 组件依赖的实例 | Object | 是 |
| componentsMap | 组件的配置信息 | Object | 否 |
| appHelper | 渲染模块全局上下文 | Object | 否 |
| designMode | 设计模式，可选值：extend、border、preview | String | 否 |
| suspended | 是否挂起 | Boolean | 否 |
| onCompGetRef | 组件 ref 回调（schema, ref）=> {} | Function | 否 |
| onCompGetCtx | 组件 ctx 更新回调 (schema, ctx) => {} | Function | 否 |
| rendererName | 渲染类型，标识当前模块是以什么类型进行渲染的 | string | 否 |
| customCreateElement | 自定义创建 element 的钩子 |  |  |
| (Component, props, children) => {} | Function | 否 |  |
| notFoundComponent | 当组件找不到时，可以通过这个参数自定义展示文案。 | Component | 否 |
| thisRequiredInJSE | 为 true 的情况下 JSExpression 仅支持通过 this 来访问。假如需要兼容原来的 'state.xxx'，则设置为 false，推荐使用 true。 | Boolean | 否 |
| locale | 国际化语言类型 | string | 否 |
| messages | 国际化语言对象 | Object | 否 |

#### schema

搭建基础协议数据，渲染模块将基于 schema 中的内容进行实时渲染。

#### messages

国际化内容，需要配合 locale 使用
messages 格式示例：

```
{
  "zh-CN": {
    "hello-world": "你好，世界！"
  },

  "en-US": {
    "hello-world": "Hello world!"
  }
}
```

#### locale

当前语言类型
示例：'zh-CN' | 'en-US'

#### components

渲染模块渲染页面需要用到的组件依赖的实例，`components` 对象中的 Key 需要和搭建 schema 中的`componentName` 字段对应。

#### componentsMap

> 在生产环境下不需要设置。

配置规范参见[《低代码引擎搭建协议规范》](https://lowcode-engine.cn/lowcode)，主要在搭建场景中使用，用于提升用户搭建体验。

- 属性配置校验：用户可以配置组件特定属性的 `propTypes` ，在搭建场景中用户输入的属性值不满足 `propType` 配置时，渲染模块会将当前属性设置为 `undefined` ，避免组件抛错导致编辑器崩溃；
- `isContainer` 标记：当组件被设置为容器组件且当前容器组件内没有其他组件时，用户可以通过拖拽方式将组件直接添加到容器组件内部；
- `parentRule` 校验：当用户使用的组件未出现在组件配置的 `parentRule` 组件内部时，渲染模块会使用 `visualDom` 组件进行占位，避免组件抛错的同时在下钻编辑场景也能够不阻塞用户配置，典型的场景如 `Step.Item` 、 `Table.Column` 、 `Tab.Item` 等等。

#### appHelper

appHelper 主要用于设置渲染模块的全局上下文，目前 appHelper 支持设置以下上下文：

- `utils` ：全局公共函数
- `constants` ：全局常量
- `location` ：react-router 的 `location` 实例
- `history` ：react-router 的 `history` 实例

设置了 appHelper 以后，上下文会直接挂载到容器组件的 this 上，用户可以在搭建协议中的 function 及变量表达式场景使用上下文，具体使用方式如下所示：
**schema：**

```
export default {
  componentName: 'Page',

  fileName: 'test',

  props: {},

  children: [
    {
      componentName: 'Div',

      props: {},

      children: [
        {
          componentName: 'Text',

          props: {
            text: {
              type: 'JSExpression',

              value: 'this.location.pathname',
            },
          },
        },

        {
          componentName: 'Button',

          props: {
            type: 'primary',

            style: {
              marginLeft: 10,
            },

            onClick: {
              type: 'JSExpression',

              value: 'function onClick(e) { this.utils.xxx(this.constants.yyy);}',
            },
          },

          children: 'click me',
        },
      ],
    },
  ],
};
```

```
import ReactRenderer from '@alilc/lowcode-react-renderer';

import ReactDOM from 'react-dom';

import {

     Button
} from '@alifd/next';

import schema from './schema'const components = {

      Button,

};

ReactDOM.render((  <ReactRenderer    schema={

    schema

}

    components={

    components

}

        appHelper={

    {

                    utils: {

                    xxx: () => {

      }

    }

  }

}

  />),   document.getElementById('root'));
```

#### designMode

> 在生产环境下不需要设置。

designMode 属性主要在搭建场景中使用，主要有以下作用：

- 当 `designMode` 改变时，触发当前 schema 中所有组件重新渲染
- 当 `designMode` 设置为 `design` 时，渲染模块会为 `Dialog` 、 `Overlay` 等初始状态无 dom 渲染的组件外层包裹一层 div，使其在画布中能够展示边框供用户选中

#### suspended

渲染模块是否挂起，当设置为 `true` 时，渲染模块最外层容器的 `shouldComponentUpdate`将始终返回 false，在下钻编辑或者多引擎渲染的场景会用到该参数。

#### onCompGetRef

组件 ref 的回调，在搭建场景下编排模块可以根据该回调获取组件实例并实现生命周期注入或者组件 DOM 操作等功能，回调函数主要包含两个参数：

- `schema` ：当前组件的 schema 模型结构
- `ref` ：当前组件的 ref 实例

#### onCompGetCtx

组件 ctx 更新的回调，在组件每次 render 渲染周期我们都会为组件构造新的上下文环境，因此该回调函数会在组件每次 render 过程中触发，主要包含两个参数：

- `schema` ：当前组件的 schema 模型结构
- `ctx` ：当前组件的上下文信息，主要包含以下内容：
  - `page` ：当前页面容器实例
  - `this` : 当前组件所属的容器组件实例
  - `item` / `index` : 循环上下文（属性 key 可以根据 loopArgs 进行定制）
  - `form` : 表单上下文

#### rendererName

渲染类型，标识当前模块是以什么类型进行渲染的

- `LowCodeRenderer` : 低代码组件
- `PageRenderer` : 页面

#### customCreateElement

自定义创建 element 的钩子，用于在渲染前后对组件进行一些处理，包括但不限于增加 props、删除部分 props。主要包含三个参数：

- `Component` ：要渲染的组件
- `props` ：要渲染的组件的 props
- `children` ：要渲染的组件的子元素

#### thisRequiredInJSE

> 版本 >= 1.0.11

默认值：true
为 true 的情况下 JSExpression 仅支持通过 this 来访问。假如需要兼容原来的 'state.xxx'，则设置为 false，推荐使用 true。

## 使用出码功能
来源：[https://lowcode-engine.cn/site/docs/guide/expand/runtime/codeGeneration](https://lowcode-engine.cn/site/docs/guide/expand/runtime/codeGeneration)
使用出码功能

### 出码简述

所谓出码，即将低代码编排出的 schema 进行解析并转换成最终可执行的代码的过程。

### 出码的适用范围

出码是为了更高效的运行和更灵活地定制渲染，相对而言，基于 Schema 的运行时渲染，有着能实时响应内容的变化和接入成本低的优点，但是也存在着实时解析运行的性能开销比较大和包大小比较大的问题，而且无法自由地进行扩展二次开发，功能自由度受到一定程度限制。
当然，出码也会存在一些限制：一方面需要额外的接入成本，另一方面通常需要额外的生成代码和打包构建的时间，难以做到基于 Schema 的运行时渲染那样保存即预览的效果。

所以不是所有场景都建议做出码，一般来说以下 3 个场景可以考虑使用出码进行优化。

#### 场景一：想要极致的打开速度，降低 LCP/FID

这种场景比较常见的是 C 端应用，比如手淘上的页面和手机钉钉上的页面，要求能够尽快得响应用户操作，不要出现卡死的情况。当一个流入协议大小比较大的时候，前端进行解析时的开销也比较大。如果能把这部分负担转移到编译时去完成的话，前端依赖包大小就会减少许多。从而也提升了加载速度，降低了带宽消耗。页面越简单，这其中的 gap 就会越明显。

#### 场景二：老项目 + 新需求，想用搭建产出

这是一个很常见的场景，毕竟迁移或者重构都是有一个过程的，阿里的业务都是一边跑一边换发动机。在这种场景中，我们不可能要求使用运行时方案来做实现，因为运行时是一个项目级别的能力，最好是项目中统一使用他这一种方式，保证体验的一致性与连贯性。所以我们可以只在低代码平台上搭建新的业务页面，然后通过出码模块导出这些页面的源码，连同一些全局依赖模块，一起 Merge 到老项目中。完成开发体验的优化。

#### 场景三：协议不能描述部分代码逻辑（协议功能不足或特别定制化的逻辑）

当我们发现一些逻辑诉求不能在目前协议中很好地表达的时候，这其实是项目复杂度较高的一个信号。比较好的方式就是将低代码研发和源码研发结合起来。这种模式下最大的诉求点之一就是，需要将搭建的内容输出为可读性和确定性都比较良好的代码模块。这也就是出码模块需要支持好的使用场景了。

### 如何使用

#### 1) 通过命令行快速体验

欢迎使用命令行工具快速体验：`npx @alilc/lowcode-code-generator -i example-schema.json -o generated -s icejs3`

--其中 example-schema.json 可以从[这里下载](https://alifd.alicdn.com/npm/@alilc/lowcode-code-generator@latest/example-schema.json)

#### 2) 通过设计器插件快速体验

1. 安装依赖： `npm install --save @alilc/lowcode-plugin-code-generator`
2. 注册插件：

```
import { plugins } from '@alilc/lowcode-engine';
import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator'; /* 在你的初始化函数中：await plugins.register(CodeGenPlugin); */ /* 如果您不希望自动加上出码按钮，则可以这样注册await plugins.register(CodeGenPlugin, { disableCodeGenActionBtn: true }); */
```

然后运行你的低代码编辑器项目即可 -- 在设计器的右上角会出现一个“出码”按钮，点击即可在浏览器中出码并预览。

#### 3）服务端出码接入

此代码生成器一开始就是为服务端出码设计的，你可以直接这样来在 node.js 环境中使用：

1. 安装依赖： `npm install --save @alilc/lowcode-code-generator`
2. 引入代码生成器：

```
import CodeGenerator from '@alilc/lowcode-code-generator';
```

1. 创建项目构建器：

```
const projectBuilder = CodeGenerator.solutions.icejs();
```

1. 生成代码

```
const project = await projectBuilder.generateProject(  schema,   // 编排搭建出来的 schema);
```

1. 将生成的代码写入到磁盘中 (也可以生成一个 zip 包)

```
// 写入磁盘await 
CodeGenerator.publishers.disk().publish({

    project,

     // 上一步生成的 project
    outputPath: '/path/to/your/output/dir',

     // 输出目录
    projectSlug: 'your-project-slug',

     // 项目标识
  
});

// 写入到 zip 包await 
CodeGenerator.publishers.zip().publish({

    project,

     // 上一步生成的 project
    outputPath: '/path/to/your/output/dir',

     // 输出目录
    projectSlug: 'your-project-slug',

     // 项目标识 -- 对应生成 your-project-slug.zip 文件
  
});
```

注：一般来说在服务端出码可以跟 github/gitlab, CI 和 CD 流程等一起串起来使用，通常用于优化性能。

#### 4）浏览器中出码接入

随着现在电脑性能和浏览器技术的发展，出码其实已经不必非得在服务端做了，借助于 Web Worker 特性，可以在浏览器中进行出码：

1. 安装依赖： `npm install --save @alilc/lowcode-code-generator`
2. 引入代码生成器：

```
import * as CodeGenerator from '@alilc/lowcode-code-generator/standalone-loader';
```

1. 【可选】提前初始化代码生成器：

```
// 提前初始化下，这样后面用的时候更快 (这个 init 内部会提前准备好创建 worker 的一些资源)await 
CodeGenerator.init();
```

1. 出码

```
const result = await CodeGenerator.generateCode({
  solution: 'icejs',

  // 出码方案 (目前内置有 icejs、icejs3 和 rax )
  schema,

  // 编排搭建出来的 schema
});

console.log(result);

// 出码结果 (默认是递归结构描述的，可以传 flattenResult: true 以生成扁平结构的结果)
```

注：一般来说在浏览器中出码适合做即时预览功能。

#### 5）自定义出码

前端框架灵活多变，默认内置的出码方案很难满足所有人的需求，好在此代码生成器支持非常灵活的插件机制 -- 内置功能大多都是通过插件完成的（在 `src/plugins`下），比如：

所以您可以通过添加自己的插件或替换掉默认内置的插件来实现您的自定义功能。
为了方便自定义出码方案，出码模块还提供自定义出码方案的脚手架功能，即执行下面脚本即可生成一个自定义出码方案：

```
npx @alilc/lowcode-code-generator init-solution <your-solution-name>
```

里面内置了一个示例的插件 (在 `src/plugins/example.ts`中)，您可以根据注释引导来完善相关插件，从而组合生成您的专属出码方案 (`src/index.ts`)。您所生成的出码方案可以发布成 NPM 包，从而能按上文 1~4 中的使用方案进行使用。

## 架构综述
来源：[https://lowcode-engine.cn/site/docs/guide/design/summary](https://lowcode-engine.cn/site/docs/guide/design/summary)
架构综述

### 分层架构描述

我们设计了这样一套分层架构，自下而上分别是协议 - 引擎 - 生态 - 平台。

- 底层协议栈定义的是标准， **标准的统一让上层产物的互通成为可能** 。
- 引擎是 **对协议的实现** ，同时通过能力的输出，向上 **支撑生态开放体系** ，提供各种生态扩展能力。
- 生态就好理解了，是基于引擎核心能力上扩展出来的，比如物料、设置器、插件等，还有工具链支撑开发体系。
- 最后，各个平台基于引擎内核以及生态中的产品组合、衔接形成满足其需求的低代码平台。

**每一层都明确自身的定位，各司其职，协议不会去思考引擎如何实现，引擎也不会实现具体上层平台功能，上层平台的定制化均通过插件来实现，这些理念将会贯穿我们体系设计、实现的过程。**

### 引擎内核简述

低代码引擎分为 4 大模块，入料 - 编排 - 渲染 - 出码：

- 入料模块就是将外部的物料，比如海量的 npm 组件，按照 [《低代码引擎物料协议规范》](https://lowcode-engine.cn/site/docs/specs/material-spec) 进行描述。将描述后的数据通过引擎 API 注册后，在编辑器中使用。 > **注意，这里仅是增加描述，而非重写一套，这样我们能最大程度复用 ProCode 体系已沉淀的组件。**
- 编排，本质上来讲，就是 **不断在生成符合[《低代码引擎搭建协议规范》](https://lowcode-engine.cn/site/docs/specs/lowcode-spec)的页面描述，将编辑器中的所有物料，进行布局设置、组件 CRUD 操作、以及 JS / CSS 编写/ 逻辑编排** 等，最终转换成页面描述，技术细节后文会展开。
- 渲染，顾名思义，就是 **将编排生成的页面描述结构渲染成视图的过程** ，视图是面向用户的，所以必须处理好内部数据流、生命周期、事件绑定、国际化等。
- 出码，就是 **将编排过程产生的符合[《低代码引擎搭建协议规范》](https://lowcode-engine.cn/site/docs/specs/lowcode-spec)的页面描述转换成另一种 DSL 或 编程语言代码的过程** 。

### 引擎生态简述

引擎生态主要分为 3 部分，物料、设置器和插件。

#### 物料生态

物料是低代码平台的生产资料，没有物料低代码平台则变成了无源之水无本之木。低代码平台的物料即低代码组件。因此低代码物料生态指的是：

1. 低代码物料生产能力和规范。
2. 对低代码物料进行统一管理的物料中心。
3. 基于 Fusion Next 的低代码基础组件库。

#### 设置器生态

对于已接入物料的属性配置，需要不同的设置器。

比如配置数值类型的 age，需要一个数值设置器，配置对象类型的 hobby，需要一个对象设置器，依次类推。

每个设置器本质上都是一个 React 组件，接受由引擎传入的参数，比如 value 和 onChange，value 是初始传入的值，onChange 是在设置器的值变化时的回传函数，将值写回到引擎中。

```
// 一个最简单的文本设置器示例class TextSetter extends Component {

    render() {

            const {

             value,

             onChange

    }

         = this.props;

            return <input value={

            value

    }

         onChange={

            (e) => onChange(e.target.value)

    }

         />;

  }

}
```

大多数组件所使用的设置器都是一致或相似的。如同建设低代码基础组件库一样，设置器生态是一组基础的设置器，供大多数组件配置场景使用。

同时提供了设置器的定制功能。

#### 插件生态

低代码引擎本身只包含了最小的内核，而我们所能看到的设计器上的按钮、面板等都是插件提供的。插件是组成设计器的必要部分。

因此我们提供了一套官方的插件生态，提供最基础的设计器功能。帮助用户通过使用插件，快速完成自己的设计器。

## 协议栈简介
来源：[https://lowcode-engine.cn/site/docs/guide/design/specs](https://lowcode-engine.cn/site/docs/guide/design/specs)
协议栈简介

### 什么是低代码协议

低代码引擎体系基于三份协议来构建，分别是 [《低代码引擎搭建协议规范》](https://lowcode-engine.cn/site/docs/specs/lowcode-spec)、[《低代码引擎物料协议规范》](https://lowcode-engine.cn/site/docs/specs/material-spec)和[《低代码引擎资产包协议规范》](https://lowcode-engine.cn/site/docs/specs/assets-spec), 它们保障了低代码领域的标准化，成为了生态建设和流通的基石。

### 为什么需要协议

首先，我们做一个不恰当的类比，我们将低代码引擎和 JavaScript 语言做一下类别。还记得之前，大家都被浏览器兼容性支配的恐惧，特别是 IE 和其他浏览器，对上层 API 实现的不一致，导致一份代码需要运行在两端需要做适配。当浏览器 / JavaScript 相关的标准出现之后，各个浏览器进行了 API 的统一，使得我们终于可以从这部分工作中解放出来（PS：Babel 对于语言特性的转换是另一个方面的问题）。

而在《低代码引擎搭建协议规范》出现之前，低代码领域也有类似的问题。

#### 概念不通

在交流的过程中，一些对于搭建产品的术语的不一致，导致了一些沟通成本，不管是在文章分享、技术分享、交流会上，都会有这个问题。

#### 物料孤岛

由于低代码产品实现的方式不同，物料的消费方式也各不相同。这里分为两种物料，低代码物料和 ProCode 物料。

对于低代码物料来说，A 平台创建的物料无法使用到 B 平台上，如果想在 B 平台实现同样的物料，需要按照 B 平台的标准搭建一份物料。

对于 ProCode 物料来说，需要在低代码平台进行消费，是需要进行转换的，包括搭建配置项的生成、物料搭建视图等，可能还需要特殊的描述文件进行描述。由于这一层没有统一，同一份 ProCode 物料每接入一个低代码，可能需要的描述文件格式不同，转换的代码不同，使用的工具也不同。

#### 生态隔离

不同低代码平台的生态体系也不相同，有的低代码平台的物料生态不错，有的低代码平台的搭建体验生态不错。但是这些利好的生态，都是无法互通的，甚至就算知道了代码也无法复用，因为底层是不一致的。对于阿里巴巴集团来说，每一个平台都创建一份自己的生态，这并不是利好的。

#### 低水平重复建设

大家可能觉得，以上问题对于自己造轮子来说，其实也是有利的，因为自己得到了技术上的成长。

但是对于低代码的平台方，实际上更多的工作，在物料的转化、物料的生成、搭建体验的小优化、部分其他平台生态的实现。这些的技术深度其实并不高，属于低水平重复建设部分。

#### 价值不高

如果每个业务都要从 0 开始做，做自己的平台，会花费大量的时间来构建底层基础设施，对业务本身而言并不是一件好事；而且前端领域的底层基础设施都大同小异，不同团队重复构建造成了极大的资源浪费。

这样的建设，会导致从 0 到 1 都需要花费大量的时间，往往在内部人力不足、投入有限时，产品很容易在未发展壮大的时候就面临了死亡相关的决策。

设想一下，如果可以开发一份全集团低代码平台都可以使用的物料，是否更有成就感呢？如果可以基于已有生态进行低代码平台的快速落地，而不是花费 1-2 年搭建一个可用的低代码平台，再验证市场。在快速的验证之后，再进行更深入的打磨，这其中的思考和技术含量是否更优于之前的模式呢？

以 2019 年的阿里巴巴的情况举例，不同平台的低代码物料但不限于：

1. vc-deep — vc 协议 + Deep 组件库 (阿里巴巴企业智能团队基于 Fusion Next 定制)；
2. Iceluna 协议 + Fusion Next；
3. AIMake 物料；
4. vc-fusion-basic + 业务改造 — vc 协议 + Fusion Next(各业务 Fork 定制)；
5. vision 魔改 + vc 协议扩展 + fusion 业务组件；
6. vc 协议 + antd；

可以看到，各个搭建平台都需要维护一套自己的基础组件库，这是非常不合理的，对基础组件库的维护会分散开发同学完成业务目标的精力。

建立统一的低代码领域标准化，是百利而无一害的。于是，在阿里巴巴集团 2020 年进行了讨论，建立了搭建治理&物料流通战役，此战役便产出了上文中的协议规范，成为了低代码引擎和其生态的基础。

### 协议的作用

基于统一的协议，我们完成业务组件、区块、模板等各类物料的标准统一，各类中后台研发系统生产的物料可借助物料中心进行跨系统流通，通过丰富物料生态的共享提升各平台研发系统的效率。同时完成低代码引擎的标准统一以及低代码搭建中台能力的输出，帮助业务方快速孵化本业务域中后台研发系统。

#### 打破物料孤岛

##### 物料中心

这里以阿里集团的前端物料中间建设为例，在《低代码引擎物料协议规范》落地之后，建立了阿里巴巴各个中后台研发平台沟通、对话的基础，物料流通的先决条件已经成熟，这个时候我们还需要一个统一的物料源，用于管理物料的上传、存储、检索、分发，一个典型的中心化架构，类似 npm 的管理，这便是我们物料中心。

Fusion Market 是物料中心的前身，它提供了业务组件的存储、文档展示和全局透出的功能，由于 fusion 体系在集团内的广泛使用，Fusion Market 沉淀了不少的业务组件，但是这个项目却一直不温不火，只看到业务组件数量的增加，却未看到物料流通起来。其中一个原因是，没有阿里巴巴前端委员会的背书，规范很难统一，规范如果不统一，物料就很难流通；

在规范成立之后，物料中心也将有了建设的基础，最终于 2019 年建立了物料中心，提供了物料流通的平台能力。

##### 低代码基础物料

就像 AntD、Element 之于源码研发模式，在低代码研发模式下各个搭建平台也需要一套统一的、开箱即用的低代码基础组件库。基于低代码描述协议完成了两份低代码基础物料的建设，即“Fusion 低代码基础组件库”和“AntD 低代码基础组件库”。

##### 源码组件低代码化

将源码组件一键转化为低代码物料，符合低代码物料规范，可以在低代码平台进行流通。

#### 低代码物料中心

当低代码物料积累到一定的量级之后，所有的搭建平台的业务物料越来越多。这些物料通过低代码物料中心进行统一的管理和消费。

#### 设置器生态的基础

Snippet(组件默认搭建 schema ) 由《低代码引擎搭建协议规范》定义，低代码引擎会按照规范对组件进行渲染，Configure 由《低代码引擎物料协议规范》定义，它描述了组件的 props 以及每个 prop 对应的设置器 (Prop 配置面板)，低代码引擎提供了 20+ 个内置设置器，但如果我们组件的 props 超出了引擎内置设置器的范围，就需要我们自己来开发对应设置器。
设置器最终也慢慢形成了自己的生态，这使得开发物料更加容易，可以使用已有的生态中的设置器，进行物料配置描述。

#### 低代码引擎实现标准

低代码引擎是以上生态的消费端，它是实现了标准协议的低代码引擎。这是不可或缺的部分，低代码引擎这里就相当于一个标准浏览器，一方面给其他的低代码平台提供了一个 Demo，其他平台可以参考低代码引擎进行实现，满足官方协议，便也可以消费相关的物料生态和其他生态。

## 入料模块设计
来源：[https://lowcode-engine.cn/site/docs/guide/design/materialParser](https://lowcode-engine.cn/site/docs/guide/design/materialParser)
入料模块设计

### 介绍

入料模块负责物料接入，通过自动扫描、解析源码组件，产出一份符合《中后台低代码组件描述协议》的** **JSON Schema。这份 Schema 包含基础信息和属性描述信息部分，低代码引擎会基于它们在运行时自动生成一份 configure 配置，用作设置面板展示。

### npm 包与仓库信息

- npm 包：@alilc/lowcode-material-parser
- 仓库： [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) 下的 modules/material-parser

### 原理

入料模块使用动静态分析结合的方案，动态胜在真实，静态胜在细致，不过全都依赖源码中定义的属性，若未定义，或者定义错误，则无法正确入料。

#### 整体流程

大体分为本地化、扫描、解析、转换、校验 5 部分，如下图所示。

#### 静态解析

在静态分析时，分为 JS 和 TS 两种情况。

##### 静态解析 JS

在 JS 情况下，基于 react-docgen 进行扩展，自定义了 resolver 及 handler，前者用于寻找组件定义，后者用于解析 propTypes、defaultProps 等信息，整体流程图如下：

react-docgen 使用 babel 生成语法树，再使用 ast-types 进行遍历去寻找组件节点及其属性类型定义。原本的 react-docgen 只能解析单文件，且不能解析 IIFE、逗号表达式等语法结构 (一般出现在转码后的代码中)。笔者对其进行改造，使之可以递归解析多文件去查找组件定义，且能够解开 IIFE，以及对逗号表达式进行转换，以方便后续的组件解析。另外，还增加了子组件解析的功能，即类似 `Button.Group = Group` 这种定义。

##### 静态解析 TS

在 TS 情况下，还要再细分为 TS 源码和 TS 编译后的代码。
TS 源码中，React 组件具有类型签名；TS 编译后的代码中，dts 文件 (如有) 包含全部的 class / interface / type 类型信息。可以从这些类型信息中获取组件属性描述。整体流程图如下：

react-docgen 内置了 TypeScript 的 babel 插件，所以也具备解析 interface 的能力，可惜能力有限，babel 只能解析 TS 代码，但没法做类型检查，类型处理是由 react-docgen 实现的，它对于 extends/implements/utility 的情况处理不好，并且没有类型推断，虽然可以对其功能进行完善，不过这种情况下，应该借助 TypeScript Compiler 的能力，而非自己造轮子。通过调研，发现市面上有 typescript-react-docgen 这个项目。它在底层依赖了 TypeScript，且产出的数据格式与 react-docgen 一致，所以我们选择基于它进行解析。

TypeScript Compiler 会递归解析某个文件中出现及引用的全部类型，当然，前提是已经定义或安装了相应的类型声明。typescript-react-docgen 会调用 TypeScript Compiler 的 API，获取每个文件输出的类型，判断其是否为 React 组件。满足下列条件之一的，会被判定为 React 组件：

1. 获取其函数签名，如果只有一个入参，或者第一个入参名称为 props，会被判定为函数式组件；
2. 获取其 `constructor` 方法，如果其返回值包含 props 属性，会被判定为有状态组件。

然后，遍历组件的 props 类型，获取每个属性的类型签名字符串，比如 `(a: string) => void`。typescript-react-docgen 可以克服 react-docgen 解析 TypeScirpt 类型的问题，但是每个类型都以字符串的形式来呈现，不利于后续的解析。所以，笔者对其进行了扩展，递归解析每一层的属性值。此外，在函数式组件的判定上，笔者做了完善，会看函数的返回值是否为 `ReactElement` ，若是，才为函数式组件。

下面讲对于一些特殊情况的处理。

**循环定义**

TypeScript 类型可以循环定义，比如下面的 JSON 类型：

```
interface Json {
  [x: string]: string | number | boolean | Json | JsonArray;
}

type JsonArray = Array<string | number | boolean | Json | JsonArray>;
```

因为低代码组件描述协议中没有引用功能，而且也不方便在界面上展示出来，所以这种循环定义无需完全解析，入料模块会在检测到循环定义的时候，把类型简化为 `object` 。对于特殊的类型，如 JSON，可以用相应的 Setter 来编辑。

**复杂类型**
TypeScript Compiler 会将合成类型的所有属性展开，比如 `boolean | string`，会被展开为 `true | false | string`，这带来了不必要的精确，我们需要的只是 `boolean | string` 而已。当然，对于这个例子，我们很容易把它还原回 `boolean | string`，然而，对于诸如 `React.ButtonHTMLAttributes<any> & {'data-name': string}` 这种类型，它会把 `ButtonHTMLAttributes` 中众多的属性和 `data-name` 混杂在一起，完全无法分辨，只能以展开的形式提供。这 100 多个属性，如果都放在设置面板，绝对是使用者的噩梦，所以，其结果会被简化为 `object` 。当然，即使没有 `{'data-name': string}`，`ButtonHTMLAttributes` 也是没有单独的 Setter 的，同样会被简化为 `object` 。

#### 动态解析

当一个组件，使用静态解析无法入料时，会使用动态解析。

整体流程图如下：

基本思想很简单，require 组件进来，然后读取其组件类上定义的 propTypes 和 defaultProps 属性。这里使用了 parse-prop-types 库，使用它的时候必须在组件之前引用，因为它会先对 prop-types 库进行修改，在每个 PropTypes 透出的函数上挂上类型，比如 string, number 等等，然后再去遍历。动态解析可以解析出全部的类型信息，因为 PropTypes 有可能引入依赖组件的一些类型定义，这在静态解析中很难做到，或者成本较高，而对于动态解析来说，都由运行时完成了。

###### 技术细节

值得注意的是，有些 js 文件里还会引入 css 文件，而且从笔者了解的情况来看，这种情况在集团内部不在少数。这种组件不配合 webpack 使用，肯定会报错，但是使用 webpack 会明显拖慢速度，所以笔者采用了 sandbox 的方式，对 require 进来的类 css 文件进行 mock。这里，笔者使用了 vm2 这个库，它对 node 自带的 vm 进行了封装，可以劫持文件中的 require 方法。因为 parse-prop-types 的修改在沙箱中会失效，所以笔者也 mock 了组件中的 prop-types 库。

#### 整体大图

把上述的静态解析和动态解析流程结合起来，可以得到以下大图。

## 编排模块设计
来源：[https://lowcode-engine.cn/site/docs/guide/design/editor](https://lowcode-engine.cn/site/docs/guide/design/editor)
编排模块设计

本篇重点介绍如何从零开始设计编排模块，设计思路是什么？思考编排的本质是什么？围绕着本质，如何设计并实现对应的功能模块。

### 编排是什么

所谓编排，即将设计器中的所有物料，进行布局设置、组件设置、交互设置（JS 编写/逻辑编排）后，形成符合业务诉求的 schema 描述。

### 编排的本质

首先，思考编排的本质是什么？

编排的本质是生产符合《阿里巴巴中后台前端搭建协议规范》的数据**，**在这个场景里，协议是通过 JSON 来承载的。如：

```
{
  "componentName": "Page",

  "props": {
    "layout": "wide"
  },

  "children": [
    {
      "componentName": "Button",

      "props": {
        "size": "large"
      }
    }
  ]
}
```

可是在真实场景，节点数可能有成百上千，每个节点都具有新增、删除、修改、移动、插入子节点等操作，同时还有若干约束，JSON 结构操作起来不是很便利，于是我们仿 DOM 设计了 **节点模型 & 属性模型，**用更具可编程性的方式来编排，这是**编排系统的基石**。

其次，每次编排动作后（CRUD），都需要实时的渲染出视图。广义的视图应该包括各种平台上的展现，浏览器、Rax、小程序、Flutter 等等，所以使用何种渲染器去渲染 JSON 结构应该可以由用户去扩展，我们定义一种机制去衔接设计态和渲染态。

至此，我们已经完成了**编排模块最基础的功能**，接下来，就是完善细节，逐步丰满功能。比如：

1. 编排面板的整体功能区划分设计；
2. 节点属性设计；节点删除、移动等操作设计；容器节点设计；
3. 节点拖拽功能、拖拽定位设计和实现；
4. 节点在画布上的辅助功能，比如 hover、选中、选中时的操作项、resize、拖拽占位符等；
5. 设计态和渲染态的坐标系转换，滚动监听等；
6. 快捷键机制；
7. 历史功能，撤销和重做；
8. 结构化的插件扩展机制；
9. 原地编辑功能；

有非常多模块，但只要记住一点，这些功能的目的都是辅助用户在画布上有更好的编排体验、扩展能力而逐个增加设计的。

### 编排功能模块

#### 模型设计

编排实际上操作 schema，但是实际代码运行的过程中，我们将 schema 分成了很多层，每一层有各自的职责，他们所负责的功能是明确清晰的。这就是低代码引擎中的模型设计。

我们通过将 schema 和常用的操作等结合起来，最终将低代码引擎的模型分为节点模型、属性模型、文档模型和项目模型。

##### 项目模型（Project）

项目模型提供项目管理能力。通常一个引擎启动会默认创建一个 `Project` 实例，有且只有一个。项目模型实例下可以持有多个文档模型的实例，而当前处于设计器设计状态的文档模型，我们将其添加 active 标识，也将其称为 `currentDocument`，可以通过 `project.currentDocument` 获得。

一个 `Project` 包含若干个 `DocumentModel` 实例，即项目模型和文档模型的关系是 1 对 n，如下图所示：

##### 文档模型（DocumentModel）

文档模型提供文档管理的能力，每一个页面即一个文档流，对应一个文档模型。文档模型包含了一组 Node 组成的一颗树，类似于 DOM。我们可以通过文档模型来操作 `Node` 树，来达到管理文档模型的能力。每一个文档模型对应多个 `Node`，但是根 `Node` 只有一个，即 `rootNode` 和 `nodes`。

文档模型可以通过 `Node` 树，通过 `doc.schema` 来导出文档的 `schema`，并使用其进行渲染。

他们的关系如下图：

##### 节点模型（Node）

我们先看一下一个 `Node` 在 `schema` 中对应的示例：

```
{
  "componentName": "Text",

  "id": "node_k1ow3cbf",

  "props": {
    "showTitle": false,

    "behavior": "NORMAL",

    "content": {
      "use": "zh_CN",

      "en_US": "Title",

      "zh_CN": "个人信息",

      "type": "i18n"
    },

    "fieldId": "text_k1ow3h1j",

    "maxLine": 0
  },

  "condition": true
}
```

上面的示例是一个 `Text` 的 `Node` 节点，而我们的 `Node` 节点模型就是负责这一层级的 `Schema` 管理。它的功能聚焦于单层级的 schema 相关操作。我们可以看一下节点模型的一些方法，了解其功能。

```
declare class Node<Schema extends NodeSchema = NodeSchema> {
  // Props
  props: Props;

  get propsData(): PropsMap | PropsList | null;

  getProp(
    path: string,

    stash?: boolean,
  ): Prop | null;

  getPropValue(path: string): any;

  setPropValue(
    path: string,

    value: any,
  ): void;

  clearPropValue(path: string): void;

  mergeProps(props: PropsMap): void;

  setProps(props?: PropsMap | PropsList | Props | null): void;

  // Node
  get parent(): ParentalNode | null;

  get children(): NodeChildren | null;

  get nextSibling(): Node | null;

  get prevSibling(): Node | null;

  remove(
    useMutator?: boolean,

    purge?: boolean,
  ): void;

  select(): void;

  hover(flag?: boolean): void;

  replaceChild(
    node: Node,

    data: any,
  ): Node;

  mergeChildren(
    remover: () => any,

    adder: (children: Node[]) => NodeData[] | null,

    sorter: () => any,
  ): void;

  removeChild(node: Node): void;

  insert(
    node: Node,

    ref?: Node,

    useMutator?: boolean,
  ): void;

  insertBefore(
    node: any,

    ref?: Node,

    useMutator?: boolean,
  ): void;

  insertAfter(
    node: any,

    ref?: Node,

    useMutator?: boolean,
  ): void;

  // Schema
  get schema(): Schema;

  set schema(data: Schema);

  export(stage?: TransformStage): Schema;

  replaceWith(
    schema: Schema,

    migrate?: boolean,
  ): any;
}
```

这里没有展示全部的方法，但是我们可以发现，`Node` 节点模型核心功能点有三个：

1. `Props` 管理：通过 `Props` 实例管理所有的 `Prop` ，包括新增、设置、删除等 `Prop` 相关操作。
2. `Node` 管理：管理 `Node` 树的关系，修改当前 `Node` 节点或者 `Node` 子节点等。
3. `Schema` 管理：可以通过 `Node` 获取当前层级的 `Schema` 描述协议内容，并且也可以修改它。

通过 `Node` 这一层级，对 `Props`、`Node` 树和 `Schema` 的管理粒度控制到最低，这样扩展性也就更强。

##### 属性模型（Prop）

一个 `Props` 对应多个 `Prop`，每一个 `Prop` 对应 schema 的 `props` 下的一个字段。

`Props` 管理的是 `Node` 节点模型中的 `props` 字段下的内容。而 `Prop` 管理的是 `props` 下的每一个 `key` 的内容，例如下面的示例中，一个 `Props` 管理至少 6 个 `Prop`，而其中一个 `Prop` 管理的是 `showTitle` 的结果。

```
{
  "props": {
    "showTitle": false,

    "behavior": "NORMAL",

    "content": {
      "use": "zh_CN",

      "en_US": "Title",

      "zh_CN": "个人信息",

      "type": "i18n"
    },

    "fieldId": "text_k1ow3h1j",

    "maxLine": 0
  }
}
```

##### 组件描述模型（ComponentMeta）

编排已经等价于直接操作节点 & 属性了，而一个节点和一组对应的属性相当于一个真实的组件，而真实的组件一定是有约束的，比如组件名、组件类型、支持哪些属性以及属性类型、组件能否拖动、支持哪些扩展操作、组件是否是容器型组件、A 组件中能否放入 B 组件等等。

于是，我们设计了一份协议专门负责组件描述，即《中后台搭建组件描述协议》，而编排模块中也有负责解析和使用符合描述协议规范的模块。

每一个组件对应一个 `ComponentMeta` 的实例，其属性和方法就是描述协议中的所有字段，所有 `ComponentMeta` 都由设计器器的 `designer` 模块进行创建和管理，其他模块通过 `designer` 来获取指定的 `ComponentMeta` 实例，尤其是每个 `Node` 实例上都会挂载对应的 `ComponentMeta` 实例。

组件描述模型是后续编排辅助的基础，包括设置面板、拖拽定位机制等。

##### 项目、文档、节点和属性模型关系

整体来看，一个 Project 包含若干个 DocumentModel 实例，每个 DocumentModel 包含一组 Node 构成一颗树（类似 DOM 树），每个 Node 通过 Props 实例管理所有 Prop。整体的关系图如下。

节点 & 属性模型是引擎基石，几乎贯穿所有模块，相信从上面的类图已经能看出几个基础类的职责以及依赖关系。

节点 & 属性模型等价于 JSON 数据结构，而编排的本质是产出 JSON 数据结构，现在可以重新表述为编排的本质是操作节点 & 属性模型了。

```
// 一段编排的示例代码root
Node.insertAfter({
  componentName: 'Button',

  props: {
    size: 'medium',
  },
});

rootNode.insertAfter({
  componentName: 'Button',

  props: {
    size: 'medium',
  },
});

rootNode.children.get(1).getProp('size').setValue('large');

rootNode.children.get(2).remove();

rootNode.export();

// => 产出 schema
```

#### 画布渲染

画布渲染使用了设计态与渲染态的双层架构。

如上图，设计器和渲染器其实处在不同的 Frame 下，渲染器以单独的 `iframe` 嵌入。这样做的好处，一是为了给渲染器一个更纯净的运行环境，更贴近生产环境，二是扩展性考虑，让用户基于接口约束自定义自己的渲染器。

##### xxx-renderer

xxx-renderer 是一个纯 renderer，即一个渲染器，通过给定输入 schema、依赖组件和配置参数之后完成渲染。

##### xxx-simulator-renderer

xxx-simulator-renderer 通过和 host 进行通信来和设计器打交道，提供了 `DocumentModel` 获取 schema 和组件。将其传入 xxx-renderer 来完成渲染。

另外其提供了一些必要的接口，来帮助设计器完成交互，比如点击渲染画布任意一个位置，需要能计算出点击的组件实例，继而找到设计器对应的 Node 实例，以及组件实例的位置/尺寸信息，让设计器完成辅助 UI 的绘制，如节点选中。

##### react-simulator-renderer

以官方提供的 react-simulator-renderer 为例，我们看一下点击一个 DOM 节点后编排模块是如何处理的。

首先在初始化的时候，renderer 渲染的时候会给每一个元素添加 ref，通过 ref 机制在组件创建时将其存储起来。在存储的时候我们给实例添加 `Symbol('_LCNodeId')` 的属性。

当点击之后，会去根据 `__reactInternalInstance$` 查找相应的 fiberNode，通过递归查找到对应的 React 组件实例。找到一个挂载着 `Symbol('_LCNodeId')` 的实例，也就是上面我们初始化添加的属性。

通过 `Symbol('_LCNodeId')` 属性，我们可以获取 Node 的 id，这样我们就可以找到 Node 实例。

通过 `getBoundingClientRect` 我们可以获取到 Node 渲染出来的 DOM 的相关信息，包括 `x`、`y`、`width`、`height` 等。

通过 DOM 信息，我们将 focus 节点所需的标志渲染到对应的地方。hover、拖拽占位符、resize handler 等辅助 UI 都是类似逻辑。

##### 通信机制

既然设计器和渲染器处于两个 Frame，它们之间的事件通信、方法调用是通过各自的代理对象进行的，不允许其他方式，避免代码耦合。

###### host

host 可以访问设计器的所有模块，由于 renderer 层不负责与设计器相关的交互。所以增加了一层 host，作为通信的中间层。host 可以访问到设计器中所有模块，并提供相关方法供 simulator-renderer 层调用。例如 schema 的获取、组件获取等。

simulator-renderer 通过调用 host 的方法，将 schema、components 等参数传给 renderer，让 renderer 进行渲染。

###### xxx-simulator-renderer

为了完成双向交互，simulator-renderer 也需要提供一些方法来供 host 层调用，之后当设计器和用户有交互，例如上述提到的节点选中。这里需要提供的方法有：

- getClientRects
- getClosestNodeInstance
- findDOMNodes
- getComponent
- setNativeSelection
- setDraggingState
- setCopyState
- clearState

这样，host 和 simulator-renderer 之间便通过相关方法实现了双向通信，能在隔离设计器的基础上完成设计器到画布和画布到设计器的通信流程。

#### 编排辅助的核心

##### 设置面板与设置器

当在渲染画布上点击一个 DOM 节点，我们可以通过 xxx-simulator-renderer 获取 `Node` 节点，我们在 `Node` 上挂载了 `ComponentMeta` 实例。通过 `ComponentMeta` 我们获取到当前组件的描述模型。通过描述模型，我们即可获得组件、即当前 Node 支持的所有属性配置。

###### 设置面板

设置面板对于配置项的呈现结构是通过 `ComponentMeta.configure` 来确定的。

```
{
  "component": {
    "isContainer": true
  },

  "props": {
    "isExtends": true,

    "override": [
      {
        "name": "count",

        "title": {
          "label": "展示的数字",

          "tip": "count|大于 overflowCount 时显示为 ${overflowCount}+，为 0 时默认隐藏",

          "docUrl": "https://fusion.alibaba-inc.com/pc/component/basic/badge"
        },

        "setter": {
          "componentName": "MixedSetter",

          "props": {
            "setters": ["StringSetter", "ExpressionSetter"]
          }
        }
      }
    ]
  }
}
```

上述的 `component.isContainer` 描述了这个组件是否是一个容器组件。而 props 下的属性就是我们在设置面板中展示的属性，包含了这个属性的名称、使用的设置器、配置之后影响的是哪个属性等。

而这只是描述，编排模块的 `SettingTopEntry` 便是管理设置面板的实现模块。

`SettingTopEntry` 包含了 n 个 `SettingField`，每一个 `SettingField` 就对应下面要将的设置器。即 `SettingTopEntry` 负责管理多个 `SettingField`。

###### 设置器

选中节点可供配置的属性都有相应的设置器配置，比如文本、数字、颜色、JSON、Choice、I18N、表达式 等等，或者混合多种。

设置器本质上是一个 React 组件，但是设置面板在渲染时会传入当前配置项对应的 `SettingField` 实例，`SettingField` 本质上就是包裹了 `Prop` 实例，设置器内部的行为以及 UI 变化都由设置器自己把控，但当属性值发生变化时需要通过 `SettingField` 下的 `Prop` 来修改值，因为修改 `Prop` 实例就相当于修改了 schema。一方面这样的设置器设置之后，保存的 schema 才是正确的，另外一方面，只有 schema 变化了，才能触发渲染画布重新渲染。

##### 拖拽引擎 & 拖拽定位机制

拖拽引擎（`Dragon`）核心完成的工作是将被拖拽对象拖拽到目标位置，涉及到几个概念：

- 被拖拽对象 - `DragObject`
- 拖拽到的目标位置 - `DropLocation`
- 拖拽感应区 - `IPublicModelSensor`
- 定位事件 - `LocateEvent`

###### Sensor

在引擎初始化的时候，我们监听 `document` 和 iframe `contentDocument` 的 `mouse`、`keyboard`、`drag` 事件来感知拖拽的发生。而这些监听的区域我们又称为拖拽感应区，也就是 `Sensor`。`Sensor` 会有多个，因为感应器有多个，默认设置器和设置面板是没有 `Sensor`，但是他们是可以注册 `Sensor` 来增加感应区域，例如大纲树就注册了自己的 `Sensor`。

`Sensor` 有两个关键职责：

1. 用于事件对象转换，比如坐标系换算。
2. 根据拖拽过程中提供的位置信息，结合每一层 `Node` 也就是组件包含的描述信息，知道其是否能作为容器等限制条件，来进行进一步的定位，最后计算出精准信息来进行视图渲染。

**拖拽流程**

1. 在引擎初始化的时候，初始化多个 `Sensor` 。
2. 当拖拽开始的时候，开启 `mousemove` 、 `mouseleave` 、 `mouseover` 等事件的监听。
3. 拖拽过程中根据 `mousemove` 的 `MouseEvent` 对象封装出 `LocateEvent` 对象，继而交给相应 `sensor` 做进一步定位处理。
4. 拖拽结束时，根据拖拽的结果进行 schema 变更和视图渲染。
5. 最后关闭拖拽开始时的事件监听。

###### 拖拽方式

根据拖拽的对象不同，我们将拖拽分为几种方式：

1. **画布内拖拽：** 此时 sensor 是 simulatorHost，拖拽完成之后，会根据拖拽的位置来完成节点的精确插入。
2. **从组件面板拖拽到画布** ：此时的 sensor 还是 simulatorHost，因为拖拽结束的目标还是画布。
3. **大纲树面板拖拽到画布中** ：此时有两个 sensor，一个是大纲树，当我们拖拽到画布区域时，画布区域内的 simulatorHost 开始接管。
4. **画布拖拽到大纲树中** ：从画布中开始拖拽时，最新生效的是 simulatorHost，当离开画布到大纲树时，大纲树 sensor 开始接管生效。当拖拽到大纲树的某一个节点下时，大纲树会将大纲树中的信息转化为 schema，然后渲染到画布中。

#### 其他

引擎的编排能力远远不止上述所描述的功能，这里只描述了其核心和关键的功能。在整个引擎的迭代和设计过程中还有很多细节来使我们的引擎更好用、更容易扩展。

##### schema 处理的管道机制

通过 PropsReducer 的管道机制，用户可以定制自己需要的逻辑，来修改 Schema。

##### 组件 metadata 处理的管道机制

组件的描述信息都收拢在各自的 ComponentMeta 实例内，涉及到的消费方几乎遍及整个编排过程，包括但不限于 组件拖拽、拖拽辅助 UI、设置区、原地编辑、大纲树 等等。

在用户需要自定义的场景，开放 ComponentMeta 的修改能力至关重要，因此我们设计了 metadata 初始化/修改的管道机制。

##### hotkey & builtin-hotkey

快捷键的实现，以及引擎内核默认绑定的快捷键行为。

##### drag resize 引擎

对于布局等类型的组件，支持拖拽改变大小。resize 拖拽引擎根据组件 ComponentMeta 声明来开启，拖拽后，触发组件的钩子函数（`onResizeStart` / `onResize` / `onResizeEnd`），完成 resize 过程。

##### OffsetObserver

设计态的辅助 UI 需要根据渲染态的视图变化而变化，比如渲染容器滚动了，此时通过 OffsetObserver 做一个动态的监听。

##### 插件机制

我们希望保持引擎内核足够小，但拥有足够强的扩展能力，所有扩展功能都通过插件机制来承载。

## 渲染模块设计
来源：[https://lowcode-engine.cn/site/docs/guide/design/renderer](https://lowcode-engine.cn/site/docs/guide/design/renderer)
渲染模块设计

### 低代码渲染介绍

基于 Schema 和物料组件，如何渲染出我们的页面？这一节描述的就是这个。

### npm 包与仓库信息

- React 框架渲染 npm 包：@alilc/lowcode-react-renderer
- 仓库： [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) 下的
  - packages/renderer-core
  - packages/react-renderer
  - packages/react-simulator-renderer

### 渲染框架原理

#### 整体架构

- 协议层：基于 [《低代码引擎搭建协议规范》](https://lowcode-engine.cn/site/docs/specs/lowcode-spec) 产出的 Schema 作为我们的规范协议。
- 能力层：提供组件、区块、页面等渲染所需的核心能力，包括 Props 解析、样式注入、条件渲染等。
- 适配层：由于我们使用的运行时框架不是统一的，所以统一使用适配层将不同运行框架的差异部分，通过接口对外，让渲染层注册/适配对应所需的方法。能保障渲染层和能力层直接通过适配层连接起来，能起到独立可扩展的作用。
- 渲染层：提供核心的渲染方法，由于不同运行时框架提供的渲染方法是不同的，所以其通过适配层进行注入，只需要提供适配层所需的接口，即可实现渲染。
- 应用层：根据渲染层所提供的方法，可以应用到项目中，根据使用的方法和规模即可实现应用、页面、区块的渲染。

#### 核心解析

这里主要解析一下刚刚提到的架构中的适配层和渲染层。

##### 适配层

适配层提供的是各个框架之间的差异项。比如 `React.createElement` 和 `Rax.createElement` 方法是不同的。所以需要在适配层对 API 进行抹平。

###### React

```
import { createElement } from 'react';

import { adapter } from '@ali/lowcode-renderer-core';

adapter.setRuntime({
  createElement,
});
```

###### Rax

```
import { createElement } from 'rax';

import { adapter } from '@ali/lowcode-renderer-core';

adapter.setRuntime({
  createElement,
});
```

这时，在核心层使用的 `createElement` 会基于使用不同的 renderer 而使用不同的方法，自动适配框架所需的运行时方法。

所需的方法包括：

- `setRuntime` ：设置运行时相关方法
  - `Component` ：组件类，参考 React 的 `Component` 。
  - `PureComponent` ：组件类，参考 React 的 `PureComponent` 。
  - `createContext` ：创建一个 `Context` 对象的方法。例如，当 React 渲染一个订阅了这个 `Context` 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 `context` 值。
  - `createElement` ：创建 `Component` 元素，例如在 React 中即为创建 React 元素。
  - `forwardRef` ：ref 转发的方法。Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。
  - `findDOMNode` ：是一个访问底层 DOM 节点的方法。如果组件已经被挂载到 DOM 上，此方法会返回浏览器中相应的原生 DOM 元素。
- `setRenderers`
  - `PageRenderer` ：页面渲染的方法。可以定制页面渲染的生命周期，定制导航，定制路由等。
  - `ComponentRenderer` ：组件渲染的方法。
  - `BlockRenderer` ：区块渲染的方法。

##### 渲染层

###### React Renderer

内部的技术栈统一都是 React，大多数适配层的 API 都是按照 React 来设计的，所以对于 React Renderer 来说，需要做的不多。

React Renderer 的代码量很少，主要是将 React API 注册到适配层中。

```
import React, {
  Component,
  PureComponent,
  createElement,
  createContext,
  forwardRef,
  ReactInstance,
  ContextType,
} from 'react';

import ReactDOM from 'react-dom';

import {
  adapter,
  pageRendererFactory,
  componentRendererFactory,
  blockRendererFactory,
  addonRendererFactory,
  tempRendererFactory,
  rendererFactory,
  types,
} from '@ali/lowcode-renderer-core';

import ConfigProvider from '@alifd/next/lib/config-provider';

window.React = React;

(window as any).ReactDom = ReactDOM;

adapter.setRuntime({
  Component,

  PureComponent,

  createContext,

  createElement,

  forwardRef,

  findDOMNode: ReactDOM.findDOMNode,
});

adapter.setRenderers({
  PageRenderer: pageRendererFactory(),

  ComponentRenderer: componentRendererFactory(),

  BlockRenderer: blockRendererFactory(),

  AddonRenderer: addonRendererFactory(),

  TempRenderer: tempRendererFactory(),

  DivRenderer: blockRendererFactory(),
});

adapter.setConfigProvider(ConfigProvider);
```

###### Rax Renderer

Rax 的大多数 API 和 React 基本也是一致的，差异点在于重写了一些方法。

```
import { Component, PureComponent, createElement, createContext, forwardRef } from 'rax';

import findDOMNode from 'rax-find-dom-node';

import {
  adapter,
  addonRendererFactory,
  tempRendererFactory,
  rendererFactory,
} from '@ali/lowcode-renderer-core';

import pageRendererFactory from './renderer/page';

import componentRendererFactory from './renderer/component';

import blockRendererFactory from './renderer/block';

import CompFactory from './hoc/compFactory';

adapter.setRuntime({
  Component,

  PureComponent,

  createContext,

  createElement,

  forwardRef,

  findDOMNode,
});

adapter.setRenderers({
  PageRenderer: pageRendererFactory(),

  ComponentRenderer: componentRendererFactory(),

  BlockRenderer: blockRendererFactory(),

  AddonRenderer: addonRendererFactory(),

  TempRenderer: tempRendererFactory(),
});
```

#### 多模式渲染

##### 预览模式渲染

预览模式的渲染，主要是通过 Schema、components 即可完成上述的页面渲染能力。

```
import ReactRenderer from '@ali/lowcode-react-renderer';

import ReactDOM from 'react-dom';

import { Button } from '@alifd/next';

const schema = {
  componentName: 'Page',

  props: {},

  children: [
    {
      componentName: 'Button',

      props: {
        type: 'primary',

        style: {
          color: '#2077ff',
        },
      },

      children: '确定',
    },
  ],
};

const components = {
  Button,
};

ReactDOM.render(
  <ReactRenderer schema={schema} components={components} />,
  document.getElementById('root'),
);
```

##### 设计模式渲染（Simulator）

设计模式渲染就是将编排生成的《搭建协议》渲染成视图的过程，视图是可以交互的，所以必须要处理好内部数据流、生命周期、事件绑定、国际化等等。也称为画布的渲染，画布是 UI 编排的核心，它一般融合了页面的渲染以及组件/区块的拖拽、选择、快捷配置。
画布的渲染和预览模式的渲染的区别在于，画布的渲染和设计器之间是有交互的。所以在这里我们新增了一层 `Simulator` 作为设计器和渲染的连接器。
`Simulator` 是将设计器传入的 `DocumentModel` 和组件/库描述转成相应的 Schema 和 组件类。再调用 Render 层完成渲染。我们这里介绍一下它提供的能力。

###### 整体架构

- `Project` ：位于顶层的 Project，保留了对所有文档模型的引用，用于管理应用级 Schema 的导入与导出。
- `Document` ：文档模型包括 Simulator 与数据模型两部分。Simulator 通过一份 Simulator Host 协议与数据模型层通信，达到画布上的 UI 操作驱动数据模型变化。通过多文档的设计及多 Tab 交互方式，能够实现同时设计多个页面，以及在一个浏览器标签里进行搭建与配置应用属性。
- `Simulator` ：模拟器主要承载特定运行时环境的页面渲染及与模型层的通信。
- `Node` ：节点模型是对可视化组件/区块的抽象，保留了组件属性集合 Props 的引用，封装了一系列针对组件的 API，比如修改、编辑、保存、拖拽、复制等。
- `Props` ：描述了当前组件所维系的所有可以「设计」的属性，提供一系列操作、遍历和修改属性的方法。同时保持对单个属性 Prop 的引用。
- `Prop` ：属性模型 Prop 与当前可视化组件/区块的某一具体属性想映射，提供了一系列操作属性变更的 API。
- `Settings` ： `SettingField` 的集合。
- `SettingField` ：它连接属性设置器 `Setter` 与属性模型 `Prop` ，它是实现多节点属性批处理的关键。
- 通用交互模型：内置了拖拽、活跃追踪、悬停探测、剪贴板、滚动、快捷键绑定。

###### 模拟器介绍

- 运行时环境：从运行时环境来看，目前我们有 React 生态、Rax 生态。而在对外的历程中，我们也会拥有 Vue 生态、Angular 生态等。
- 布局模式：不同于 C 端营销页的搭建，中后台场景大多是表单、表格，流式布局是主流的选择。对于设计师、产品来说，是需要绝对布局的方式来进行页面研发的。
- 研发场景：从研发场景来看，低代码搭建不仅有页面编排，还有诸如逻辑编排、业务编排的场景。

基于以上思考，我们通过基于沙箱隔离的模拟器技术来实现了多运行时环境（如 React、Rax、小程序、Vue）、多模式（如流式布局、自由布局）、多场景（如页面编排、关系图编排）的 UI 编排。通过注册不同的运行时环境的渲染模块，能够实现编辑器从 React 页面搭建到 Rax 页面搭建的迁移。通过注册不同的模拟器画布，你可以基于 G6 或者 mxgraph 来做关系图编排。你可以定制一个流式布局的画布，也可以定制一个自由布局的画布。

## 出码模块设计
来源：[https://lowcode-engine.cn/site/docs/guide/design/generator](https://lowcode-engine.cn/site/docs/guide/design/generator)
出码模块设计

本篇主要讲解了出码模块实现的基本思路与一些概念。如需接入出码和定制出码方案，可以参考《[使用出码功能](https://lowcode-engine.cn/site/docs/guide/expand/runtime/codeGeneration)》一节。

### npm 包与仓库信息

| **NPM 包** | **代码仓库** | **说明** |
| --- | --- | --- |
| [@alilc/lowcode-code-generator](https://www.npmjs.com/package/@alilc/lowcode-code-generator) | [alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine)（子目录：modules/code-generator） | 出码模块核心库，支持在 node 环境下运行，也提供了浏览器下运行的 standalone 模式 |
| [@alilc/lowcode-plugin-code-generator](https://www.npmjs.com/package/@alilc/lowcode-plugin-code-generator) | [alibaba/lowcode-code-generator-demo](https://github.com/alibaba/lowcode-code-generator-demo) | 出码示例 -- 浏览器端出码插件 |

### 出码模块原理

出码模块的输入和输出很简单：

这里有几个概念：

- schema: 搭建协议内容，指符合《阿里巴巴中后台前端搭建协议规范》的 schema
- solution：出码方案，指具体的项目框架（如 Rax，Ice.js)
- Source Codes：生成的源代码，以目录树的形式进行描述

可以看出，这是一个与用户基本没有交互，通过既定的流程完成整个功能链路的模块。其核心暴露的是一个将搭建协议 schema 按既定的 solution 转换为代码的函数。对于使用者来说就是一个输入输出都确定的黑盒系统。

#### 出码流程概述

出码模块和编译器很类似，都是将代码的一种表现形式转换成另一种表现形式，如：

##### 编译器流程

##### 出码模块流程

#### 出码流程详解

##### 协议解析

协议解析主要是将输入的 schema 解析成更适合出码模块内部使用的数据结构的过程。这样在后面的代码生成过程中就可以直接用这些数据，不必重复解析了。

主要步骤如下：

- 解析三方组件依赖
- 分析 ref API 的使用情况
- 建立容器之间的依赖关系索引
- 分析容器内的组件依赖关系
- 分析路由配置
- 分析 utils 和 NPM 包依赖关系
- 其他兼容处理

##### 前置优化

前置优化是计划基于策略对 schema 做一些优化。

主要逻辑分为分析、规则和优化三个部分，组合为一个支持通过配置进行一定程度定制化的策略包。每个策略包会先执行分析器，对输入进行特征提取，然后通过规则对特征进行判断，决定是否执行优化动作：

##### 代码生成

代码生成的流程如下：

如果简单粗暴地拼字符串生成源代码将难以扩展和维护，因此出码模块在代码生成过程中将代码进行了一些抽象化。

日常开发中，我们常常是基于某一个特定的项目框架，将一些配置、UI 代码、逻辑代码放到他们应该在的地方，最终形成一套可以 run 起来的业务系统。那么其实对于出码这件事，我们也可以层层拆解，**项目 -> 插槽 -> 模块 -> 文件 -> 代码块**（代码片段）。这样就能将复杂的项目产出问题，拆分为一个个相对专注且单一的代码块产出问题，同时也支持组合复用。

注：中间表达结构即为对 Schema 解析后的结构化产物

###### 插槽

首先来看下插槽，插槽描述了对应模块在项目中相对路径，并且可以对模块做固定的命名。每个插槽都有一系列插件来完成代码产出工作。生成的一个或多个文件，最终会依照插槽的描述放入项目中。

```
// 项目模版export interface IProjectTemplate {

    slots: Record<string,

     IProjectSlot>;

}

// 插槽interface IProjectSlot {

    path: string[

  ];

      fileName?: string;

}

// 插槽出码插件配置interface IProjectPlugins {

      [

        slotName: string

  ]

    : BuilderComponentPlugin[

  ];

}
```

###### 代码块

代码块是出码产物的最小单元，由出码模块插件产出，多个代码块最后会被组装为代码文件。每个代码块通过 name 描述自己，再通过 linkAfter 描述应该跟在哪些 name 的代码块后面。

```
interface ICodeChunk {
  type: ChunkType;

  // 处理类型 ast | string | json
  fileType: string;

  // 文件类型 js | css | ts ...
  name: string;

  // 代码块名称，与 linkAfter 相关
  subModule?: string;

  // 模块内文件名，默认是 index
  content: ChunkContent;

  // 代码块内容，数据格式与 type 相关
  linkAfter: string[];
}
```

##### 后置优化

后置优化分为文件级别和项目级别两种：

- 文件级别：在生成完一个文件后进行处理
- 项目级别：在所有文件都生成完了之后进行处理

文件级别的后置优化目前主要是有 prettier 这个代码格式化工具。

## 设置器设计
来源：[https://lowcode-engine.cn/site/docs/guide/design/setter](https://lowcode-engine.cn/site/docs/guide/design/setter)
设置器设计

设置器，又称为 Setter，是作为物料属性和用户交互的重要途径，在编辑器日常使用中有着非常重要的作用，本文重点介绍 Setter 的设计原理和使用方式，帮助用户更好的理解 Setter。

在编辑器的右边区域，Setter 的区块就展现在这里，如下图：

其中包含 属性、样式、事件、高级：

- 属性：展示该物料常规的属性；
- 样式：展示该物料样式的属性；
- 事件：如果该物料有声明事件，则会出现事件面板，用于绑定事件；
- 高级：两个逻辑相关的属性， **条件渲染** 和 **循环。**

### npm 包与仓库信息

- npm 包：@alilc/lowcode-engine-ext
- 仓库： [https://github.com/alibaba/lowcode-engine-ext](https://github.com/alibaba/lowcode-engine-ext)

### 设置器模块原理

设置面板依赖于以下三块抽象

- 编辑器上下文 `editor` ，主要包含：消息通知、插件引用等
- 设置对象 `settingTarget` ，主要包含：选中的节点、是否同一值、值的储存等
- 设置列 `settingField` ，主要和当前设置视图相关，包含视图的 `ref` 、以及设置对象 `settingTarget`

#### SettingTarget 抽象

如果不是多选，可以直接暴露 `Node` 给到这，但涉及多选编辑的时候，大家的值通常是不一样的，设置的时候需要批量设置进去，这里主要封装这些逻辑，把多选编辑的复杂性屏蔽掉。

所选节点所构成的**设置对象**抽象如下：

```
interface SettingTarget {
  // 所设置的节点集，至少一个
  readonly nodes: Node[];

  // 所有属性值数据
  readonly props: object;

  // 设置属性值
  setPropValue(
    propName: string,

    value: any,
  ): void;

  // 获取属性值
  getPropValue(propName: string): any;

  // 设置多个属性值，替换原有值
  setProps(data: object): void;

  // 设置多个属性值，和原有值合并
  mergeProps(data: object): void;

  // 绑定属性值发生变化时
  onPropsChange(fn: () => void): () => void;
}
```

基于设置对象所派生的**设置目标属性**抽象如下：

```
interface SettingTargetProp extends SettingTarget {
  // 当前属性名称
  readonly propName: string;

  // 当前属性值
  value: any;

  // 是否设置对象的值一致
  isSameValue(): boolean;

  // 是否是空值
  isEmpty(): boolean;

  // 设置属性值
  setValue(value: any): void;

  // 移除当前设置
  remove(): void;
}
```

#### SettingField 抽象

```
interface SettingField extends SettingTarget {
  // 当前 Field 设置的目标属性，为 group 时此值为空
  readonly prop?: SettingTargetProp;

  // 当前设置项的 ref 引用
  readonly ref?: ReactInstance;

  // 属性配置描述传入的配置
  readonly config: SettingConfig;

  // others....
}
```

## 数据源引擎设计
来源：[https://lowcode-engine.cn/site/docs/guide/design/datasourceEngine](https://lowcode-engine.cn/site/docs/guide/design/datasourceEngine)
数据源引擎设计

### 核心原理

考虑之后的扩展性和兼容性，核心分为了 2 类包，一个是 **datasource-engine** ，另一个是 **datasource-engine-x-handler** ，x 的意思其实是对应数据源的 type，比如说 **datasource-engine-mtop-handler**，也就是说我们会将真正的请求工具放在 handler 里面去处理，engine 在使用的时候由使用方自身来决定需要注册哪些 handler，这样的目的有 2 个，一个是如果将所有的 handler 都放到一个包，对于端上来说这个包过大，有一些浪费资源和损耗性能的问题，另一个是如果有新的类型的数据源出现，只需要按照既定的格式去新增一个对应的 handler 处理器即可，达到了高扩展性的目的；

#### DataSourceEngine

- engine：engine 主要分 2 类，一类是面向 render 引擎的，可以从 engine/interpret 引入，一类是面向出码或者说直接单纯使用数据源引擎的场景，可以从 engine/runtime 引入，代码如下

```
import { createInterpret, createRuntime } from '@alilc/lowcode-datasource-engine';
```

create 方法定义如下

```
interface IDataSourceEngineFactory {
  create(
    dataSource: DataSource,

    context: Omit<IRuntimeContext, 'dataSourceMap' | 'reloadDataSource'>,

    extraConfig?: {
      requestHandlersMap: RequestHandlersMap;

      [key: string]: any;
    },
  ): IDataSourceEngine;
}
```

create 接收三个参数，第一个是 DataSource，对于运行时渲染和出码来说，DataSource 的定义分别如下：

```
/**
 * 数据源对象--运行时渲染
 * /export interface DataSource {

        list: DataSourceConfig[

  ];

        dataHandler?: JSFunction;

}

/**
 * 数据源对象
 * /export interface DataSourceConfig {

        id: string;

        isInit: boolean | JSExpression;

        type: string;

        requestHandler?: JSFunction;

        dataHandler?: JSFunction;

        options?: {

                uri: string | JSExpression;

                params?: JSONObject | JSExpression;

                method?: string | JSExpression;

                isCors?: boolean | JSExpression;

                timeout?: number | JSExpression;

                headers?: JSONObject | JSExpression;

                [

            option: string

    ]

        : CompositeValue;

  };

        [

        otherKey: string

  ]

    : CompositeValue;

}
```

但是对于出码来说，create 和 DataSource 定义如下：

```
export interface IRuntimeDataSourceEngineFactory {

        create(dataSource: RuntimeDataSource,

     context: Omit<IRuntimeContext,

     'dataSourceMap' | 'reloadDataSource'>,

     extraConfig?: {

                requestHandlersMap: RequestHandlersMap;

                [

            key: string

    ]

        : any;

  }): IDataSourceEngine;

}

export interface RuntimeOptionsConfig {

        uri: string;

        params?: Record<string,

     unknown>;

        method?: string;

        isCors?: boolean;

        timeout?: number;

        headers?: Record<string,

     unknown>;

        shouldFetch?: () => boolean;

        [

        option: string

  ]

    : unknown;

}

export declare type RuntimeOptions = () => RuntimeOptionsConfig;

 // 考虑需要动态获取值的情况，这里在运行时会真正的转为一个 functionexport interface RuntimeDataSourceConfig {

    id: string;

        isInit: boolean;

        type: string;

        requestHandler?: () => {

  };

        dataHandler: (data: unknown,

     err?: Error) => {

  };

        options?: RuntimeOptions;

        [

        otherKey: string

  ]

    : unknown;

}

/**
 * 数据源对象
 * /export interface RuntimeDataSource {

        list: RuntimeDataSourceConfig[

  ];

        dataHandler?: (dataMap: DataSourceMap) => void;

}
```

2 者的区别还是比较明显的，一个是带 js 表达式一类的字符串，另一个是真正转为直接可以运行的 js 代码，对于出码来说，转为可执行的 js 代码的过程是出码自身负责的，对于渲染引擎来说，它只能接受到初始的 schema json 所以需要数据源引擎来做转化

- context：数据源引擎内部有一些使用了 this 的表达式，这些表达式需要求值的时候依赖上下文，因此需要将当前的上下文丢给数据源引擎，另外在 handler 里面去赋值的时候，也会用到诸如 setState 这种上下文里面的 api，当然，这个是可选的，我们后面再说。

```
/**
 * 运行时上下文--暂时是参考 react，当然可以自己构建，完全没问题
 * /export interface IRuntimeContext<TState extends object = Record<string,   unknown>> {

        /** 当前容器的状态
     * /    readonly state: TState;

        /** 设置状态 (浅合并)
     * /    setState(state: Partial<TState>): void;

        /** 自定义的方法
     * /    [

        customMethod: string

  ]

    : any;

        /** 数据源，key 是数据源的 ID
     * /    dataSourceMap: Record<string,

     IRuntimeDataSource>;

        /** 重新加载所有的数据源
     * /    reloadDataSource(): Promise<void>;

        /** 页面容器
     * /    readonly page: IRuntimeContext & {

                readonly props: Record<string,

         unknown>;

  };

        /** 低代码业务组件容器
     * /    readonly component: IRuntimeContext & {

                readonly props: Record<string,

         unknown>;

  };

}
```

- extraConfig：这个字段是为了留着扩展用的，除了一个必填的字段 **requestHandlersMap**

```
export declare type RequestHandler<T = unknown> = (
  ds: RuntimeDataSourceConfig,
  context: IRuntimeContext,
) => Promise<RequestResult<T>>;

export declare type RequestHandlersMap = Record<string, RequestHandler>;
```

RequestHandlersMap 是一个把数据源以及对应的数据源 handler 关联起来的桥梁，它的 key 对应的是数据源 DataSourceConfig 的 type，比如 mtop/http/jsonp ... ，每个类型的数据源在真正使用的时候会调用对应的 type-handler，并将当前的参数和上下文带给对应的 handler。

create 调用结束后，可以获取到一个 DataSourceEngine 实例

```
export interface IDataSourceEngine {

        /** 数据源，key 是数据源的 ID
     * /    dataSourceMap: Record<string,

     IRuntimeDataSource>;

        /** 重新加载所有的数据源
     * /    reloadDataSource(): Promise<void>;

}
```

## 名词解释
来源：[https://lowcode-engine.cn/site/docs/guide/appendix/glossary](https://lowcode-engine.cn/site/docs/guide/appendix/glossary)
名词解释

## 搭建组件协议结构
来源：[https://lowcode-engine.cn/site/docs/guide/appendix/metaSpec](https://lowcode-engine.cn/site/docs/guide/appendix/metaSpec)
搭建组件协议结构

完整协议[查看](https://lowcode-engine.cn/site/docs/specs/material-spec)

## 低代码仓库列表
来源：[https://lowcode-engine.cn/site/docs/guide/appendix/repos](https://lowcode-engine.cn/site/docs/guide/appendix/repos)
低代码仓库列表

### 1. 引擎主包

包含引擎的 4 大模块，入料、编排、渲染和出码。

仓库地址：[https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine)
子包明细：

1. designer
2. editor-core
3. editor-skeleton
4. engine
5. ignitor
6. plugin-designer
7. plugin-outline-pane
8. react-renderer
9. react-simulator-renderer
10. renderer-core
11. types
12. utils
13. material-parser
14. code-generator

### 2. 引擎官方扩展包

包含了常用的设置器（setter）、跟 setter 绑定的插件等

仓库地址：[https://github.com/alibaba/lowcode-engine-ext](https://github.com/alibaba/lowcode-engine-ext)
子包明细：

- 设置器 setter
  - array-setter
  - bool-setter
  - classname-setter
  - color-setter
  - events-setter
  - expression-setter
  - function-setter
  - i18n-setter
  - icon-setter
  - json-setter
  - mixed-setter
  - number-setter
  - object-setter
  - out.txt
  - radiogroup-setter
  - select-setter
  - slot-setter
  - string-setter
  - style-setter
  - textarea-setter
  - variable-setter
- 插件 plugin
  - plugin-event-bind-dialog 事件绑定浮层
  - plugin-variable-bind-dialog 变量绑定浮层

### 3. 低代码插件

包含了常用的插件等

仓库地址：[https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins)
子包明细：

- base-monaco-editor 基础代码编辑器
- plugin-code-editor 源码编辑面板
- plugin-datasource-pane 数据源面板
- plugin-manual 产品使用手册面板
- plugin-schema 页面数据面板
- plugin-undo-redo 前进/后退功能
- plugin-zh-cn 中英文切换功能

### 4. 引擎 demo

展示使用引擎编排和渲染等模块以及相应的依赖资源配置基础 demo

仓库地址：[https://github.com/alibaba/lowcode-demo](https://github.com/alibaba/lowcode-demo)

### 5. 工具链包

包含生成引擎生态元素（setter、物料、插件）的脚手架，启动脚本，调试插件等

仓库地址：[https://github.com/alibaba/lowcode-tools](https://github.com/alibaba/lowcode-tools)

### 6. 低代码数据源引擎

负责在渲染&出码两种运行时实现数据源管理，承担低代码搭建数据请求的能力；
仓库地址：[https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource)

### 7. 基础物料 & 物料描述

仓库地址：[https://github.com/alibaba/lowcode-materials](https://github.com/alibaba/lowcode-materials)

### 8. 出码 demo

仓库地址：[https://github.com/alibaba/lowcode-code-generator-demo](https://github.com/alibaba/lowcode-code-generator-demo)

## NPM 包对应源码位置汇总
来源：[https://lowcode-engine.cn/site/docs/guide/appendix/npms](https://lowcode-engine.cn/site/docs/guide/appendix/npms)
NPM 包对应源码位置汇总

| 包名 | 仓库 | 路径 |
| --- | --- | --- |
| @alilc/lowcode-code-generator | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | modules/code-generator |
| @alilc/lowcode-material-parser | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | modules/material-parser |
| @alilc/lowcode-designer | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/designer |
| @alilc/lowcode-editor-core | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/editor-core |
| @alilc/lowcode-editor-skeleton | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/editor-skeleton |
| @alilc/lowcode-engine | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/engine |
| @alilc/lowcode-plugin-designer | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/plugin-designer |
| @alilc/lowcode-plugin-outline-pane | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/plugin-outline-pane |
| @alilc/lowcode-react-renderer | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/react-renderer |
| @alilc/lowcode-react-simulator-renderer | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/react-simulator-renderer |
| @alilc/lowcode-renderer-core | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/renderer-core |
| @alilc/lowcode-shell | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/shell |
| @alilc/lowcode-types | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/types |
| @alilc/lowcode-utils | [https://github.com/alibaba/lowcode-engine](https://github.com/alibaba/lowcode-engine) | packages/utils |
| @alilc/lowcode-datasource-engine | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-engine |
| @alilc/lowcode-datasource-fetch-handler | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-fetch-handler |
| @alilc/lowcode-datasource-jsonp-handler | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-jsonp-handler |
| @alilc/lowcode-datasource-mopen-handler | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-mopen-handler |
| @alilc/lowcode-datasource-mtop-handler | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-mtop-handler |
| @alilc/lowcode-datasource-types | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-types |
| @alilc/lowcode-datasource-universal-mtop-handler | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-universal-mtop-handler |
| @alilc/lowcode-datasource-url-params-handler | [https://github.com/alibaba/lowcode-datasource](https://github.com/alibaba/lowcode-datasource) | packages/datasource-url-params-handler |
| @alilc/build-plugin-alt | [https://github.com/alibaba/lowcode-tools](https://github.com/alibaba/lowcode-tools) | packages/build-plugin-alt |
| @alilc/create-element | [https://github.com/alibaba/lowcode-tools](https://github.com/alibaba/lowcode-tools) | packages/create-element |
| @alilc/lowcode-plugin-inject | [https://github.com/alibaba/lowcode-tools](https://github.com/alibaba/lowcode-tools) | packages/lowcode-plugin-inject |
| @alilc/action-block | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/action-block |
| @alilc/lowcode-plugin-base-monaco-editor | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-base-monaco-editor |
| @alilc/lowcode-plugin-block | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-block |
| @alilc/lowcode-plugin-code-editor | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-code-editor |
| @alilc/lowcode-plugin-components-pane | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-components-pane |
| @alilc/lowcode-plugin-datasource-pane | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-datasource-pane |
| @alilc/lowcode-plugin-manual | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-manual |
| @alilc/lowcode-plugin-schema | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-schema |
| @alilc/lowcode-plugin-undo-redo | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-undo-redo |
| @alilc/lowcode-plugin-zh-en | [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins) | packages/plugin-zh-en |
| @alifd/fusion-ui | [https://github.com/alibaba/lowcode-materials](https://github.com/alibaba/lowcode-materials) | packages/fusion-ui |
| @alilc/lowcode-materials | [https://github.com/alibaba/lowcode-materials](https://github.com/alibaba/lowcode-materials) | packages/fusion-lowcode-materials |
| @alilc/antd-lowcode-materials | [https://github.com/alibaba/lowcode-materials](https://github.com/alibaba/lowcode-materials) | packages/antd-lowcode-materials |
| @alifd/layout（原 @alifd/pro-layout 升级后的版本） | [https://github.com/alibaba-fusion/layout](https://github.com/alibaba-fusion/layout) |  |
|  |  |  |
|  |  |  |

## 预置设置器列表
来源：[https://lowcode-engine.cn/site/docs/guide/appendix/setters](https://lowcode-engine.cn/site/docs/guide/appendix/setters)
预置设置器列表

| 预置 Setter | 返回类型 | 用途 | 截图 |
| --- | --- | --- | --- |
| [ArraySetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/array) | T[] | 列表数组行数据设置器 |  |
| [BoolSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/behavior) | boolean | 布尔型数据设置器， |  |
| ClassNameSetter | string | 样式名设置器 |  |
| [ColorSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/color) | string | 颜色设置器 |  |
| DateMonthSetter |  | 日期型 - 月数据设置器 |  |
| DateRangeSetter |  | 日期型数据设置器，可选择时间区间 |  |
| DateSetter |  | 日期型数据设置器 |  |
| DateYearSetter |  | 日期型 - 年数据设置器 |  |
| [EventSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/event) | function | 事件绑定设置器 |  |
| [IconSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/icon) | string | 图标设置器 |  |
| [FunctionSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/function) | function | 函数型数据设置器 |  |
| JsonSetter | object | json 型数据设置器 |  |
| [MixedSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/mixed) | any | 混合型数据设置器 |  |
| [NumberSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/number) | number | 数值型数据设置器 |  |
| ObjectSetter | Record<string, any> | 对象数据设置器，一般内嵌在 ArraySetter 中 |  |
| [RadioGroupSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/radioGroup) | string | number | boolean | 枚举型数据设置器，采用 tab 选择的形式展现 |  |
| [SelectSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/select) | string | number | boolean | 枚举型数据设置器，采用下拉的形式展现 |  |
| [SlotSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/slot) | Element | Element[] | 节点型数据设置器 |  |
| [StringSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/string) | string | 短文本型数据设置器，不可换行 |  |
| StyleSetter |  | 样式设置器 |  |
| [TextAreaSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/textArea) | string | 长文本型数据设置器，可换行 |  |
| TimePicker |  | 时间型数据设置器 |  |
| [VariableSetter](https://lowcode-engine.cn/site/docs/guide/appendix/setterDetails/variable) | any | 变量型数据设置器， |  |



import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * 将指定模块的导入转换为全局变量访问
 * 用于配合 index.html 中通过 CDN 加载的全局库
 */
const externalizeGlobalsPlugin = (): Plugin => {
  // 包名与全局变量名的映射
  const globals: Record<string, string> = {
    // react: "React",
    "prop-types": "PropTypes",
    "@alifd/next": "Next",
    "@alilc/lowcode-engine": "AliLowCodeEngine",
    "@alilc/lowcode-engine-ext": "AliLowCodeEngineExt",
  };

  /**
   * 解析命名导入的配置
   * @param importsStr 导入字符串，如 "useState, useEffect as useEffectAlias"
   * @param globalName 全局变量名
   */
  const parseNamedImports = (
    importsStr: string,
    globalName: string,
  ): string => {
    return importsStr
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [name, alias] = item.split(/\s+as\s+/).map((s) => s.trim());
        const varName = alias || name;
        if (name === "*") {
          return `const ${varName} = window.${globalName};`;
        }
        return `const ${varName} = window.${globalName}.${name};`;
      })
      .join("\n");
  };

  return {
    name: "externalize-globals",
    enforce: "pre",
    transform(code) {
      let modified = code;

      // 遍历所有需要全局化的包
      for (const [pkg, globalName] of Object.entries(globals)) {
        // 1. 命名导入替换: import { a, b as c } from 'pkg'
        const namedImportRegex = new RegExp(
          `import\\s*\\{([^}]+)\\}\\s*from\\s*['"]${pkg}([^'"]*)['"]`,
          "g",
        );
        modified = modified.replace(namedImportRegex, (_match, imports) =>
          parseNamedImports(imports, globalName),
        );

        // 2. 默认导入替换: import pkg from 'pkg'
        const defaultImportRegex = new RegExp(
          `import\\s+(\\w+)\\s+from\\s*['"]${pkg}([^'"]*)['"]`,
          "g",
        );
        modified = modified.replace(
          defaultImportRegex,
          `const $1 = window.${globalName}`,
        );

        // 3. 命名空间导入替换: import * as pkg from 'pkg'
        const namespaceImportRegex = new RegExp(
          `import\\s*\\*\\s+as\\s+(\\w+)\\s+from\\s*['"]${pkg}([^'"]*)['"]`,
          "g",
        );
        modified = modified.replace(
          namespaceImportRegex,
          `const $1 = window.${globalName};`,
        );

        // 4. CommonJS require 替换: require('pkg')
        const requireRegex = new RegExp(`require\\(['"]${pkg}['"]\\)`, "g");
        modified = modified.replace(requireRegex, `window.${globalName}`);
      }

      // 只有当代码发生变化时才返回修改结果
      return modified !== code ? { code: modified, map: null } : null;
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    externalizeGlobalsPlugin(),
  ],
  server: {
    port: 5556,
  },
});

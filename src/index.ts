import type { UserConfig, Plugin } from "vite";

// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/replace
interface ViteReplacement {
  /**
   * The string and RegExp types are supported
   * @example
   * ```ts
   * { from: "__CLI_NAME__", to: "vite-plugin-replace2" }
   * { from: /__CLI_VERSION__/g, to: "$0.1.2" }
   * { from: new RegExp("__CLI_VERSION__", "g"), to: "$0.1.2" }
   * ```
   */
  from: string | RegExp;
  /**
   * The string and Function types are supported
   * @example
   * ```ts
   * { from: "__CLI_NAME__", to: "vite-plugin-replace2" }
   * { from: /__CLI_VERSION__/g, to: "$0.1.2" }
   * { from: new RegExp("__CLI_VERSION__", "g"), to: "$0.1.2" }
   * ```
   */
  to: string | Function;
}

export interface VitePluginReplaceConfig {
  replacements: ViteReplacement[];
  /**
   * The string and string[] types are supported
   */
  exclude?: string | string[];
  [key: string]: any;
}

function execSrcReplacements(src: string, replacements: ViteReplacement[]) {
  replacements.forEach((replacement) => {
    if (
      (typeof replacement.from === "string" ||
        replacement.from instanceof RegExp) === false
    ) {
      throw new Error(
        `[vite-plugin-replace]: The replacement option 'from' is not of type 'string' or 'RegExp'.`
      );
    } else if (
      (typeof replacement.to === "string" ||
        replacement.to instanceof Function) === false
    ) {
      throw new Error(
        `[vite-plugin-replace]: The replacement option 'to' is not of type 'string' or 'Function'`
      );
    } else {
      src = src.replace(replacement.from, replacement.to as string); // W3C - Function is allowed!
    }
  });
  return src;
}

export function replaceCodePlugin(config: VitePluginReplaceConfig): Plugin {
  if (config === undefined) {
    config = {
      replacements: [],
    };
  } else if ((typeof config === "object" || config !== null) === false) {
    throw new Error(
      `[vite-plugin-replace]: The configuration is not of type 'Object'.`
    );
  } else if (Array.isArray(config.replacements) === false) {
    throw new Error(
      `[vite-plugin-replace]: The configuration option 'replacement' is not of type 'Array'.`
    );
  }

  /**
   * Process exclude configuration
   * The string and string[] types are supported
   */
  const excludePatterns = Array.isArray(config.exclude)
    ? config.exclude
    : config.exclude
    ? [config.exclude]
    : [];

  return {
    name: "transform-file",
    /**
     * @param src file content
     * @param id file path
     * @returns
     */
    transform(src: string, id: string) {
      if (excludePatterns.some((pattern) => id.includes(pattern))) {
        return null;
      }

      return {
        code: execSrcReplacements(src, config.replacements),
        map: null,
      };
    },
  };
}

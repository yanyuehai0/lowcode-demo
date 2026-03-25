import { plugins } from '@alilc/lowcode-engine';
import { IPublicTypePlugin, IPublicTypePluginRegisterOptions } from '@alilc/lowcode-types';
import TopBarPlugin from './TopBarPlugin';

const registerPlugin = async (
    plugin: IPublicTypePlugin,
    options?: unknown,
    registerOptions?: IPublicTypePluginRegisterOptions,
) => {
    if (plugins.has(plugin.pluginName)) return;
    await plugins.register(plugin, options, registerOptions);
};

const unregisterPlugin = async (plugin: IPublicTypePlugin) => {
    if (plugins.has(plugin.pluginName)) return;
    await plugins.delete(plugin.pluginName);
};

/**
 * 批量注册插件
 */
export const registerPlugins = async () => {
    await registerPlugin(TopBarPlugin);
};

/**
 * 批量注销插件
 */
export const unregisterPlugins = async () => {
    await unregisterPlugin(TopBarPlugin);
};

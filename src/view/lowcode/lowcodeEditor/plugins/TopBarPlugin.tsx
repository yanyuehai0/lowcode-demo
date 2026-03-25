import { IPublicModelPluginContext, IPublicTypePlugin } from '@alilc/lowcode-types';
import TopBar from '../components/TopBar';

const TopBarPlugin: IPublicTypePlugin = (ctx: IPublicModelPluginContext) => {
    return {
        // 插件对外暴露的数据和方法
        exports() {
            return {};
        },

        init() {
            // 往引擎增加面板
            ctx.skeleton.add({
                area: 'topArea',
                type: 'Widget',
                name: 'topBar',
                content: <TopBar ctx={ctx} />,
                props: {
                    align: 'left',
                },
            });
        },
    };
};

// 插件名，注册环境下唯一
TopBarPlugin.pluginName = 'TopBarPlugin';

export default TopBarPlugin;

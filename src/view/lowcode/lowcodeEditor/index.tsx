import { destroy, init } from '@alilc/lowcode-engine';
import { memo, useEffect, useRef } from 'react';
import { registerPlugins, unregisterPlugins } from './plugins';

const RequestHandlersMap = {
    fetch: () => {
        console.log('暂不支持 fetch');
        return Promise.resolve();
    },
};

const LowcodeEditor = () => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initEditor = async () => {
            await registerPlugins();

            init(container.current!, {
                locale: 'zh-CN',
                enableCondition: true,
                enableCanvasLock: true,
                requestHandlersMap: RequestHandlersMap,
                supportVariableGlobally: true,
                enableContextMenu: true,
            });
        };

        initEditor();

        return () => {
            destroy?.();
            unregisterPlugins();
        };
    }, []);

    return <div ref={container} id="lce-container"></div>;
};

export default memo(LowcodeEditor);

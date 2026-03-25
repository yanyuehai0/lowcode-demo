import { Flex, Typography } from 'antd';
import { Fragment, lazy, useEffect, useState } from 'react';
import { loadLowcodeAssets } from './loadLowcodeAssets';
import PortalHost from './PortalHost';

const LazyLowcodeEditor = lazy(() => import('./lowcodeEditor'));

const Lowcode = () => {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let disposed = false;

        const bootstrap = async () => {
            try {
                // 才加载低代码引擎资源。
                await loadLowcodeAssets();

                // 如果组件卸载了，或者容器不存在了，就直接返回。
                if (disposed) return;

                setReady(true);
            } catch (loadError) {
                if (!disposed) {
                    setError(loadError instanceof Error ? loadError.message : '低代码资源加载失败');
                }
            }
        };

        void bootstrap();

        return () => {
            disposed = true;
        };
    }, []);

    if (error) {
        return (
            <Flex align="center" justify="center" className="full">
                <Typography.Text>{error}</Typography.Text>
            </Flex>
        );
    }

    if (!ready) {
        return (
            <Flex
                className="full"
                align="center"
                justify="center"
                style={{
                    backgroundColor: '#fff',
                    position: 'fixed',
                    zIndex: 2,
                }}
            >
                <p>加载低代码资源中...</p>
            </Flex>
        );
    }

    return (
        <Fragment>
            <PortalHost />
            <LazyLowcodeEditor />
        </Fragment>
    );
};

export default Lowcode;

import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button, Flex } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router';

interface Props {
    ctx: IPublicModelPluginContext;
}

const TopBar: FC<Props> = (props) => {
    const { ctx } = props;
    const navigate = useNavigate();

    return (
        <Flex className="full p-s" align="center">
            <Button type="primary" onClick={() => navigate('/')}>
                首页
            </Button>
        </Flex>
    );
};

export default TopBar;

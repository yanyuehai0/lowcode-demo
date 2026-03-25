import { Link } from 'react-router';

const pageStyle = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100%',
    justifyContent: 'center',
} as const;

const linkStyle = {
    border: '1px solid #1677ff',
    borderRadius: '8px',
    color: '#1677ff',
    padding: '10px 16px',
    textDecoration: 'none',
} as const;

const Home = () => {
    return (
        <main style={pageStyle}>
            <h1>首页</h1>
            <p>低代码演示入口页面。</p>
            <Link style={linkStyle} to="/lowcode">
                打开低代码编辑器
            </Link>
        </main>
    );
};

export default Home;

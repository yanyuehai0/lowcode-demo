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

const NotFound = () => {
    return (
        <main style={pageStyle}>
            <h1>404</h1>
            <p>Page not found.</p>
            <Link style={linkStyle} to="/">
                Back to home
            </Link>
        </main>
    );
};

export default NotFound;

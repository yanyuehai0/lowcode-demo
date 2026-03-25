import Home from '@/view/home';
import { lazy } from 'react';
import { type RouteObject, useRoutes } from 'react-router';

const LazyLowcode = lazy(() => import('@/view/lowcode'));
const LazyNotFound = lazy(() => import('@/view/notFound'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/lowcode',
        element: <LazyLowcode />,
    },
    {
        path: '*',
        element: <LazyNotFound />,
    },
];

const AppRouter = () => {
    return useRoutes(routes);
};

export default AppRouter;

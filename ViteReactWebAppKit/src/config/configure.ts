import { lazy } from 'react';

export const routes = [
    {
        path: '/',
        name: 'index',
        title: 'Home',
        component: lazy(() => import('../layouts')),
        children: [
            {
                index: true,
                path: '/welcome',
                name: 'welcome',
                title: 'Welcome',
                component: lazy(() => import('../pages/Welcome')),
            },
            {
                path: '/mobile',
                name: 'mobile',
                title: 'Mobile',
                component: lazy(() => import('../layouts')),
                children: [
                    {
                        index: true,
                        path: '/demo',
                        name: 'mobile-demo',
                        title: 'Mobile Demo',
                        component: lazy(() => import('../pages/Demos/DemoUI')),
                    },
                    // {
                    //     path: '/pwa',
                    //     name: 'demo-pwa',
                    //     title: 'Demo PWA',
                    //     component: lazy(() => import('../pages/Demos/DemoPwa')),
                    // },
                    {
                        path: '/redux',
                        name: 'mobile-redux',
                        title: 'Mobile Redux',
                        component: lazy(() => import('../pages/Demos/ReduxDemo/counter')),
                    },
                ],
            },
            {
                path: '/desktop',
                name: 'desktop',
                title: 'Desktop',
                component: lazy(() => import('../layouts')),
                children: [
                    {
                        index: true,
                        path: '/demo',
                        name: 'desktop-demo',
                        title: 'Desktop Demo',
                        component: lazy(() => import('../pages/Demos/DemoUI')),
                    },
                    // {
                    //     path: '/pwa',
                    //     name: 'demo-pwa',
                    //     title: 'Demo PWA',
                    //     component: lazy(() => import('../pages/Demos/DemoPwa')),
                    // },
                    {
                        path: '/redux',
                        name: 'desktop-redux',
                        title: 'Desktop Redux',
                        component: lazy(() => import('../pages/Demos/ReduxDemo/counter')),
                    }
                ],
            },
            {
                path: '*',
                name: '404',
                title: '404',
                component: lazy(() => import('../pages/Errors/404')),
            },
        ],
    },
];


import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import commonRoutes from './common'

// 页面布局
const BasicLayout = lazy(() => import('../layouts/BasicLayout'))

/**
 * 应用路由
 */
export default [
  {
    path: '/',
    element: <BasicLayout />,
    children: commonRoutes,
  },
] as RouteObject[]
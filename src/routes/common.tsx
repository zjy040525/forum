import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import PageNotFound from '../components/PageNotFound'

const HomePage = lazy(() => import('../pages/Home'))
const PostDetail = lazy(() => import('../pages/PostDetail'))
const PostOverview = lazy(() => import('../pages/PostOverview'))
const PublishPost = lazy(() => import('../pages/PublishPost'))

/**
 * 一般路由，所有人都可以访问。
 */
const commonRoutes: RouteObject[] = [
  // 主页
  { path: '/', element: <HomePage /> },
  // 帖子详情页面
  {
    path: '/post',
    children: [
      // 在不带参数、无效参数访问时，显示页面不存在组件
      { index: true, element: <PageNotFound /> },
      // 携带ID访问，服务器根据ID返回相应内容
      { path: ':id', element: <PostDetail /> },
    ],
  },
  // 发布帖子
  { path: '/publish', element: <PublishPost /> },
  // 帖子概览
  { path: '/posts', element: <PostOverview /> },
]

export default commonRoutes
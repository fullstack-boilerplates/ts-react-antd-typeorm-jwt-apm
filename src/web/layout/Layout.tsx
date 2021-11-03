import { Layout as AntLayout, Spin } from 'antd'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Header } from './Header'
import {AdminRoute} from './AdminRoute'

const { Content, Footer } = AntLayout

// lazy 作用： webpack 代码切分，避免单个 bundle 代码过大
const Home = lazy(() => import('../pages/site/Home'))
const Login = lazy(() => import('../pages/site/Login'))
const Register = lazy(() => import('../pages/site/Register'))

export const Layout = () => {
  return <Router>
    <AntLayout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Suspense fallback={<Spin size="large" />}>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <AdminRoute />
            </Switch>
          </Suspense>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </AntLayout>
  </Router>
}
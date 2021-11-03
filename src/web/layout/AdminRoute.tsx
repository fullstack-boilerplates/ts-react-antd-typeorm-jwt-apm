import { lazy } from "react"
import { Route } from "react-router"

const Adminhome = lazy(() => import('../pages/admin/Home'))
const UserList = lazy(() => import('../pages/admin/tables/users/UserList'))
const UserEdit = lazy(() => import('../pages/admin/tables/users/UserEdit'))

export const AdminRoute = () => {
  return <Route
    path="/admin"
    render={({ match: { url } }) => (
      <>
        <Route path={`${url}/`} component={Adminhome} exact />
        <Route path={`${url}/home`} component={Adminhome} />
        <Route path={`${url}/users/`} component={UserList} exact />
        <Route path={`${url}/users/list`} component={UserList} />
        <Route path={`${url}/users/create`} component={UserEdit} />
        <Route path={`${url}/users/edit/:id`} component={UserEdit} />
      </>
    )}
  />
}
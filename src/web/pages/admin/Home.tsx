import { Card, PageHeader } from "antd"
import { NavLink } from "react-router-dom"

const Adminhome = () => {
  return <div>
    <PageHeader>Admin</PageHeader>
    <div>
      <Card>
        <h3> <NavLink to="/admin/users/list">User管理</NavLink></h3>
      </Card>
    </div>
  </div>
}

export default Adminhome
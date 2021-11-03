import { JWT_HEADER_KEY } from '../../common/consts'
import { User } from '../../common/db/User'
import { jwtVerify } from '../../common/user'


export default async (req, ctx) => {
  let token = req.headers[JWT_HEADER_KEY]
  if (!token) throw '尚未登录|not logged in！'
  let { account } = await jwtVerify(token)
  let { isAdmin } = await User.findOne({ account })
  if (!isAdmin) throw '此接口需要管理员权限|not admin!'
}
import { User } from "../common/db/User"
import { addUser, IUser } from "../common/user"
import { jwtSign, validateHash } from "../common/user"

const WRONG_PASS_LIMIT_PER_DAY = 5

export const register = async (obj: IUser) => await addUser(obj)

export const login = async (account: string, pass: string) => {
  let [user] = await User.find({ account })
  if (!user) throw '无此账号'
  let { wrongPassDay, wrongPassCount } = user, today = getDayNum()
  if (today === wrongPassDay && wrongPassCount >= WRONG_PASS_LIMIT_PER_DAY)
    throw `今日密码输错已达${WRONG_PASS_LIMIT_PER_DAY}次上限，请明天再来`

  let valid = await validateHash(pass, user.pass)
  if (!valid) {
    user.wrongPassCount = wrongPassDay === today ? wrongPassCount + 1 : 1
    user.wrongPassDay = today
    await user.save()
    throw `密码错误，今天您还有${WRONG_PASS_LIMIT_PER_DAY - user.wrongPassCount}次机会`
  }
  let { isAdmin } = user
  let token = await jwtSign({ account, isAdmin })
  return { token, isAdmin, account }
}

export const accountExists = async (account: string) => {
  let count = await User.count({ account })
  return !!count
}


function getDayNum() {
  let time = new Date().getTime()
  return time - (time % 86400000)
}
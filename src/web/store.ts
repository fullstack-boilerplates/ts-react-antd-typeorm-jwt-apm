import Store from 'react-tiny-states'
import decode from 'jwt-decode'
import { login as apiLogin } from '../apis/user'
import { setHeaders } from '@shack-js/loader-fetch/dist/fetch'
import { JWT_HEADER_KEY } from '../common/consts'

type IUser = {
  account: string
  isAdmin: boolean
  token: string
} | undefined

const USER_TOKEN_KEY = 'usertoken'

export const user = new Store(undefined as IUser)


export const login = (account: string, pass: string, opts: {
  remember?: boolean,
  onSuccess?: () => void | any,
  onFail?: (e: string) => void | any
} = {}) => {
  let {
    remember = false,
    onSuccess = () => { },
    onFail = (e: string) => { }
  } = opts
  user.setState(async () => {
    try {
      let u = await apiLogin(account, pass)
      if (remember) {
        console.log(u)
        localStorage.setItem(USER_TOKEN_KEY, u.token)
        setHeaders({
          [JWT_HEADER_KEY]: u.token
        })
      }
      onSuccess()
      return u
    } catch (e) {
      onFail(e)
    }
    return undefined
  })
}

export const logout = () => {
  localStorage.removeItem(USER_TOKEN_KEY)
  user.setState(undefined)
}

function init() {
  // 记住登录的情况
  let token = localStorage.getItem(USER_TOKEN_KEY)
  if (!token) return
  try {
    let { account, isAdmin, exp } = decode(token) as { account: string, isAdmin: boolean, exp: number }
    // @ts-ignore
    if (exp * 1000 < new Date()) {
      //token过期
      return
    }
    user.setState({
      account,
      isAdmin,
      token,
    })
    setHeaders({
      [JWT_HEADER_KEY]: token
    })
  } catch (e) { }

}

init()
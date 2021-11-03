import { User } from "./db/User"
import { argon2id, argon2Verify } from 'hash-wasm'
import { randomBytes } from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'
import jwt from 'jsonwebtoken'

import { JWT_EXPIRE_TIME } from './consts'

const privateKey = readFileSync(join(__dirname, '..', '..', 'private.key'))

export interface IUser {
  id?: number
  account: string
  pass: string
  isAdmin?: boolean
  disabled?: boolean
}

export const toHash = async (password: string) => {
  let salt = randomBytes(16)
  return await argon2id({
    password,
    salt,
    parallelism: 1,
    iterations: 256,
    memorySize: 512,
    hashLength: 32,
    outputType: 'encoded',
  })
}

export const validateHash = async (password: string, hash: string) => {
  return await argon2Verify({
    password,
    hash
  })
}

export interface UserPayload {
  account: string,
  isAdmin: boolean
}

export const jwtSign = (obj: UserPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(obj, privateKey, { expiresIn: JWT_EXPIRE_TIME }, (err, encoded) => {
      if (err) return reject(err)
      return resolve(encoded)
    })
  })
}

export const jwtVerify = async (token: string): Promise<UserPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded: UserPayload) => {
      if (err) return reject(err)
      return resolve(decoded)
    })
  })
}

export const addUser = async (user: IUser) => {
  const { pass } = user
  if (pass.length < 6) throw '密码至少6位！'
  let count = await User.count()
  let isAdmin = user.isAdmin !== undefined ? user.isAdmin : !count // 第一个用户是管理员
  await User.insert({
    ...user,
    pass: await toHash(pass),
    isAdmin
  })
}
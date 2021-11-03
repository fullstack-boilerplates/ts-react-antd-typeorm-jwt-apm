import { FindManyOptions, Like } from 'typeorm'
import { User } from '../../common/db/User'
import { toHash, IUser } from '../../common/user'

const selectFields: any = ['id', 'account', 'isAdmin', 'disabled'],
  DEFAULT_PAGE_SIZE = 10

type ListUserOptions = {
  pageSize?: number,
  page?: number,
  find?: FindManyOptions<User>,
  filters?: any
}

export type ListUserResult = {
  total: number,
  pageSize: number,
  page: number,
  list: IUser[]
}

export const listUser = async (options: ListUserOptions = {}): Promise<ListUserResult> => {
  let { pageSize = DEFAULT_PAGE_SIZE, page = 1, find = {}, filters = {} } = options
  let { where = {} } = find
  for (let k in filters) {
    where[k] = Like(`%${filters[k]}%`)
  }
  let findOption = {
    ...find,
    where
  }
  return {
    page,
    pageSize,
    total: await User.count(findOption),
    list: await User.find({
      ...findOption,
      select: selectFields,
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }
}

export const updateUser = async (obj: { [key: string]: any, id: number }) => {
  let { id, pass, ...rest } = obj
  if (!id) throw 'id needed!'
  return await User.update({ id }, pass ? { ...rest, pass: await toHash(pass) } : rest)
}


export const delUser = async (id: number) => await User.delete({ id })

export { addUser } from '../../common/user'

export const findUserById = async (id: number | string) => await User.findOne(id, {
  select: selectFields
})

export const fieldContains = async (field: any, value: string) => {
  let arr = await User.find({
    select: [field],
    where: {
      [field]: Like(`%${value}%`)
    }
  })
  return arr.map(x => x[field])
}
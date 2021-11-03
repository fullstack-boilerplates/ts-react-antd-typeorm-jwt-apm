import { join } from "path"
import { createConnection } from "typeorm"
import { User } from "./db/User"

const { MYSQL } = process.env

let conn: any = undefined
let commonOpts = {
  entities: [User],
  synchronize: true
}, dbOpts = MYSQL
  ? {
    type: 'mysql',
    url: MYSQL
  }
  : {
    type: 'sqlite',
    database: join(__dirname, '..', '..', 'database.sqlite'),
  }

export async function connect() {
  // @ts-ignore
  if (!conn) conn = await createConnection({
    ...dbOpts,
    ...commonOpts
  })
  return conn
}
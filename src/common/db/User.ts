import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { IUser } from '../user'

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 32, unique: true })
  account: string

  @Column({ type: 'varchar', length: 128 })
  pass: string

  @Column({ default: false })
  isAdmin: boolean

  @Column({ default: false })
  disabled: boolean


  @Column({ default: 0, type: 'bigint' })
  wrongPassDay: number

  @Column({ default: 0, type: 'smallint' })
  wrongPassCount: number
}

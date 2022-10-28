import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne
} from "typeorm"
import { List } from "./list"

enum Status {
  Pending = 'pending',
  Doing = 'doing',
  Done = 'done'
}

@Unique("unique_idx_listId_position", ["listId", "position"])

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column({ type: 'text', default: 'pending' })
  status!: Status

  @Column()
  position!: number

  @Column()
  listId!: number

  @ManyToOne(() => List, (list) => list.tasks)
  list: List

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
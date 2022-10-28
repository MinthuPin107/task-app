import { extendType, nonNull, objectType, stringArg, intArg, enumType } from "nexus"
import { List } from "../entities/list"
import { Task } from "../entities/task"
import _ from "lodash"

export const TaskType = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("title")
    t.nonNull.string("status")
    t.nonNull.int("position")
    t.nonNull.int("listId")
    t.field("list", {
      type: "List",
      async resolve(parent): Promise<List | null> {
        const list = await List.findOneBy({ id: parent.listId })
        if (!list) throw new Error("List not found!")

        return list
      },
    })
  },
})

export const TasksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("tasks", {
      type: "Task",
      async resolve(): Promise<Task[]> {
        const tasks = await Task.find({ order: { position: "desc" } })

        return tasks
      },
    })
  },
})

const Status = enumType({
  name: 'Status',
  members: {
    Pending: 'pending',
    Doing: 'doing',
    Done: 'done'
  },
})

export const TaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: {
        title: nonNull(stringArg()),
        status: nonNull(Status),
        listId: nonNull(intArg()),
      },
      async resolve(_parent, args): Promise<Task> {
        const tasks = await Task.find({ where: { listId: args.listId } })
        const task = new Task()
        const positions = _.map(tasks, (task) => task.position)
        const lastPosition = _.max(positions) || 0

        args.position = lastPosition + 1
        Object.assign(task, args)
        await task.save()

        return task
      },
    })

    t.nonNull.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        status: Status,
        position: intArg(),
      },
      async resolve(_parent, args): Promise<Task> {
        const task = await Task.findOneBy({ id: args.id })
        if (!task) throw new Error("Task not found!")

        Object.assign(task, args)
        await task.save()

        return task
      },
    })
  },
})
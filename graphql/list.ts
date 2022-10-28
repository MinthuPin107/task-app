import { extendType, nonNull, objectType, stringArg } from "nexus"
import { List } from "../entities/list"
import { Task } from "../entities/task"

export const ListType = objectType({
  name: "List",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("name")
    t.list.field("tasks", {
      type: "Task",
      async resolve(parent): Promise<Task[]> {
        const tasks = await Task.find({ where: { listId: parent.id }, order: { position: "desc" } })
        return tasks
      },
    })
  },
})

export const ListsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("lists", {
      type: "List",
      async resolve(): Promise<List[]> {
        const lists = await List.find()
        return lists
      },
    })
  },
})

export const ListMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createList", {
      type: "List",
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_parent, args): Promise<List> {
        const list = new List()

        Object.assign(list, args)
        await list.save()

        return list
      },
    })
  },
})
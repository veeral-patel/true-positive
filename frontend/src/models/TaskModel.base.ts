/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { CaseModel } from "./CaseModel"
import { CaseModelSelector } from "./CaseModel.base"
import { CommentModel } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { PriorityModel } from "./PriorityModel"
import { PriorityModelSelector } from "./PriorityModel.base"
import { StatusModel } from "./StatusModel"
import { StatusModelSelector } from "./StatusModel.base"
import { TagModel } from "./TagModel"
import { TagModelSelector } from "./TagModel.base"
import { UserModel } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * TaskBase
 * auto generated base class for the model TaskModel.
 *
 * Represents a piece of work in a case.
 */
export const TaskModelBase = MSTGQLObject
  .named('Task')
  .props({
    __typename: types.optional(types.literal("Task"), "Task"),
    assignedTo: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
    case: types.maybeNull(MSTGQLRef(types.late(() => CaseModel))),
    comments: types.optional(types.array(MSTGQLRef(types.late(() => CommentModel))), []),
    createdAt: types.maybeNull(types.frozen()),
    createdBy: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
    description: types.maybeNull(types.string),
    id: types.identifier,
    name: types.maybeNull(types.string),
    priority: types.maybeNull(MSTGQLRef(types.late(() => PriorityModel))),
    status: types.maybeNull(MSTGQLRef(types.late(() => StatusModel))),
    tags: types.optional(types.array(MSTGQLRef(types.late(() => TagModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TaskModelSelector extends QueryBuilder {
  get createdAt() { return this.__attr(`createdAt`) }
  get description() { return this.__attr(`description`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  assignedTo(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`assignedTo`, UserModelSelector, builder) }
  case(builder?: string | CaseModelSelector | ((selector: CaseModelSelector) => CaseModelSelector)) { return this.__child(`case`, CaseModelSelector, builder) }
  comments(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comments`, CommentModelSelector, builder) }
  createdBy(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`createdBy`, UserModelSelector, builder) }
  priority(builder?: string | PriorityModelSelector | ((selector: PriorityModelSelector) => PriorityModelSelector)) { return this.__child(`priority`, PriorityModelSelector, builder) }
  status(builder?: string | StatusModelSelector | ((selector: StatusModelSelector) => StatusModelSelector)) { return this.__child(`status`, StatusModelSelector, builder) }
  tags(builder?: string | TagModelSelector | ((selector: TagModelSelector) => TagModelSelector)) { return this.__child(`tags`, TagModelSelector, builder) }
}
export function selectFromTask() {
  return new TaskModelSelector()
}

export const taskModelPrimitives = selectFromTask().createdAt.description.name

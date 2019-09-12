/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { CaseMemberModel } from "./CaseMemberModel"
import { CaseMemberModelSelector } from "./CaseMemberModel.base"
import { CaseModel } from "./CaseModel"
import { CommentModel } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { IndicatorModel } from "./IndicatorModel"
import { IndicatorModelSelector } from "./IndicatorModel.base"
import { PriorityModel } from "./PriorityModel"
import { PriorityModelSelector } from "./PriorityModel.base"
import { StatusModel } from "./StatusModel"
import { StatusModelSelector } from "./StatusModel.base"
import { TagModel } from "./TagModel"
import { TagModelSelector } from "./TagModel.base"
import { TaskModel } from "./TaskModel"
import { TaskModelSelector } from "./TaskModel.base"
import { UserModel } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * CaseBase
 * auto generated base class for the model CaseModel.
 *
 * Represents an investigation.
 */
export const CaseModelBase = MSTGQLObject
  .named('Case')
  .props({
    __typename: types.optional(types.literal("Case"), "Case"),
    assignedTo: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
    caseMembers: types.optional(types.array(MSTGQLRef(types.late(() => CaseMemberModel))), []),
    comments: types.optional(types.array(MSTGQLRef(types.late(() => CommentModel))), []),
    createdAt: types.maybeNull(types.frozen()),
    createdBy: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
    description: types.maybeNull(types.string),
    formattedCreatedAt: types.maybeNull(types.string),
    id: types.identifier,
    indicators: types.optional(types.array(MSTGQLRef(types.late(() => IndicatorModel))), []),
    isMerged: types.maybeNull(types.boolean),
    mergedCases: types.optional(types.array(MSTGQLRef(types.late((): any => CaseModel))), []),
    mergedInto: types.maybeNull(MSTGQLRef(types.late((): any => CaseModel))),
    name: types.maybeNull(types.string),
    priority: types.maybeNull(MSTGQLRef(types.late(() => PriorityModel))),
    status: types.maybeNull(MSTGQLRef(types.late(() => StatusModel))),
    tags: types.optional(types.array(MSTGQLRef(types.late(() => TagModel))), []),
    tasks: types.optional(types.array(MSTGQLRef(types.late(() => TaskModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CaseModelSelector extends QueryBuilder {
  get createdAt() { return this.__attr(`createdAt`) }
  get description() { return this.__attr(`description`) }
  get formattedCreatedAt() { return this.__attr(`formattedCreatedAt`) }
  get id() { return this.__attr(`id`) }
  get isMerged() { return this.__attr(`isMerged`) }
  get name() { return this.__attr(`name`) }
  assignedTo(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`assignedTo`, UserModelSelector, builder) }
  caseMembers(builder?: string | CaseMemberModelSelector | ((selector: CaseMemberModelSelector) => CaseMemberModelSelector)) { return this.__child(`caseMembers`, CaseMemberModelSelector, builder) }
  comments(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comments`, CommentModelSelector, builder) }
  createdBy(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`createdBy`, UserModelSelector, builder) }
  indicators(builder?: string | IndicatorModelSelector | ((selector: IndicatorModelSelector) => IndicatorModelSelector)) { return this.__child(`indicators`, IndicatorModelSelector, builder) }
  mergedCases(builder?: string | CaseModelSelector | ((selector: CaseModelSelector) => CaseModelSelector)) { return this.__child(`mergedCases`, CaseModelSelector, builder) }
  mergedInto(builder?: string | CaseModelSelector | ((selector: CaseModelSelector) => CaseModelSelector)) { return this.__child(`mergedInto`, CaseModelSelector, builder) }
  priority(builder?: string | PriorityModelSelector | ((selector: PriorityModelSelector) => PriorityModelSelector)) { return this.__child(`priority`, PriorityModelSelector, builder) }
  status(builder?: string | StatusModelSelector | ((selector: StatusModelSelector) => StatusModelSelector)) { return this.__child(`status`, StatusModelSelector, builder) }
  tags(builder?: string | TagModelSelector | ((selector: TagModelSelector) => TagModelSelector)) { return this.__child(`tags`, TagModelSelector, builder) }
  tasks(builder?: string | TaskModelSelector | ((selector: TaskModelSelector) => TaskModelSelector)) { return this.__child(`tasks`, TaskModelSelector, builder) }
}
export function selectFromCase() {
  return new CaseModelSelector()
}

export const caseModelPrimitives = selectFromCase().createdAt.description.formattedCreatedAt.isMerged.name

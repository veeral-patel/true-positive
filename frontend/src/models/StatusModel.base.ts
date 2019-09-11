/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"
import { RootStoreType } from "./index"


/**
 * StatusBase
 * auto generated base class for the model StatusModel.
 *
 * A state a case or a task can be in.
 */
export const StatusModelBase = MSTGQLObject
  .named('Status')
  .props({
    __typename: types.optional(types.literal("Status"), "Status"),
    description: types.maybeNull(types.string),
    id: types.identifier,
    name: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class StatusModelSelector extends QueryBuilder {
  get description() { return this.__attr(`description`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromStatus() {
  return new StatusModelSelector()
}

export const statusModelPrimitives = selectFromStatus().description.name

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"
import { RootStoreType } from "./index"


/**
 * PriorityBase
 * auto generated base class for the model PriorityModel.
 *
 * Describes the severity level of a case or task.
 */
export const PriorityModelBase = MSTGQLObject
  .named('Priority')
  .props({
    __typename: types.optional(types.literal("Priority"), "Priority"),
    description: types.maybeNull(types.string),
    id: types.identifier,
    name: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PriorityModelSelector extends QueryBuilder {
  get description() { return this.__attr(`description`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromPriority() {
  return new PriorityModelSelector()
}

export const priorityModelPrimitives = selectFromPriority().description.name

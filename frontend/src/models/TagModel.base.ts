/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"
import { RootStoreType } from "./index"


/**
 * TagBase
 * auto generated base class for the model TagModel.
 *
 * An existing tag on a case, task, or indicator.
 */
export const TagModelBase = MSTGQLObject
  .named('Tag')
  .props({
    __typename: types.optional(types.literal("Tag"), "Tag"),
    /** An unique integer identifying this tag. */
    id: types.identifier,
    /** The tag (such as 'phishing'). */
    name: types.maybeNull(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class TagModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromTag() {
  return new TagModelSelector()
}

export const tagModelPrimitives = selectFromTag().name

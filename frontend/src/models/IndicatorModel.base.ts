/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { CommentModel } from "./CommentModel"
import { CommentModelSelector } from "./CommentModel.base"
import { TagModel } from "./TagModel"
import { TagModelSelector } from "./TagModel.base"
import { UserModel } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * IndicatorBase
 * auto generated base class for the model IndicatorModel.
 *
 * A file hash, IP address, domain name, or another indicator of compromise.
 */
export const IndicatorModelBase = MSTGQLObject
  .named('Indicator')
  .props({
    __typename: types.optional(types.literal("Indicator"), "Indicator"),
    /** The comments on this indicator. */
    comments: types.optional(types.array(MSTGQLRef(types.late(() => CommentModel))), []),
    /** When this indicator was created (in ISO8601 format). */
    createdAt: types.maybeNull(types.frozen()),
    /** The user who created this indicator. */
    createdBy: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
    /** This indicator's description. */
    description: types.maybeNull(types.string),
    /** An unique integer identifying this indicator. */
    id: types.identifier,
    /** The file hash, IP address, domain name, etc. this indicator describes. */
    name: types.maybeNull(types.string),
    /** This indicator's tags. */
    tags: types.optional(types.array(MSTGQLRef(types.late(() => TagModel))), []),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class IndicatorModelSelector extends QueryBuilder {
  get createdAt() { return this.__attr(`createdAt`) }
  get description() { return this.__attr(`description`) }
  get id() { return this.__attr(`id`) }
  get name() { return this.__attr(`name`) }
  comments(builder?: string | CommentModelSelector | ((selector: CommentModelSelector) => CommentModelSelector)) { return this.__child(`comments`, CommentModelSelector, builder) }
  createdBy(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`createdBy`, UserModelSelector, builder) }
  tags(builder?: string | TagModelSelector | ((selector: TagModelSelector) => TagModelSelector)) { return this.__child(`tags`, TagModelSelector, builder) }
}
export function selectFromIndicator() {
  return new IndicatorModelSelector()
}

export const indicatorModelPrimitives = selectFromIndicator().createdAt.description.name

/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { UserModel } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * CommentBase
 * auto generated base class for the model CommentModel.
 *
 * Represents a comment on a case, task, indicator, or another object.
 */
export const CommentModelBase = MSTGQLObject
  .named('Comment')
  .props({
    __typename: types.optional(types.literal("Comment"), "Comment"),
    /** The comment itself. */
    comment: types.maybeNull(types.string),
    /** When this comment was created (in ISO8601) */
    createdAt: types.maybeNull(types.frozen()),
    /** The user who wrote this comment. */
    createdBy: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
    /** When this comment was created (nicely formatted) */
    formattedCreatedAt: types.maybeNull(types.string),
    /** An unique integer identifying this comment. */
    id: types.identifier,
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CommentModelSelector extends QueryBuilder {
  get comment() { return this.__attr(`comment`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get formattedCreatedAt() { return this.__attr(`formattedCreatedAt`) }
  get id() { return this.__attr(`id`) }
  createdBy(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`createdBy`, UserModelSelector, builder) }
}
export function selectFromComment() {
  return new CommentModelSelector()
}

export const commentModelPrimitives = selectFromComment().comment.createdAt.formattedCreatedAt

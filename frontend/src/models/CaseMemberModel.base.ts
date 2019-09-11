/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"
import { UserModel } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/**
 * CaseMemberBase
 * auto generated base class for the model CaseMemberModel.
 *
 * Represents a member of a case
 */
export const CaseMemberModelBase = MSTGQLObject
  .named('CaseMember')
  .props({
    __typename: types.optional(types.literal("CaseMember"), "CaseMember"),
    id: types.identifier,
    role: types.maybeNull(types.string),
    user: types.maybeNull(MSTGQLRef(types.late(() => UserModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class CaseMemberModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get role() { return this.__attr(`role`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromCaseMember() {
  return new CaseMemberModelSelector()
}

export const caseMemberModelPrimitives = selectFromCaseMember().role

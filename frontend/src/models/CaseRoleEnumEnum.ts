/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum CaseRoleEnum {
  CAN_VIEW="CAN_VIEW",
CAN_EDIT="CAN_EDIT"
}

/**
* CaseRoleEnum
 *
 * Indicates a permission level a case member can possess.
*/
export const CaseRoleEnumEnum = types.enumeration("CaseRoleEnum", [
        "CAN_VIEW", // The user can only view the case.
  "CAN_EDIT", // The user can view and edit the case.
      ])

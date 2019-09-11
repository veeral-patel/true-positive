import { Instance } from "mobx-state-tree"
import { CaseMemberModelBase } from "./CaseMemberModel.base"

/* The TypeScript type of an instance of CaseMemberModel */
export interface CaseMemberModelType extends Instance<typeof CaseMemberModel.Type> {}

/* A graphql query fragment builders for CaseMemberModel */
export { selectFromCaseMember, caseMemberModelPrimitives, CaseMemberModelSelector } from "./CaseMemberModel.base"

/**
 * CaseMemberModel
 *
 * Represents a member of a case
 */
export const CaseMemberModel = CaseMemberModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

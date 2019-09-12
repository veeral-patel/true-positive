import { Instance } from "mobx-state-tree"
import { CaseModelBase } from "./CaseModel.base"

/* The TypeScript type of an instance of CaseModel */
export interface CaseModelType extends Instance<typeof CaseModel.Type> {}

/* A graphql query fragment builders for CaseModel */
export { selectFromCase, caseModelPrimitives, CaseModelSelector } from "./CaseModel.base"

/**
 * CaseModel
 *
 * Represents an investigation.
 */
export const CaseModel = CaseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

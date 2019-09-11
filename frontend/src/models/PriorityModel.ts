import { Instance } from "mobx-state-tree"
import { PriorityModelBase } from "./PriorityModel.base"

/* The TypeScript type of an instance of PriorityModel */
export interface PriorityModelType extends Instance<typeof PriorityModel.Type> {}

/* A graphql query fragment builders for PriorityModel */
export { selectFromPriority, priorityModelPrimitives, PriorityModelSelector } from "./PriorityModel.base"

/**
 * PriorityModel
 *
 * Describes the severity level of a case or task.
 */
export const PriorityModel = PriorityModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

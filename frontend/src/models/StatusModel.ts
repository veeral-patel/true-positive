import { Instance } from "mobx-state-tree"
import { StatusModelBase } from "./StatusModel.base"

/* The TypeScript type of an instance of StatusModel */
export interface StatusModelType extends Instance<typeof StatusModel.Type> {}

/* A graphql query fragment builders for StatusModel */
export { selectFromStatus, statusModelPrimitives, StatusModelSelector } from "./StatusModel.base"

/**
 * StatusModel
 *
 * A state a case or a task can be in.
 */
export const StatusModel = StatusModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

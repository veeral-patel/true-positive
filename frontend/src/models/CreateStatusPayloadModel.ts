import { Instance } from "mobx-state-tree"
import { CreateStatusPayloadModelBase } from "./CreateStatusPayloadModel.base"

/* The TypeScript type of an instance of CreateStatusPayloadModel */
export interface CreateStatusPayloadModelType extends Instance<typeof CreateStatusPayloadModel.Type> {}

/* A graphql query fragment builders for CreateStatusPayloadModel */
export { selectFromCreateStatusPayload, createStatusPayloadModelPrimitives, CreateStatusPayloadModelSelector } from "./CreateStatusPayloadModel.base"

/**
 * CreateStatusPayloadModel
 *
 * Autogenerated return type of CreateStatus
 */
export const CreateStatusPayloadModel = CreateStatusPayloadModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

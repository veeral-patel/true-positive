import { Instance } from "mobx-state-tree"
import { TagModelBase } from "./TagModel.base"

/* The TypeScript type of an instance of TagModel */
export interface TagModelType extends Instance<typeof TagModel.Type> {}

/* A graphql query fragment builders for TagModel */
export { selectFromTag, tagModelPrimitives, TagModelSelector } from "./TagModel.base"

/**
 * TagModel
 *
 * An existing tag on a case, task, or indicator.
 */
export const TagModel = TagModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

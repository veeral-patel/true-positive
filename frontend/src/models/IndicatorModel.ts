import { Instance } from "mobx-state-tree"
import { IndicatorModelBase } from "./IndicatorModel.base"

/* The TypeScript type of an instance of IndicatorModel */
export interface IndicatorModelType extends Instance<typeof IndicatorModel.Type> {}

/* A graphql query fragment builders for IndicatorModel */
export { selectFromIndicator, indicatorModelPrimitives, IndicatorModelSelector } from "./IndicatorModel.base"

/**
 * IndicatorModel
 *
 * A file hash, IP address, domain name, or another indicator of compromise.
 */
export const IndicatorModel = IndicatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))

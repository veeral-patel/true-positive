/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { CaseModel, CaseModelType } from "./CaseModel"
import { caseModelPrimitives, CaseModelSelector } from "./CaseModel.base"
import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { CaseMemberModel, CaseMemberModelType } from "./CaseMemberModel"
import { caseMemberModelPrimitives, CaseMemberModelSelector } from "./CaseMemberModel.base"
import { CommentModel, CommentModelType } from "./CommentModel"
import { commentModelPrimitives, CommentModelSelector } from "./CommentModel.base"
import { IndicatorModel, IndicatorModelType } from "./IndicatorModel"
import { indicatorModelPrimitives, IndicatorModelSelector } from "./IndicatorModel.base"
import { TagModel, TagModelType } from "./TagModel"
import { tagModelPrimitives, TagModelSelector } from "./TagModel.base"
import { PriorityModel, PriorityModelType } from "./PriorityModel"
import { priorityModelPrimitives, PriorityModelSelector } from "./PriorityModel.base"
import { StatusModel, StatusModelType } from "./StatusModel"
import { statusModelPrimitives, StatusModelSelector } from "./StatusModel.base"
import { TaskModel, TaskModelType } from "./TaskModel"
import { taskModelPrimitives, TaskModelSelector } from "./TaskModel.base"
import { AddMemberPayloadModel, AddMemberPayloadModelType } from "./AddMemberPayloadModel"
import { addMemberPayloadModelPrimitives, AddMemberPayloadModelSelector } from "./AddMemberPayloadModel.base"
import { AssignCasePayloadModel, AssignCasePayloadModelType } from "./AssignCasePayloadModel"
import { assignCasePayloadModelPrimitives, AssignCasePayloadModelSelector } from "./AssignCasePayloadModel.base"
import { ChangeDescriptionPayloadModel, ChangeDescriptionPayloadModelType } from "./ChangeDescriptionPayloadModel"
import { changeDescriptionPayloadModelPrimitives, ChangeDescriptionPayloadModelSelector } from "./ChangeDescriptionPayloadModel.base"
import { ChangePriorityPayloadModel, ChangePriorityPayloadModelType } from "./ChangePriorityPayloadModel"
import { changePriorityPayloadModelPrimitives, ChangePriorityPayloadModelSelector } from "./ChangePriorityPayloadModel.base"
import { ChangeStatusPayloadModel, ChangeStatusPayloadModelType } from "./ChangeStatusPayloadModel"
import { changeStatusPayloadModelPrimitives, ChangeStatusPayloadModelSelector } from "./ChangeStatusPayloadModel.base"
import { CreateCasePayloadModel, CreateCasePayloadModelType } from "./CreateCasePayloadModel"
import { createCasePayloadModelPrimitives, CreateCasePayloadModelSelector } from "./CreateCasePayloadModel.base"
import { CreatePriorityPayloadModel, CreatePriorityPayloadModelType } from "./CreatePriorityPayloadModel"
import { createPriorityPayloadModelPrimitives, CreatePriorityPayloadModelSelector } from "./CreatePriorityPayloadModel.base"
import { CreateStatusPayloadModel, CreateStatusPayloadModelType } from "./CreateStatusPayloadModel"
import { createStatusPayloadModelPrimitives, CreateStatusPayloadModelSelector } from "./CreateStatusPayloadModel.base"
import { DeleteCasePayloadModel, DeleteCasePayloadModelType } from "./DeleteCasePayloadModel"
import { deleteCasePayloadModelPrimitives, DeleteCasePayloadModelSelector } from "./DeleteCasePayloadModel.base"
import { DeleteCommentPayloadModel, DeleteCommentPayloadModelType } from "./DeleteCommentPayloadModel"
import { deleteCommentPayloadModelPrimitives, DeleteCommentPayloadModelSelector } from "./DeleteCommentPayloadModel.base"
import { DeletePriorityPayloadModel, DeletePriorityPayloadModelType } from "./DeletePriorityPayloadModel"
import { deletePriorityPayloadModelPrimitives, DeletePriorityPayloadModelSelector } from "./DeletePriorityPayloadModel.base"
import { DeleteStatusPayloadModel, DeleteStatusPayloadModelType } from "./DeleteStatusPayloadModel"
import { deleteStatusPayloadModelPrimitives, DeleteStatusPayloadModelSelector } from "./DeleteStatusPayloadModel.base"
import { DeleteTaskPayloadModel, DeleteTaskPayloadModelType } from "./DeleteTaskPayloadModel"
import { deleteTaskPayloadModelPrimitives, DeleteTaskPayloadModelSelector } from "./DeleteTaskPayloadModel.base"
import { MergeCasePayloadModel, MergeCasePayloadModelType } from "./MergeCasePayloadModel"
import { mergeCasePayloadModelPrimitives, MergeCasePayloadModelSelector } from "./MergeCasePayloadModel.base"
import { RenameCasePayloadModel, RenameCasePayloadModelType } from "./RenameCasePayloadModel"
import { renameCasePayloadModelPrimitives, RenameCasePayloadModelSelector } from "./RenameCasePayloadModel.base"
import { RenamePriorityPayloadModel, RenamePriorityPayloadModelType } from "./RenamePriorityPayloadModel"
import { renamePriorityPayloadModelPrimitives, RenamePriorityPayloadModelSelector } from "./RenamePriorityPayloadModel.base"
import { RenameStatusPayloadModel, RenameStatusPayloadModelType } from "./RenameStatusPayloadModel"
import { renameStatusPayloadModelPrimitives, RenameStatusPayloadModelSelector } from "./RenameStatusPayloadModel.base"
import { RenameTaskPayloadModel, RenameTaskPayloadModelType } from "./RenameTaskPayloadModel"
import { renameTaskPayloadModelPrimitives, RenameTaskPayloadModelSelector } from "./RenameTaskPayloadModel.base"

import { CaseRoleEnum } from "./CaseRoleEnumEnum"
import { HasDescriptionEnum } from "./HasDescriptionEnumEnum"
import { HasPriorityEnum } from "./HasPriorityEnumEnum"
import { HasStatusEnum } from "./HasStatusEnumEnum"

export type AddMemberInput = {
  caseId: string
  userId: string
  role: CaseRoleEnum
  clientMutationId: string | undefined
}
export type AssignCaseInput = {
  caseId: string
  userId: string
  clientMutationId: string | undefined
}
export type ChangeDescriptionInput = {
  objectId: string
  description: string
  type: HasDescriptionEnum
  clientMutationId: string | undefined
}
export type ChangePriorityInput = {
  objectId: string
  priorityId: string
  type: HasPriorityEnum
  clientMutationId: string | undefined
}
export type ChangeStatusInput = {
  objectId: string
  statusId: string
  type: HasStatusEnum
  clientMutationId: string | undefined
}
export type CreateCaseInput = {
  name: string
  createdById: string
  statusId: string
  priorityId: string
  description: string | undefined
  assignedToId: string | undefined
  tags: string[]
  clientMutationId: string | undefined
}
export type CreatePriorityInput = {
  name: string
  description: string | undefined
  clientMutationId: string | undefined
}
export type CreateStatusInput = {
  name: string
  description: string | undefined
  clientMutationId: string | undefined
}
export type DeleteCaseInput = {
  id: string
  clientMutationId: string | undefined
}
export type DeleteCommentInput = {
  id: string
  clientMutationId: string | undefined
}
export type DeletePriorityInput = {
  id: string
  clientMutationId: string | undefined
}
export type DeleteStatusInput = {
  id: string
  clientMutationId: string | undefined
}
export type DeleteTaskInput = {
  id: string
  clientMutationId: string | undefined
}
export type MergeCaseInput = {
  childCaseId: string
  parentCaseId: string
  clientMutationId: string | undefined
}
export type RenameCaseInput = {
  id: string
  name: string
  clientMutationId: string | undefined
}
export type RenamePriorityInput = {
  id: string
  name: string
  clientMutationId: string | undefined
}
export type RenameStatusInput = {
  id: string
  name: string
  clientMutationId: string | undefined
}
export type RenameTaskInput = {
  id: string
  name: string
  clientMutationId: string | undefined
}
/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Case', () => CaseModel], ['User', () => UserModel], ['CaseMember', () => CaseMemberModel], ['Comment', () => CommentModel], ['Indicator', () => IndicatorModel], ['Tag', () => TagModel], ['Priority', () => PriorityModel], ['Status', () => StatusModel], ['Task', () => TaskModel], ['AddMemberPayload', () => AddMemberPayloadModel], ['AssignCasePayload', () => AssignCasePayloadModel], ['ChangeDescriptionPayload', () => ChangeDescriptionPayloadModel], ['ChangePriorityPayload', () => ChangePriorityPayloadModel], ['ChangeStatusPayload', () => ChangeStatusPayloadModel], ['CreateCasePayload', () => CreateCasePayloadModel], ['CreatePriorityPayload', () => CreatePriorityPayloadModel], ['CreateStatusPayload', () => CreateStatusPayloadModel], ['DeleteCasePayload', () => DeleteCasePayloadModel], ['DeleteCommentPayload', () => DeleteCommentPayloadModel], ['DeletePriorityPayload', () => DeletePriorityPayloadModel], ['DeleteStatusPayload', () => DeleteStatusPayloadModel], ['DeleteTaskPayload', () => DeleteTaskPayloadModel], ['MergeCasePayload', () => MergeCasePayloadModel], ['RenameCasePayload', () => RenameCasePayloadModel], ['RenamePriorityPayload', () => RenamePriorityPayloadModel], ['RenameStatusPayload', () => RenameStatusPayloadModel], ['RenameTaskPayload', () => RenameTaskPayloadModel]], ['Case', 'User', 'Comment', 'Indicator', 'Tag', 'Priority', 'Status', 'Task', 'DeleteCasePayload', 'DeleteCommentPayload', 'DeletePriorityPayload', 'DeleteStatusPayload', 'DeleteTaskPayload']))
  .props({
    cases: types.optional(types.map(types.late(() => CaseModel)), {}),
    users: types.optional(types.map(types.late(() => UserModel)), {}),
    comments: types.optional(types.map(types.late(() => CommentModel)), {}),
    indicators: types.optional(types.map(types.late(() => IndicatorModel)), {}),
    tags: types.optional(types.map(types.late(() => TagModel)), {}),
    prioritys: types.optional(types.map(types.late(() => PriorityModel)), {}),
    statuss: types.optional(types.map(types.late(() => StatusModel)), {}),
    tasks: types.optional(types.map(types.late(() => TaskModel)), {}),
    deletecasepayloads: types.optional(types.map(types.late(() => DeleteCasePayloadModel)), {}),
    deletecommentpayloads: types.optional(types.map(types.late(() => DeleteCommentPayloadModel)), {}),
    deleteprioritypayloads: types.optional(types.map(types.late(() => DeletePriorityPayloadModel)), {}),
    deletestatuspayloads: types.optional(types.map(types.late(() => DeleteStatusPayloadModel)), {}),
    deletetaskpayloads: types.optional(types.map(types.late(() => DeleteTaskPayloadModel)), {})
  })
  .actions(self => ({
    // Retrieve a case by its ID.
    queryCase(variables: { id: string }, resultSelector: string | ((qb: CaseModelSelector) => CaseModelSelector) = caseModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ case: CaseModelType}>(`query case($id: ID!) { case(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new CaseModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // List all cases.
    queryCases(variables?: {  }, resultSelector: string | ((qb: CaseModelSelector) => CaseModelSelector) = caseModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ cases: CaseModelType[]}>(`query cases { cases {
        ${typeof resultSelector === "function" ? resultSelector(new CaseModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // Lists all priorities.
    queryPriorities(variables?: {  }, resultSelector: string | ((qb: PriorityModelSelector) => PriorityModelSelector) = priorityModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ priorities: PriorityModelType[]}>(`query priorities { priorities {
        ${typeof resultSelector === "function" ? resultSelector(new PriorityModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // Retrieve a priority by its ID.
    queryPriority(variables: { id: string }, resultSelector: string | ((qb: PriorityModelSelector) => PriorityModelSelector) = priorityModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ priority: PriorityModelType}>(`query priority($id: ID!) { priority(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new PriorityModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // Retrieve a status by its ID.
    queryStatus(variables: { id: string }, resultSelector: string | ((qb: StatusModelSelector) => StatusModelSelector) = statusModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ status: StatusModelType}>(`query status($id: ID!) { status(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new StatusModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // Lists all statuses.
    queryStatuses(variables?: {  }, resultSelector: string | ((qb: StatusModelSelector) => StatusModelSelector) = statusModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ statuses: StatusModelType[]}>(`query statuses { statuses {
        ${typeof resultSelector === "function" ? resultSelector(new StatusModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // List all existing tags.
    queryTags(variables?: {  }, resultSelector: string | ((qb: TagModelSelector) => TagModelSelector) = tagModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ tags: TagModelType[]}>(`query tags { tags {
        ${typeof resultSelector === "function" ? resultSelector(new TagModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // Retrieve an user by the user's ID.
    queryUser(variables: { id: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ user: UserModelType}>(`query user($id: ID!) { user(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // List all users.
    queryUsers(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ users: UserModelType[]}>(`query users { users {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    // Make a user a member of a case. Only a case's members can access or change it.
    mutateAddMember(variables: { input: AddMemberInput }, resultSelector: string | ((qb: AddMemberPayloadModelSelector) => AddMemberPayloadModelSelector) = addMemberPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addMember: AddMemberPayloadModelType}>(`mutation addMember($input: AddMemberInput!) { addMember(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new AddMemberPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Assign a case to an user.
    mutateAssignCase(variables: { input: AssignCaseInput }, resultSelector: string | ((qb: AssignCasePayloadModelSelector) => AssignCasePayloadModelSelector) = assignCasePayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ assignCase: AssignCasePayloadModelType}>(`mutation assignCase($input: AssignCaseInput!) { assignCase(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new AssignCasePayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Update the description of a case, task, or indicator.
    mutateChangeDescription(variables: { input: ChangeDescriptionInput }, resultSelector: string | ((qb: ChangeDescriptionPayloadModelSelector) => ChangeDescriptionPayloadModelSelector) = changeDescriptionPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ changeDescription: ChangeDescriptionPayloadModelType}>(`mutation changeDescription($input: ChangeDescriptionInput!) { changeDescription(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new ChangeDescriptionPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Update the priority of a case or task.
    mutateChangePriority(variables: { input: ChangePriorityInput }, resultSelector: string | ((qb: ChangePriorityPayloadModelSelector) => ChangePriorityPayloadModelSelector) = changePriorityPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ changePriority: ChangePriorityPayloadModelType}>(`mutation changePriority($input: ChangePriorityInput!) { changePriority(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new ChangePriorityPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Change the status of a case or task.
    mutateChangeStatus(variables: { input: ChangeStatusInput }, resultSelector: string | ((qb: ChangeStatusPayloadModelSelector) => ChangeStatusPayloadModelSelector) = changeStatusPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ changeStatus: ChangeStatusPayloadModelType}>(`mutation changeStatus($input: ChangeStatusInput!) { changeStatus(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new ChangeStatusPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Creates a new case.
    mutateCreateCase(variables: { input: CreateCaseInput }, resultSelector: string | ((qb: CreateCasePayloadModelSelector) => CreateCasePayloadModelSelector) = createCasePayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createCase: CreateCasePayloadModelType}>(`mutation createCase($input: CreateCaseInput!) { createCase(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new CreateCasePayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Add a priority. Any case or task can now be given this priority.
    mutateCreatePriority(variables: { input: CreatePriorityInput }, resultSelector: string | ((qb: CreatePriorityPayloadModelSelector) => CreatePriorityPayloadModelSelector) = createPriorityPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createPriority: CreatePriorityPayloadModelType}>(`mutation createPriority($input: CreatePriorityInput!) { createPriority(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new CreatePriorityPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Add a status. Any case or task can now be given this status.
    mutateCreateStatus(variables: { input: CreateStatusInput }, resultSelector: string | ((qb: CreateStatusPayloadModelSelector) => CreateStatusPayloadModelSelector) = createStatusPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ createStatus: CreateStatusPayloadModelType}>(`mutation createStatus($input: CreateStatusInput!) { createStatus(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new CreateStatusPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Deletes a case, its tasks, its indicators, and any cases merged into it.
    mutateDeleteCase(variables: { input: DeleteCaseInput }, resultSelector: string | ((qb: DeleteCasePayloadModelSelector) => DeleteCasePayloadModelSelector) = deleteCasePayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteCase: DeleteCasePayloadModelType}>(`mutation deleteCase($input: DeleteCaseInput!) { deleteCase(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new DeleteCasePayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Deletes a comment on a case, task, or indicator.
    mutateDeleteComment(variables: { input: DeleteCommentInput }, resultSelector: string | ((qb: DeleteCommentPayloadModelSelector) => DeleteCommentPayloadModelSelector) = deleteCommentPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteComment: DeleteCommentPayloadModelType}>(`mutation deleteComment($input: DeleteCommentInput!) { deleteComment(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new DeleteCommentPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Deletes a priority. You cannot delete a priority if any cases or tasks have that priority.
    mutateDeletePriority(variables: { input: DeletePriorityInput }, resultSelector: string | ((qb: DeletePriorityPayloadModelSelector) => DeletePriorityPayloadModelSelector) = deletePriorityPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deletePriority: DeletePriorityPayloadModelType}>(`mutation deletePriority($input: DeletePriorityInput!) { deletePriority(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new DeletePriorityPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Deletes a status. You cannot delete a status if any cases or tasks have that status.
    mutateDeleteStatus(variables: { input: DeleteStatusInput }, resultSelector: string | ((qb: DeleteStatusPayloadModelSelector) => DeleteStatusPayloadModelSelector) = deleteStatusPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteStatus: DeleteStatusPayloadModelType}>(`mutation deleteStatus($input: DeleteStatusInput!) { deleteStatus(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new DeleteStatusPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Delete a task.
    mutateDeleteTask(variables: { input: DeleteTaskInput }, resultSelector: string | ((qb: DeleteTaskPayloadModelSelector) => DeleteTaskPayloadModelSelector) = deleteTaskPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteTask: DeleteTaskPayloadModelType}>(`mutation deleteTask($input: DeleteTaskInput!) { deleteTask(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new DeleteTaskPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Merges a case into another case. Merging a case simply marks it as merged; it doesn't modify the case, its indicators, or its tasks at all.
    mutateMergeCase(variables: { input: MergeCaseInput }, resultSelector: string | ((qb: MergeCasePayloadModelSelector) => MergeCasePayloadModelSelector) = mergeCasePayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ mergeCase: MergeCasePayloadModelType}>(`mutation mergeCase($input: MergeCaseInput!) { mergeCase(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new MergeCasePayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Changes the name of a case.
    mutateRenameCase(variables: { input: RenameCaseInput }, resultSelector: string | ((qb: RenameCasePayloadModelSelector) => RenameCasePayloadModelSelector) = renameCasePayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ renameCase: RenameCasePayloadModelType}>(`mutation renameCase($input: RenameCaseInput!) { renameCase(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new RenameCasePayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Changes the name of a priority.
    mutateRenamePriority(variables: { input: RenamePriorityInput }, resultSelector: string | ((qb: RenamePriorityPayloadModelSelector) => RenamePriorityPayloadModelSelector) = renamePriorityPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ renamePriority: RenamePriorityPayloadModelType}>(`mutation renamePriority($input: RenamePriorityInput!) { renamePriority(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new RenamePriorityPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Changes the name of a status.
    mutateRenameStatus(variables: { input: RenameStatusInput }, resultSelector: string | ((qb: RenameStatusPayloadModelSelector) => RenameStatusPayloadModelSelector) = renameStatusPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ renameStatus: RenameStatusPayloadModelType}>(`mutation renameStatus($input: RenameStatusInput!) { renameStatus(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new RenameStatusPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    // Changes the name of a task.
    mutateRenameTask(variables: { input: RenameTaskInput }, resultSelector: string | ((qb: RenameTaskPayloadModelSelector) => RenameTaskPayloadModelSelector) = renameTaskPayloadModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ renameTask: RenameTaskPayloadModelType}>(`mutation renameTask($input: RenameTaskInput!) { renameTask(input: $input) {
        ${typeof resultSelector === "function" ? resultSelector(new RenameTaskPayloadModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  }))

module Types
  class MutationType < Types::BaseObject
      description "Use mutations to create, update, and delete."

      # case ------------
      field :create_case, mutation: Mutations::CreateCase
      field :update_case, mutation: Mutations::UpdateCase
      field :delete_case, mutation: Mutations::DeleteCase
      field :merge_case, mutation: Mutations::MergeCase
      field :add_member, mutation: Mutations::AddMember
      field :remove_member, mutation: Mutations::RemoveMember
      field :change_role, mutation: Mutations::ChangeRole

      # task -------
      field :create_task, mutation: Mutations::CreateTask
      field :update_task, mutation: Mutations::UpdateTask
      field :delete_task, mutation: Mutations::DeleteTask
      field :change_task_position, mutation: Mutations::ChangeTaskPosition

      # indicator --------
      field :create_string_indicator, mutation: Mutations::CreateStringIndicator
      field :update_indicator, mutation: Mutations::UpdateIndicator
      field :delete_indicator, mutation: Mutations::DeleteIndicator
      field :change_indicator, mutation: Mutations::ChangeIndicator

      # case, task, or indicator --------
      field :change_tags, mutation: Mutations::ChangeTags

      # comment --------
      field :create_comment, mutation: Mutations::CreateComment
      field :update_comment, mutation: Mutations::UpdateComment
      field :delete_comment, mutation: Mutations::DeleteComment

      # status ----------
      field :create_status, mutation: Mutations::CreateStatus
      field :rename_status, mutation: Mutations::RenameStatus
      field :delete_status, mutation: Mutations::DeleteStatus

      # priority --------
      field :create_priority, mutation: Mutations::CreatePriority
      field :rename_priority, mutation: Mutations::RenamePriority
      field :delete_priority, mutation: Mutations::DeletePriority
      
      # user -------
      field :update_me, mutation: Mutations::UpdateMe

      # task templates -----
      field :create_task_template, mutation: Mutations::CreateTaskTemplate
      field :update_task_template, mutation: Mutations::UpdateTaskTemplate
      field :delete_task_template, mutation: Mutations::DeleteTaskTemplate

      # case templates -----
      field :create_case_template, mutation: Mutations::CreateCaseTemplate
      field :delete_case_template, mutation: Mutations::DeleteCaseTemplate

      # task groups ------
      field :create_task_group, mutation: Mutations::CreateTaskGroup
      field :update_task_group, mutation: Mutations::UpdateTaskGroup
      field :delete_task_group, mutation: Mutations::DeleteTaskGroup

      # api tokens ------
      field :create_api_token, mutation: Mutations::CreateApiToken
      field :delete_api_token, mutation: Mutations::DeleteApiToken
  end
end

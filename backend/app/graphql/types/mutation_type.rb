module Types
  class MutationType < Types::BaseObject
      description "Use mutations to create, update, and delete."

      # case ------------
      field :create_case, mutation: Mutations::CreateCase
      field :create_case_from_template, mutation: Mutations::CreateCaseFromTemplate
      field :update_case, mutation: Mutations::UpdateCase
      field :delete_case, mutation: Mutations::DeleteCase
      field :merge_case, mutation: Mutations::MergeCase
      field :add_member, mutation: Mutations::AddMember
      field :remove_member, mutation: Mutations::RemoveMember
      field :change_role, mutation: Mutations::ChangeRole
      field :add_group_to_case, mutation: Mutations::AddGroupToCase

      # task -------
      field :create_task, mutation: Mutations::CreateTask
      field :update_task, mutation: Mutations::UpdateTask
      field :delete_task, mutation: Mutations::DeleteTask
      field :change_task_position, mutation: Mutations::ChangeTaskPosition

      # indicator --------
      field :create_string_indicator, mutation: Mutations::CreateStringIndicator
      field :update_indicator, mutation: Mutations::UpdateIndicator
      field :delete_indicator, mutation: Mutations::DeleteIndicator

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
      field :update_password, mutation: Mutations::UpdatePassword
      field :enable_user, mutation: Mutations::EnableUser
      field :invite_user, mutation: Mutations::InviteUser

      # groups -------
      field :create_group, mutation: Mutations::CreateGroup
      field :update_group, mutation: Mutations::UpdateGroup
      field :delete_group, mutation: Mutations::DeleteGroup
      field :add_user_to_group, mutation: Mutations::AddUserToGroup
      field :remove_user_from_group, mutation: Mutations::RemoveUserFromGroup

      # task templates -----
      field :create_task_template, mutation: Mutations::CreateTaskTemplate
      field :update_task_template, mutation: Mutations::UpdateTaskTemplate
      field :delete_task_template, mutation: Mutations::DeleteTaskTemplate
      field :add_task_template_to_task_group, mutation: Mutations::AddTaskTemplateToTaskGroup

      # case templates -----
      field :create_case_template, mutation: Mutations::CreateCaseTemplate
      field :update_case_template, mutation: Mutations::UpdateCaseTemplate
      field :delete_case_template, mutation: Mutations::DeleteCaseTemplate
      field :add_user_to_case_template, mutation: Mutations::AddUserToCaseTemplate
      field :remove_user_from_case_template, mutation: Mutations::RemoveUserFromCaseTemplate
      field :add_group_to_case_template, mutation: Mutations::AddGroupToCaseTemplate
      field :remove_group_from_case_template, mutation: Mutations::RemoveGroupFromCaseTemplate

      # task groups ------
      field :create_task_group, mutation: Mutations::CreateTaskGroup
      field :update_task_group, mutation: Mutations::UpdateTaskGroup
      field :delete_task_group, mutation: Mutations::DeleteTaskGroup

      # api tokens ------
      field :create_api_token, mutation: Mutations::CreateApiToken
      field :delete_api_token, mutation: Mutations::DeleteApiToken

      # attachments -----
      field :create_attachment, mutation: Mutations::CreateAttachment
      field :delete_attachment, mutation: Mutations::DeleteAttachment

      # inbound email addresses for creating cases
      field :create_create_case_email_address, mutation: Mutations::CreateCreateCaseEmailAddress
      field :delete_create_case_email_address, mutation: Mutations::DeleteCreateCaseEmailAddress

      # forms
      field :delete_form, mutation: Mutations::DeleteForm
  end
end

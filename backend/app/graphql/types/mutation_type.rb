module Types
  class MutationType < Types::BaseObject
      description "Use mutations to create, update, and delete."

      # case ------------
      field :create_case, mutation: Mutations::CreateCase
      field :rename_case, mutation: Mutations::RenameCase
      field :delete_case, mutation: Mutations::DeleteCase
      field :merge_case, mutation: Mutations::MergeCase
      field :add_member, mutation: Mutations::AddMember

      # task -------
      field :create_task, mutation: Mutations::CreateTask
      field :rename_task, mutation: Mutations::RenameTask
      field :delete_task, mutation: Mutations::DeleteTask

      # case or task --------
      field :change_status, mutation: Mutations::ChangeStatus
      field :change_priority, mutation: Mutations::ChangePriority
      field :change_assignee, mutation: Mutations::ChangeAssignee

      # case, task, or indicator
      field :change_description, mutation: Mutations::ChangeDescription

      # comment --------
      field :create_comment, mutation: Mutations::CreateComment
      field :delete_comment, mutation: Mutations::DeleteComment

      # status ----------
      field :create_status, mutation: Mutations::CreateStatus
      field :delete_status, mutation: Mutations::DeleteStatus
      field :rename_status, mutation: Mutations::RenameStatus

      # priority --------
      field :create_priority, mutation: Mutations::CreatePriority
      field :delete_priority, mutation: Mutations::DeletePriority
      field :rename_priority, mutation: Mutations::RenamePriority
  end
end

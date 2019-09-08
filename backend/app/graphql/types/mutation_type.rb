module Types
  class MutationType < Types::BaseObject
      description "Mutations are used for creating, updating, or deleting data."

      # case ------------
      field :create_case, mutation: Mutations::CreateCase
      field :rename_case, mutation: Mutations::RenameCase
      field :delete_case, mutation: Mutations::DeleteCase
      field :merge_case, mutation: Mutations::MergeCase

      # task -------
      field :rename_task, mutation: Mutations::RenameTask
      field :delete_task, mutation: Mutations::DeleteTask

      # case or task --------
      field :change_status, mutation: Mutations::ChangeStatus

      # comment --------
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

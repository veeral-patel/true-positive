class Mutations::CreateAttachment < Mutations::BaseMutation
    description "Attach a file to a case, task, indicator, or another object."

    # required ---

    argument :blob, String, required: true do
        description "The file, base64-encoded."
    end

    argument :filename, String, required: true do
        description "The file's filename."
    end

    # not required ---

    # exactly one of the arguments below is required
    argument :case_id, ID, required: false do
        description "ID of the case to add this attachment to."
    end

    argument :task_id, ID, required: false do
        description "ID of the task to add this attachment to."
    end

    # output ---

    field :attachment, Types::AttachmentType, null: true do
        description "The newly created attachment."
    end

    # code ---

    
    def resolve(blob:, filename:, case_id: nil, task_id: nil)
        # ensure exactly one of case_id and task_id is provided
        if not [case_id, task_id].one? { |id| not id.nil? } 
            raise GraphQL::ExecutionError, "Please provide a caseId or a taskId argument, but not both."
        end

        if not case_id.nil?
            # if case_id is provided, attach the file to the corresponding case
            attach_file_to_a_case(blob: blob, filename: filename, case_id: case_id)
        elsif not task_id.nil?
            # similarly, if task_id is provided, attach the file to the corresponding task
            attach_file_to_a_task(blob: blob, filename: filename, task_id: task_id)
        end
    end

    private
        # Called to attach a file to a task.
        def attach_file_to_a_task(blob:, filename:, task_id:)
            # find the task to add this attachment to
            the_task = find_task_or_throw_execution_error(task_id: task_id)

            # authorize this action
            unless TaskPolicy.new(context[:current_user], the_task).update_task?
                raise GraphQL::ExecutionError, "You are not authorized to add an attachment to this task."
            end

            # create a new attachment in memory
            new_attachment = the_task.attachments.new(
                file: { io: StringIO.new(Base64.decode64(blob)), filename: filename },
                created_by: context[:current_user]
            )

            # and save it to the database
            if new_attachment.save
                { attachment: new_attachment }
            else
                raise GraphQL::ExecutionError, attachment.errors.full_messages.join(" | ")
            end
        end

        # Called to attach a file to a case.
        def attach_file_to_a_case(blob:, filename:, case_id:)
            # find the case to add this attachment to
            the_case = find_case_or_throw_execution_error(case_id: case_id)

            # authorize this action
            unless CasePolicy.new(context[:current_user], the_case).update_case?
                raise GraphQL::ExecutionError, "You are not authorized to add an attachment to this case."
            end

            # create a new attachment in memory
            new_attachment = the_case.attachments.new(
                file: { io: StringIO.new(Base64.decode64(blob)), filename: filename },
                created_by: context[:current_user]
            )

            # and save it to the database
            if new_attachment.save
                { attachment: new_attachment }
            else
                raise GraphQL::ExecutionError, attachment.errors.full_messages.join(" | ")
            end
        end
end
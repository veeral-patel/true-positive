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

        # if case_id is provided, attach the file to the corresponding case
        if not case_id.nil?
            attach_file_to_a_case(blob: blob, filename: filename, case_id: case_id)
        end
    end

    private
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
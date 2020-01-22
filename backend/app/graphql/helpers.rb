class Helpers
end

def find_status_by_name_or_throw_execution_error(status_name:)
    begin
        Status.find_by!(name: status_name)
    rescue ActiveRecord::RecordNotFound
        raise GraphQL::ExecutionError, "Could not find status '#{status_name}'."
    end
end

def find_priority_by_name_or_throw_execution_error(priority_name:)
    begin
        Priority.find_by!(name: priority_name)
    rescue ActiveRecord::RecordNotFound
        raise GraphQL::ExecutionError, "Could not find priority '#{priority_name}'."
    end
end

def find_user_or_throw_execution_error(username:)
    begin
        User.find_by!(username: username)  
    rescue ActiveRecord::RecordNotFound
        raise GraphQL::ExecutionError, "Could not find an user with username '#{username}'."
    end
end

def find_case_or_throw_execution_error(case_id:)
    begin
        Case.find(case_id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a case with id #{case_id}."
    end
end

def find_comment_or_throw_execution_error(comment_id:)
    begin
        Comment.find(comment_id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a comment with id #{comment_id}."
    end
end

def find_task_or_throw_execution_error(task_id:)
    begin
        Task.find(task_id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a task with id #{task_id}."
    end
end

def find_indicator_or_throw_execution_error(indicator_id:)
    begin
        Indicator.find(indicator_id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a indicator with id #{indicator_id}."
    end
end

def find_task_template_or_throw_execution_error(id:)
    begin
        TaskTemplate.find(template_id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a task template with id #{id}."
    end
end

def find_api_token_or_throw_execution_error(id:)
    begin
        ApiToken.find(id)
    rescue
        raise GraphQL::ExecutionError, "Could not find an API token with id #{id}."
    end
end

def find_task_group_or_throw_execution_error(id:)
    begin
        TaskGroup.find(id)
    rescue
        raise GraphQL::ExecutionError, "Could not find an task group with id #{id}."
    end
end

def find_case_template_or_throw_execution_error(id:)
    begin
        CaseTemplate.find(id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a case template with id #{id}."
    end
end

def find_group_or_throw_execution_error(id:)
    begin
        Group.find(id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a group with id #{id}."
    end
end

def find_create_case_email_address_or_throw_execution_error(id:)
    begin
        CreateCaseEmailAddress.find(id)
    rescue
        raise GraphQL::ExecutionError, "Could not find an inbound address with id #{id}."
    end
end

def find_attachment_or_throw_execution_error(id:)
    begin
        Attachment.find(id)
    rescue
        raise GraphQL::ExecutionError, "Could not find an attachment with id #{id}."
    end
end

def find_form_or_throw_execution_error(id:)
    begin
        Form.find(id)
    rescue
        raise GraphQL::ExecutionError, "Could not find a form with id #{id}."
    end
end
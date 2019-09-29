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

def find_user_or_throw_execution_error(user_id:)
    begin
        User.find(user_id)  
    rescue ActiveRecord::RecordNotFound
        raise GraphQL::ExecutionError, "Could not find an user with id #{user_id}."
    end
end

def find_user_by_username_or_throw_execution_error(username:)
    begin
        User.find_by!(username: username)
    rescue
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
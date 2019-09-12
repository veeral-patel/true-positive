def find_status_or_throw_execution_error(status_id:)
    begin
        Status.find(status_id)  
    rescue ActiveRecord::RecordNotFound
        raise GraphQL::ExecutionError, "Could not find a status with id #{status_id}."
    end
end

def find_priority_or_throw_execution_error(priority_id:)
    begin
        Priority.find(priority_id)  
    rescue ActiveRecord::RecordNotFound
        raise GraphQL::ExecutionError, "Could not find a priority with id #{priority_id}."
    end
end

def find_user_or_throw_execution_error(user_id:)
    begin
        User.find(user_id)  
    rescue ActiveRecord::RecordNotFound
        raise GraphQL::ExecutionError, "Could not find an user with id #{user_id}."
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
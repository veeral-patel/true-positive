module TaskService
    class Delete
        def self.run(task, destroyed_by)
            # Destroy the task
            task.destroy

            # Publish an audit entry
            Audit.create(
                action: "DELETE_TASK",
                associated_id: task.id,
                associated_type: "TASK",
                created_by: destroyed_by
            )
        end
    end
end
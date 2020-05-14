module TaskService
    class Delete
        def self.run(task, destroyed_by)
            # Destroy the task
            task.destroy
        end
    end
end
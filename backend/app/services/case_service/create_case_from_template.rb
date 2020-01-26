module CaseService
    class CreateCaseFromTemplate
        def self.run(template:, created_by:)
            # create the case
            new_case = created_by.created_cases.create(
                name: template.name,
                status: template.status,
                priority: template.priority,
                description: template.description,
                tag_list: template.tag_list,
                assigned_to: template.assigned_to
            )

            # add each of the case template's members to the case
            template.default_members.each do |member|
                # skip template members who are already in the case
                if not new_case.case_members.include? member
                    new_case.case_members << member
                end
            end

            # add each of the case template's groups to the case
            template.default_groups.each do |group|
                # skip CT groups who already can access the case (but no groups should be
                # skipped, since we're creating a new case)
                if not new_case.case_groups.include? group
                    new_case.case_groups << group
                end
            end

            # for each task group in the case template...
            template.task_groups.each do |template_task_group|
                # add a corresponding task group to the case
                case_task_group = new_case.task_groups.create(
                    name: template_task_group.name,
                    created_by: created_by
                )

                # and add corresponding tasks for every task template in the template's task group
                template_task_group.task_templates.each do |task_template|
                    case_task_group.tasks.create(
                        name: task_template.name,
                        description: task_template.description,
                        assigned_to: task_template.assigned_to,
                        created_by: created_by
                    )
                end
            end

            # return the newly created case
            new_case
        end
    end
end
module CaseService
    class CreateCaseFromTemplate
        def self.run(template:, current_user:)
            # create the case
            new_case = current_user.created_cases.create(
                name: template.name,
                status: template.status,
                priority: template.priority,
                description: template.description,
                tag_list: template.tag_list,
                assigned_to: template.assigned_to
            )

            # tell Segment a case was created
            Analytics.track(
                user_id: current_user.username,
                event: 'Case created',
                properties: {
                    name: new_case.name,
                    from_template: true
                }
            )

            # add each of the case template's members to the case
            template.default_members.each do |cmember|
                # ignore users who are already in the case
                if not new_case.has_member(cmember.user)
                    new_case.case_members.create(
                        user: cmember.user,
                        role: cmember.role
                    )
                end
            end

            # add each of the case template's groups to the case
            template.default_groups.each do |cgroup|
                new_case.case_groups.create(
                    group: cgroup.group,
                    role: cgroup.role
                )
            end

            # for each task group in the case template...
            template.task_groups.each do |template_task_group|
                # add a corresponding task group to the case
                case_task_group = new_case.task_groups.create(
                    name: template_task_group.name,
                    created_by: current_user
                )

                # and add corresponding tasks for every task template in the template's task group
                template_task_group.task_templates.each do |task_template|
                    case_task_group.tasks.create(
                        name: task_template.name,
                        description: task_template.description,
                        assigned_to: task_template.assigned_to,
                        created_by: current_user
                    )
                end
            end
            
            # return the newly created case
            new_case
        end
    end
end
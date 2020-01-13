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

            # add each of the template's members to the case
            template.default_members.each do |member|
                # skip template members who are already in the case
                if not new_case.case_members.include? member
                    new_case.case_members << member
                end
            end

            # return the newly created case
            new_case
        end
    end
end
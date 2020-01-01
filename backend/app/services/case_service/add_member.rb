module CaseService
    class AddMember
        def self.run(the_case, user, role, added_by)
            # add the member to the case
            the_case.case_members.create(user: user, role: role)

            # generate an audit entry to record this event
            Audit.create(
                action: "ADD_MEMBER_TO_CASE",
                associated_id: the_case.id,
                associated_type: "CASE",
                created_by: added_by
            )
        end
    end
end
module CaseService
    class AddMember
        def self.run(the_case, user, role, added_by)
            # add the member to the case
            the_case.case_members.create(user: user, role: role)

            # email the case's new member
            # CaseMailer.with(user: user).added_member.deliver_later
        end
    end
end
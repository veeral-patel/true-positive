module CaseService
    class RemoveMember
        def self.run(the_case, user, removed_by)
            # Prevent user from removing the last user from a case
            if the_case.case_members.length == 1
                the_case.errors[:base] << "You cannot remove the last user from a case."
                return false
            end
        
            begin
                # Remove the user from the case
                CaseMember.find_by!(case: the_case, user: user).destroy
        
                # Create an audit entry
                Audit.create(
                    action: "REMOVE_MEMBER_FROM_CASE",
                    associated_id: the_case.id,
                    associated_type: "CASE",
                    created_by: removed_by
                )

                # Email the user who was just removed
                CaseMailer.with(user: user).removed_member.deliver_later
        
                return true
            rescue ActiveRecord::RecordNotFound => e
                the_case.errors[:base] << "The case does not have an user with username #{user.username}"
                return false
            end
        end
    end
end
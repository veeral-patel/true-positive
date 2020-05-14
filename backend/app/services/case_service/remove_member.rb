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
                CaseMember.find_by!(caseable: the_case, user: user).destroy
        
                # Email the user who was just removed
                # CaseMailer.with(user: user).removed_member.deliver_later
        
                return true
            rescue ActiveRecord::RecordNotFound => e
                the_case.errors[:base] << "The case does not have an user with username #{user.username}"
                return false
            end
        end
    end
end
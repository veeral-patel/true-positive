module CaseService
   class Unmerge
     def self.run(the_case, unmerged_by)
        # Un-merge the case from its parent
        the_case.parent = nil
        the_case.reason_for_merging = nil
        the_case.save
     end
   end 
end
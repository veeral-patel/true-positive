module CaseService
    class Merge
        def self.run(child_case, parent_case, reason)
            child_case.parent = parent_case
            child_case.reason_for_merging = reason
            child_case.save
        end
    end
end
class ApplicationMailbox < ActionMailbox::Base
  routing /inbound-cases.truepositive.app$/ => :create_case
end

# CreateCaseEmailAddress.create(email: "l3amar23@inbound-cases.truepositive.app", case_template: CaseTemplate.first)
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  # scope all models by tenant
  acts_as_tenant :tenant
end

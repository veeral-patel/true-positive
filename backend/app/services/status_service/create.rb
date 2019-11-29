require 'active_interaction'

module StatusService
    class Create < ActiveInteraction::Base
        string :name, :description

        def execute
        end
    end
end
require 'active_interaction'

module StatusService
    class Create < ActiveInteraction::Base
        float :x

        def execute
            x ** 2
        end
    end
end
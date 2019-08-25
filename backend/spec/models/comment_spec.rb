require 'rails_helper'

RSpec.describe Comment, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:comment) }
    end
end


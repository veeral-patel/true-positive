require 'rails_helper'

RSpec.describe Comment, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:comment) }
        it { should validate_presence_of(:created_by) }
        it { should validate_presence_of(:commentable) }
    end
end


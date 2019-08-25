require 'rails_helper'
require 'faker'

RSpec.describe Comment, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:comment) }
        it { should validate_presence_of(:created_by) }
        it { should validate_presence_of(:commentable) }
    end

    it 'create a comment' do
        a_comment = Comment.new(
            comment: Faker::Quotes::Shakespeare.hamlet_quote,
            created_by: create(:user),
             # later, add indicator, task, etc too
            commentable: create(:case)
        )
        expect(a_comment).to be_valid
        expect do
            a_comment.save
        end.to change { Comment.count }.by(1)
    end
end


require 'faker'
require 'rails_helper'

RSpec.describe Task, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:name) }
        it { should validate_presence_of(:status) }
        it { should validate_presence_of(:priority) }
        it { should validate_presence_of(:created_by) }
        it { should validate_presence_of(:case) }
    end

    it 'should have a string representation' do
        task = create(:task)
        expect(task.to_s).to eq(task.name)
    end

    it 'create a task with only required attributes' do
        a_task = Task.new(
            name: Faker::Alphanumeric.alpha(5),
            status: create(:status),
            priority: create(:priority),
            created_by: create(:user),
            case: create(:case),
        )
        expect(a_task).to be_valid
        expect do
            a_task.save
        end.to change { Task.count }.by(1)
    end

    it 'create a task with all attributes' do
        a_task = Task.new(
            name: Faker::Alphanumeric.alpha(5),
            description: Faker::Alphanumeric.alpha(15),
            status: create(:status),
            priority: create(:priority),
            created_by: create(:user),
            case: create(:case),
            assigned_to: create(:user),
            tag_list: ["tag1", "tag2"]
        )
        expect(a_task).to be_valid
        expect do
            a_task.save
        end.to change { Task.count }.by(1)
    end
end
require 'rails_helper'

RSpec.describe Case, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:name) }
        it { should validate_presence_of(:status) }
        it { should validate_presence_of(:priority) }
        it { should validate_presence_of(:created_by) }
    end

    it 'should have a string representation' do
        a_case = create(:case)
        expect(a_case.to_s).to eq(a_case.name)
    end

    it 'create an case with only required attributes' do
        a_case = Case.new(
            name: "An case",
            status: create(:status),
            priority: create(:priority),
            created_by: create(:user)
        )
        expect(a_case).to be_valid
        expect do
            a_case.save
        end.to change { Case.count }.by(1)
    end

    it 'create an case with all attributes' do
        a_case = Case.new(
            name: "An case",
            status: create(:status),
            priority: create(:priority),
            created_by: create(:user),
            description: "This case's description",
            assigned_to: create(:user),
            tag_list: ["tag1", "tag2"],
            tasks: [ create(:task) ]
        )
        expect(a_case).to be_valid
        expect do
            a_case.save
        end.to change { Case.count }.by(1)
    end
end
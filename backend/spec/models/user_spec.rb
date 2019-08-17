require 'rails_helper'

RSpec.describe User, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:username) }
        it { should validate_uniqueness_of(:username) }
    end


    it 'should have a string representation' do
        user = create(:user)
        expect(user.to_s).to eq(user.username)
    end

    it 'create an user with only required attributes' do
        user = User.new(username: "lamemonkey")
        expect do
            user.save
        end.to change { User.count }.by(1)
    end

    it 'create an user with all attributes' do
        user = User.new(username: "lamemonkey")
        expect(user).to be_valid
        expect do
            user.save
        end.to change { User.count }.by(1)
    end

    it 'an user can create a case' do
        user = create(:user)

        new_case = user.created_cases.new(
            name: "A case",
            status: create(:status),
            priority: create(:priority),
        )

        # ensure we can create a case...
        expect do
            new_case.save
        end.to change { Case.count }.by(1)

        # ...with the created_by field set correctly
        expect(new_case.created_by.username).to eq(user.username)

        # and that we can retrieve the list of cases an user created by
        # calling `created_cases`
        names_of_created_cases = user.created_cases.map { |a_case| a_case.name }
        expect(names_of_created_cases).to eq(["A case"])
    end
end
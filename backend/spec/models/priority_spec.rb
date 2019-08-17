require 'rails_helper'

RSpec.describe Priority, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:name) }
        it { should validate_uniqueness_of(:name) }
    end

    let(:priority) { Priority.new(name: "Low") }

    it 'has a string representation' do
        expect(priority.to_s).to eq("Low")
    end

    it 'create an priority with only required attributes' do
        expect(priority).to be_valid
        expect do
            priority.save
        end.to change { Priority.count }.by(1)
    end

    it 'create an priority with all attributes' do
        priority = Priority.new(name: "Low")
        expect(priority).to be_valid
        expect do
            priority.save
        end.to change { Priority.count }.by(1)
    end
end

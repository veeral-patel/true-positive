require 'rails_helper'

RSpec.describe Status, type: :model do
    describe 'validations' do
        it { should validate_presence_of(:name) }
        it { should validate_uniqueness_of(:name) }
    end

    let(:status) { Status.new(name: "Open" )}

    it 'has a string representation' do
        expect(status.to_s).to eq("Open")
    end

    it 'create an status with only required attributes' do
        expect(status).to be_valid
        expect do
            status.save
        end.to change { Status.count }.by(1)
    end

    it 'create an status with all attributes' do
        status = Status.new(name: "Open")
        expect(status).to be_valid
        expect do
            status.save
        end.to change { Status.count }.by(1)
    end
end

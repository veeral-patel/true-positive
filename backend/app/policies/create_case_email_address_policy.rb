class CreateCaseEmailAddressPolicy
  def initialize(user, inbound_address)
    @user = user
    @inbound_address = inbound_address
  end

  def create?
    # Anyone can create an inbound address
    true
  end

  def delete?
    # Anyone can delete an inbound address
    true
  end
end

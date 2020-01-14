class CreateCaseEmailAddressPolicy
  def initialize(user, inbound_address)
    @user = user
    @inbound_address = inbound_address
  end

  def delete?
    # Anyone can delete an inbound address
    true
  end
end

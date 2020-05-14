class UserPolicy
  def initialize(user)
    @user = user
  end

  def invite?
    # A user can invite any other user
    true
  end

  def update_enabled?
    # A user can disable/enabled any other user for now
    true
  end
end

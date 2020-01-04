class UserPolicy
  def initialize(user)
    @user = user
  end

  def disable?
    # A user can disable any other user
    true
  end
end

Rails.application.routes.draw do
  resources :session, controller: 'sessions', only: [:create, :destroy]
  # resources :confirmations, controller: 'rails_jwt_auth/confirmations', only: [:create, :update]
  # resources :passwords, controller: 'rails_jwt_auth/passwords', only: [:create, :update]
  # resources :invitations, controller: 'rails_jwt_auth/invitations', only: [:create, :update]

  post "/graphql", to: "graphql#execute"
end

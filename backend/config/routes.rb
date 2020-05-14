Rails.application.routes.draw do
  root :to => "root#index"

  resources :session, controller: 'sessions', only: [:create, :destroy]

  post "/graphql", to: "graphql#execute"
end

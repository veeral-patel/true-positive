Rails.application.routes.draw do
  resources :session, controller: 'sessions', only: [:create, :destroy]
  post "/graphql", to: "graphql#execute"
end

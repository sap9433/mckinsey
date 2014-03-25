Mckinsey::Application.routes.draw do
  resources :meetings
  
  root 'meetings#participate'

  #regular route:
  get 'meeting/participant_details' => 'meetings#participant_details'
  get 'meeting/user_input/:id' => 'meetings#user_input'
  get 'meeting/choose_action' => 'meetings#choose_action'
  get 'to/:uid' => 'meetings#participate'
  post 'meeting/storeupload' => 'meetings#storeupload'
  match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]

end

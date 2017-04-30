Rails.application.routes.draw do

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'users', skip: [:omniauth_callbacks]
    end
  end

  get 'maps/fires' => 'maps#fires'
  get 'maps/windy' => 'maps#windy'

  resources :reports

  root 'map#show'

end

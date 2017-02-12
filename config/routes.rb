Rails.application.routes.draw do

  resources :reportes

  devise_for :users, controllers: {
      sessions: 'users/sessions'
  }

end

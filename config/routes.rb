Rails.application.routes.draw do

  resources :reportes

  devise_for :users, controllers: {
      sessions: 'users/sessions'
  }
  get 'static_pages/home'
  get 'static_pages/01'
  get 'static_pages/02'
  get 'static_pages/03'
  get 'static_pages/04'
  get 'static_pages/05'
  get 'static_pages/06'
  get 'static_pages/07'

  root to: 'home#index'

end

Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
  root to: "articles#index"
  resource :timeline, only: [ :show ]

  resources :articles do
    resources :comments, only: [ :index, :new, :create ]

    resource :like, only: [ :show, :create, :destroy ]
  end

  resources :accounts, only: [ :show ] do
    resources :follows, only: [ :create ]
    resources :unfollows, only: [ :create ]
  end

  resource :profile, only: [ :show, :edit, :update ]
  resources :favourites, only: [ :index ]
end

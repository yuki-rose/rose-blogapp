class FavouritesController < ApplicationController
  before_action :authenticate_user!

  def index
    @article = current_user.favourite_articles
  end
end

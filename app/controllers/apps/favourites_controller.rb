class Apps::FavouritesController < Apps::ApplicationController
  def index
    @article = current_user.favourite_articles
  end
end

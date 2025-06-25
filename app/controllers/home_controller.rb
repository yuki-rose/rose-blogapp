class HomeController < ApplicationController
    def index
        render 'home/index' 
        @title = 'タイトル'
    end

    def about
    end
end
class HomeController < ApplicationController
layout false
  def index
    render 'index'
  end
  def help
    render 'help'
  end
  def references_page
    render 'references'
  end
end

class HomeController < ApplicationController
layout false
  def index
    render 'index'
  end
  def help
    render 'help'
  end
  def trial
    render 'help2'
  end
end

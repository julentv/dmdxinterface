class HomeController < ApplicationController
layout false
  def index
    render 'index'
  end
  def trial
    example = Item.new(12)
    example.item_number=11
    example.save
    
    render 'index'
  end
end

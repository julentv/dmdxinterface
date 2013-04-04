class HomeController < ApplicationController
  def index
  end
  def trial
    example = Item.new(12)
    example.item_number=11
    example.save
    
    render 'index'
  end
end

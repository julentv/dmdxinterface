class HomeController < ApplicationController
layout false
  def index
    render 'index'
  end
  def trial
    example = Stimulus.new(0,0)
    
    example.item.expected_response_no
    example.item.save
    example.save
    render 'index'
  end
end

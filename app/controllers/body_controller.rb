class BodyController < ApplicationController
  layout false
  def index
    render 'index'
  end
  def timeline
    render 'timeline'
  end
  def preview
    render 'preview'
  end
end

class BodyController < ApplicationController
  layout false
  def index
    @conf_file=ConfigurationFile.find(1)
    render 'index'
  end
  def timeline
    render 'timeline'
  end
  def preview
    render 'preview'
  end
  def save
    render :text => "Saved!"
  end
  def settings
    if params[:id]==nil
      redirect_to '/header/index'
     else
       redirect_to '/header/index?id='+params[:id]
     end
  end
end

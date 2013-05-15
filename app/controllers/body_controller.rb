class BodyController < ApplicationController
  require 'json'
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
    @conf_file=ConfigurationFile.find(params[:id])
    string = params[:json_data]
    parsed = JSON.parse(string)
    #erase the existing stimulus of the item
    @conf_file.items.clear
    #add the new stimulus
    @conf_file.create_file_from_json(parsed)
    
    render :text => parsed
  end
  def download
    @conf_file=ConfigurationFile.find(params[:id])
    @conf_file.createFile()
    render :text => "downloaded!"
  end
  def settings
    if params[:id]==nil
      redirect_to '/header/index'
     else
       redirect_to '/header/index?id='+params[:id]
     end
  end
end

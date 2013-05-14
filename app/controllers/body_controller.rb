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
    #@conf_file.items<<Item.new(111)
    #@conf_file.deleteItems
    #@conf_file=create_file_from_json(parsed)
    
    render :text => @conf_file.items[0].stimulus.size
  end
  def settings
    if params[:id]==nil
      redirect_to '/header/index'
     else
       redirect_to '/header/index?id='+params[:id]
     end
  end
end

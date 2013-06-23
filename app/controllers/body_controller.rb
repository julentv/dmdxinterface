class BodyController < ApplicationController
  require 'json'
  layout false
  def index
    if params[:id]==nil
     @conf_file=ConfigurationFile.find(1)
    else
     @conf_file=ConfigurationFile.find(params[:id])
     @conf_file_json=@conf_file.to_json
    end
    
    render 'index'
  end
  def timeline
    @conf_file=ConfigurationFile.find(1)
    @conf_file_json=@conf_file.to_json
    render 'index2'
  end
  def preview
    if params[:id]==nil
     @conf_file=ConfigurationFile.find(1)
    else
     @conf_file=ConfigurationFile.find(params[:id])
     @conf_file_json=@conf_file.to_json
    end
    render 'preview'
  end
  def save
    @conf_file=ConfigurationFile.find(params[:id])
    string = params[:items]
    loops = JSON.parse(params[:loops])
    items = JSON.parse(string)
    #erase the existing items and loops of the configuration file
    @conf_file.items.clear
    @conf_file.loops.clear
    #add the new items and loops
    @conf_file.create_file_from_json(items, loops)
    
    render :text => items
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

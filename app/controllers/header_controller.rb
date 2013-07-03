class HeaderController < ApplicationController
  layout false
  def index
    if params[:id]==nil
      render 'index'
    else
      begin
        @conf_file=ConfigurationFile.find(params[:id])
        if @conf_file.configuration_file_header.nil?
          @conf_file.configuration_file_header= ConfigurationFileHeader.new()
        end
        @conf_file_header=@conf_file.configuration_file_header
        render 'index_params'
      rescue
        redirect_to '/'
      end
      
    end
    
  end
  def file_creation
    #@conf_file = ConfigurationFile.new("file001")
    #@conf_file.create_file
    render 'index'
  end
  def prueba
    if params[:id]==nil
      render 'index2'
    else
      @conf_file=ConfigurationFile.find(params[:id])
      
      if @conf_file.configuration_file_header.nil?
        @conf_file.configuration_file_header= ConfigurationFileHeader.new()
      end
      @conf_file_header=@conf_file.configuration_file_header
      render 'index_params2'
    end
  end
  def define_items
    if params[:file_id]==nil
      @conf_file = ConfigurationFile.new(params[:file_name].to_s)
      @conf_file.name=params[:file_name]
      @conf_file.create_from_params(params)
      @conf_file.save
    else
      @conf_file = ConfigurationFile.find(params[:file_id])
      @conf_file.name=params[:file_name]
      @conf_file.create_from_params(params)
      @conf_file.configuration_file_header.save
      @conf_file.save
    end
    redirect_to '/body/index/'+@conf_file.id.to_s
  end
  def header_save
    if params[:file_id]==nil
      @conf_file = ConfigurationFile.new(params[:file_name].to_s)
      @conf_file.name=params[:file_name]
      @conf_file.create_from_params(params)
      @conf_file.save
    else
      @conf_file = ConfigurationFile.find(params[:file_id])
      @conf_file.name=params[:file_name]
      @conf_file.create_from_params(params)
      @conf_file.configuration_file_header.save
      @conf_file.save
    end
    @conf_file_header=@conf_file.configuration_file_header
    render 'index_params'
  end
end

class HeaderController < ApplicationController
  def index
  end
  def file_creation
    #@conf_file = ConfigurationFile.new("file001")
    #@conf_file.create_file
    render 'index'
  end
  def header_creation
    @conf_file = ConfigurationFile.new(params[:file_name].to_s)
    #@conf_file.configuration_file_header.output_data_to_ascii([:output_to_ascii])
    @conf_file.name="filee"
    @conf_file.create_file
    render 'success'
  end
end

class HeaderController < ApplicationController
  def index
  end
  def file_creation
    @conf_file = ConfigurationFile.new("file001")
    @conf_file.create_file
    render 'index'
  end
end

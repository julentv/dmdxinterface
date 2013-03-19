class ConfigurationFile < ActiveRecord::Base
  has_one :configuration_file_header
  attr_writer :name
  
  
  
  #Contructor
  def initialize(file_name)
    @name = file_name
    @configuration_file_header = ConfigurationFileHeader.new
  end
  def configuration_file_header
    @configuration_file_header
  end
  #Creation of the file
  def create_file
    @header_string=@configuration_file_header.to_s
    @file_name = "public/files/"+@name+".rtf"
    File.open(@file_name, "w") do |f|     
    f.write(@header_string)   
    end
  end
  
  def to_s
    "File name: "+@name
  end
end

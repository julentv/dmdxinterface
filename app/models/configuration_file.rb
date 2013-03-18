class ConfigurationFile < ActiveRecord::Base
  attr_accessible :name
  
  #Contructor
  def initialize(file_name)
    @name = file_name
    
  end
  
  #Creation of the file
  def create_file
    @file_name = "public/files/"+@name
    File.open(@file_name, "w") do |f|     
    f.write("File created")   
    end
  end
  
  def to_s
    "File name: "+@name
  end
end

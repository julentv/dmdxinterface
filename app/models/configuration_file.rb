class ConfigurationFile < ActiveRecord::Base
  has_one :configuration_file_header
  has_many :items, :dependent => :destroy
  attr_accessible :name, :configuration_file_header, :items

  #Contructor
  def initialize(file_name)
    super()
    self.name = file_name
    self.configuration_file_header = ConfigurationFileHeader.new(self)
  end
  
  #Creation of the file
  def createFile
    @header_string=self.configuration_file_header.to_s
    @file_name = "public/files/"+self.name+".rtf"
    File.open(@file_name, "w") do |f|     
    f.write(@header_string)   
    end
  end
  
  #NOT USED!!
  #deletes all the items in the DB of this configuration file
  def deleteItems
    self.items.each do |item|
      item.delete
    end
  end
 
  #create the model objects fron json object
  def create_file_from_json(json_ob)
    
    j=json_ob.size-1
    for i in 0..j
      item=Item.new(i)
      item.create_from_json(json_ob[i])
      self.items<<item
    end
    
    #create the file
    #@file_name = "public/files/"+self.name+".rtf"
    #File.open(@file_name, "w") do |f|     
    #f.write(@header_string+" "+@body_string)   
    #end
  end
  
  def to_s
    "File name: "+@name
  end
end

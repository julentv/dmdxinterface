class ConfigurationFile < ActiveRecord::Base
  has_one :configuration_file_header
  has_many :items
  attr_accessible :name, :configuration_file_header

  #Contructor
  def initialize(file_name)
    super()
    self.name = file_name
    self.configuration_file_header = ConfigurationFileHeader.new(self)
  end
  #Creation of the file
  def create_file
    @header_string=self.configuration_file_header.to_s
    @file_name = "public/files/"+self.name+".rtf"
    File.open(@file_name, "w") do |f|     
    f.write(@header_string)   
    end
  end
  
  def create_file_from_json(json_ob)
    @header_string=self.configuration_file_header.to_s
    @body_string=""
    j=self.items.length
    for i in 0..j
      @body_string=@body_string+self.items[i].create_from_json(json_ob[i])
      self.items[i].save
    end
    @file_name = "public/files/"+self.name+".rtf"
    File.open(@file_name, "w") do |f|     
    f.write(@header_string+" "+@body_string)   
    end
  end
  
  def to_s
    "File name: "+@name
  end
end

class ConfigurationFile < ActiveRecord::Base
  has_one :configuration_file_header
  has_many :items, :dependent => :destroy
  has_many :loops, :dependent => :destroy
  attr_accessible :name, :configuration_file_header

  #Contructor
  def initialize(file_name)
    super()
    self.name = file_name
    self.configuration_file_header = ConfigurationFileHeader.new()
  end
  
  #Creation of the file
  def createFile
    @header_string=self.configuration_file_header.to_s
    @bodyString=self.createBodyString
    @bodyString=@bodyString[0, @bodyString.size-2]
    if @bodyString==nil
     @bodyString="" 
    end
    
    @file_name = "public/files/"+self.name+".rtf"
    File.open(@file_name, "w") do |f|     
    f.write(@header_string+"\n"+@bodyString)   
    end
  end
  
  def createBodyString
    bodyString=""
    #two-dimensional arrays that will contain the strings corresponding to the loops.
    loopsBeforeString=Array.new()
    loopsAfterString=Array.new()
    j=self.loops.size-1
    
    for i in 0..j
      newArray=Array.new
      newArray.push(self.loops[i].first_item)
      newArray.push(self.loops[i].to_s_before(i))
      loopsBeforeString.push(newArray)
      
      lastItem=loops[i].first_item+loops[i].number_of_items-1
      if lastItem>=self.items.size
      lastItem = self.items.size-1
      end
      newArray=Array.new
      newArray.push(lastItem)
      newArray.push(self.loops[i].to_s_after)
      loopsAfterString.push(newArray)
    end
    
    loopsBeforeString=loopsBeforeString.sort{|x,y| x[0] <=> y[0]}
    loopsAfterString=loopsAfterString.sort{|x,y| x[0] <=> y[0]}
    
    j=items.size
    for i in 0..j
      while !loopsBeforeString.empty?&&loopsBeforeString[0][0]==i do
        bodyString=bodyString+loopsBeforeString[0][1]
        loopsBeforeString.delete_at(0)
      end
      bodyString=bodyString+items[i].to_s+"\n"
      
      while !loopsAfterString.empty? && loopsAfterString[0][0]==i do
        bodyString=bodyString+loopsAfterString[0][1]
        loopsAfterString.delete_at(0)
      end
    end
    bodyString
  end
  
  #NOT USED!!
  #deletes all the items in the DB of this configuration file
  def deleteItems
    self.items.each do |item|
      item.delete
    end
  end
 
  #create the model objects fron json object
  def create_file_from_json(jsonItems, jsonLoops)
    #loops
    j=jsonLoops.size-1
    for i in 0..j
      loop=Loop.new()
      loop.create_from_json(jsonLoops[i])
      self.loops<<loop
    end
    
    #items
    j=jsonItems.size-1
    for i in 0..j
      item=Item.new(i)
      item.create_from_json(jsonItems[i])
      self.items<<item
    end
    
    
    #create the file
    #@file_name = "public/files/"+self.name+".rtf"
    #File.open(@file_name, "w") do |f|     
    #f.write(@header_string+" "+@body_string)   
    #end
  end
  def to_json
    itemsJson=Array.new
    self.items.each do |item|
      itemsJson.push(item.to_json)
    end
    loopsJson=Array.new
    self.loops.each do |loop|
      loopsJson.push(loop.to_json)
    end
    {'id'=>self.id, 'name'=>self.name, 'configuration_file_header'=>self.configuration_file_header.to_json, 'items'=>itemsJson, 'loops'=>loopsJson}.to_json
  end
  
  def to_s
    "File name: "+@name
  end
end

class Prueba < ActiveRecord::Base
  attr_accessible :name
  
  def initialize(file_name)
    super()
    self.name = file_name
    
  end


end

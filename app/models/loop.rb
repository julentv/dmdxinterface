class Loop < ActiveRecord::Base
  belongs_to :configuration_file
  attr_accessible :configuration_file_id, :first_item, :number_of_items, :number_of_iterations
  
  
  def create_from_json(json_ob)
    self.first_item=json_ob["firstItem"]
    self.number_of_items=json_ob["numberOfItems"]
    self.number_of_iterations=json_ob["numberOfIterations"]  
  end
  
  def to_s
    
  end
end

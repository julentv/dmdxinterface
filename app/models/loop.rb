class Loop < ActiveRecord::Base
  belongs_to :configuration_file
  attr_accessible :configuration_file_id, :first_item, :number_of_items, :number_of_iterations
  
  
  def last_item
    lastItem=(Integer(self.first_item)+Integer(self.number_of_items)-1).to_s
  end
  def create_from_json(json_ob)
    self.first_item=json_ob["firstItem"]
    self.number_of_items=json_ob["numberOfItems"]
    self.number_of_iterations=json_ob["numberOfIterations"]  
  end
  
  def to_s_before(counterNumber)
    @counterNumber=counterNumber
    string="<SetCounter Counter"+@counterNumber.to_s+"="+self.number_of_iterations.to_s+">\n"
  end
  def to_s_after
    itemNumber=self.configuration_file.items[self.first_item].item_number
    
    string="<DecrementCounter "+@counterNumber.to_s+">\n"
    string=string+"<BranchIfCounterGT "+@counterNumber.to_s+", 0, "+itemNumber.to_s+">\n"
  end
end

class Item < ActiveRecord::Base
  belongs_to :configuration_file
  attr_accessible :configuration_file_id, :expected_response, :item_number
  
  def initialize(item_number)
    super()
    self.item_number=item_number
    self.expected_response ="+"
  end
  
  #the next four methods change the expected response in the item
  def expected_response_yes
    self.expected_response ="+"
  end
  def expected_response_no
    self.expected_response ="-"
  end
  def expected_response_no_response
    self.expected_response ="^"
  end
  def expected_response_any_response
    self.expected_response ="="
  end
  
  def to_s
    #item string example: + 1 * "RABIES" /;
    item_string=""
    item_string=item_string+self.expected_response
    item_string=item_string+" "+self.item_number+ " *"
    
    #always end with a ";"
    item_string=item_string+" ;"
    
    item_string
    
  end
  
  
end

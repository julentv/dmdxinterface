class Item < ActiveRecord::Base
  belongs_to :configuration_file
  has_many :stimulus, :dependent => :delete_all, :class_name=>"Stimulus"
  
  attr_accessible :configuration_file_id, :expected_response, :item_number, :no_randomise, :start_timer_before_stimulus, :text
  
  #validations
  validates_numericality_of :item_number, :greater_than_or_equal_to => 0
  validates_inclusion_of :expected_response, :in => %w( + - ^ = ), :message =>"The expected response symbol is not included in the list"
  def initialize(item_number)
    super()
    self.item_number=item_number
    self.expected_response ="+"
    #starts the timer of dmdx after the selected stimulus in the item (with the simbol *)
    self.start_timer_before_stimulus=0
    self.text=""
    self.no_randomise=false
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
    item_string=""
    if self.text==""
      #item string example: + 1 * "RABIES" /;
      
      item_string=item_string+self.expected_response
      item_string=item_string+self.item_number.to_s
      j=self.stimulus.size-1
      for i in 0..j
        if i==start_timer_before_stimulus
          item_string=item_string+" *"
        end
        item_string=item_string+self.stimulus[i].to_s
      end
      if item_string[item_string.length-1]==","
        #erase the last coma if exists
        item_string=item_string[0,item_string.length-1]
      end
      #always end with a ";"
    else
      item_string='0 '+'"'+self.text+'"'
    end
    item_string=item_string+";"
    
    #add $ if no randomize
    if self.no_randomise
    item_string="$\n"+item_string+"\n$"  
    end
    item_string
  end
  def to_json
    stimulusJson=Array.new
    self.stimulus.each do |stimulu|
      stimulusJson.push(stimulu.to_json)
    end
    {'expected_response'=>self.expected_response, 'item_number'=>self.item_number, 'no_randomise'=>self.no_randomise, 'text'=>self.text, 'start_timer_before_stimulus'=>self.start_timer_before_stimulus, 'stimulus'=>stimulusJson}
  end
  def create_from_json(json_ob)
    self.item_number=json_ob["id"]
    self.expected_response=json_ob["expectedResponse"]
    self.start_timer_before_stimulus=json_ob["startTimerBeforeStimulus"]
    self.text=json_ob["text"]
    self.no_randomise=json_ob["noRandomise"]
    j=json_ob["stimulusArray"].size-1
    for i in 0..j
      stimulus=Stimulus.new(i)
      stimulus.create_from_json(json_ob["stimulusArray"][i])
      self.stimulus<<stimulus
    end
  end
  
end

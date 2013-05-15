class Stimulus < ActiveRecord::Base
  belongs_to :item
  attr_accessible :channel, :clear_screen, :duration, :is_blank_interval, :item_id, :left_possition, :no_randomise, :not_erase_previous, :order, :present_in_line, :stimulus_type, :synchronise_with_next, :text, :top_possition
 #validations
  validates_inclusion_of :stimulus_type, :in => %w( text bmp jpg wav ), :message =>"The type must be text, bmp, jpg or wav"
  validates_inclusion_of :channel, :in => 0..2, :message =>"The channel must be between 0 and 2 (left, right, both)"
  
  def initialize( order)
    super()
    self.item_id=0
    self.channel ="2"
    self.left_possition =nil
    self.top_possition =nil
    #!!!!!!!!!! calculate the order from the item??????
    self.order =order
    self.text=""
    self.stimulus_type="text"
    self.duration=1
    self.clear_screen=true
    self.not_erase_previous=false
    self.no_randomise=false
    self.present_in_line=0
    self.is_blank_interval=false
    self.synchronise_with_next=false
  end
  
  #types of the stimulus
  def type_is_text
    self.stimulus_type="text"
  end
  
  def type_is_bmp
    self.stimulus_type="bmp"
  end
  
  def type_is_jpg
    self.stimulus_type="jpg"
  end
  
  def type_is_wav
    self.stimulus_type="wav"
  end
  
  #sound channel
  def channel_is_left
    self.channel = 0
  end
  def channel_is_right
    self.channel = 1
  end
  def channel_is_both
    self.channel = 2
  end
  
  def create_from_json(json_ob)
    
    self.channel =json_ob["channel"]
    self.left_possition =json_ob["leftPosition"]
    self.top_possition =json_ob["topPosition"]
    self.text=json_ob["text"]
    self.stimulus_type=json_ob["type"]
    self.duration=json_ob["duration"]
    self.clear_screen=json_ob["clearScreen"]
    self.not_erase_previous=json_ob["notErasePrevious"]
    self.no_randomise=json_ob["noRandomise"]
    self.present_in_line=json_ob["presentInLine"]
    self.is_blank_interval=json_ob["isBlankInterval"]
    self.synchronise_with_next=json_ob["synchroniseWithNext"]

  end
  
  #convert the stimulus to string
  def to_s
    stimulusText=' "Stimulus'+self.order.to_s+'"'
    
    
    #add symbol "/" at the end of the stimulus or not
    if self.clear_screen
      stimulusText=stimulusText+" /"
    end
    stimulusText
  end
end


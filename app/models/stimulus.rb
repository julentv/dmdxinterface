class Stimulus < ActiveRecord::Base
  belongs_to :item
  attr_accessible :channel, :duration, :item_id, :left_possition, :order, :text, :top_possition, :type
  
  #validations
  validates_inclusion_of :type, :in => %w( text bmp jpg wav ), :message =>"The type must be text, bmp, jpg or wav"
  validates_inclusion_of :channel, :in => 0..2, :message =>"The channel must be between 0 and 2 (left, right, both)"
  
  def initialize(item_id, order)
    super()
    self.item_id =item_id
    self.channel ="2"
    self.left_possition =nil
    self.top_possition =nil
    #!!!!!!!!!! calculate the order from the item??????
    self.order =order
    self.text=""
    self.type="text"
    self.duration=1
  end
  
  #types of the stimulus
  def type_is_text
    self.type="text"
  end
  
  def type_is_bmp
    self.type="bmp"
  end
  
  def type_is_jpg
    self.type="jpg"
  end
  
  def type_is_wav
    self.type="wav"
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
  
  #convert the stimulus to string
  def to_s
    
  end
end

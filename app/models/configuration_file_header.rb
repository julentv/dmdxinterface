class ConfigurationFileHeader < ActiveRecord::Base
  belongs_to :configuration_file
  attr_accessible :continuous_running, :default_background_color, :default_font_size, :default_writing_color, :delay, :id_digital_vox, :id_keyboard, :id_mouse, :id_pio12, :id_record_vocal, :no_feed_back, :output_data_to_ascii, :record_clock_on_time_keyword, :standard_frame_duration, :time_out
  #attr_writer :continuous_running, :default_background_color, :default_font_size, :default_writing_color, :delay, :id_digital_vox, :id_keyboard, :id_mouse, :id_pio12, :id_record_vocal, :no_feed_back, :output_data_to_ascii, :record_clock_on_time_keyword, :standard_frame_duration, :time_out
  
  def initialize(configuration_file)
    super()
    self.configuration_file=configuration_file
    self.continuous_running=false
    self.default_background_color=255255255
    self.default_font_size=17
    self.default_writing_color=255255255
    self.delay=169
    self.no_feed_back=false
    self.output_data_to_ascii=false
    self.record_clock_on_time_keyword=false
    self.standard_frame_duration=17
    self.time_out=2500
    
    #response devices
    self.id_digital_vox=false
    self.id_keyboard=false
    self.id_mouse=false
    self.id_pio12=false
    self.id_record_vocal=false
  end
  
  #this method generates the string wich is the header of the configuration file
  def to_s
    @header_string=""
    
    if self.continuous_running == true
      @header_string=@header_string+"<cr>"
    end
    if self.output_data_to_ascii ==true
      @header_string=@header_string+" <azk>"
    end
    @header_string=@header_string+" <fd "+self.standard_frame_duration.to_s+">"
    @header_string=@header_string+" <d "+self.delay.to_s+">"
    @header_string=@header_string+" <t "+self.time_out.to_s+">"
    if self.no_feed_back
      @header_string=@header_string+" <nfb>"
    end
    @header_string=@header_string+" <dbc "+self.default_background_color.to_s+">"
    @header_string=@header_string+" <dwc "+self.default_writing_color.to_s+">"
    @header_string=@header_string+" <dfs "+self.default_font_size.to_s+">"
    
    if self.record_clock_on_time_keyword!=0
      @header_string=@header_string+" <rcot>"
    end
    if self.id_digital_vox == true
      @header_string=@header_string+" <id digitalVOX>"
    end
    if self.id_keyboard == true
      @header_string=@header_string+" <id keyboard>"
    end
    if self.id_mouse == true
      @header_string=@header_string+" <id mouse>"
    end
    if self.id_pio12 == true
      @header_string=@header_string+" <id PIO12>"
    end
    if self.id_record_vocal == true
      @header_string=@header_string+" <id RecordVocal>"
    end
    
    @header_string
  end
end

class ConfigurationFileHeader < ActiveRecord::Base
  belongs_to :configuration_file
  #attr_accessible :continuous_running, :default_background_color, :default_font_size, :default_writing_color, :delay, :id_digital_vox, :id_keyboard, :id_mouse, :id_pio12, :id_record_vocal, :no_feed_back, :output_data_to_ascii, :record_clock_on_time_keyword, :standard_frame_duration, :time_out
  attr_writer :continuous_running, :default_background_color, :default_font_size, :default_writing_color, :delay, :id_digital_vox, :id_keyboard, :id_mouse, :id_pio12, :id_record_vocal, :no_feed_back, :output_data_to_ascii, :record_clock_on_time_keyword, :standard_frame_duration, :time_out
  
  def initialize()
    @continuous_running=false
    @default_background_color=255255255
    @default_font_size=17
    @default_writing_color=255255255
    @delay=169
    @no_feed_back=false
    @output_data_to_ascii=false
    @record_clock_on_time_keyword=false
    @standard_frame_duration=17
    @time_out=2500
    
    #response devices
    @id_digital_vox=false
    @id_keyboard=false
    @id_mouse=false
    @id_pio12=false
    @id_record_vocal=false
  end
  
  #this method generates the string wich is the header of the configuration file
  def to_s
    @header_string=""
    
    if @continuous_running == true
      @header_string=@header_string+"<cr>"
    end
    if @output_data_to_ascii ==true
      @header_string=@header_string+" <azk>"
    end
    @header_string=@header_string+" <fd "+@standard_frame_duration.to_s+">"
    @header_string=@header_string+" <d "+@delay.to_s+">"
    @header_string=@header_string+" <t "+@time_out.to_s+">"
    if @no_feed_back
      @header_string=@header_string+" <nfb>"
    end
    @header_string=@header_string+" <dbc "+@default_background_color.to_s+">"
    @header_string=@header_string+" <dwc "+@default_writing_color.to_s+">"
    @header_string=@header_string+" <dfs "+@default_font_size.to_s+">"
    if @record_clock_on_time_keyword
      @header_string=@header_string+" <rcot>"
    end
    if @id_digital_vox == true
      @header_string=@header_string+" <id digitalVOX>"
    end
    if @id_keyboard == true
      @header_string=@header_string+" <id keyboard>"
    end
    if @id_mouse == true
      @header_string=@header_string+" <id mouse>"
    end
    if @id_pio12 == true
      @header_string=@header_string+" <id PIO12>"
    end
    if @id_record_vocal == true
      @header_string=@header_string+" <id RecordVocal>"
    end
    
    
    @header_string
  end
end

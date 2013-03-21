class ConfigurationFileHeader < ActiveRecord::Base
  belongs_to :configuration_file
  #attr_accessible :continuous_running, :default_background_color, :default_font_size, :default_writing_color, :delay, :no_feed_back, :output_data_to_ascii, :record_clock_on_time_keyword, :standard_frame_duration, :time_out
  attr_writer :continuous_running, :default_background_color, :default_font_size, :default_writing_color, :delay, :no_feed_back, :output_data_to_ascii, :record_clock_on_time_keyword, :standard_frame_duration, :time_out
  
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
    
    
    
    @header_string
  end
  
end

class HeaderController < ApplicationController
  def index
  end
  def file_creation
    #@conf_file = ConfigurationFile.new("file001")
    #@conf_file.create_file
    render 'index'
  end
  def header_creation
    @conf_file = ConfigurationFile.new(params[:file_name].to_s)
    
    #validations
    if params[:output_to_ascii].to_s == "true"
      @conf_file.configuration_file_header.output_data_to_ascii=true
    end
    if params[:continuous_running].to_s == "true"
      @conf_file.configuration_file_header.continuous_running=true
    end
    if params[:no_feed_back].to_s == "true"
      @conf_file.configuration_file_header.no_feed_back=true
    end
    if params[:record_clock].to_s == "true"
      @conf_file.configuration_file_header.record_clock_on_time_keyword=true
    end
    
    if params[:standard_frame_duration_text].to_s != ""
      @conf_file.configuration_file_header.standard_frame_duration = Integer(params[:standard_frame_duration_text].to_s)  
    end
    if params[:delay].to_s != ""
      @conf_file.configuration_file_header.delay = Integer(params[:delay].to_s)  
    end
    if params[:time_out].to_s != ""
      @conf_file.configuration_file_header.time_out = Integer(params[:time_out].to_s)  
    end
    if params[:default_background_color].to_s != ""
      @conf_file.configuration_file_header.default_background_color = Integer(params[:default_background_color].to_s)  
    end
    if params[:default_writing_color].to_s != ""
      @conf_file.configuration_file_header.default_writing_color = Integer(params[:default_writing_color].to_s)  
    end
    if params[:default_font_size].to_s != ""
      @conf_file.configuration_file_header.default_font_size = Integer(params[:default_font_size].to_s)  
    end
    
    
    @conf_file.create_file
    render 'success'
  end
end

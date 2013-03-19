class CreateConfigurationFileHeaders < ActiveRecord::Migration
  def change
    create_table :configuration_file_headers do |t|
      t.boolean :output_data_to_ascii
      t.boolean :continuous_running
      t.integer :standard_frame_duration
      t.integer :delay
      t.integer :time_out
      t.boolean :no_feed_back
      t.integer :default_background_color
      t.integer :default_writing_color
      t.integer :default_font_size
      t.integer :record_clock_on_time_keyword

      t.timestamps
    end
  end
end

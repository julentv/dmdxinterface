# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130326164144) do

  create_table "configuration_file_headers", :force => true do |t|
    t.boolean  "output_data_to_ascii"
    t.boolean  "continuous_running"
    t.integer  "standard_frame_duration"
    t.integer  "delay"
    t.integer  "time_out"
    t.boolean  "no_feed_back"
    t.integer  "default_background_color"
    t.integer  "default_writing_color"
    t.integer  "default_font_size"
    t.integer  "record_clock_on_time_keyword"
    t.boolean  "id_pio12"
    t.boolean  "id_keyboard"
    t.boolean  "id_mouse"
    t.boolean  "id_digital_vox"
    t.boolean  "id_record_vocal"
    t.integer  "configuration_file_id"
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  create_table "configuration_files", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "pruebas", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end

class CreateStimulus < ActiveRecord::Migration
  def change
    create_table :stimulus do |t|
      t.integer :item_id
      t.integer :order
      t.string :text
      t.string :type
      t.float :top_possition
      t.float :left_possition
      t.integer :channel
      t.integer :duration
      t.boolean :clear_screen
      t.boolean :not_erase_previous
      t.boolean :no_randomise
      t.integer :present_in_line
      t.boolean :is_blank_interval
      t.boolean :synchronise_with_next

      t.timestamps
    end
  end
end

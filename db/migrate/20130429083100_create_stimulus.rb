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

      t.timestamps
    end
  end
end

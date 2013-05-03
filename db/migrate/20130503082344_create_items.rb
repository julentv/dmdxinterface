class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :item_number
      t.string :expected_response
      t.integer :configuration_file_id
      t.integer :start_timer_before_stimulus

      t.timestamps
    end
  end
end

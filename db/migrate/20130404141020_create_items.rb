class CreateItems < ActiveRecord::Migration
  def change
    create_table :items, :primary_key => :item_number do |t|
      t.integer :item_number
      t.string :expected_response
      t.integer :configuration_file_id

      t.timestamps
    end
  end
end

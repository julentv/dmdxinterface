class CreateLoops < ActiveRecord::Migration
  def change
    create_table :loops do |t|
      t.integer :first_item
      t.integer :number_of_items
      t.integer :number_of_iterations
      t.integer :configuration_file_id

      t.timestamps
    end
  end
end

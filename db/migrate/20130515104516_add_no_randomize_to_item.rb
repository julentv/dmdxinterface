class AddNoRandomizeToItem < ActiveRecord::Migration
  def up
    add_column :items, :no_randomise, :boolean
  end
 
  def down
    remove_column :items, :no_randomise
  end
end

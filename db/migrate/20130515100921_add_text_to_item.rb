class AddTextToItem < ActiveRecord::Migration
  def up
    add_column :items, :text, :string
  end
 
  def down
    remove_column :items, :text
  end
end

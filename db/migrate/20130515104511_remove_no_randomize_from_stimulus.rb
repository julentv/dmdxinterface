class RemoveNoRandomizeFromStimulus < ActiveRecord::Migration
  def up
    remove_column :stimulus, :no_randomise
  end
 
  def down
    add_column :stimulus, :no_randomise, :boolean
  end
end

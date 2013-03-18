class CreateConfigurationFiles < ActiveRecord::Migration
  def change
    create_table :configuration_files do |t|
      t.string :name

      t.timestamps
    end
  end
end

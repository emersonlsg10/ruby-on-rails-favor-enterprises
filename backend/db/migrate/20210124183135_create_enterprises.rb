class CreateEnterprises < ActiveRecord::Migration[6.1]
  def change
    create_table :enterprises do |t|
      t.string :name
      t.boolean :is_like
      t.integer :id_enterprise

      t.timestamps
    end
  end
end

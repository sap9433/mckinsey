class CreateUserimage < ActiveRecord::Migration
	
  def change
    create_table :userimages do |t|
      t.string :url
      t.integer :meeting_id
      t.string :userdetails
      t.string :additional
    end
  end
end

class AddimageurlToMeeting < ActiveRecord::Migration
  def up
    add_column :meetings, :imageurl, :string
  end

  def down
    remove_column :meetings, :imageurl
  end
end

class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.string :uid
      t.string :name
      t.string :agenda
      t.string :desc
      t.date :timing

      t.timestamps
    end
  end
end

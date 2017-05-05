class RenameReportFields < ActiveRecord::Migration[5.0]
  def change
    rename_column :reports, :name, :title
    add_column :reports, :comments, :string
  end
end

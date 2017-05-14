class Report < ActiveRecord::Base

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

  # region validations
  validates_presence_of :title
  validates_presence_of :description
  validates_presence_of :comments
  validates_presence_of :geo_latitude
  validates_presence_of :geo_longitude
  validates_presence_of :author
  # endregion

  has_attached_file :picture, styles: {
      thumb: '100x100>',
      big: '1024x1024>'
  }

end

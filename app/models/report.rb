class Report < ActiveRecord::Base

  has_one :author, class_name: 'User'

  # region validations
  validates_presence_of :title
  validates_presence_of :description
  validates_presence_of :comments
  validates_presence_of :geo_latitude
  validates_presence_of :geo_longitude
  validates_presence_of :author
  # endregion

end

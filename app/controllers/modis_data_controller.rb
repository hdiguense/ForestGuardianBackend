class ModisDataController < ApplicationController
  require 'rgeo/geo_json'

  respond_to :json

  def fires
    @fires = FireDataPoint.all.each
  end

end

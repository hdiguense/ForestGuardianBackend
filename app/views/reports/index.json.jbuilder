json.array!(@reports) do |report|
  json.extract! report, :id, :name, :description, :geo_latitude, :geo_longitude, :author, :closed, :picture
  json.url report_url(report, format: :json)
end

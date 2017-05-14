json.array!(@reports) do |report|
  json.extract! report, :id, :title, :description, :geo_latitude, :geo_longitude, :author, :comments, :picture
  json.url report_url(report, format: :json)
end

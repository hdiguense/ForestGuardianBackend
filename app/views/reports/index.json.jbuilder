json.array!(@reportes) do |reporte|
  json.extract! reporte, :id, :name, :description, :geo_latitude, :geo_longitude, :author, :closed
  json.url report_url(reporte, format: :json)
end

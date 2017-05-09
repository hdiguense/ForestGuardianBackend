class SyncDailyDataJob < ActiveJob::Base

  require 'rgeo/shapefile'
  require 'zipruby'

  def download(url)
    uri = URI(url)
    zip =  Net::HTTP.get(uri)
    return zip
  end

  def unzip(buffer_data)
    Zip::Archive.open_buffer(buffer_data) do |zf|
      basename = "data/#{Time.now.getutc.to_i}"
      zf.each do |entry|
        extension = entry.name.split('.').last
        File.open( "#{basename}.#{extension}",'w:ASCII-8BIT') do |file|
          file.write( entry.read )
          puts "#{basename}.#{extension} written"
        end
      end
      puts "extracting ready."
      yield(basename)
    end
  end

  def readShapefile(shapefile)
    RGeo::Shapefile::Reader.open(shapefile) do |file|
      puts "File contains #{file.num_records} records."
      file.each do |record|
        puts "Record number #{record.index}:"
        puts "  Geometry: #{record.geometry.as_json}"
        puts "  Attributes: #{record.attributes.inspect}"
        createFireDataPointRecord record.attributes, record.geometry
      end
      file.rewind
      record = file.next
    end
  end

  def createFireDataPointRecord(attrs,geometry)
    d = attrs['ACQ_DATE']
    t = Time.parse("#{attrs['ACQ_TIME'][0,2]}:#{attrs['ACQ_TIME'][2,2]}")

    fireDataPoint = FireDataPoint.new
    fireDataPoint.brightness = attrs['BRIGHTNESS']
    fireDataPoint.scan = attrs['SCAN']
    fireDataPoint.track = attrs['TRACK']
    fireDataPoint.acq_datetime = DateTime.new(d.year, d.month, d.day, t.hour, t.min, t.sec)
    fireDataPoint.satellite = attrs['SATELLITE']
    fireDataPoint.confidence = attrs['CONFIDENCE']
    fireDataPoint.version = attrs['VERSION']
    fireDataPoint.bright_t31 = attrs['BRIGHT_T31']
    fireDataPoint.frp = attrs['FRP']
    fireDataPoint.daynight = attrs['DAYNIGHT']
    fireDataPoint.coordinates = geometry

    fireDataPoint.save!

  end

  def perform()
    zipfile = download "https://firms.modaps.eosdis.nasa.gov/active_fire/c6/shapes/zips/MODIS_C6_Central_America_24h.zip"

    puts "downloaded..."

    unzip zipfile do |basename|
      puts "unzipped and saved..."
      readShapefile basename
    end

    puts "done."

  end

end
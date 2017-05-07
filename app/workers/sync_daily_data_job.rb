class SyncDailyDataJob < ActiveJob::Base
  require 'rgeo/shapefile'

  def download(url)
    uri = URI(url)
    zip =  Net::HTTP.get(uri)
    return zip
  end

  def unzip(buffer_data)
    require 'zipruby'
    Zip::Archive.open_buffer(buffer_data) do |zf|
      basename = "#{Time.now.getutc.to_i}"
      zf.each do |entry|
        extension = entry.name.split('.').last
        File.open( "data/#{basename}.#{extension}",'w:ASCII-8BIT') do |file|
          file.write( entry.read )
          puts "#{basename}.#{extension} written"
        end
      end
      puts "extracting ready."
      yield(basename)
    end
  end

  def readShapefile(shapefile)
    require 'rgeo/shapefile'

    RGeo::Shapefile::Reader.open(shapefile) do |file|
      puts "File contains #{file.num_records} records."
      file.each do |record|
        puts "Record number #{record.index}:"
        puts "  Geometry: #{record.geometry.as_json}"
        puts "  Attributes: #{record.attributes.inspect}"
      end
      file.rewind
      record = file.next
      puts "First record geometry was: #{record.geometry.as_text}"
    end
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
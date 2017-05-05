require 'spec_helper'
require 'awesome_print'
require 'rspec_api_documentation/dsl'
require 'acceptance_helper'

resource 'Reports' do
  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'
  header 'X-User-Email', 'testing@forestguardian.org'
  header 'X-User-Token', '$2a$10$xYmT8cLUheIbK2sIynok7uxJFzDCOxQNppstXlMeCytB1gw/mkhC.'


  post '/reports' do
    parameter :title, 'Title of the report', scope: :report, 'Type': 'String'
    parameter :description, 'Description of the report', scope: :report, 'Type': 'String'
    parameter :comments, 'Comments about the route to the fire.', scope: :report, 'Type': 'String'
    parameter :geo_latitude, 'Latitude of the fire.', scope: :report, 'Type': 'Double'
    parameter :geo_longitude, 'Longitude of the fire.', scope: :report, 'Type': 'Double'

    response_field :id, 'Id of the new created report', scope: :report,'Type': 'Number'
    response_field :title, 'Title of the report', scope: :report,'Type': 'String'
    response_field :description, 'Description of the report', scope: :report,'Type': 'String'
    response_field :comments, 'Comments about the route to the fire.', scope: :report,'Type': 'String'
    response_field :created_at, 'Resource creation timestamp', scope: :report,'Type': 'String'
    response_field :updated_at, 'Resource last update timestamp', scope: :report,'Type': 'String'


    #request
    let(:title) { "ReportTitle##{SecureRandom.hex(6)}" }
    let(:description) { 'Please help!' }
    let(:comments) { 'Two blocks from the mango\'s tree, which is burning btw.' }
    let(:geo_latitude) { 0.1 }
    let(:geo_longitude) { 0.2 }

    let(:raw_post) { params.to_json }

    example_request 'Report created successfully with an HTTP 201' do

      expect(status).to eq(201)

    end
  end

end

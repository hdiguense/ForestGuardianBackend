require 'spec_helper'
require 'awesome_print'
require 'rspec_api_documentation/dsl'
require 'acceptance_helper'

resource 'Reports' do
  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'

  # Authentication Headers
  header 'uid', 'testing@forestguardian.org'
  header 'access-token', 'ssN4k-e8IkWJLKVO0s6mYw'
  header 'client', 'SH1JKv2Qd3znwS1ConW0ug'
  header 'expiry', '1495317861'
  header 'token-type', 'Bearer'


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

    User.create(email:'testing@forestguardian.org', password:'12341234', password_confirmation:'12341234',
                provider: 'email', uid: 'testing@forestguardian.org', sign_in_count: 0, tokens: {
            "SH1JKv2Qd3znwS1ConW0ug" => {
                "token" => "$2a$10$F2i8pKNl1DNB2/gU4kATguR5jqNYYFLvtrZ.wTetmNDj/aLeTU1fy",
                "expiry" => 1495314801,
                "last_token" => "$2a$10$yj41.PMVDNAc0j7UD.ZgUe8brvoXXJkn1j2vFSuJbtys7e.uesnmW",
                "updated_at" => "2017-05-06T15:13:21.160-06:00"
            }
        } )


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

require 'spec_helper'
require 'awesome_print'
require 'rspec_api_documentation/dsl'
require 'acceptance_helper'

resource 'Registrations' do
  header "Accept", "application/json"
  header "Content-Type", "application/json"

  post '/users' do
    parameter :email, 'Email of the new user', scope: :user, 'Type': 'String'
    parameter :password, 'Password of at least 8 characters', scope: :user, 'Type': 'String'
    parameter :password_confirmation,  'The same password again', scope: :user,'Type': 'String'

    response_field :id, 'Id of the new created user', scope: :user,'Type': 'Number'
    response_field :email, 'Email of the new user', scope: :user,'Type': 'String'
    response_field :created_at, 'Resource creation timestamp', scope: :user,'Type': 'String'
    response_field :updated_at, 'Resource last update timestamp', scope: :user,'Type': 'String'

    #request
    let(:email) { 'joe@forestguardian.org' }
    let(:password) { 'secret_pass' }
    let(:password_confirmation) { 'secret_pass' }

    let(:raw_post) { params.to_json }

    example_request 'Sign up succesfully with an HTTP 201' do

      #response
      user = JSON.parse(response_body)

      expect(status).to eq(201)
      expect(user.except('id','created_at','updated_at')).to eq({
        'email' => email,
      })

    end

    # example 'Sign up wrong with HTTP 422 when password_confirmation is wrong' do
    #   do_request
    #
    #   #request
    #   user = {
    #       email: 'joe@forestguardian.org',
    #       password: 'secret_pass',
    #       password_confirmation: 'bad_pass'
    #   }
    #   post '/users', user: user ,
    #        format: :json
    #
    #   #response
    #   expect(response).to have_http_status(422)
    #   parsed_response = JSON.parse(response.body)
    #   expect( parsed_response['errors']['password_confirmation'] ).to eq(['doesn\'t match Password'])
    # end

  end

end

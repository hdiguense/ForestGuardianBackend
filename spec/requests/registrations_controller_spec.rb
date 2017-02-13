require 'rails_helper'
require "awesome_print"

RSpec.describe 'User Registration', type: :request do

  describe 'Sign up' do
    it 'Sign up succesfully with an HTTP 201' do

      #request
      user = {
          email: 'joe@forestguardian.org',
          password: 'secret_pass',
          password_confirmation: 'secret_pass'
      }
      post '/users', user: user ,
           format: :json

      #response
      expect(response).to have_http_status(201)
      parsed_response = JSON.parse(response.body)
      expect( parsed_response['email'] ).to eq(user[:email])
      expect( parsed_response['id'] ).to be_a_kind_of(Fixnum)
    end

    it 'Sign up wrong with HTTP 422 when password_confirmation is wrong' do

      #request
      user = {
          email: 'joe@forestguardian.org',
          password: 'secret_pass',
          password_confirmation: 'bad_pass'
      }
      post '/users', user: user ,
           format: :json

      #response
      expect(response).to have_http_status(422)
      parsed_response = JSON.parse(response.body)
      expect( parsed_response['errors']['password_confirmation'] ).to eq(['doesn\'t match Password'])
    end

  end

end

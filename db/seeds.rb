# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email:'testing@forestguardian.org', password:'pojapoja', password_confirmation:'pojapoja',
  provider: 'email', uid: 'testing@forestguardian.org', sign_in_count: 0, tokens: {
        "ltGevLcdN17qHfeLB0bX6Q" => {
            "token" => "$2a$10$xYmT8cLUheIbK2sIynok7uxJFzDCOxQNppstXlMeCytB1gw/mkhC.",
            "expiry" => 1495176417,
            "last_token" => "$2a$10$15O9B0rsMDN0jTxA4eGv4es1VzIUYpMFJ7GMRweYxwi3B5GCVojga",
            "updated_at" => "2017-05-05T00:46:57.130-06:00"
        }
    }
)
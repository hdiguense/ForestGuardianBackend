source 'https://rubygems.org'


### CORE ###

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc


### FRONTEND - CORE ###

# Template engine (alternative to ERB)
gem 'haml-rails', '~> 0.9.0'

# Other template engine
gem 'slim'

# Bower
gem 'bower-rails'

### FRONTEND - JS ###

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Embed the V8 JavaScript interpreter into Ruby.
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier'


### FRONTEND - CSS ###

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'

gem 'less-rails' #Sprockets (what Rails 3.1 uses for its asset pipeline) supports LESS

gem 'twitter-bootstrap-rails'


### DATABASE ###

#Use of postgresql
gem 'pg'



### DEPLOYMENT ###

group :development do
  gem 'capistrano', '~> 3.1'
  gem 'capistrano-rails', '~> 1.1'
end

# Use Unicorn as the app server
gem 'unicorn'


### SECURITY ###

# User authentication
gem 'devise'

# User authorization
gem 'cancan'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'


### THIRD-PARTY ###

#Mapbox-Rails
gem 'mapbox-rails'


### TESTING ###

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
end




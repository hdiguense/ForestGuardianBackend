class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
# skip_before_filter :verify_authenticity_token, :only => :create
# protect_from_forgery
  include ApplicationHelper
  layout 'centered'
  protect_from_forgery with: :null_session, if: ->{request.format.json?}

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
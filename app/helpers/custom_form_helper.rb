module CustomFormHelper
  include ActionView::Helpers::TagHelper

  # pragma mark: Error helpers in forms
  # https://github.com/seyhunak/twitter-bootstrap-rails/blob/master/app/helpers/form_errors_helper.rb

  def error_view(resource, attribute, options = {})
    options[:span_class] ||= 'help-block'
    options[:error_class] ||= 'has-error'

    if errors_on?(resource,attribute)
      msg = errors_for(resource, attribute)
      render partial: 'users/shared/error_tag', locals: {message:msg}
    end
  end

  def errors_on?(object, attribute)
    object.errors[attribute].present? unless object.errors.nil?
  end

  def errors_for(object, attribute)
    object.errors[attribute].try(:join, ', ') || object.errors[attribute].try(:to_s)
  end
end

# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
  #form id
  console.log "new user events binded."
  $('#new_user').bind('ajax:success', (evt, data, status, xhr) ->
    #function called on status: 200 (for ex.)
    console.log 'success'
    alert = $('#login-alert')
    alert.text "Success"
    alert.toggleClass("alert-danger")
    alert.toggleClass("alert-success")
    alert.hidden = 'shown'
    return
  ).bind 'ajax:error', (evt, xhr, status, error) ->
    #function called on status: 401 or 500 (for ex.)
    console.log xhr.responseText
    console.log error
    alert = $('#login-alert')
    alert.text error
    alert.hidden = 'shown'
    debugger
    return
  return

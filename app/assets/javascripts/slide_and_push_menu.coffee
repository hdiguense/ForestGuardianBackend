###
# Welcome to the new js2coffee 2.0, now
# rewritten to use the esprima parser.
# try it out!
###

$(document).ready ->
  menuLeft = document.getElementById('cbp-spmenu-s1')
  menuRight = document.getElementById('cbp-spmenu-s2')
  menuTop = document.getElementById('cbp-spmenu-s3')
  menuBottom = document.getElementById('cbp-spmenu-s4')
  showLeft = document.getElementById('showLeft')
  showRight = document.getElementById('showRight')
  showTop = document.getElementById('showTop')
  showBottom = document.getElementById('showBottom')
  showLeftPush = document.getElementById('showLeftPush')
  showRightPush = document.getElementById('showRightPush')
  body = document.body

  disableOther = (button) ->
    if button != 'showLeft'
      classie.toggle showLeft, 'disabled'
    if button != 'showRight'
      classie.toggle showRight, 'disabled'
    if button != 'showTop'
      classie.toggle showTop, 'disabled'
    if button != 'showBottom'
      classie.toggle showBottom, 'disabled'
    if button != 'showLeftPush'
      classie.toggle showLeftPush, 'disabled'
    if button != 'showRightPush'
      classie.toggle showRightPush, 'disabled'
    return

  showLeft.onclick = ->
    classie.toggle this, 'active'
    classie.toggle menuLeft, 'cbp-spmenu-open'
    disableOther 'showLeft'
    return

  showRight.onclick = ->
    classie.toggle this, 'active'
    classie.toggle menuRight, 'cbp-spmenu-open'
    disableOther 'showRight'
    return

  showTop.onclick = ->
    classie.toggle this, 'active'
    classie.toggle menuTop, 'cbp-spmenu-open'
    disableOther 'showTop'
    return

  showBottom.onclick = ->
    classie.toggle this, 'active'
    classie.toggle menuBottom, 'cbp-spmenu-open'
    disableOther 'showBottom'
    return

  showLeftPush.onclick = ->
    classie.toggle this, 'active'
    classie.toggle body, 'cbp-spmenu-push-toright'
    classie.toggle menuLeft, 'cbp-spmenu-open'
    disableOther 'showLeftPush'
    return

  showRightPush.onclick = ->
    classie.toggle this, 'active'
    classie.toggle body, 'cbp-spmenu-push-toleft'
    classie.toggle menuRight, 'cbp-spmenu-open'
    disableOther 'showRightPush'
    return

  # ---
  # generated by js2coffee 2.2.0
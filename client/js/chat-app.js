(function(chat){
  "use strict";

  chat = chat || (window.chat = {});
  var userData = {};

  window.chat.init(function messageHandler(data) {
    // console.log(data.message);
    renderMessage(data.message, data.username);
  });

  $('#login').submit(function buttonHandler(event){
    event.preventDefault();
    // console.log('button works');
    var usernameInput = $('.username').val();
    $.ajax({
      type: 'POST',
      url: '/login',
      contentType: 'application/json',
      data: JSON.stringify({ username: usernameInput }),
      success: function handleUserData (data){
        userData.username = data.username;
        userData.token = data.token;
        // console.log(userData);
      }
    });
    switchToChat();
  });

  function switchToChat() {
    $('#login').remove();
    $('#chat').css('display', 'block');
    // console.log('switched Ids');
  }

  function renderMessage(message, username){
    $('#messages').append( $('<p>').text(message)
      .append( $('<cite>').text(username)));
    $('.message').val("");
  }

  $('#send-message').submit(function buttonHandler(event){
    event.preventDefault();
    // console.log('message button works');
    var messageInput = $('.message').val();
    $.ajax({
      type: 'POST',
      url: '/chat',
      contentType: 'application/json',
      data: JSON.stringify({ message: messageInput }),
      headers: {
        authorization: userData.token
      },
      success: function handleMessageData (){
        // console.log ('message success');
      }
    });
  });

})(window.chat);

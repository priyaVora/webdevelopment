document.getElementById("chat_send_button").addEventListener("click", send_message);
var questions = [
  'What\'s your name',
  'Where are you from?',
  'What\'s your age?',
  'What profile you are working on?',
  'It was nice talking to you :)'
];

function send_message_to_chat(class_name, id_name, photo_id) {
  var innerDiv = document.createElement('div');
  innerDiv.className = class_name;
  innerDiv.id = id_name;
  document.getElementById("chatlogs").appendChild(innerDiv);

  var userPhotoDiv = document.createElement('div');
  userPhotoDiv.className = photo_id;
  innerDiv.appendChild(userPhotoDiv);
  var client_message = document.getElementById('ans').value;

  var node = document.createElement("p");
  node.className = "chat-message";
  if (class_name == 'chat self') {
    var responseNode = document.createTextNode(client_message);
  } else {
    var responseNode = document.createTextNode(questions[0]);
  }
  node.appendChild(responseNode);

  innerDiv.appendChild(node);
  document.getElementById("chatlogs").appendChild(innerDiv);
}


function send_message() {
  client_message = document.getElementById('ans').value;
  if (client_message != null && client_message != "") {
    console.log("Client Side Message: " + client_message);

    send_message_to_chat('chat self', 'ans-show', 'user-photo');
    chat_bot_response();

    $(document).ready(function() {
      $('#chatlogs').animate({
        scrollTop: $('#chatlogs').get(0).scrollHeight
      }, 2000);

    });
  }
}

  function chat_bot_response() {
    var chat_reponse = questions[0];
    send_message_to_chat('chat friend', 'result', 'bot-photo');
    var objDiv = document.getElementById("chatlogs");
    objDiv.scrollTop = objDiv.scrollHeight;

    $('#chatlogs').scrollTop($('#chatlogs')[0].scrollHeight);
    console.log("NATASHA: " + questions[0]);
  }

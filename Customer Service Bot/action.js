document.getElementById("chat_send_button").addEventListener("click", send_message);
var questions = [
  'Hi, I am Natasha how can I help you, today',
  'Where are you from?',
  'What\'s your age?',
  'What profile you are working on?',
  'It was nice talking to you :)'
];

var help = [
  'I see that you have requested help...Here are some possible categories in which I can help you in.\n Would you want me to provide you with a list of options for you to select in which I can assist you in?',
  '1. Report damage products',
  '2. Report missing delivery item',
  '3. Need help in website direction',
  '4. Product Sugguestion',
  '5. Search products',
  '6. Get customer service info',
  '7. More Information on Nop-Commerce',
];
  var index = help.Count;

function valid_chatbot_helpresponse(user_response) {
  var chat_bot_response = "";

  if (user_response != null) {
    if (user_response == 1) {
      chat_bot_response = `To report damage products, go to the contact page and email us. You will need to provide your name, email and your report information.`;
    } else if (user_response == 2) {
      chat_bot_response = `To report any missing products, go to the contact page and email us. You will need to provide your name, email and your report information.`;
    } else if (user_response == 3) {
      chat_bot_response = `Print out different categories of things on website-- another menu...`;
    } else if (user_response == 4) {
      chat_bot_response = `What kinds of product are you looking for?`;
    } else {
      chat_bot_response = `Sorry, I didn't understand what you said. Can you repeat yourself?`;
    }
  } else {
    chat_bot_response = `Sorry, I didn't understand what you said. Can you repeat yourself?`;
  }
  return chat_bot_response;
}

function send_message_to_chat(client_message, class_name, id_name, photo_id) {
  client_message = $.trim(client_message);
  if (client_message != null) {
    if (class_name == 'chat friend' || class_name == 'chat self') {
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
        if (client_message == 'help' || client_message == 'HELP' || client_message == 'Help') {

          var i = 0;
            for(i= 0; i < 8;i++) {
              var responseNode = document.createTextNode(help[i] + " ");
              console.log(help[i]);
              if(i != 7) {
              var node = document.createElement("p");
              node.className = "chat-message";
              node.appendChild(responseNode);
              innerDiv.appendChild(node);
              document.getElementById("chatlogs").appendChild(innerDiv);
              }
            }
        } else {
          var responseNode = document.createTextNode(questions[0]);
        }
      }
      node.appendChild(responseNode);
      innerDiv.appendChild(node);
      document.getElementById("chatlogs").appendChild(innerDiv);
    }
  }
}


function send_message() {
  client_message = document.getElementById('ans').value;
  if (client_message == 'help' || client_message == 'HELP' || client_message == 'Help') {
    console.log("Client requested help from the bot.");
    send_message_to_chat(client_message, 'chat self', 'ans-show', 'user-photo');
    chat_bot_response(client_message);

  } else if (client_message != null && client_message != "") {
    console.log("Client Side Message: " + client_message);

    send_message_to_chat(client_message, 'chat self', 'ans-show', 'user-photo');
    chat_bot_response();

    $(document).ready(function() {
      $('#chatlogs').animate({
        scrollTop: $('#chatlogs').get(0).scrollHeight
      }, 2000);

    });
  }
}

function chat_bot_response() {
  client_message = document.getElementById('ans').value;
  var chat_reponse = questions[0];
  send_message_to_chat(client_message, 'chat friend', 'result', 'bot-photo');
  var objDiv = document.getElementById("chatlogs");
  objDiv.scrollTop = objDiv.scrollHeight;

  $('#chatlogs').scrollTop($('#chatlogs')[0].scrollHeight);
  console.log("NATASHA: " + questions[0]);
}

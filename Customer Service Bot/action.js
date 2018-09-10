document.getElementById("chat_send_button").addEventListener("click", send_message);
var questions = [
  'Hi, I am Natasha how can I help you, today',
  'Where are you from?',
  'What\'s your age?',
  'What profile you are working on?',
  'It was nice talking to you :)'
];

var product_language = [
  'computer',
  'deskstops',
  'notebooks',
  'software',
  'camera',
  'photo',
  'cell phones',
  'others',
  'apparel',
  'shoes',
  'clothes',
  'accesories',
  'digital download',
  'books',
  'accesories',
  'jewerly',
  'gift-cards'
  'table',
  'camera',
  'running shoes',
  'Running shoes',
  'Notebooks',
  'Software',
  'adobe photoshop cs4',
  'Windows',
  'Apple',
  'MacBook',
  'Sleekbook',
  'HP Spectre XT Pro UltraBook',
  '$25',
  '$100',
  'virtual',
  'elegant',
  'Gemstone',
  'Necklace',
  'Flower',
  'Girl',
  'Braclet',
  'Vintage',
  'Engagement',
  'Bracelet',
  'Science',
  'Pride and Prejudice',
  'First',
  'Nike',
  'apple',
  'HP',
  'hp'
];

var help = [
  'I see that you requested help',
  'Here is a list of categories that I can help you in: ',
  '(Enter number or the titles of any option for further assistance)',
  '1. Report damage products',
  '2. Report missing delivery item',
  '3. Need help in website direction',
  '4. Product Sugguestion',
  '5. Search products',
  '6. Get customer service info',
  '7. More Information on Nop-Commerce',
];



function valid_chatbot_helpresponse(user_response) {
  var chat_bot_response = "";
  if (user_response != null) {
    if (user_response == 1) {
      chat_bot_response = `To report damage products, go to contact page &  email us, where you will have to provide your name, email and your report information.`;
    } else if (user_response == 2) {
      chat_bot_response = `To report any missing products, go to the contact page and email us. You will need to provide your name, email and your report information.`;
    } else if (user_response == 3) {
      chat_bot_response = `There various categories of items you can select from on our page.   \n`;
      chat_bot_response += 'The main categories you can see on the page are Computer, Electronics, Apparel, Digital Download, Books, Jewerly, Gift Cards.For detailed list of categories just hoever over each categories throughout the website.';
    } else if (user_response == 4) {
      chat_bot_response = `What kinds of product are you looking for? Why don't you tell me more about it, and I am happy to help you!`;
    } else if (user_response == 5) {
      chat_bot_response = `To search Products write: FIND before your search input in this chat.`;
    } else if (user_response == 6) {
      chat_bot_response = `Customer Service can be reached by directing yourself to the footer of any page. Click on Contact US.There you will reach us electronically. We will ask you to provide us with your name,
       email and your report information. Sorry, for any inconvenience. `;
    } else if (user_response == 7) {
      chat_bot_response = `NopCommerce is our open-source E-commerce platoform that is based upon ASP\.net MVC & MS SQL Server backend database. Development of our nopCommerce website started around 2008
      by Andrei Mazulnitsyn, from Yaroslavi, Russia.Based on a report from December 2016, about 30,950 websites have utilized our website to expand their companies.`;
    } else {
      chat_bot_response = `I didn't understand what you said. Can you repeat yourself?`;
    }
  } else {
    chat_bot_response = `I apologize, but I didn't understand what you said. Can you repeat yourself?`;
  }
  return chat_bot_response;
}

function send_message_to_chat(client_message, class_name, id_name, photo_id) {
  client_message = $.trim(client_message);
  console.log(client_message);
  var valid = false;
  if (client_message != null) {
    responseNode = null;
    if (class_name == 'chat friend' || class_name == 'chat self') {
      valid = true;
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
        var i = 0;
        var responseNode = document.createTextNode(client_message);
      } else {
        if (client_message.includes('help') || client_message.includes('HELP') || client_message.includes('Help')) {
          help_menu_assistance(node, innerDiv);
        } else if (isFinite(String(client_message))) {
          console.log(client_message);

          if (client_message > 0 && client_message < 8) {
            var responseNode = document.createTextNode(valid_chatbot_helpresponse(client_message));
          } else {
            var responseNode = document.createTextNode("Sorry that is not one of the help menu selection.");
          }


        node.appendChild(responseNode);
        innerDiv.appendChild(node);
        document.getElementById("chatlogs").appendChild(innerDiv);
      } else if(client_message.includes("find") || client_message.includes("FIND")) {
            var responseNode = document.createTextNode("I don't understand what you are trying to find, can you try telling me again...?!");
            var i = 0;
            loop: for(i = 0; i < product_language.length; i++) {
                if(client_message.includes(product_language[i])) {
                  var responseNode = document.createTextNode('Sure I can direct you to the ' + product_language[i] + ' page. Give me one moment...');
                  break loop;
                }
            }
      } else if(client_message.includes("looking") || client_message.includes(Looking) || client_message.includes("finding") || client_message.includes("Finding")) {
            var responseNode = product_suggestion(client_message, responseNode, innerDiv);
      } else {
        var responseNode = document.createTextNode("Sorry can I help you with something, I did not understand...?");
        node.appendChild(responseNode);
        innerDiv.appendChild(node);
        document.getElementById("chatlogs").appendChild(innerDiv);
      }
    }
  }

function product_suggestion(client_message, responseNode, innerDiv) {
  client_message = client_message.replace("I am looking for", "");
  client_message = client_message.replace("I am trying to find","");
  var product-sugguest-mode = [
      'Okay, I see you are trying to find, ' + client_message
  ];

  responseNode = product_suggestion[0];
}

  if (responseNode != null) {
    node.appendChild(responseNode);
  }
  innerDiv.appendChild(node);
  document.getElementById("chatlogs").appendChild(innerDiv);
}
}

function help_menu_assistance(node, innerDiv) {
  var i = 0;
  for (i = 0; i < 11; i++) {

    var responseNode = document.createTextNode(help[i] + " ");
    if (i != 10) {
      if (i >= 2 && i <= 9) {
        node.appendChild(responseNode);
        node.appendChild(document.createElement("br"));
      } else {
        var node = document.createElement("p");
        node.className = "chat-message";
        node.appendChild(responseNode);
        innerDiv.appendChild(node);
        document.getElementById("chatlogs").appendChild(innerDiv);
      }
    }
  }
  scroll_chat();
}

function scroll_chat() {
  $(document).ready(function() {
    $('#chatlogs').animate({
      scrollTop: $('#chatlogs').get(0).scrollHeight
    }, 2000);
  });
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

    scroll_chat();
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

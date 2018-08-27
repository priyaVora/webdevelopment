document.getElementById("chat_send_button").addEventListener("click", send_message);
var questions = [
  'What\'s your name',
  'Where are you from?',
  'What\'s your age?',
  'What profile you are working on?',
  'It was nice talking to you :)'
];
function send_message() {
  var client_message = document.getElementById('ans').value;
  document.getElementById("demo").innerHTML = client_message;
  if (client_message != null && client_message != "") {
  console.log("Client Side Message: " + client_message);

  var innerDiv = document.createElement('div');
  innerDiv.className = 'chat self';
  innerDiv.id = "ans-show";
    document.getElementById("chatlogs").appendChild(innerDiv);

  var userPhotoDiv = document.createElement('div');
  userPhotoDiv.className = 'user-photo';
  innerDiv.appendChild(userPhotoDiv);

  var node = document.createElement("p");
  node.className = "chat-message";
  var responseNode = document.createTextNode(client_message);
  node.appendChild(responseNode);

  innerDiv.appendChild(node);
document.getElementById("chatlogs").appendChild(innerDiv);
  chat_bot_response();
    }
}

$(document).ready(function(){
  $('#chatlogs').animate({
  scrollTop: $('#chatlogs').get(0).scrollHeight}, 2000);
  open_chat_popup();
});

function chat_bot_response() {
  var chat_reponse = questions[0];

  var innerDiv = document.createElement('div');
  innerDiv.className = 'chat friend';
  innerDiv.id = "result";
    document.getElementById("chatlogs").appendChild(innerDiv);

  var userPhotoDiv = document.createElement('div');
  userPhotoDiv.className = 'user-photo';
  innerDiv.appendChild(userPhotoDiv);

  var node = document.createElement("p");
  node.className = "chat-message";
  var responseNode = document.createTextNode(questions[0]);
  node.appendChild(responseNode);

  innerDiv.appendChild(node);
  var objDiv = document.getElementById("chatlogs");
  objDiv.scrollTop = objDiv.scrollHeight;
document.getElementById("chatlogs").appendChild(innerDiv);
$('#chatlogs').scrollTop($('#chatlogs')[0].scrollHeight);
console.log("NATASHA: " + questions[0]);
}

function open_chat_popup() {
  let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
  width=0,height=0,left=-1000,top=-1000`;

  open('/', 'test', params);
}

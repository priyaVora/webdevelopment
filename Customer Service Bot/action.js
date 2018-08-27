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
  chat_bot_response();
    }
}

function chat_bot_response() {
  var chat_reponse = questions[0];
  var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';
document.getElementsByTagName('body')[0].appendChild(iDiv);

var innerDiv = document.createElement('div');
innerDiv.className = 'chat friend';
innerDiv.id = "result";

var userPhotoDiv = document.createElement('div');
userPhotoDiv.className = 'user-photo';
innerDiv.appendChild(userPhotoDiv);

var node = document.createElement("p");
var responseNode = document.createTextNode(questions[0]);
node.appendChild(responseNode);

innerDiv.appendChild(node);

iDiv.appendChild(innerDiv);
document.getElementsByTagName('body')[0].appendChild(iDiv);
console.log("NATASHA: " + questions[0]);
}

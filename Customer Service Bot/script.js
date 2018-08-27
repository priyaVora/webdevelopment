var questions = [
  'What\'s your name',
  'Where are you from?',
  'What\'s your age?',
  'What profile you are working on?',
  'It was nice talking to you :)'
];

var num = 0;
var output = document.querySelector("result");
output.innerHTML = questions[0];
var inputBox = document.querySelector("input");

function showResponse() {
  var input = inputBox.value;
  if(inputBox.value == "") {

  } else {
      if(num == 0) {
          output.innerHTML == 'hello $(input) nice meeting you'
          input == "";
          ++num;
          setTimeout(changeQuestion, 2000);
      } else if(num == 1) {
          output.innerHTML == '${input} is an awesome place';
          input == "";
          ++num;
          setTimeout(changeQuestion, 2000);
      } else if(num == 2) {
        output.innerHTML == 'It means you are born in $(2017 -input}';
        input == "";
        ++num;
        setTimeout(changeQuestion, 2000);
      } else if(num == 3) {
        output.innerHTML == '${input} is nice languagel';
        input == "";
        ++num;
        setTimeout(changeQuestion, 2000);
      }
  }
}

function changeQuestion() {
  output.innerHTML = questions[num];
  if(num == 4) {
    inputBox.style.display == "none";
  }
}

$(document).on('keypress', function(e) {l
  if(e.which == 13) {
      showResponse();
  }
}

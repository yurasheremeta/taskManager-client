let serverUrl = 'https://stormy-coast-97911.herokuapp.com/auth/';

$(document).ready(function(){
  $('#signupForm').submit(function(e){
    e.preventDefault();
    signup();

  });
});

function signup(){
  let user = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    username: $('#username').val(),
    password: $('#password').val(),
    email:$('#email').val()
  }

  $.ajax({
    url: serverUrl + 'signup',
    method: 'POST',
    data: JSON.stringify(user),
    contentType:'application/json',
    complete: function(data){
        $(location).attr('href' , 'login.html');
    //   if(data.status == 500){
    //     console.log('Error');
    //   }

    //   if(data.status == 201 ){
    //     $(location).attr('href' , 'home.html');
    //   }
    }
  })


}
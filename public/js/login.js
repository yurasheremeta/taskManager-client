
     $(document).ready(function(){
        $('#signinForm').submit(function(e){
          e.preventDefault();
          signin();
 
 
        });
 
 
      });
 
     function signin(){
       let loginData = {
         username: $('#username').val(),
         password: $('#password').val()
       };
 
       $.ajax({
         url:'https://stormy-coast-97911.herokuapp.com/auth/signin',
         method: 'POST',
         data: JSON.stringify(loginData),
         contentType: 'application/json',
         complete: function(data){
           if(data.status == 200){
             console.log(data);
             window.localStorage.setItem('auth_token' , data.responseJSON.token);
             window.localStorage.setItem('auth_role' , data.responseJSON.role);
 
             // if(data.responseJSON.role == "ROLE_ADMIN"){
             //   $(location).attr('href' , 'pages/admin/dashboard.html');
             // }
 
             if(data.responseJSON.role == "ROLE_USER"){
               $(location).attr('href' , 'index.html');
             }
           //  $(location).attr('href' , 'index.html');
           }
         }
       })
     }
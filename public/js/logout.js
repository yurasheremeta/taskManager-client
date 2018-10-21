
	$(document).ready(function() {
        $('#logout').on('click',function(){
            logout();
          });

    });
function logout(){
    window.localStorage.removeItem('auth_token' );
        window.localStorage.removeItem('auth_role' );
        $(location).attr('href' , 'login.html')

  }
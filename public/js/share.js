
$(document).ready(function() {

    $(document).on('click', '#send', function (e) {
     
        share();
    });
   

});


function share(){
    let email= $('#email').val();
    console.log("email: " + email);
    $.ajax({
        url:'https://stormy-coast-97911.herokuapp.com/test-message?email='+email,
        method: 'GET',
        complete: function(result){
            alert("Your email sent");
        }
      })
}


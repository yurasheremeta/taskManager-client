let token = window.localStorage.getItem('auth_token');
let role = window.localStorage.getItem('auth_role');

	$(document).ready(function() {
    if(token){
      $.ajaxSetup({
             headers:{
               'Authorization': 'Bearer ' + token
             }
           })

addNews();



}else{
  console.log('Token not found');

}
	});


function addNews(){
    $('#taskForm').submit(function(e){
      e.preventDefault();
      console.log("fafaffa");
      let name = $('#taskName').val();
      let description = $('#description').val();
      let date = $('#date').val();
      let user = $('#user').val();

console.log('FAFAFAFAFAF');

      let task  ={
        name: name,
        description: description,
        date: date,
        user: {
          id: user
        }

      };
console.log(";;;;;;;;;");
      $.ajax({
        url: 'https://stormy-coast-97911.herokuapp.com/tasks',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(task),
        complete: function(data){
         console.log(data);
        //  $('addCategoryForm')[0].reset();
        $('#taskForm').trigger('reset');
        // getCategory();

        }
      })
  })

  }
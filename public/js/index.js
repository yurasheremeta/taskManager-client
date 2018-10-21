
var timestamp = Number(new Date());
localStorage.setItem("mytimestamp", timestamp);
var date = localStorage.getItem("mytimestamp");
var jsDate = new Date(Number(date));
jsDate = [
   jsDate.getFullYear(),
   jsDate.getMonth()+1,
   jsDate.getDate(),

];
let token = window.localStorage.getItem('auth_token');
let role = window.localStorage.getItem('auth_role');
	$(document).ready(function() {
    if(token){
      $.ajaxSetup({
             headers:{
               'Authorization': 'Bearer ' + token
             }
           })

    getTasks();
    $(document).on('click', '#taskTable button.delete', function (e) {
        console.log(e.target.id);
        let elementId = e.target.id;
        let taskId = elementId.split('-')[1];
        console.log(taskId);
        
        let deleteItem = confirm("Do you want to delete task?");
        if(deleteItem){
            deleteTask(taskId);
        }
    });
    $(document).on('click', '#taskTable button.share', function (e) {
        // console.log(e.target.id);
        // let elementId = e.target.id;
        // let taskId = elementId.split('-')[1];
        // console.log(taskId);
        
        // let deleteItem = confirm("Do you want to delete task?");
        // if(deleteItem){
        //     deleteTask(taskId);
        // }
        $(location).attr('href' , 'share.html');
    });



}else{
  console.log('Token no found');
  $(location).attr('href' , 'register.html');

}
	});

function getTasks(){
    $.ajax({
      url: 'https://stormy-coast-97911.herokuapp.com/tasks',
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      success: function(response){
        console.log(response);
        $.each(response, function(key , value){
          $('#taskTable').append(
            ` 
            <div class="card">
            <div class="card-body">
              <h5 class="card-title">${value.name}</h5>
              <p class="card-text">${value.description}</p>
            </div>
            <div class="card-footer">
            <p class ="text-left">
                <small class="text-muted">${jsDate}</small>
            </p>
            <p class ="text-right">
            <small class="text-muted">${value.user.username}</small>
        </p>
        <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button id="task-${value.id}" class="btn btn-danger btn-xs delete" data-title="Delete"  ><span class="glyphicon glyphicon-trash"></span>Delete</button></p></td>
        <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button id="task-share" class="btn btn-succes btn-xs share" data-title="Share"  ><span class="glyphicon glyphicon-trash"></span>Share</button></p></td>

                </div>
          </div>
            `
          );
        });
      }
    })
  }
  function deleteTask(taskId) {
    console.log('delete: '+taskId);
$.ajax({
    url: 'https://stormy-coast-97911.herokuapp.com/tasks/delete/'+ taskId,
    type: 'DELETE',
    success: function(result) {
        $('#taskTable').empty();
        getTasks();
    }
});
}
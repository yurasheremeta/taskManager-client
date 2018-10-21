let token = window.localStorage.getItem('auth_token');
let role = window.localStorage.getItem('auth_role');
var timestamp = Number(new Date());
localStorage.setItem("mytimestamp", timestamp);
var date = localStorage.getItem("mytimestamp");
var jsDate = new Date(Number(date));
jsDate = [
   jsDate.getFullYear(),
   jsDate.getMonth()+1,
   jsDate.getDate(),

];

	$(document).ready(function() {
    if(token){
      $.ajaxSetup({
             headers:{
               'Authorization': 'Bearer ' + token
             }
           })
           $(document).on('click', '#taskForm button.update', function (e) {
            console.log(e.target.id);
           // let elementId = e.target.id;
            let taskId = $("#task").val();
            console.log(taskId);
            
            let deleteItem = confirm("Do you want to update task?");
            if(deleteItem){
                updateTask(taskId);
            }
        });

updateTask();



}else{
  console.log('Token not found');

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
    
                    </div>
              </div>
                `
              );
            });
          }
        })
      }

      function updateTask(){
        $('#taskForm').submit(function(e){
          e.preventDefault();
          console.log("fafaffa");
          let id = $('#task').val();
          let name = $('#taskName').val();
          let description = $('#description').val();
          let date = $('#date').val();
          let user = $('#user').val();
    
    console.log('FAFAFAFAFAF');
    
          let task  ={
            id:id,
            name: name,
            description: description,
            date: date,
            user: {
              id: user
            }
    
          };
    console.log(";;;;;;;;;");
          $.ajax({
            url: 'https://stormy-coast-97911.herokuapp.com/tasks/update/'+id,
            method: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(task),
            complete: function(data){
             console.log(data);
            //  $('addCategoryForm')[0].reset();
            $('taskForm').trigger('reset');
            // getCategory();
                getTasks();
            }
          })
      })
    
      }
    
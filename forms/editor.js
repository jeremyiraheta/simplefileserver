$(document).ready(function(){
    var modal = $('.modal');
    var instance = M.Modal.init(modal, undefined);
    var editor = M.Modal.getInstance(modal);
    $(".edit").on("click", function(event){
      var title = $("#modal_title");
      var contentid = $("#modal_content");
      var id = event.currentTarget.id;
      var name = event.currentTarget.name;
      $.ajax({
          url: "/open?id=" + id,
          data: {            
          },
          success: function( result ) {
            title.html(name);
            contentid.html(result);
            editor.open();
          }
        });
        $("#save").one("click", function(event){                                   
          $.ajax({
            type: "PUT",
            url: "/edit?id=" + id,
            data: {
              content: contentid.val()            
            },
            success: function( result ) {
              alert("Guardado");
            }
          });
        });
        
        
    });      
  });
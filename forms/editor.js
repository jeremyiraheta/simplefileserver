$(document).ready(function(){
    var modal = $('#modale');
    var instance = M.Modal.init(modal, {
        dismissible: true,
        opacity: 0.7,
        inDuration: 300,
        outDuration: 300
    });
    var editor = M.Modal.getInstance(modal[0]);
    
    $("#save").on("click", function(event){                                   
        var contentid = $("#modal_content");
        var id = $(this).data('id');
        
        if (!id) {
            M.toast({html: 'Error: No file ID', classes: 'red'});
            return;
        }
        
        $.ajax({
            type: "PUT",
            url: "/edit?id=" + id,
            data: {
                content: contentid.val()            
            },
            success: function( result ) {
                M.toast({html: 'File saved successfully!', classes: 'green'});
                setTimeout(function() { location.reload(); }, 1000);
            },
            error: function( err ) {
                M.toast({html: 'Error saving file', classes: 'red'});
            }
        });
    });
});

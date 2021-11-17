$(function() {
  
  var api = "https://www.googleapis.com/books/v1/volumes?q=";

  $("#submit").click(function() {
    var titleSrc = $(".titleSrc").val();
    
    if (titleSrc == "") {
        alert("Please enter a title");
    } else {
      $.get(api + titleSrc, function(response) {
        console.log(response);

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;

          console.log(title);

//					$.each(title, function(names){
//						
//					});
          $(".title").append("Title: " + title + "<br>");
        } // end of for loop

      }); // end of get function
    }
    
  }) // end of onclick function
});


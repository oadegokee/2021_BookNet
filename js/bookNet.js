$(function() {
  
  var api = "https://www.googleapis.com/books/v1/volumes?q=";

  $("#submit").click(function() {
    var titleSrc = $(".titleSrc").val();
    var authorSrc = $(".authorSrc").val();
    var isbnSrc = $(".isbnSrc").val();
    
    if ((titleSrc == "") && (authorSrc == "") && (isbnSrc == "")) {
        alert("Please enter a title, author, or ISBN");
    } else {
      $.get(api + titleSrc, function(response) {
        console.log(response);

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;

          console.log(title);

          $(".title").append("Title: " + title + "<br>author: " + author + "<br><br>");
        } // end of for loop

      }); // end of get function
			
    }
    
  }) // end of onclick function
});


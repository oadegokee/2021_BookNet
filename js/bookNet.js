$(function() {
  
  var titleApi = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
  var authorApi = "https://www.googleapis.com/books/v1/volumes?q=inauthor:";
  var isbnApi = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

  $("#submit").click(function() {
    var titleSrc = $(".titleSrc").val();
    var authorSrc = $(".authorSrc").val();
    var isbnSrc = $(".isbnSrc").val();
    
    if ((titleSrc == "") && (authorSrc == "") && (isbnSrc == "")) {
        alert("Please enter a title, author, or ISBN");
    } else if (titleSrc != "") {
      $.get(titleApi + titleSrc, function(response) {
        console.log(response);
				$(".title").html("");

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;

          console.log(title);

          $(".title").append("Title: " + title + "<br>Author: " + author + "<br><br>");
          
        } // end of for loop

      }); // end of get function
    } else if (authorSrc != "") {
      // // Search by author
      $.get(authorApi + authorSrc, function(response) {
        console.log(response);
				$(".title").html("");

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;
					

          console.log(author);

          $(".title").append("Title: " + title + "<br>Author: " + author + "<br><br>");
          
        } // end of for loop

      }); // end of get function
			
    }  else if (isbnSrc != "") {
      // Search by isbn
      $.get(isbnApi + authorSrc + isbnSrc, function(response) {
        console.log(response);
        $(".title").html("");

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;
          isbn = response.items[i].volumeInfo.industryIdentifiers[1].identifier;

          console.log(author);
          console.log(isbn);

          $(".title").append("Title: " + title + "<br>Author: " + author + "<br>ISBN:" + isbn + "<br><br>");
          
        } // end of for loop

      }); // end of get function
			
    } else if (authorSrc != "" && titleSrc != "") {
      // api for both author and title
      titleAndAuthorApi = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + titleSrc + "+inauthor:" + authorSrc;
      // getting books by title.
      $.get(titleAndAuthorApi, function(response) {
        console.log(response);
				$(".title").html("");

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;

          console.log(title);

          $(".title").append("Title: " + title + "<br>Author: " + author + "<br><br>");
          
        } // end of for loop

      }); // end of get function

    }
    
  }) // end of onclick function
});


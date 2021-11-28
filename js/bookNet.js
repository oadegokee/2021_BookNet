$(function() {
  
  var titleApi = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
  var authorApi = "https://www.googleapis.com/books/v1/volumes?q=inauthor:";
  var isbnApi = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
  var genreName = $('#genreName');

  $("#submit").click(function() {
    var titleSrc = $(".titleSrc").val();
    var authorSrc = $(".authorSrc").val();
    var isbnSrc = $(".isbnSrc").val();
    genreName.css({
         display: 'none'
    });
    
    if ((titleSrc == "") && (authorSrc == "") && (isbnSrc == "")) {
        alert("Please enter a title, author, or ISBN");
    } else if (titleSrc != "") {
      displayBookInfo(titleApi + titleSrc);

    } else if (authorSrc != "") {
       // Search by author
      displayBookInfo(authorApi + authorSrc);
      
    }  else if (isbnSrc != "") {
      // Search by isbn
      displayBookInfo(isbnApi + authorSrc + isbnSrc);
			
    } else if (authorSrc != "" && titleSrc != "") {
      // api for both author and title
      // does not work yet
      titleAndAuthorApi = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + titleSrc + "+inauthor:" + authorSrc;
    
      displayBookInfo(titleAndAuthorApi);
    }
    
  }) // end of onclick function

  
  // Genres
  var genreNames = [".adult", ".anthologies", ".art", ".audioBooks", ".biographies", ".body", ".business", ".children", ".comics", ".contemporary", ".cooking", ".crime", ".engineering", ".entertainment", ".fantasy", ".fiction", ".food", ".general", ".health", ".history", ".horror", ".investing", ".literary", ".literature", ".manga", ".memoirs", ".mind", ".mystery", ".nonFiction", ".religion", ".romance", ".science", ".self", ".spirituality", ".sports", ".superheroes", ".technology", ".thrillers", ".travel", ".women", ".young"];
  
   
  jQuery.each( genreNames, function( i, val ) {
   click(val);
  });
  
  $("#more").click(function() {
    
    $("#dialogBox").show();
    $(".bookInfo").css({
      top: '-842px'
    });
  });
  
  $("#close").click(function() {
    $("#dialogBox").hide();
    
    $(".bookInfo").css({
      top: '-250px'
    });
  });
  
  // set up click events
  function click(genre) {
     $(genre).click(function() {
       var api = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genre;
       var genreTitle = genre.substring(1, genre.length);
       var genreToUppercase = genreTitle.toUpperCase();
       
       genreName.empty();
       
       genreName.append(genreToUppercase);
       genreName.css({
         display: 'inline'
       });

      displayGenreBookInfo(api);
       
     });
  }
  
  // Display the books info
  function displayBookInfo(api) {
    
    $.get(api, function(response) {
      console.log(response);
				$("#title").html("");

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;
          isbn = response.items[i].volumeInfo.industryIdentifiers[1].identifier;

          console.log(title);
					
					// Checks to see if author is missing
					if (!author) {
				author = "Anonymous";
			}

          $("#title").append("Title: " + title + "<br>Author: " + author + "<br>ISBN: " + isbn + "<br><br>");
					$(author).not("undefined");
          
        } // end of for loop
			
			

      }); // end of get function
  }
  
  // Display the books info based on genre
  function displayGenreBookInfo(api) {
    
    $.get(api, function(response) {
      console.log(response);
				$("#title").html("");

        for(i=0; i<response.items.length; i++) {
          title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;

          console.log(title);
					
					// Checks to see if author is missing
					if (!author) {
				author = "Anonymous";
			}

          $("#title").append("Title: " + title + "<br>Author: " + author + "<br><br>");
          
        } // end of for loop

      }); // end of get function
  }
});


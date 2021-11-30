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
    
    newIsbnSrc = isbnSrc.replace(/-/g, "");
    
    if ((titleSrc == "") && (authorSrc == "") && (isbnSrc == "")) {
        alert("Please enter a title, author, or ISBN");
    } else if (authorSrc != "" && titleSrc != "") {
      // api for both author and title
      // does not work yet
      titleAndAuthorApi = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + titleSrc + "+inauthor:" + authorSrc;

      console.log(titleAndAuthorApi);
      displayBookInfo(titleAndAuthorApi);
    } else if (titleSrc != "" ) {
      displayBookInfo(titleApi + titleSrc);

    } else if (authorSrc != "") {
       // Search by author
      displayBookInfo(authorApi + authorSrc);
      
    }  else if (isbnSrc != "") {
      // Search by isbn
      displayBookInfo(isbnApi + authorSrc + newIsbnSrc);
			
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
       if (genre == ".nonFiction") {
         genreToUppercase = "NON-FICTION";
       }
       
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
					desc = response.items[i].volumeInfo.description;
          if (response.items[i].volumeInfo.hasOwnProperty('industryIdentifiers')) {
            isbnArray = response.items[i].volumeInfo.industryIdentifiers.length;
            if (isbnArray < 2){
             isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
             isbn2 = "No ISBN";
            } else {
              isbn = response.items[i].volumeInfo.industryIdentifiers[0].identifier;
              isbn2 = response.items[i].volumeInfo.industryIdentifiers[1].identifier;
            }
          } else {
            isbn = "No ISBN"; 
            isbn2 = "No ISBN";
          }
					
					// Checks to see if anything is missing
					if (!title) {
						title = "No title given";
					}
					
					if (!author) {
				author = "Anonymous";
			}
					
					if (!desc) {
						desc = "No description included";
					}
					
					// Does not work
					if (!isbn) {
						isbn = "No ISBN";
					} 

          $("#title").append("Title: " + title + "<br>Author: " + author + "<br>Description: " + desc.split(" ", 10).join(" ") + "..<br>ISBN_10: " + isbn + " " + "<br>ISBN_13: "+ isbn2 + "<br><br>");
          
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
					desc = response.items[i].volumeInfo.description;
					
					// Checks to see if anything is missing
					if (!title) {
						title = "No title given";
					}
					
					if (!author) {
				author = "Anonymous";
			}
					
					if (!desc) {
						desc = "No description included";
					}
					
          $("#title").append("Title: " + title + "<br>Author: " + author + "<br>Description: " + desc.split(" ", 10).join(" ") + "..<br><br>");
          
        } // end of for loop

      }); // end of get function
  }
});


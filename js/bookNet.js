$(function() {
  
	// variables
  var genreName = $('#genreName');
	var startIndex = (0);
	
	// Displays random books without any search
  var randomBooksApi = "https://www.googleapis.com/books/v1/volumes?q=" + randomBooks() + "&maxResults=40";
  displayBookInfo(randomBooksApi);
	
	// Go back to the home page when the user clicks on the logo
	$('#websiteTitle').click(function() {
		window.location.reload();
	});
	

	// submission
	($(".titleSrc").keypress(function (e) {
		if (e.which == 13) {
			submit();
		}
	}));
	($(".authorSrc").keypress(function (e) {
		if (e.which == 13) {
			submit();
		}
	}));
	
	($(".isbnSrc").keypress(function (e) {
		if (e.which == 13) {
			submit();
		}
	}));
	
	$("#submit").click(function() {
		submit();
	});
	
	// submit action
	function submit() {
		
    var titleSrc = $(".titleSrc").val();
    var authorSrc = $(".authorSrc").val();
    var isbnSrc = $(".isbnSrc").val();
    genreName.css({
         display: 'none'
    });
    
    newIsbnSrc = isbnSrc.replace(/-/g, "");
    
    if ((titleSrc == "") && (authorSrc == "") && (isbnSrc == "")) {
        alert("Please enter a title, author, or ISBN");
		
		} else {
			
		  if (authorSrc != "" && titleSrc != "") {
				// api for both author and title
				titleAndAuthorApi = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + titleSrc + "+inauthor:" + authorSrc + "&maxResults=30";
				
				displayBookInfo(titleAndAuthorApi);
				displayMoreBooks(titleAndAuthorApi, startIndex);

			
			} else if (titleSrc != "" ) {
				var titleApi = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + titleSrc + "&maxResults=30";
				
				displayBookInfo(titleApi);
				displayMoreBooks(titleApi, startIndex);
				
			} else if (authorSrc != "") {
				var authorApi = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + authorSrc + "&maxResults=30";
				displayBookInfo(authorApi);
				displayMoreBooks(authorApi, startIndex);
				
			}  else if (isbnSrc != "") {
				var isbnApi = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + newIsbnSrc + "&maxResults=30";
				displayBookInfo(isbnApi);
			}  
			
			// Show the next page button
			$(".nextBtn").css("display", "inline");
		}
		
} // end of submit function

  
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
  
  
  // mouse over
$("#more").hover(function() {
  $("#moreGenres").show();
}, function() {
  $("#moreGenres").hide();
  $(".bookInfo").css({
    top: '-250px'
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
			 
       var api = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genre + "&maxResults=30";
       var genreTitle = genre.substring(1, genre.length);
       var genreToUppercase = genreTitle.toUpperCase();
       if (genre == ".nonFiction") {
         genreToUppercase = "NON-FICTION";
       }
       
			 // Show the next page button
			 $(".nextBtn").css("display", "inline");
			 
       genreName.empty();
       
       genreName.append(genreToUppercase);
       genreName.css({
         display: 'inline'
       });

       displayBookInfo(api);
			 
			 displayMoreBooks(api, startIndex);

			 
     });
  }
  
  // Display the books info
  function displayBookInfo(api) {
    
    $.get(api, function(response) {
      console.log(response);
			$(".booksContainer").html("");
			
			
			if (response.totalItems == 0) {
				alert("Please enter a valid title, author, or ISBN");
			} else {

				for(i=0; i<response.items.length; i++) {
					title = response.items[i].volumeInfo.title;
					author = response.items[i].volumeInfo.authors;
					desc = response.items[i].volumeInfo.description;

					if (response.items[i].volumeInfo.hasOwnProperty('imageLinks')) {
						imageLink = response.items[i].volumeInfo.imageLinks.thumbnail;
						newLink = imageLink.replace("http://", "https://");
					} else {
						newLink = "images/ImageNotAvailable.png";
					}
					
					var booksContainer = $(".booksContainer");
					var image = new Image();
					
					image.src = newLink;
					

					if (response.items[i].volumeInfo.hasOwnProperty('industryIdentifiers')) {
						isbnArray = response.items[i].volumeInfo.industryIdentifiers.length;
						if (isbnArray < 2) {
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

					if (!isbn) {
						isbn = "No ISBN";
					} 
					
					var bookDiv = $("<div class=\"book\"></div>");

					var bookContentDiv = $("<div class=\"bookContent\"></div>");
					bookContentDiv.append(image);
					
					var innerDiv =  $("<div></div>");
					
					innerDiv.append("<p id=\"title\">Title: " + title + "</p>");
					innerDiv.append("<p id=\"author\">Author: " + author + "</p>");
					innerDiv.append("<p id=\"description\">Description: " + desc.split(" ", 10).join(" ") + "...</h3>");
					innerDiv.append("<p id=\"isbn10\">ISBN_10: " + isbn + "</p>");
					innerDiv.append("<p id=\"isbn13\">ISBN_13: " + isbn2 + "</p>");
					
					bookContentDiv.append(innerDiv);
					bookDiv.append(bookContentDiv);
					
					booksContainer.append(bookDiv);


					$(".titleSrc").val("");
					$(".authorSrc").val("");
					$(".isbnSrc").val("");
					
				} // end of for loop
		
			}
			
		}); // end of get function
		
	}
	
	// Function to display more books
  function displayMoreBooks(api, startIndex) {
    
    // Next page
    $(".nextBtn").click(function() {
      
      startIndex = startIndex + 10;
      newApi = api + "&startIndex=" + (startIndex);

      displayBookInfo(newApi);
      
      console.log(newApi);

    }); // end of next page button
    
  }
	
	// Function to return random letters
  function randomBooks() {
    var array = "abcdefghijklmnopqrstuvwxyz".split("");
    var randomLetter = array[(Math.random() * array.length) | 0];
    
    return randomLetter;
  } 
  
});


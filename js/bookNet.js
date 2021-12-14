$(function() {
  
	// variables
  var genreName = $('#genreName');
	var startIndex = (0);
	var nextDiv = $(".nextDiv");
	var nextPageButton = "";
	var backPageButton = "";
	
	// Displays random books without any search
  var randomBooksApi = "https://www.googleapis.com/books/v1/volumes?q=" + randomBooks() + "&maxResults=40";
	sorting(randomBooksApi);
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
		
		} else if (((/^[a-zA-Z0-9]*$/.test(titleSrc) == false)) || ((/^[a-zA-Z0-9]*$/.test(authorSrc) == false)) || ((/^[a-zA-Z0-9]*$/.test(isbnSrc) == false))) {
			alert("Please enter a title, author, or ISBN");
			
		} else {
			
		  if (authorSrc != "" && titleSrc != "") {
				// api for both author and title
				titleAndAuthorApi = "https://www.googleapis.com/books/v1/volumes?q=+intitle:" + titleSrc + "+inauthor:" + authorSrc + "&maxResults=30";
				
				nextDiv.empty();
				backPageButton = $("<button class=\"backBtn\">Back Page |</button>");
				nextPageButton = $("<button class=\"nextBtn\">Next Page</button>");
				
				nextDiv.append(nextPageButton);
				nextDiv.append(backPageButton);
				
				
				displayBookInfo(titleAndAuthorApi);
				displayMoreBooks(titleAndAuthorApi, startIndex, nextPageButton);
				sorting(titleAndAuthorApi);

			
			} else if (titleSrc != "" ) {

				var titleApi = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + titleSrc + "&maxResults=30";
				
				nextDiv.empty();
				backPageButton = $("<button class=\"backBtn\">Back Page |</button>");
				nextPageButton = $("<button class=\"nextBtn\">Next Page</button>");
				
				nextDiv.append(nextPageButton);
				nextDiv.append(backPageButton);
				
				
				displayBookInfo(titleApi);
				displayMoreBooks(titleApi, startIndex, nextPageButton);
				sorting(titleApi);
				
			} else if (authorSrc != "") {
				var authorApi = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + authorSrc + "&maxResults=30";
				
				nextDiv.empty();
				backPageButton = $("<button class=\"backBtn\">Back Page |</button>");
				nextPageButton = $("<button class=\"nextBtn\">Next Page</button>");
				
				nextDiv.append(nextPageButton);
				nextDiv.append(backPageButton);
				
				displayBookInfo(authorApi);
				displayMoreBooks(authorApi, startIndex, nextPageButton);
				sorting(authorApi);
				
			}  else if (isbnSrc != "") {
				var isbnApi = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + newIsbnSrc + "&maxResults=30";
				
				nextDiv.empty();
				
				displayBookInfo(isbnApi);
			}  
			
		}
		
} // end of submit function
	
	// Sorting button
	function sorting(api) {
		$(".newest").click(function() {
			newApi = api + "&orderBy=newest";
			$(".newest").html("Newest ✓");
			$(".relevance").html("Relevance");
			
			displayBookInfo(newApi);
			console.log(newApi);
		})
		
		$(".relevance").click(function() {
			newApi = api + "&orderBy=relevance";
			$(".newest").html("Newest");
			$(".relevance").html("Relevance ✓");
			
			displayBookInfo(newApi);
			console.log(newApi);
		})
		
	}

  
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
  
  
  // mouse over more button
$("#more").hover(function() {
  $("#dialogBox").show();
}, function() {
 //$("#dialogBox").hide();
  $(".bookInfo").css({
    top: '-250px'
  });
});

// hide dialogBox if user mouse leaves dialogBox
$("#dialogBox").hover(function() {
    $("#dialogBox").show();
}, function() {
  $("#dialogBox").hide();
});

  // close button on dialog box
  $("#close").click(function() {
    $("#dialogBox").hide();
    
    $(".bookInfo").css({
      top: '-250px'
    });
  });
	
	$("#closeButton").click(function() {
    $(".bookPopUp").css({
			display: "none"
		});
		
		$("#blur").css({
			filter: "blur(0)"
		});
  });
  
  // set up click events
  function click(genre) {
     $(genre).click(function() {
			 // hide dialog box after genre is clicked
       $('#dialogBox').hide();

       var api = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genre + "&maxResults=30";
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
			 
			 nextDiv.empty();
			 backPageButton = $("<button class=\"backBtn\">Back Page |</button>");
			 nextPageButton = $("<button class=\"nextBtn\">Next Page</button>");
				
			 nextDiv.append(nextPageButton);
			 nextDiv.append(backPageButton);

       displayBookInfo(api);
			 
			 displayMoreBooks(api, startIndex, nextPageButton);
	 
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
					genre = response.items[i].volumeInfo.categories;
					info = response.items[i].volumeInfo.infoLink;

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
					
					if (!genre) {
						genre = "No genre included";
					}

					if (!desc) {
						desc = "No description included";
					}

					if (!isbn) {
						isbn = "No ISBN";
					}
		
					// Display
					var bookDiv = $("<div class=\"book\"></div>");

					var bookContentDiv = $("<div class=\"bookContent\"></div>");
					bookContentDiv.append(image);
					
					var innerDiv =  $("<div></div>");
					
					innerDiv.append("<p id=\"title\">Title: " + title + "</p>");
					innerDiv.append("<p id=\"author\">Author(s): " + author + "</p>");
					innerDiv.append("<p id=\"genre\">Genre: " + genre + "</p>");
					innerDiv.append("<p id=\"isbn10\">ISBN_10: " + isbn + "</p>");
					innerDiv.append("<p id=\"isbn13\">ISBN_13: " + isbn2 + "</p>");
					
					var descDiv = $("<div class=\"description\" style=\"display: none\" ></div>");
					
					descDiv.append("<h3 id=\"infoLabel\">Read More: </h3>");
					descDiv.append("<a id=\"infoLink\" href=\"" + info + "\" target=\"_blank\">Google Books</a>");
					descDiv.append("<p id=\"descLabel\">Book Description</h3>");
					descDiv.append("<p id=\"desc\">" + desc + "</h3>");
					
					
					bookContentDiv.append(innerDiv);
					bookContentDiv.append(descDiv);
					bookDiv.append(bookContentDiv);
					
					booksContainer.append(bookDiv);
					
					
					bookContentDiv.each(function() {
						$(this).click(function() {
							
							$("#blur").css({
								filter: "blur(8px)"
							});
							
							var bookPopUp = $(".bookPopUp");
							var innerPopUp = $(".innerPopUp");
							
							innerPopUp.empty();
							
							var bookDetails = $(this).html();
							var descDiv = $(this).find(".description");
							
							var description = descDiv.find("p");
							var infoLink = descDiv.find("a");
							var infoLabel = descDiv.find("h3");
							
							innerPopUp.append(bookDetails);
							innerPopUp.append(infoLabel);
							innerPopUp.append(infoLink);
							innerPopUp.append(description);
							
							bookImage = innerPopUp.find("img");
							basicContent = innerPopUp.find("div");
							
							bookPopUp.css({
								display: "block",
							});
							
							bookImage.css({
								width: "180px"
							});
							
							basicContent.css({
								fontSize: '20px',
								float: "right",
								position: "relative",
								top: "-10px",
								width: "250px"
							});
							
						});
						
					});
				
				} // end of for loop

			}
			
		} // end of get function
		
	)};
	
	// Function to display more books
  function displayMoreBooks(api, startIndex, nextPageButton) {
		
		$.get(api, function(response) {
    
    // Next page
    $(nextPageButton).click(function() {
      startIndex = startIndex + 30;
			
      if (startIndex >= response.totalItems) {
					alert("You are on the last page");
					startIndex = startIndex - 30;
					} else {
						newApi = api + "&startIndex=" + (startIndex);

      		displayBookInfo(newApi);
      
      		console.log(newApi);
					}

    }); // end of next page button
		
		// Back page
    $(backPageButton).click(function() {
      startIndex = startIndex - 30;
			
      if (startIndex < 0) {
						alert("You are on the first page");
						startIndex = startIndex + 30;
					} else {
						newApi = api + "&startIndex=" + (startIndex);

      		displayBookInfo(newApi);
      
      		console.log(newApi);
					}

    }); // end of back page button
			
	}) // end of $ get
		
  }
	
	
	// Function to return random letters
  function randomBooks() {
    var array = "abcdefghijklmnopqrstuvwxyz".split("");
    var randomLetter = array[(Math.random() * array.length) | 0];
    
    return randomLetter;
  } 
  
});


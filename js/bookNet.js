$(function() {
  
  var api = "https://www.googleapis.com/books/v1/volumes?q=" + $(titleSrc);

	var titleSrc = document.querySelector('.titleSrc').textContent;
	var authorSrc = document.querySelector(".authorSrc").textContent;
	var isbnSrc = document.querySelector(".isbnSrc").textContent;

	var titleTxt = document.querySelector(".title").textContent;
	var authorTxt = document.querySelector(".author").textContent;
    
    
  $("#submit").click(function() {
    
    fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
			title = data.items[0].volumeInfo.title;
			console.log(title);
      
			$(titleTxt).text("Title: " + title);
      
    })
  })
});


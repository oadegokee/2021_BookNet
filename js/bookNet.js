$(function() {
  
  var api = "https://www.googleapis.com/books/v1/volumes?q=java";
  
  $("#submit").click(function() {
    
    fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      
    })
  })
});


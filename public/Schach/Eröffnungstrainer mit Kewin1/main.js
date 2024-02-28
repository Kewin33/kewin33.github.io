async function lichessChallengeDatas() {
    // get challenge game id
    var url = "https://lichess.org/api/challenge";
    var options = {
      headers: { Authorization: "Bearer lip_JlQj6wv4t4lTRAE5r8UZ" }
    };
  
    try {
      // Use fetch for making HTTP requests in JavaScript with async/await
      var response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      var data = await response.json();
      console.log(data.in);
      // You can do further processing with the 'data.in' here
      
  
    } catch (error) {
      console.error("Error:", error);
    }
  }

  
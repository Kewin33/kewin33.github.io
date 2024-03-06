async function getLichessLink() {
    var url = "https://www.google.com";
  
    try {
      // Use the fetch API to make the request
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Read the response text
      const responseBody = await response.text();
      
      // Log the response
      console.log(responseBody);
  
      // Use regular expression to extract content
      const pattern = /<div id="root">(.*?)<\/div>/gs;
      const matches = responseBody.match(pattern);
  
      // Log the matches
      console.log(matches);
    } catch (error) {
      console.error('There was an error with the fetch operation:', error);
    }
  }
  
  // Call the function
  //getLichessLink();
  
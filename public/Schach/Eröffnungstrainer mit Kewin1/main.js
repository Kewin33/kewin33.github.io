
//-------------------------------submitting the form--------------------------------------------------//
//-------------------------------firstMove GAS--------------------------------------------------//

document.getElementById("form").addEventListener("submit", async function (e){
    e.preventDefault()
    //document.getElementById("submit").style.display="none"
    console.log("clicked")
    var formData=new FormData(this)
    var keyValuePairs=[]
    for (var pair of formData.entries()) {  
        keyValuePairs.push(`${pair[0]}="${pair[1]}"`) 
    }
    var formDataString=keyValuePairs.join("&")
    console.log({keyValuePairs})
    console.log(formDataString)

    

    console.log("new Game")
    const url = "https://script.google.com/macros/s/AKfycbyIGCJYDgNzzwHnWSblBout8LfYNrwJiUSu_S2LhUl9XRu360s-25bj96O_WB8sdAA/exec"


    try {
      const response = await fetch(url, {
        method: "POST",
        redirect: "follow",
        body: formDataString,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      console.log(response)
      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.json(); // Assuming your script returns JSON response
        console.log(responseData);

        sessionStorage.setItem( "data", JSON.stringify(responseData.data))
        console.log(typeof(sessionStorage.getItem('data')))
        console.log(JSON.parse(sessionStorage.getItem('data')).username)
      } else {
        throw new Error("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      console.log(error)
      

      // Handle the error as needed
    }
    googleAPI()
})


//-------------------------------keeping the game alive--------------------------------------------------//

     /*
      * Uses google Api to check if is on turn, endless loop until site is left(need to be configured)
      * Trigger is the submit button on HTML
      * 
      * @link - https://lichess.org/api#tag/Bot/operation/botGameMove
      * 
      * @param{string} gameid - lichess gameid (included in lichessStatus())
      * @param{string} move - move in UCI format
      * 
      * @return {void}
      * 
      * @throws {Error} - 
      */  
  async function googleAPI() {
    // get challenge game id
    //setTimeout(()=>console.log("Trying to fetch google get API"),10_000)
    let username=JSON.parse(sessionStorage.getItem("data")).username.replace(/"/g,"");
    var url = "https://script.google.com/macros/s/AKfycbyIGCJYDgNzzwHnWSblBout8LfYNrwJiUSu_S2LhUl9XRu360s-25bj96O_WB8sdAA/exec?username="+username;
  
    try {
      console.log("fetching..."+url)
      // Use fetch for making HTTP requests in JavaScript with async/await
      var response = await fetch(url,{
        method: "GET"
        }
      );
      var data = await response.json();
      console.log(data);
      //server says whether game is over(-1), sth happened 0, retake(own API, 1) or new move (Own API,2), or new chat(Own API,3) (0,1,2)
      switch(data.status){
        case -1:
            break;
        case 0: 
            googleAPI();
            break;
        case 1:
            lichessAcceptRetake()  //Dont forget to implement @param gameid
            googleAPI();
            break
        case 2:
            console.log("lichessmove")
            lichessMove()          //Dont forget to implement @param gameid, old settings(session storage)
            googleAPI();
            break
        case 3: 
            lichessChat()          //Dont forget to implement @param message
            googleAPI();
            break 
        default: alert("Something went wrong");
      } 
      
    } catch (error) {
        console.error('Error:', error);
        console.log(error)
      alert("Sth is wrong: "+error)
    }
  }
async function lichessMove(){
    console.log("lichesss move")
    const url = "https://script.google.com/macros/s/AKfycbyIGCJYDgNzzwHnWSblBout8LfYNrwJiUSu_S2LhUl9XRu360s-25bj96O_WB8sdAA/exec"


    try {
      const response = await fetch(url, {
        method: "POST",
        redirect: "follow",
        body: sessionStorage.getItem("data"),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      console.log(response)
      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.json(); // Assuming your script returns JSON response
        console.log(responseData);
      } else {
        throw new Error("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      console.log("haha+" +error)
      // Handle the error as needed
    }
}


  // showing optional advanced settings or not
var advanced=document.getElementById("advancedOptions")
var radio=document.getElementsByName("presettings")
var checkbox=document.getElementById("custom")
radio.forEach(a=>a.addEventListener("change",()=>{
    advanced.style.display = checkbox.checked ? "block" : "none"
}))
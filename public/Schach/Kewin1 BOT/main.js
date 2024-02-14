function test(){
    
        setInterval(function(){console.log("Hello World")},2000);
}

var btn=document.getElementById( "Play" );
btn.addEventListener('click',function() {
	main();
});

async function main(){
    try{
        acceptChallenge();
    } catch(e){
        console.log(e)
    }
    finally{
        
        

        try {
            data= await getFEN();
            while(data[1].nowPlaying[0]!==null){
                if (data[1].nowPlaying[0].isMyTurn==true){
                    var gameId=data[1].nowPlaying[0].fullId;
                        var url = "https://lichess.org/api/bot/game/"+gameId+"/move/"+engineAnalysis();
                        var options = {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer lip_JlQj6wv4t4lTRAE5r8UZ",
                        },
                        muteHttpExceptions: true,
                        };
                    
                        try {
                        var response = await fetch(url, options);
                        var responseData = await response.json();
                        console.log(responseData);
                        } catch (error) {
                            console.error("Error:", error);
                        }
                    }       
            }
            data= await getFEN();
        } catch (error) {
            console.error("Fehler:", error);
        }
    }
}

async function acceptChallenge() {
    var challengeUrl = "https://lichess.org/api/challenge";
    var options = {
      method: "GET",
      headers: {
        Authorization: "Bearer lip_JlQj6wv4t4lTRAE5r8UZ",
      },
    };
  
    try {
      // Hole die Challenge-Daten
      var response = await fetch(challengeUrl, options);
      var data = await response.json();
      var challengeId = data.in[0].id;
  
      // Akzeptiere die Challenge
      var acceptUrl = `https://lichess.org/api/challenge/${challengeId}/accept`;
      var acceptOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer lip_JlQj6wv4t4lTRAE5r8UZ",
        },
      };
  
      var acceptResponse = await fetch(acceptUrl, acceptOptions);
      var acceptData = await acceptResponse.json();
  
      console.log(acceptData);
    } catch (error) {
      span=document.createElement('span');
      document.body.appendChild(span).textContent='Fehler: '+error
      console.error("Error:", error);
    }
  }

  async function getFEN() {
    var url = 'https://lichess.org/api/account/playing';
    var options = {
      headers: {
        Authorization: 'Bearer lip_JlQj6wv4t4lTRAE5r8UZ',
      },
    };
  
    try {
      var response = await fetch(url, options);
      var data = await response.json();
      var fen = data.nowPlaying[0].fen;
      return [fen, data];
    } catch (error) {
      // Bei einem Fehler die Funktion rekursiv aufrufen
      console.log('Keine Partie gefunden. Versuche es nochmal...');
      return getFEN();
    }
  }

  


function movePiece() {
    
    getFEN(78);
    sendChat("hallo Goblin");
    while(gamedata.nowPlaying[0]!==null){
    getFEN();
      if (gamedata.nowPlaying[0].isMyTurn==true){
        var gameid=gamedata.nowPlaying[0].fullId;

          var url="https://lichess.org/api/bot/game/"+gameid+"/move/"+engineAnalysis();
          var options={
            headers:{Authorization:"Bearer lip_JlQj6wv4t4lTRAE5r8UZ"},
            method:"post",
            muteHttpExceptions:true}
          var response=UrlFetchApp.fetch(url,options);
          Logger.log(response);
      };
    }
  }
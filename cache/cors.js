//--------------------screenshot with url fetch app???-----//

const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { match } = require('assert');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// get data from url
app.get('/getLichessLink', async (req, res) => {

  let url = req.query.url
  console.log(req.query.url)
  console.log(url)
  if(!url) throw Error("no url :(")
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL and wait for JavaScript to execute
    await page.click("body")
    await page.setJavaScriptEnabled(true);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get the rendered HTML content
    
    const screenshotBuffer = await page.screenshot();//perhaps click is easier
    console.log(await page.url())
    const responseBody = await page.content();

    // Close the browser
    await browser.close();

    // Log the response
    //console.log(responseBody);

    // Use regular expression to extract content



    //console.log(matches[0].match(/<a href=(.*?)target=/gs));

    // Send the response back to the client
    res.send({responseBody}); //responseBody,
    //res.contentType('image/png');
    //res.end(screenshotBuffer, 'binary');

   
  } catch (error) {
    console.error('There was an error with the fetch operation:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get('/getGoogleSearch', async (req, res) => {

  let vorname = req.query.vorname
  let nachname = req.query.nachname
  console.log(vorname+" "+nachname)
  
  try {
    let result= await getGoogleSearch(nachname,vorname)
    console.log("yes"+result)
    res.send({"haha":result}); //responseBody,
    //res.contentType('image/png');
    //res.end(screenshotBuffer, 'binary');

   
  } catch (error) {
    console.error('There was an error with the fetch operation:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


function idk(){
   

    let name="Stela Moldovan"
    let text=' 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path></svg></div></div></div><div class=" p-0 card-body"><table class="m-0 table table-sm table-hover"><tbody><tr class="d-flex"><td class="d-none d-md-block col-1 pl-4">1</td><td class="col-4 pl-md-4 pl-2">Stela Moldovan (1291)</td><td class="col-md-2 col-3 text-center"><div class="round-player-color round-player-black"></div><a href="https://lichess.org/o9NPUlev" target="_blank" class="center-parent gameButton btn btn-outline-secondary btn-sm">0 - 1</a><div class="round-player-color round-player-white"></div></td><td class="col-5 pl-3 d-flex justify-content-between"><span>Nils Samuel Müller (1922)</span></td></tr></tbody></table></div></div><div class="card" style="overflow: visible;"><div class="match-finished card-header" style="'
    let matches = text.match(/<tr class="d-flex">(.*?)<\/tr>/gs);//whole block, look whther contains name, 
    console.log(matches)
    matches=matches.filter(data=>data.includes(name))[0].split(/(<\/div><a href=| target=\"_blank\")/g)
    console.log(matches)

    let lichessUrl=matches[2]
    let color;
    const isBlack = (str) => str.includes("black");
    color = matches[0].includes(name) ? (isBlack(matches[0]) ? "black" : "white") : (isBlack(matches[4]) ? "black" : "white");
    console.log(lichessUrl)
    console.log(color)
    // td(d-flex).filter(includes name).split(href).split(blank)
    //[0].contains name black/white, else [2]contains black/white
    //extract[1] url
    /*
   
    console.log("1. "+ matches)
    let color
    if(matches.includes('<td class="col-4 pl-md-4 pl-2">'+name)){
        color="white"
    }
    matches=matches.map(data=>data.match(/<a href=(.*?)target=\"_blank\"/gs))
    console.log(matches)
    matches=matches[0][0]
    console.log(matches)
    matches=matches.replace(/<a href=/g,"")
    matches=matches.replace(/target=\"_blank\"/gs,"")
    console.log(matches)//matches is the url of the game
    */
}
//idk()

function test(){
     //checkURL url.contains.split.limit.add(round1)
    let url = ["https://turniere.schachklub-kelheim.de/kk-3/round/1", "https://turniere.schachklub-kelheim.de/dsj-u12-gruend", "https://turniere.schachklub-kelheim.de/DSTC-2022-WK-III", "https://turniere.schachklub-kelheim.de/DSTC-2021-WK-IV/round/7", "https://turniere.schachklub-kelheim.de/DSTC-2022-WK-III/einzel", "https://turniere.schachklub-kelheim.de/dsj-u12-gruend/einzel", "https://turniere.schachklub-kelheim.de/dsj-u12-gruend/teilnehmer", "https://turniere.schachklub-kelheim.de/DSTC-2021-WK-IV/teilnehmer", "https://koenigskinder-hohentuebingen.de/2021/02/dsj-gruendungsturnier-u12/", "https://koenigskinder-hohentuebingen.de/2022/03/deutscher-schulteam-cup-kepi-gewinnt-bronze/"];
    url=url.filter(link=>link.includes("schachklub-kelheim.de"))
    url=url.map(link=>link.split(/(\/)/).slice(0,7).join("")+"/round/1")
    console.log(url)
}
//test()


async function extra(){
  teamid="schachgemeinschaft-vaihingenrohr"
  let url="https://lichess.org/api/team/"+teamid+"/users"
  try{
    let response=await fetch(url)
    response=await response.text()
    //let data=JSON.parse(response)
    //console.log(response)
    let idk=response.split('\n')
    idk=idk.slice(0,idk.length-1)
    //console.log(idk.length)
    let res=[]
    idk=idk.map(e=>JSON.parse(e))
    console.log(idk)
    //console.log(idk)
    idk=idk.map(member=>member.id)
    console.log(idk+""+idk.length)

  //data.forEach(d=>Logger.log(d.id))
  }catch (error){
    if(error=="Exception: Request failed for https://lichess.org returned code 401"){
      console.log("team private :(")
      return -1
    }else{
      console.log("sth went wrong"+error)
    }
  }
  
}
//extra()





async function getGoogleSearch(nachname, vorname) {
  var url = `https://www.google.de/search?q=site%3A+%22turniere.schachklub-kelheim.de%22+%22${vorname}%20${nachname}%22`;
  console.log(url);

  try {
    const response = await fetch(url);
    const text = await response.text();
    console.log(text)
    // Use regular expression to extract links
    var pattern = new RegExp('<div class="egMi0 kCrYT"><a href=(.*?)sa=U&amp', "g");
    var match = text.match(pattern)
    console.log(match)
    var link=[]
    for(i=0;i<match.length;i++){
      cache=match[i].replace('<div class="egMi0 kCrYT"><a href="/url?q=',"").replace("&amp;sa=U&amp","");
      link.push(cache);
    }
  
    console.log(link);
    return link;


  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
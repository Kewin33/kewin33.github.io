const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/getLichessLink', async (req, res) => {
  const url = "https://turniere.schachklub-kelheim.de/kk-3/round/1";

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL and wait for JavaScript to execute
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Get the rendered HTML content
    await page.setJavaScriptEnabled(true);
    const screenshotBuffer = await page.screenshot();

    const responseBody = await page.content();

    // Close the browser
    await browser.close();

    // Log the response
    //console.log(responseBody);

    // Use regular expression to extract content
    const pattern1 = /<tbody>(.*?)<\/tbody>/gs; //whole block, look whther contains name, 
    let matches = responseBody.match(pattern1);
    matches=matches.filter(data=>data.includes("Stela Moldovan"))

    matches=matches.map(data=>data.match(/<a href=(.*?)target=\"_blank\"/gs))



    // Log the matches
    console.log(matches)
    //console.log(matches[0].match(/<a href=(.*?)target=/gs));

    // Send the response back to the client
    res.send({  matches }); //responseBody,
    //res.contentType('image/png');
    //res.end(screenshotBuffer, 'binary');

   
  } catch (error) {
    console.error('There was an error with the fetch operation:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


app.get('/getLichessScreenshot', async (req, res) => {
  const url = "https://turniere.schachklub-kelheim.de/kk-3/round/1";

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the URL and wait for JavaScript to execute
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Take a screenshot
    const screenshotBuffer = await page.screenshot();

    // Close the browser
    await browser.close();

    // Send the screenshot back to the client
    res.contentType('image/png');
    res.end(screenshotBuffer, 'binary');
  } catch (error) {
    console.error('There was an error with the screenshot operation:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

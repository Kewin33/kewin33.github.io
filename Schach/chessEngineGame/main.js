document.getElementById("form").addEventListener("submit", async function (e){
    e.preventDefault();

    let url="https://webscrape-test.onrender.com/chessEngineGame?fen="+document.getElementById("fen").value+"&depth="+document.getElementById("depth").value
    console.log(url)
    response=await fetch(url)
    if(!response.ok) {
        response="ServerError"
    }else{
        response=await response.text()
    }
    

    let div = document.getElementById("pgn")
    document.getElementsByTagName('h3')[0].style.display="inline-block"
    div.innerHTML = response
    div.style.padding = '7px';
    div.style.margin = '7px';
    document.body.appendChild(div);

    let btn=document.createElement('button')
    btn.textContent='Copy to clipboard'
    btn.style.float='right'

    btn.addEventListener('click',()=>{
        var textToCopy = document.getElementById('pgn').innerText;

        // Create a new <textarea> element
        var textarea = document.createElement('textarea');

        // Set the value of the <textarea> to the text you want to copy
        textarea.value = textToCopy;

        // Append the <textarea> element to the document body
        document.body.appendChild(textarea);

        // Select the text in the <textarea>
        textarea.select();

        // Execute the copy command
        document.execCommand('copy');

        // Remove the <textarea> element from the document body
        document.body.removeChild(textarea);

        // Provide feedback to the user (optional)
        alert('Text copied to clipboard: ' + textToCopy);
    })
    div.appendChild(btn)


    
    //chessbase board a little trash
/*
    div = document.createElement('div');
    div.classList = 'cbreplay';
    //div.style.width = '400px';
    //div.style.display = "flex";
    //div.style.justifyContent = "center";
    div.innerHTML =response;
    document.body.appendChild(div);

    let scriptElement = document.createElement('script');
    scriptElement.src = 'https://pgn.chessbase.com/jquery-3.0.0.min.js';
    document.body.appendChild(scriptElement);

    scriptElement = document.createElement('script');
    scriptElement.src = 'https://pgn.chessbase.com/cbreplay.js';
    scriptElement.type='text/javascript'
    document.body.appendChild(scriptElement);

*/

/*
    let board=Chessboard('board',{
        showNotation: true,
        draggable:true,
        position:'start',
        pieceTheme: 'https://chessboardjs.com/img/chesspieces/alpha/{piece}.png'
    }) 

    
    
    let game=new  Chess();
    game.load_pgn(response);
    board.position(game.fen());
    div.appendChild(board);
    div.style.display = "flex";
    div.style.justifyContent = "center";
    document.body.appendChild(div);  
    */

    

})


const result = document.querySelector(`#result`);
const submit = document.querySelector(`#submit`);

submit.addEventListener(`click`, ()=>{
    let inpWord = document.querySelector(`#inpWord`).value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`)
    .then((response) => 
        response.json()
    )
    .then((data) =>{
        console.log(data);
        const word = inpWord;
        const definition = data[0].meanings[0].definitions[0].definition;
        const pronunciation = data[0].phonetics[1].text;
        const audioUrl = data[0].phonetics[0].audio;
        

        result.innerHTML = `
            <h1>${word}</h1>
            <p>${pronunciation} <i class="fa-solid fa-volume-high" id="sound" onclick="playSound('${audioUrl}')"></i></p>
            <br>
            <hr>
            <br>
            <h4>Definition:</h4>
            <p>${definition}</p>
            
        `;

        result.style.cssText = `display: block`;
    })
    .catch((error) => {
        console.error(error);
        result.innerHTML = `<p>Word can't be found</p>`;
        result.style.cssText = `display: block`;
    });
});

function playSound(audioUrl){
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
    } else {
        alert("Audio not available.");
    }
}

const apiKey = "jpUCpKbQ26mqgxyJSj8H8DqP5egSZrbK";
const urlSearch = "https://api.giphy.com/v1/gifs/search";
const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resultDiv = document.getElementById('main');

button.addEventListener('click', ()=> {
    const valorInput = inputElement.value;
    searchGif(valorInput);
});

function searchGif (valorABuscar) {
    const req = new XMLHttpRequest();
    
    req.open('GET', `${urlSearch}?api_key=${apiKey}&q=${valorABuscar}&limit=30&offset=0&rating=g&lang=es`);
    req.onreadystatechange = function(evento) {
        if(req.readyState == 4) {
            if(req.status == 200){ //status 200 quiere decir que el pedido esta bein
                var parseResponse = JSON.parse(req.response);
                madeGrid(parseResponse.data);
            } else {
                console.log(req.readyState);
            }
        }
    }
    req.send(null);
};

function madeGrid(data){
    let i;
    let images = '';

    console.log('objeto JS', data);
    for (i = 0; i < data.length; i++) {
      if (data[i].images && data[i].images.downsized.url) {
        images += `<li class='col-4'><a href="${data[i].bitly_gif_url}"><img src="${data[i].images.downsized.url}" /></a></li>`;
      }
    }

    resultDiv.innerHTML = `<ul class='row'>${images}</ul>`;
    showSpinner();
}

function showSpinner() {
    spinner.classList.toggle('d-none');
}
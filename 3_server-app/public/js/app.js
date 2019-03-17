const address = "!"


const forecast =(url,callback) => {
    console.log(url)
    fetch(url).then(responses => {
        return responses.json().then((response) => {
            if(response.error) {
                //console.log(response.error)
                callback(response.error, undefined)
            } else {
                // console.log(response.forecast)
                // console.log(response.location)
                // console.log(response.address)
                console.log(response.forecast)
                callback(undefined, {
                    forecast: response.forecast,
                    location: response.location,
                    address:response.address
                })
            }
            
        })
    })
};

const form = document.querySelector('form');
const searchTextbox = document.querySelector('input');
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");



form.addEventListener('submit',(e) => {
    e.preventDefault();

    const address = searchTextbox.value;
    const url = `/weatherNZ?address=${address}`;


    messageOne.textContent = '';
    messageTwo.textContent = "fetching weather forecast of '" + address + "'"

    fetch(url).then(responses => {
       
        return responses.json().then((response) => {
           
            if(response.error) {               
                messageTwo.textContent = response.error;                
            } else {
                messageTwo.textContent = response.forecast;
                messageOne.textContent =response.location;
                searchTextbox.value = ''                                
            }
            
        })
    })
})




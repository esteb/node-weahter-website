// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




const weatherForm   = document.querySelector('form')
const search        = document.querySelector('input')
const messageOne    = document.querySelector('#message-1')
const messageTwo    = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //e: es el evento que ejecuta el form
    e.preventDefault()  // previene el comportamiento predeterminado, que es actualizar el navegador
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?addres='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) messageOne.textContent = data.error
        else {
            messageOne.textContent=data.location 
            messageTwo.textContent=data.forecast
        }
    })
})
})
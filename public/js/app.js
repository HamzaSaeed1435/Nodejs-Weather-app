console.log('Client side javascript file is loaded!')


const form =document.querySelector('form')
const search =document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messagetwo =document.querySelector('#message-2')

messagetwo.textContent =''

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent ='Loading....'
    const location =search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
response.json().then((data)=>{
    if(data.error){
        messagetwo.textContent = data.error   
    }else{
        console.log(data)
        messageOne.textContent=data.forecast 
    }
})
})

})
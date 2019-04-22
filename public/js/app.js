console.log("client side js has been loaded");
const weatherform=document.querySelector('form');
const search=document.querySelector('form input');
const message1=document.querySelector('#message-1');
const message2=document.querySelector('#message-2');
weatherform.addEventListener('submit',(e)=>{
     e.preventDefault();
     const address=search.value;
     if(address){
         const url='/weather?address='+address;
     fetch(url).then((response)=>{
        response.json().then((data)=>{
         //data is parsed json
         if(data.error){
             console.log("Error : ",data.error)
             message1.textContent="Error  :"+data.error ;
             message2.textContent="";
             return
         }
         console.log(data);
         message1.innerHTML=`location is ${data.location}`
         message2.innerHTML=`${data.weatherinfo.temperature}<br>${data.weatherinfo.summary} `
        })
    })
     }else{
         alert('address is not provided')
     }
})
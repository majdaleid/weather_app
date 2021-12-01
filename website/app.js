
 // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();


 let get2="/getData";

/*get request */
const getData=async (CompleteURL)=>{

    const res=await fetch(CompleteURL);
    try{
        const data=await res.json();
        console.log("client get data from the external api");
        console.log(data);
        return data;
    }
    catch(error){
        console.log("error",error);
    }

}


/*post request */
const postData=async (url='',data={})=>{
    const response=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData=await response.json();
        console.log("client post data ");
        console.log(newData);
        return newData
    }catch(error){
        console.log("error",error);
    }
    
    }




document.getElementById('generate').addEventListener('click',performanceAction);

 
/* get data from the external api then send it to the local server then update the data in html */

function performanceAction(e)
{
const baseURL=`https://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey=',us&appid=a68e9edb0fde71336001f2f47df269df&units=metric';
    let zip=document.getElementById('zip').value;
    const CompleteURL = baseURL+zip+apiKey;
    const feelings=document.getElementById('feelings').value;
    getData(CompleteURL)
   .then(function(data){
        postData('/postData', {Temper:data.main.temp, currentDate:newDate, contentOfFeelings:feelings})
    })
    .then(function(){ updateUI()})
}



/*update request */
const updateUI =async ()=>{
    const request =await fetch('/getData');
    try{
        let allData=await request.json();
       
        console.log(allData);
        console.log("client allData in update");
       
        document.getElementById('date').innerHTML=`date is ${allData.date}`;
        document.getElementById('temp').innerHTML=`the temperature ist ${allData.temperature}`;
        document.getElementById('content').innerHTML=`i feel ${allData.feelings}`;
    

    }catch(error){
        console.log("error",error);
    }


 }
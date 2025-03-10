const apiKeys="4fff601016a0faa3c539374aa99eb2fe";
const weatherdata=document.querySelector(".weather-data");
const cityname=document.querySelector("#city-name");
const formele=document.querySelector("form");
const imageicon=document.querySelector(".icon")
formele.addEventListener("submit",(e)=>{
    e.preventDefault();
//    console.log(cityname.value);
const cityvalue=cityname.value;
getweather(cityvalue);

})
async function getweather(cityvalue){ 
    try{
    const response= await fetch(` https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apiKeys}&units=metric `)
    if(!response.ok){
        throw new Error("City not found");
    }
    const data=await response.json()// js objects
    const temperature=Math.floor(data.main.temp);
    const description=data.weather[0].description;
    const icon=data.weather[0].icon;
    //console.log(data);
  const details=[`Feels like: ${Math.floor(data.main.feels_like)}°C`,
    `Humidity: ${data.main.humidity}%`,
    `Wind Speed: ${data.wind.speed} m/s`
   ]
    weatherdata.querySelector(".temp").textContent=`${temperature}°C`;
    weatherdata.querySelector(".desc").textContent=`${description}`;
    imageicon.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
    weatherdata.querySelector(".details").innerHTML = details.map((detail)=>{
        return `<div>${detail}</div>`
     }).join("")
    // imageicon.style.color="red"
     //console.log(data);

    
   }catch(err){
      weatherdata.querySelector(".temp").textContent="";
      imageicon.innerHTML="";
      weatherdata.querySelector(".desc").textContent="INVALID CITY";
    alert("CITY NOT FOUND!!!");
   }
}
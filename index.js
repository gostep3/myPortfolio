let xhr = new XMLHttpRequest();
xhr.open("GET", "https://studyprograms.informatics.ru/api/weather/json.php", false);
xhr.send();
if (xhr.status == 200){
    let json = xhr.responseText;
    let data = JSON.parse(json); // преобразовать в обьект
    temp.innerHTML = data.temp;
    feel.innerHTML = data.feel;
    wind.innerHTML = data.wind;
    humidity.innerHTML = data.humidity;
    imgRes = data.img;
}
else {
    alert("Error")
    console.error("Ошибка запроса");
}

setInterval(function(){
    xhr.open("GET", "https://studyprograms.informatics.ru/api/weather/json.php", false);
    xhr.send();
    if (xhr.status == 200){
        let json = xhr.responseText;
        let data = JSON.parse(json); // преобразовать в обьект
        temp.innerHTML = data.temp;
        feel.innerHTML = data.feel;
        wind.innerHTML = data.wind;
        humidity.innerHTML = data.humidity;
        imgRes = data.img;
    }
    else {
        alert("Error")
        console.error("Ошибка запроса");
    }
}, 10000);

navigator.geolocation.getCurrentPosition(function(pos){
    console.log(pos);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://geocode-maps.yandex.ru/1.x/?apikey=62d57ec2-352f-4484-a05e-347d2b5a5843&format=json&geocode=${pos.coords.longitude},${pos.coords.latitude}`);
    xhr.send();
  
    xhr.addEventListener('readystatechange', function() {
      if(xhr.status == 200 && xhr.readyState == 4) {
        let responseObj = JSON.parse(xhr.responseText);
        let geoData = responseObj.response.GeoObjectCollection.featureMember;
        console.log(geoData);
        let locality = '';
  
        for(let part of geoData){
          let metaDataObj = part.GeoObject.metaDataProperty.GeocoderMetaData
          if ( metaDataObj.kind == 'locality' ) locality = metaDataObj.text;
        }
  
        document.querySelector('#location').innerHTML = locality;
      }
    })
  })

closeWeather.addEventListener('click', function(){
    weather.hidden = true;
});

let contactsArr = document.querySelector("#contacts")
let arrOfContacts = ["<a class='elem' href='https://t.me/gostep3'>Телеграмм</a>", "<a class='elem' href='https://vk.com/gostep3'>ВК</a>"]
for(let i = 0; i < 2; i++){
  let el = document.createElement("DIV")
  el.innerHTML = arrOfContacts[i]
  el.classList.add("uk-card-title")
  el.classList.add("uk-text-center")
  el.classList.add("uk-card-hover")
  el.classList.add("uk-card-body")
  el.classList.add("uk-card-default")
  el.classList.add("uk-margin-left-large")
  contactsArr.appendChild(el)
}
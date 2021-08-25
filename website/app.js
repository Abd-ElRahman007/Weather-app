/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=b06a20d7208b72b61485fd8737778bf4&units=metric';
// const apiKey = '&appid=0632192767ad8b5f80e14740f9eb680c&unit=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear() + '.' + d.getMonth() + '.' + d.getDate();

const addInfo = async (url, zip, key) => {
  const formInfo = await fetch(url + zip + key);
  try {
    const info = await formInfo.json();
    console.log(info);
    return info;
  }
  catch (error) {
    console.log(error);
  }
};

document.getElementById('generate').addEventListener('click', generate);
function generate() {
  const zipCode = document.getElementById('zip').value;
  addInfo(baseUrl, zipCode, apiKey)
    .then(
      function (data) {
        console.log(data);
        const feel = document.getElementById('feelings').value;
        let temp = data.main.temp;
        postInfo('/addWeather', { date: newDate, temperature: temp, content: feel });
        ui();
      }
    );
}

const postInfo = async (url, data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });
  try {
    const newInfo = await res.json();
    return newInfo;
  } catch (error) {
    console.log(error);
  }
};

const ui = async () => {
  const req = await fetch('/weatherData');
  try {
    const allInfo = await req.json();
    console.log(allInfo);
    document.getElementById('date').innerHTML = `date: ${allInfo.date}`;
    document.getElementById('temp').innerHTML = `temp: ${allInfo.temp} C&deg;`;
    document.getElementById('content').innerHTML = `feel: ${allInfo.content}`;

  } catch (error) {
    console.log(error);
  }
};





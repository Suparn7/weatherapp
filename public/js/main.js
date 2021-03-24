const cityName = document.getElementById('cityName');

const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');


//pahle getInfo pe click karega
const getInfo = async(event) =>{ //async k through pahle submit na hojaye wo check kiya
    event.preventDefault(); //form refresh kardeta hai, prevent default se wo ? mark hta deta hai aur refresh nahi hone deta, jis page mein hain ushi mein rahne deta hai
    let cityVal = cityName.value;
    if(cityVal === ""){ //value check kiya empty hai ya ahi
        city_name.innerText = `Please Write The Name Before Searching`
        datahide.classList.add('data_hide'); // to hide data bekaar mein kyun dikhana pahle ka pda hua

    }else{ //try catch async await ka advance topic hai, try yaani proper city daala hoga, catch mein error pkdenge
        try{ //try m dekhrhe horha proper toh chalo response dikhado, catch mein error pakdo
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=e1ccb35ec22d91b636814e8d568d4a4b`
            const response = await fetch(url);//wait before url fetches json data ao async await
            //isse body readable stream ayega itmeans ki response aarha lekin json format mein, response ko purw javascript mein convert karna padega
            const data = await response.json(); ///object mein convert hojayega await krlo lekin
            const arrData =[data];

            city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;

            if(tempMood == "Clear"){
                temp_status.innerHTML = "<i class ='fas fa-sun' style = 'color: #eccc68' ></i>"
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML = "<i class ='fas fa-cloud' style = 'color: #f1f2f6' ></i>"
            }else if(tempMood == "Rain"){
                temp_status.innerHTML = "<i class ='fas fa-cloud-rain' style = 'color: #a4b0be' ></i>"
            }else{
                temp_status.innerHTML = "<i class ='fas fa-sun' style = 'color: #eccc68' ></i>"
            }
            datahide.classList.remove('data_hide'); //remove kardo yaahan data hide karne ki jarurat hini


        }catch{
            city_name.innerText = `Please Write The Name Properly` 
            datahide.classList.add('data_hide'); // koi error aata hai toh to hide data bekaar mein kyun dikhana pahle ka pda hua

        }
    }
}

submitBtn.addEventListener('click', getInfo);
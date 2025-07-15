const cinema = async () => {
  try {
    const response = await fetch("http://localhost:3000/Cinema");

    const data = await response.json();

    console.log(data);

    let print = `<option value="0" > select cinema </option>`;

    data.map((v, i) => {
      print += `
      
       <option value="${v.id}">${v.name}</option>
      
      `;
    });

    print += ` </select>`;

    document.getElementById("cinema").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

const handleChangeMovie = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    console.log("movie", data);

    const cinema_id = document.getElementById("cinema").value;

    console.log("cinema_id", cinema_id);

    const fdata = data.filter((v) => v.cinema_id == cinema_id);

    console.log("fdata", fdata);

    let print = `<option value="0" > select  </option>`;
    fdata.map((v, i) => {
      print += `
        
         <option value="${v.id}">${v.name}</option>
        
        `;
    });

    

    document.getElementById("movie").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

window.onload = function () {
  cinema();
};



const time_form = document.getElementById("time_form");
const first_plus = document.getElementById("first_plus");


const createTime = () => {
  const div = document.createElement("div");
  

  const input = document.createElement("input");
  input.type = "time";
  input.setAttribute("name" ,"time")

  const plus = document.createElement("a");
  plus.textContent = "+";
  plus.addEventListener("click", createTime);

  const minus = document.createElement("a");
  minus.textContent = "-";

  minus.addEventListener("click", () => {
    div.remove();
  });

  div.appendChild(input);
  div.appendChild(plus);
  div.appendChild(minus);

  time_form.appendChild(div);
};

first_plus.addEventListener("click", createTime);   //1


const handlleSubmit = async () => {

  console.log("submit",handlleSubmit);
  
  const cinema_id=document.getElementById("cinema").value;

  const movie_id=document.getElementById("movie").value;

  console.log("cinema_id",cinema_id);

  console.log("movie_id", movie_id);

  const time=document.getElementsByName("time")

  console.log("time" ,time);


  let timeArr=[]
  
  for (let i=0; i<time.length; i++){
     console.log(time[i].value);

    timeArr.push(time[i].value);
     
   
  }

  console.log(timeArr);
  

   let obj = {
    cinema_id,
    movie_id,
    time : timeArr

   }



   console.log("object" , obj);

   try {

    const response = await fetch ("http://localhost:3000/time")

    const data=await response.json();

    console.log(data);

    
    
    
   } catch (error) {
    
   }



   





  





  
  
}


const cinema_movie_form=document.getElementById("cinema_movie_form");
cinema_movie_form.addEventListener("submit" ,handlleSubmit)


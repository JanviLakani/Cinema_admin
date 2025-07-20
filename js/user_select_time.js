

const matchTime = JSON.parse(localStorage.getItem("matchTime"));

console.log("matchTime" , matchTime);


const handleTime = () => {

    const getDate = localStorage.getItem("Date");

    console.log("getDate :-",getDate);


      let print = "";

  matchTime.time.map((time) => {
    print += `
      <a href="#" 
         onclick="handleTimeClick('${time}')" 
         style="margin:8px; padding:10px 15px; background:grey; color:white; border-radius:5px; text-decoration:none; display:inline-block;">
        ${time}
      </a>
    `;
  });

  document.getElementById("timeList").innerHTML = print;
    

}

const handleTimeClick = (time) => {

  console.log("hello time");

  localStorage.setItem("Time" ,time)

  console.log("time" ,time);
  
  
  window.location.href="user_select_seat.html";
}

window.onload=handleTime 
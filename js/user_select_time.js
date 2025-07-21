const matchTime = JSON.parse(localStorage.getItem("matchTime"));

console.log("matchTime", matchTime);

const handleTime = () => {
  const getDate = localStorage.getItem("Date");

  console.log("getDate :-", getDate);

  let print = "";

  matchTime.time.map((time) => {
    print += `
  <a href="#" 
     onclick="handleTimeClick('${time}')" 
     class="time-button">
    ${time}
  </a>
`;
  });

  document.getElementById("timeList").innerHTML = print;
};

const handleTimeClick = (time) => {
  console.log("hello time");

  localStorage.setItem("Time", time);

  console.log("time", time);

  // ==============================================

  const selectDate = localStorage.getItem("Date");
  const matchTime = JSON.parse(localStorage.getItem("matchTime"));

  const cinemaShow = {
    cinema_id: matchTime.cinema_id,
    movie_id: matchTime.movie_id,
    time, // time me key value same hai to ek hi
    date: selectDate,
  };

  localStorage.setItem("cinemaShow", JSON.stringify(cinemaShow));

  // ==============================================

  window.location.href = "user_select_seat.html";
};

window.onload = handleTime;

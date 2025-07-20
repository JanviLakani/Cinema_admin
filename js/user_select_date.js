const handle_bookMyCinema = async () => {
  const getCinemaId = localStorage.getItem("cinemaId");

  console.log("getCinemaId", getCinemaId);

  const getMovieId = localStorage.getItem("movieId");
  console.log("getMovieId", getMovieId);

  try {
    const response = await fetch("http://localhost:3000/time");

    const timeData = await response.json();

    console.log("timeData", timeData);

    const matchTime = timeData.find(
      (v) => v.cinema_id === getCinemaId && v.movie_id === getMovieId
    );

    console.log("matchTime", matchTime);

    localStorage.setItem("matchTime", JSON.stringify(matchTime));

    let start = new Date(matchTime.start_date);
    let end = new Date(matchTime.end_date);

    let print = "";

    for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
      let d = new Date(i);

      let dateList = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
      let urlDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

      console.log("all date", dateList);

      print += `
  <a href="#" 
     onclick="handleDateClick('${urlDate}')" 
     class="date-link"
     style="display:inline-block; margin:8px; padding:10px 15px; background:grey; border-radius:5px; text-decoration:none; color:white;">
    ${dateList}
  </a>
`;
    }

    document.getElementById("dateList").innerHTML = print;

    localStorage.setItem("setTime", time);
  } catch (error) {
    console.log(error);
  }
};

const handleDateClick = (date) => {
  console.log("heloooo");

  localStorage.setItem("Date", date);

  window.location.href = "user_select_time.html";
};
window.onload = handle_bookMyCinema;

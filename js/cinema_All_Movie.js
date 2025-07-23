
const handle_Cinema_Movie = async () => {
  const cinema_movie = localStorage.getItem("cinemaId");
  console.log("cinema_movie :-", cinema_movie);

  try {
    const response = await fetch("http://localhost:3000/Movie");
    const allMovie = await response.json();

    const cinemaMovie = allMovie.filter((movie) => movie.cinema_id == cinema_movie);
    console.log("Filter cinema movie....:", cinemaMovie);

    let print = "";

    cinemaMovie.map((movie) => {
      print += `
        <a href="#" class="cinema_card_img" onclick="handle_last_click('${movie.id}')">
          <img src="images/movie_img/${movie.img_file}" />
          <p>${movie.name}</p>
        </a>
      `;
    });

    document.getElementById("movie_list").innerHTML = print;

  } catch (error) {
    console.error("error :-", error);
  }
};

const handle_last_click = (movieId) => {

  localStorage.setItem("movieId", movieId);
  console.log("movieId....." ,movieId);

  window.location.href="user_select_date.html"
  
}

window.onload = handle_Cinema_Movie;
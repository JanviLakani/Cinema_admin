let unicMovie = [];

const handle_bookMyShow = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    console.log("all movie", data);

    // data.map((v,i) => {
    //   if (!unicMovie.includes(v.name)) {
    //     unicMovie.push(v.name);
    //   }
    // })

    data.map((v, i) => {
      const Duplicate = unicMovie.some((v1) => v1.name === v.name);
      if (!Duplicate) {
        unicMovie.push(v); 
      }
    });
    console.log("unique movie", unicMovie);
    let print = ``;

    // data.map((v, i) => {
    //   print += `
    //         <div class="cinema_card_img">
    //         <img src="images/cinema_img/${v.img_file}" />${v.name}
    //        </div>

    //         `;
    // });

    unicMovie.map((v, i) => {
      print += `
            
            <a href="#" class="cinema_card_img" onclick="movie_click( '${v.id}', '${v.name}')">
            <img src="images/movie_img/${v.img_file}" />${v.name}
           </a>
            
            `;
    });

    document.getElementById("book_show").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

const movie_click = (id, name) => {
  event.preventDefault();

  console.log("Movie click:-", id, "name :-", name);

  // localStorage.setItem("selected_movie_id", id);
  localStorage.setItem("selected_movie_name", name);

  window.location.href = "user_select_cinema.html";
};

window.onload = handle_bookMyShow;

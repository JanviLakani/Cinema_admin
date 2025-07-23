let unicMovie = [];

const handle_bookMyShow = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    console.log("all movie", data);

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

    // ============

    const cinemaResponse = await fetch("http://localhost:3000/Cinema");

    const cinemaData = await cinemaResponse.json();

    console.log("All cinemaData......", cinemaData);
let print1 = ``;
    cinemaData.map((v, i) => {
      

      print1 += `
      <a href="#" class="cinema_card_img" onclick="cinema_Click('${v.id}' , '${v.name}')">
       <img src="images/cinema_img/${v.img_file}" />${v.name}
      </a>
      
      
      `;
    });

    document.getElementById("book_cinema_show").innerHTML = print1;




    
    // =============
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



const cinema_Click = (id ,name) => {
console.log("id........:- " , id);
console.log("name........:- " , name);

 localStorage.setItem("cinemaId", id);  

  window.location.href = "cinema_All_Movie.html";

}

window.onload = handle_bookMyShow;

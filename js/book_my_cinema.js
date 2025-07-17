let unicMovie = [];

const handle_bookMyShow = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    console.log("all movie", data);

    let print = ``;

    // data.map((v, i) => {
    //   print += `
    //         <div class="cinema_card_img">
    //         <img src="images/cinema_img/${v.img_file}" />${v.name}
    //        </div>
            
    //         `;
    // });

    data.map((v, i) => {
      print += `
            
            <a href="" class="cinema_card_img" onclick="movie_click( '${v.name}')">
            <img src="images/cinema_img/${v.img_file}" />${v.name}
           </a>
            
            `;
    });

    document.getElementById("book_show").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

const movie_click = (name) => {
    console.log("movie_click","name :-" ,name);

    
    


}

window.onload = handle_bookMyShow;

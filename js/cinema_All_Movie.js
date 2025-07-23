
const handle_Cinema_Movie = () => {
    // localStorage.setItem("cinemaId", id);   

    const select_cinema_movie=localStorage.getItem("cinemaId");

    console.log(" select_cinema_movie new :- " ,  select_cinema_movie);
    
}

window.onload=handle_Cinema_Movie;
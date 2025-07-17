
const handle_bookMyCinema = async () => {
    const selected_movie_name = localStorage.getItem("selected_movie_name");
    // const selected_movie_id = localStorage.getItem("selected_movie_id");

    // console.log("Selected Movie id:", selected_movie_id);
    console.log("Selected Movie Name:", selected_movie_name);

    try {
        const response=await fetch("http://localhost:3000/Movie");
        const data = await response.json();
        console.log("all movie", data);
        

        // const filteredData = data.filter(movie => movie.id === selected_movie_id);
        // console.log("Filtered Movie Data:", filteredData); 

          const filterMovieData = data.filter(movie => movie.name === selected_movie_name);
        console.log("Filter Movie nameData:", filterMovieData); 

        let storeCinemaId=[];

        storeCinemaId=filterMovieData  ;

        console.log("storeCinemaId", storeCinemaId);

        const getCinemaresponse = await fetch("http://localhost:3000/Cinema");
        const cinemaData = await getCinemaresponse.json();
        console.log("all cinema", cinemaData);

        // const filterCinemaData=cinemaData.filter(vCinema => vCinema.id === storeCinemaId [0].cinema_id) 

        // console.log("Filter Cinema Data:", filterCinemaData);

        const allCinemaId = storeCinemaId.map(movie => movie.cinema_id);
        console.log("allCinemaid:", allCinemaId);

        const filterCinemaData = cinemaData.filter(vCinema => allCinemaId.includes(vCinema.id));
        console.log("Filter CinemaData:", filterCinemaData);


        print = ``;

        filterCinemaData.map((v, i) => {
            print += `
            <div class="cinema_card_img">
            <img src="images/cinema_img/${v.img_file}" />${v.name}
            </div>
            `;
        });

        document.getElementById("book_cinema").innerHTML = print;

    } catch (error) {
        console.log(error);
        
    }
}

window.onload = handle_bookMyCinema
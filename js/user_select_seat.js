let bookSeat = []; //[3, 4]
                  //   0  1

const handleClickSeat = (seatNum) => {


  



  // bookSeat.includes(seatNum) 

  // console.log(bookSeat.includes(seatNum)); 

  if(bookSeat.includes(seatNum)) {
  // let index=bookSeat.findIndex((seatNum) =>  seatNum ===  ) 
     bookSeat.splice(index, 1);
  } else {
    bookSeat.push(seatNum);
    console.log( bookSeat.push(seatNum));
  }




  // bookSeat.push(seatNum);

  // console.log("your seat is push [] arr :-", bookSeat);

  // bookSeat.splice(seatNum, 1);

  // console.log("remove", bookSeat);

  // let isAvailable = bookSeat.some(() => {

  //    console.log("isAvailable", isAvailable);

  //   if(!isAvailable)  {

  //   } else {

  //   }
  // })

  // if (bookSeat === "") {
  // } else {
  // }
};

const handleSeat = async () => {
  const matchTime = JSON.parse(localStorage.getItem("matchTime"));

  console.log("matchTime", matchTime);

  const getTime = localStorage.getItem("Time");

  console.log("getTime in local", getTime);

  try {
    const getCinemaId = localStorage.getItem("cinemaId");

    console.log("getCinemaId", getCinemaId);

    const seatdata = await fetch("http://localhost:3000/seat");

    const date = await seatdata.json();

    console.log(date);

    const seatData = date.find((v) => v.cinema_id === getCinemaId);

    let print = ``;

    seatData.seat.map((v, i) => {
      print += `
        <button onclick="handleClickSeat(${i})">${i + 1}</button>
        `;
    });

    console.log(seatData);

    document.getElementById("seatDisplay").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

window.onload = handleSeat;

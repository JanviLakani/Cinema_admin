let bookSeat = []; //[3, 4]
//   0  1

const handleClickSeat = async (seatNum, seatid) => {
  console.log("seatNum", seatNum);

  console.log("get seatid", seatid);

  if (bookSeat.includes(seatNum)) {
    let index = bookSeat.findIndex((num) => num === seatNum);
    bookSeat.splice(index, 1);

    console.log("bookSeat removed", bookSeat);
  } else {
    bookSeat.push(seatNum);
    // console.log( bookSeat.push(seatNum));

    console.log(" push bookSeat", bookSeat);
  }

  try {
    const responseSeat = await fetch("http://localhost:3000/seat/" + seatid);

    const seatDataPrice = await responseSeat.json();

    console.log("get seatDataPrice :- ", seatDataPrice);

    let print = ``;

    print += `
      <h2>no. of seat :- ${bookSeat.length}</h2>
      <h2>Per seat price :- ${seatDataPrice.price}</h2>
      <h2>Total :- ${bookSeat.length * seatDataPrice.price}</h2>
      <button onclick="handleSeatUpdate('${seatid}')">submit</button>
    `;

    document.getElementById("display").innerHTML = print;
  } catch (error) {
    console.log(error);
  }

  if (bookSeat.length > 0) {
    document.getElementById("display").style.display = "block";

    //  document.getElementById("display").innerHTML=`<h2>no. of seat :- ${bookSeat.length}</h2>`
    // document.getElementById("display").innerHTML=`<h2>Per seat price :-${seatDataPrice.price}</h2>`
    // document.getElementById("display").innerHTML=`<h2>Total :-${bookSeat.length * seatDataPrice.price}</h2>`
  } else {
    document.getElementById("display").style.display = "none";
  }

  handleSeat();
};

const handleSeat = async () => {
  // const matchTime = JSON.parse(localStorage.getItem("matchTime"));

  // console.log("matchTime", matchTime);

  // const getTime = localStorage.getItem("Time");

  // console.log("getTime in local", getTime);

  // try {
  //   const getCinemaId = localStorage.getItem("cinemaId");

  //   console.log("getCinemaId", getCinemaId);

  //   const seatdata = await fetch("http://localhost:3000/seat");

  //   const date = await seatdata.json();

  //   console.log(date);

  //   const seatData = date.find((v) => v.cinema_id === getCinemaId);

  const cinemaShow = JSON.parse(localStorage.getItem("cinemaShow"));

  console.log("cinemaShow", cinemaShow);

  try {
    const responseData = await fetch("http://localhost:3000/seat");
    const data = await responseData.json();

    console.log("Seat Data from server", data);

    const seatData = data.find(
      (v) =>
        v.cinema_id === cinemaShow.cinema_id &&
        v.movie_id === cinemaShow.movie_id &&
        v.time === cinemaShow.time &&
        v.date === cinemaShow.date
    );

    if (!seatData) {
      document.getElementById("seatDisplay").innerHTML = "No seat data found.";
      return;
    }

    let print = ``;

    seatData.seat.map((v, i) => {
      if (bookSeat.includes(i)) {
        print += `
    <button class="bookseatcolor" onclick="handleClickSeat('${i}','${
          seatData.id
        }')">${i + 1}</button>
  `;
      } else {
        print += `
    <button onclick="handleClickSeat(${i} , '${seatData.id}' )">${
          i + 1
        }</button>
  `;
      }
    });

    console.log(seatData);

    document.getElementById("seatDisplay").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

const handleSeatUpdate = async (id) => {

  console.log("seatid id :- ", id);

  console.log(" bookSeat bookSeat",bookSeat);
  
  try {
    
    const seatUpdateResponse = await fetch ("http://localhost:3000/seat/" + id );

    const updateData =await seatUpdateResponse.json();

    console.log( "updateData show :-",updateData);
    

   console.log(updateData.seat);
   
  const updateSeat=updateData.seat.map((v,i) => {
  if(bookSeat.includes(i)) {
    return 1;
  } else {
     return v;
  }  
  })

  console.log("updateSeat seat :-", updateSeat);

const updateSeatObj = {
    id: updateData.id,
  cinema_id: updateData.cinema_id,
  movie_id: updateData.movie_id,
  time: updateData.time,
  date: updateData.date,
  price: updateData.price,
  seat: updateSeat,
}

console.log("updateSeatObj",updateSeatObj);


  const seatUpdateResponseJson = await fetch ("http://localhost:3000/seat/" + id ,{
    method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(updateSeatObj),
  })
  
  console.log(seatUpdateResponseJson);
  

  } catch (error) {
    console.log(error);
    
  }

}

window.onload = handleSeat;

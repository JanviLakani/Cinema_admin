const handleClickSeat = (seatNum) => {
  console.log("seatnum :- ", seatNum);

  const isOk = confirm("Are You Sure !you are book ... this movie");
  if (isOk) {
    // alert("booked");                                 
    
    //  alert(`Seat ${seatNum} booked`);
  } else {
    // alert("not book");
  }                                                                                                 
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
        <button onclick="handleClickSeat(${i + 1})">${i + 1}</button>
        `;
    });

    console.log(seatData);

    document.getElementById("seatDisplay").innerHTML = print;
  } catch (error) {
    console.log(error);
  }


};

window.onload = handleSeat;

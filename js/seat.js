let upDateid = null;

const cinema = async () => {
  try {
    const response = await fetch("http://localhost:3000/Cinema");

    const data = await response.json();

    console.log(data);

    let print = `<option value="0" > select cinema </option>`;

    data.map((v, i) => {
      print += `
      
       <option value="${v.id}">${v.name}</option>
      
      `;
    });

    print += ` </select>`;

    document.getElementById("cinema").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

const handleChangeMovie = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    console.log("movie", data);

    const cinema_id = document.getElementById("cinema").value;

    console.log("cinema_id", cinema_id);

    const fdata = data.filter((v) => v.cinema_id == cinema_id);

    console.log("fdata", fdata);

    let print = `<option value="0" > select  </option>`;
    fdata.map((v, i) => {
      print += `
        
         <option value="${v.id}">${v.name}</option>
        
        `;
    });

    document.getElementById("movie").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

const handleChangeTime = async () => {
  const cinema_id = document.getElementById("cinema").value;
  const movie_id = document.getElementById("movie").value;

  const response = await fetch("http://localhost:3000/time");
  const data = await response.json();
  console.log("time", data);

  const timeMetch = data.find(
    (v) => v.cinema_id == cinema_id && v.movie_id == movie_id
  );
  console.log("timeMetch", timeMetch);

  let print = `<option value="0" > select time  </option>`;

  if (timeMetch) {
    timeMetch.time.map((v) => {
      print += `
        <option value="${v}">${v}</option>
      `;
    });

     dateDropdown(timeMetch.start_date, timeMetch.end_date);
  }
  document.getElementById("time").innerHTML = print;
};

const dateDropdown = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let print = `<option value="">Select Date</option>`;

  for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
    let d = new Date(i);
    let dateValue = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; 
    let dateUser = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`; 

    print += `<option value="${dateValue}">${dateUser}</option>`;
  }

  document.getElementById("date").innerHTML = print;
};

const handleSubmit = async () => {
  event.preventDefault();

  const cinema_id = document.getElementById("cinema").value;
  const movie_id = document.getElementById("movie").value;
  const time = document.getElementById("time").value;
  const date=document.getElementById("date").value;
  const seatV = parseInt(document.getElementById("seat").value)
  const seat=Array(seatV).fill(0)
  const price = document.getElementById("price").value;

  const obj = {
    cinema_id,
    movie_id,
    time,
    date,
    seat,
    price,
  };

  try {
   if(upDateid === null) {

      const response = await fetch("http://localhost:3000/seat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

   } else {

       const response = await fetch(
          "http://localhost:3000/seat/" + upDateid,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(obj),
          }
        );
   }

    await getSeat();
  } catch (error) {
    console.log(error);
  }
};


const getSeat = async () => {
  try {
    const response = await fetch("http://localhost:3000/seat");
    const data = await response.json();

    const response1 = await fetch("http://localhost:3000/Cinema");
    const data1 = await response1.json();

    const cinemaName = (id) => {
      const cinema = data1.find((v) => v.id === id);
      return cinema ? cinema.name : "N/A";
    };

    const movieResponse = await fetch("http://localhost:3000/Movie");
    const movieData = await movieResponse.json();

    const getMovieName = (id) => {
      const movie = movieData.find((m) => m.id == id);
      return movie ? movie.name : "N/A";
    };

    let print = `<table border="1">
      <tr>
        <th>Cinema Name</th>
        <th>Movie Movie</th>
        <th>Time</th>
        <th>Date</th>
        <th>Seat</th>
        <th>Price</th>
        <th>Action</th>
      </tr>`;

    for (let v of data) {
      // const timeValue = await getTimeById(v.time); 
      //  Array.isArray(v.time) ? v.time.join(", ") : v.time
      print += `
        <tr>
          <td>${cinemaName(v.cinema_id)}</td>
          <td>${getMovieName(v.movie_id)}</td>
          <td>${v.time}</td>
          <td>${v.date}</td>
          <td>${v.seat.length} seat</td>
          <td>${v.price}</td>
          <td><button onclick="handleDelete('${v.id}')">Delete</button>
          <button onclick="handleEdit('${v.id}')">Edit</button>
          </td>
        </tr>`;
    }

    print += `</table>`;

    document.getElementById("seat_table").innerHTML = print;
  } catch (error) {
    console.log("Error fetching seat data:", error);
  }
};


const handleEdit = async (id) => {
  try {

    const response = await fetch("http://localhost:3000/seat/" + id);
    const data = await response.json();

    console.log("data", data);


    
    document.getElementById("cinema").value = data.cinema_id;

    await handleChangeMovie();
    document.getElementById("movie").value = data.movie_id;

    await handleChangeTime();
    document.getElementById("time").value = data.time;

    
      document.getElementById("date").value = data.date;

    document.getElementById("seat").value = data.seat;
    document.getElementById("price").value = data.price;
    
    upDateid=data.id;

 




  } catch (error) {  
    console.log(error);
    
  }

}

const handleDelete = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/seat/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
};

const getTimeById = async (id) => {
  const response = await fetch("http://localhost:3000/time");
  const data = await response.json();

  const found = data.find((v) => v.id == id);
  return found
    ? Array.isArray(found.time)
      ? found.time.join(", ")
      : found.time
    : "N/A";
};

const seat_form = document.getElementById("seat_form");
seat_form.addEventListener("submit", handleSubmit);
// window.onload = cinema;

window.onload = () => {
  cinema(); 
  getSeat(); 
  
};

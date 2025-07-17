let upDateid = null
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

const createTime = (val = "") => {
  const time_form = document.getElementById("time_form");

  const div = document.createElement("div");

  const input = document.createElement("input");
  input.type = "time";
  input.setAttribute("name", "time");
  input.setAttribute("value", val);

  const plus = document.createElement("a");
  plus.textContent = "+";
  plus.addEventListener("click", createTime);

  console.log(time_form.children);

  

  div.appendChild(input);
  div.appendChild(plus);

  if (time_form.children.length >= 1) {
    const minus = document.createElement("a");
    minus.textContent = "-";

    minus.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(minus);
  }

  time_form.appendChild(div);
};

const handleEdit = async (id) => {
  console.log("edit call", handleEdit);

  try {
    const response = await fetch("http://localhost:3000/time/" + id);

    const data = await response.json();

    console.log("edit data", data);

    document.getElementById("cinema").value = data.cinema_id;

    await handleChangeMovie();
    document.getElementById("movie").value = data.movie_id;

    document.getElementById("time_form").innerHTML = "";

    for (let i = 0; i < data.time.length; i++) {
      createTime(data.time[i]);
    }

    document.getElementById("start_date").value = data.start_date;
    document.getElementById("end_date").value = data.end_date;

    console.log("data show", data);
    upDateid = data.id;
  } catch (error) {
    console.log(error);
  }

   
};

const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/time");
    const data = await response.json();
    console.log("time data", data?.slice());
    const newData = data?.map((v, i) => {
      return v;
    });

    const response1 = await fetch("http://localhost:3000/Cinema");
    const data1 = await response1.json();

    const cinemaName = (id) => {
      const cinema = data1.find((v) => v.id === id);
      return cinema ? cinema.name : "N/A";
    };

    const response2 = await fetch("http://localhost:3000/Movie");
    const data2 = await response2.json();

    const movieName = (id) => {
      const movie = data2.find((v) => v.id == id);
      return movie ? movie.name : "N/A";
    };

    let print = `<table border="1">
     <tr>
          <th>Cinema Name</th>
          <th>Movie Name</th>
          <th>Times</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Action</th>
        </tr>`;

    newData.map((v, i) => {
      print += `
        <tr>
          <td>${cinemaName(v.cinema_id)}</td>
          <td>${movieName(v.movie_id)}</td>
          <td>${v.time.join(", ")}</td>
          <td>${v.start_date}</td>
          <td>${v.end_date}</td>
          <td><button onclick="handleDelete('${v.id}')">Delete</button>
          <button onclick="handleEdit('${v.id}')">Edit</button>
          </td>
        </tr>
      `;
    });

    print += ` </table>`;

    document.getElementById("time_table").innerHTML = print;
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleSubmit = async (event) => {
  

  const cinema_id = document.getElementById("cinema").value;
  const movie_id = document.getElementById("movie").value;
  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;
  const time = document.getElementsByName("time");

  let timeArr = [];
  for (let i = 0; i < time.length; i++) {
    timeArr.push(time[i].value);
  }

  const obj = {
    cinema_id,
    movie_id,
    time: timeArr,
    start_date,
    end_date,
  };

  try {
    
    if(upDateid === null) {

      const response = await fetch("http://localhost:3000/time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    } else {
          const response = await fetch(
          "http://localhost:3000/time/" + upDateid,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(obj),
          }
        );


    }

    await getData();
  } catch (error) {
    console.log("Error:", error);
  }
};

const handleDelete = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/time/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

document
  .getElementById("cinema_movie_form")
  .addEventListener("submit", handleSubmit);

window.onload = function () {
  cinema();
};

//1

//
getData();

const first_plus = document.getElementById("first_plus");

first_plus.addEventListener("click", createTime);

let upDateid = null;

const movie_admin = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    let print = ``;

    print += `
      <table border="1">
      <tr>
        <th>name</th>
        <th>description</th>
        <th>action</th>
      </tr>
    
    `;

    data.map((v, i) => {
      print += `
      <tr>
        <td>${v.name}</td>
        <td>${v.discription}</td>
        <td><button onclick ="handleEdit('${v.id}')">E</button><button onclick="handleDelete('${v.id}')">D</button></td>

      </tr>
        `;
    });

    print += `</table>`;

    document.getElementById("display").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

// ================================================================================ edit

const handleEdit = async (id) => {
  const response = await fetch("http://localhost:3000/Movie");

  const data = await response.json();

  const obj = data.find((v) => v.id === id);

  console.log(obj);

  document.getElementById("name").value = obj.name;
  document.getElementById("discription").value = obj.discription;

  upDateid = obj.id;
};

// ================================================================================ edit

// ================================================================================ 2 delete
const handleDelete = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/Movie/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

// ================================================================================ 2 delete

// window.onload = movie_admin;

// const handleSubmit = async () => {

//   const name = document.getElementById("name").value;
//   const discription = document.getElementById("discription").value;

//   const obj = {
//     name,
//     discription,
//   };

//   try {
//     if (upDateid === null) {

//       const response = await fetch("http://localhost:3000/Movie", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify(obj),
//       });

//     } else {

//       const response = await fetch("http://localhost:3000/Movie/" + upDateid ,{
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify(obj),
//       });

//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const movie_form = document.getElementById("movie_form");

// movie_form.addEventListener("submit", handleSubmit);

window.onload = movie_admin;

const handleSubmit = async () => {
    event.preventDefault();

  const name = document.getElementById("name").value;
  const discription = document.getElementById("discription").value;

  let movieValue = false;

  if (name === "") {
    document.getElementById("movie_name_err").innerHTML = "please enter movie name ";
    movieValue = true;
  } else {
    document.getElementById("movie_name_err").innerHTML = "";
  }

  if( discription === '') {
    document.getElementById("movie_disc_err").innerHTML="please enter movie discription"
    movieValue = true;
  } else {
    document.getElementById("movie_disc_err").innerHTML=""
  }

//   ================================== 

  if (!movieValue) {

      const obj = {
    name,
    discription,
  };

  try {
    if (upDateid === null) {

      const response = await fetch("http://localhost:3000/Movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(obj),
      });


    } else {


      const response = await fetch("http://localhost:3000/Movie/" + upDateid ,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(obj),
      });


    }
  } catch (error) {
    console.log(error);
  }

  }


//   ================================= 
};

const movie_form = document.getElementById("movie_form");

movie_form.addEventListener("submit", handleSubmit);

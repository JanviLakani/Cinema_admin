let upDateid = null;



const movie_admin = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    console.log("00000000" , data);

    const response1 = await fetch ("http://localhost:3000/Cinema")
  const data1 =await response1.json();



   const cinemaName =(id)=> {
     const cinema = data1.find((v) => v.id === id);
     return cinema.name
   }
    

    let print = ``;

    print += `
      <table class="table table-bordered">
      <tr>
        <th>image</th>    
        <th>Cinema Name</th>    
        <th>name</th>
        <th>description</th>
        <th>action</th>
      </tr>
    
    `;

    data.map( (v, i) => {
    

      print += `
      <tr>
        <td><img src="/images/movie_img/${v.img_file} " width="100px" height="100px"</td>
        <td>${cinemaName(v.cinema_id)}</td>
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

  document.getElementById("cinema").value=obj.cinema_id;
  document.getElementById("name").value = obj.name;
  document.getElementById("discription").value = obj.discription;
  // document.getElementById("img_file").value=obj.img_file
  document.getElementById("disk_movie_img").src =
    "/images/cinema_img/" + obj.img_file;

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

// ========================================= onchange

const handleChange = () => {
  const img_file = document.getElementById("img_file").files[0];
  document.getElementById("disk_movie_img").src =
    "/images/cinema_img/" + img_file.name;
};

// =========================================



const handleSubmit = async () => {
  event.preventDefault();

  const cinema_id = document.getElementById("cinema").value;
  const name = document.getElementById("name").value;
  const discription = document.getElementById("discription").value;
  const img_file = document.getElementById("img_file").files[0];

  console.log(cinema_id);

  // console.log(img_file);

  const disk_movie_img = document.getElementById("disk_movie_img").src;

  const arr = disk_movie_img.split("/");

  console.log(arr[arr.length - 1]);

  let movieValue = false;

  // if (cinema === '0') {
  //    document.getElementById("movie_name_err").innerHTML = "please select cinema name";
  // } else {
  //    document.getElementById("movie_name_err").innerHTML = "";
  // }

  if (name === "") {
    document.getElementById("movie_name_err").innerHTML =
      "please enter movie name ";
    movieValue = true;
  } else {
    document.getElementById("movie_name_err").innerHTML = "";
  }

  if (discription === "") {
    document.getElementById("movie_disc_err").innerHTML =
      "please enter movie discription";
    movieValue = true;
  } else {
    document.getElementById("movie_disc_err").innerHTML = "";
  }

  if (img_file) {
    if (
      img_file?.type.toLowerCase() === "image/jpg" ||
      img_file?.type.toLowerCase() === "image/jpeg" ||
      img_file?.type.toLowerCase() === "image/png"
    ) {
      document.getElementById("file_img_err").innerHTML = "";
    } else {
      document.getElementById("file_img_err").innerHTML =
        "enter png/jpg/jpeg file only";
      movieValue = true;
    }

    if (img_file?.size > 2 * 1024 * 1024) {
      document.getElementById("file_img_err").innerHTML =
        "file size is maximum 2mb";
      movieValue = true;
    } else {
      document.getElementById("file_img_err").innerHTML = "";
    }
  }

  //   ==================================

  if (!movieValue) {
    const obj = {
      cinema_id,
      name,
      discription,
      img_file: img_file?.name ? img_file?.name : arr[arr.length - 1],
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
        const response = await fetch(
          "http://localhost:3000/Movie/" + upDateid,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(obj),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   =================================
};

const movie_form = document.getElementById("movie_form");

movie_form.addEventListener("submit", handleSubmit);

const cinema_drop_down = async () => {
  try {
    const response = await fetch("http://localhost:3000/Cinema");

    const data = await response.json();

    console.log(data);

    let print = ``;

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


window.onload = function() {
  movie_admin()
  cinema_drop_down()
} 



const getCinemaName = async (cinema_id) => {
  const response = await fetch ("http://localhost:3000/Cinema")
  const data =await response.json();
  const cinemaName = data.find((v) => v.id === cinema_id);

  console.log(
cinemaName.name);

return cinemaName?.name


}



let upDateid = null;
const cinema_admin = async () => {
  try {
    const response = await fetch("http://localhost:3000/Cinema");

    const data = await response.json();

    let print = ``;

    print += `
      <table class="table table-bordered">
      <tr>
        <th>name</th>
        <th>discription</th>
        <th>email</th>
        <th>mobile_no</th>
        <th>address</th>
        <th>action</th>

      </tr>
    
    `;

    data.map((v, i) => {
      print += `
      <tr>
        <td>${v.name}</td>
        <td>${v.discription}</td>
        <td>${v.email}</td>
        <td>${v.mobile_no}</td>
        <td>${v.address}</td>
        <td><button onclick="handleEdit('${v.id}')">E</button><button onclick="handleDelete('${v.id}')">D</button></td>

      </tr>
        `;
    });

    print += `</table>`;

    document.getElementById("displayData").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

window.onload = cinema_admin;

const handleEdit = async (id) => {
  const response = await fetch("http://localhost:3000/Cinema");

  const data = await response.json();

  const obj = data.find((v) => v.id === id);

  console.log(obj);

  document.getElementById("name").value = obj.name;
  document.getElementById("discription").value = obj.discription;
  document.getElementById("email").value = obj.email;
  document.getElementById("mobile_no").value = obj.mobile_no;
  document.getElementById("address").value = obj.address;

  upDateid = obj.id;
};

const handleDelete = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/Cinema/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(Error);
  }
};

const handleSubmit = async () => {
    event.preventDefault();

  const name = document.getElementById("name").value;
  const discription = document.getElementById("discription").value;
  const email = document.getElementById("email").value;
  const mobile_no = document.getElementById("mobile_no").value;
  const address = document.getElementById("address").value;

   let cinemaValue = false;

   if(name === "") {
    document.getElementById("cinema_name_err").innerHTML="please enter cinema name"
    cinemaValue=true;
   } else {
    document.getElementById("cinema_name_err").innerHTML=""
   }

     if(discription === "") {
    document.getElementById("cinema_disc_err").innerHTML="please enter cinema discription"
    cinemaValue=true;
   } else {
    document.getElementById("cinema_disc_err").innerHTML=""
   }

     if(email === "") {
    document.getElementById("cinema_email_err").innerHTML="please enter cinema email"
    cinemaValue=true;
   } else {
    document.getElementById("cinema_email_err").innerHTML=""
   }

     if(mobile_no === "") {
    document.getElementById("cinema_no_err").innerHTML="please enter your mobile_no"
    cinemaValue=true;
   } else {
    document.getElementById("cinema_no_err").innerHTML=""
   }

     if(address === "") {
    document.getElementById("cinema_address_err").innerHTML="please enter cinema address"
    cinemaValue=true;
   } else {
    document.getElementById("cinema_address_err").innerHTML=""
   }

// ===================================================== 
   if (!cinemaValue) {

     const obj = {
    name,
    discription,
    email,
    mobile_no,
    address,
  };

  try {
    if (upDateid === null) {

      const response = await fetch("http://localhost:3000/Cinema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(obj),
      });


    } else {

      const response = await fetch("http://localhost:3000/Cinema/" + upDateid, {
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

//    ===================================================== 

};

const cinema_form = document.getElementById("cinema_form");

cinema_form.addEventListener("submit", handleSubmit);

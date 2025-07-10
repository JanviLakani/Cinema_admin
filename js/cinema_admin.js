let upDateid = null;

const sinema_admin = async () => {
  try {
    const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json();

    let print = ``;

    print += `
     <table border="1">
        <tr>
            
            <th>name</th>
            <th>email id</th>
            <th>place</th>
            <th>action</th>
            
        </tr>
  `;
    data.map((v, i) => {
      print += `
            <tr>
               
                <td>${v.name}</td>
                <td>${v.email}</td>
                <td>${v.place}</td>
                <td><button onclick="handleEdit('${v.id}')">E</button><button onclick="handledelete('${v.id}')">D</button</td>
                  
            </tr>
   `;
    });

    print += `</table>`;

    document.getElementById("disk").innerHTML = print;

    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// ==================================== 2 edit

const handleEdit = async (id) => {
  const response = await fetch("http://localhost:3000/cinema");

  const data = await response.json();

  const obj = data.find((v) => v.id === id);

  console.log(obj);

  document.getElementById("name").value = obj.name;
  document.getElementById("email").value = obj.email;
  document.getElementById("place").value = obj.place;

  upDateid = obj.id;
};

// ================================= edit

// ==================================== 2 delete
const handledelete = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/cinema/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

// ==================================== 2 delete

window.onload = sinema_admin;

const handlesubmit = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const place = document.getElementById("place").value;

  const obj = {
    name,
    email,
    place,
  };

  try {
    if (upDateid === null) {

      
      const response = await fetch("http://localhost:3000/cinema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(obj),
      });

      
    } else {
      const response = await fetch("http://localhost:3000/cinema/" + upDateid ,{
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
};

const cinema_form = document.getElementById("cinema_form");

cinema_form.addEventListener("submit", handlesubmit);

// ==========================================

// const cinema_form = async () => {
//   try {
//     const response1 = fetch ("http://localhost:3000/posts")
//   } catch (error) {

//   }
// }

// window.onload=cinema_form;

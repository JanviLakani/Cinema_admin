const sinema_admin = async () => {
  try {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();

    let print = ``;

    print += `
     <table border="1">
        <tr>
            <th>id</th>
            <th>name</th>
            <th>email id</th>
            <th>place</th>
            <th>action</th>
            
        </tr>
  `;
    data.map((v, i) => {
      print += `
            <tr>
                <td>${v.id}</td>
                <td>${v.name}</td>
                <td>${v.email_id}</td>
                <td>${v.place}</td>
                <td><button>E</button><button>D</button</td>
                  
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

window.onload = sinema_admin;

// ========================================== 

// const cinema_form = async () => {
//   try {
//     const response1 = fetch ("http://localhost:3000/posts")
//   } catch (error) {
    
//   }
// }




// window.onload=cinema_form;


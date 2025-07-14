const cinema = async () => {
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

const handleChangeMovie = async () => {
  try {
    const response = await fetch("http://localhost:3000/Movie");

    const data = await response.json();

    console.log("movie", data);

    const cinema_id = document.getElementById("cinema").value;

    console.log("cinema_id", cinema_id);

    const fdata = data.filter((v) => v.cinema_id == cinema_id);

    console.log("fdata", fdata);

    let print = ``;
    fdata.map((v, i) => {
      print += `
        
         <option value="${v.id}">${v.name}</option>
        
        `;
    });

    p;

    document.getElementById("movie").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

window.onload = function () {
  cinema();
};


const cinema = async() => {
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
}


// const movie = async() => {
//       try {
//     const response = await fetch("http://localhost:3000/Movie");

//     const data = await response.json();

//     console.log(data);

//     let print = ``;

//     data.map((v, i) => {
//       print += `
      
//        <option value="${v.id}">${v.name}</option>
      
//       `;
//     });

//     print += ` </select>`;

//     document.getElementById("movie").innerHTML = print;
//   } catch (error) {
//     console.log(error);
//   }
// }



const handleChangeMovie =async () => {
    try {

        const response = await fetch ("http://localhost:3000/Movie")

        const data= await response.json();

        console.log("movie",data);

        const cinema=document.getElementById("cinema_id").value

        console.log("cinema");
        
        

        const fdata=data.filter((v,i)=> {
            
        })

        console.log(fdata);
        

       
        

       

        
        
        
    } catch (error) {

        console.log(error);
        
        
    }
}

window.onload=function() {
    cinema();
}
 



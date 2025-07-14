const movie_admin = async () => {
  try {
    const response = await fetch("http://localhost:3000/time");

    const data = await response.json();

    console.log(data);

    let print = ``;

    print += `
      <table border>
      <tr>
        <th>time</th>    
        <th>action</th>
      
      </tr>
    
    `;

    data.map((v) => {
      print += `
        <tr>
            <th>${v.time}</th>
            <th><button onclick="handlePlusTime('${v.id}')">+</button><button onclick="handleMinusTime('${v.id}')">-</button></th>
        </tr>
            
     `;
    });

    print += `</table>`;

    document.getElementById("display").innerHTML = print;
  } catch (error) {
    console.log(error);
  }
};

const handlePlusTime = () => {


    try {
        const response = fetch ("http://localhost:3000/time" , )
        
    } catch (error) {
        console.log(error);
        
    }

}


const handleMinusTime = (id) => {
try {

    const response = fetch ("http://localhost:3000/time/" + id, {
        method : "DELETE"
    })
    
} catch (error) {
    console.log(error);
    
}
}


const handleSubmit = async () => {
    const time=document.getElementById("time").value;

    const obj={
        time
    }

    try {
        const response = await fetch ("http://localhost:3000/time", {
            method : 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj),
        });


    } catch (error) {
        console.log(error);
        
    }

    console.log(time);
    
}




window.onload = movie_admin;

const time_form=document.getElementById("time_form")
time_form.addEventListener("submit" , handleSubmit)

















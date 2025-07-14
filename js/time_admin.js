const time_form = document.getElementById("time_form");
const first_plus = document.getElementById("first_plus");

const createTime = () => {
  const div = document.createElement("div");

  const input = document.createElement("input");
  input.type = "time";

  const plus = document.createElement("button");
  plus.textContent = "+";
  plus.addEventListener("click", createTime);

  const minus = document.createElement("button");
  minus.textContent = "-";

  minus.addEventListener("click", () => {
    div.remove();
  });

  div.appendChild(input);
  div.appendChild(plus);
  div.appendChild(minus);

  time_form.appendChild(div);
};

first_plus.addEventListener("click", createTime);   //1

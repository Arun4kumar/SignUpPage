console.log("I am working");

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confpass = document.querySelector("#confpass");
const dob = document.querySelector("#dob");
const error = document.querySelector("#error");
const table = document.querySelector("#table");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");
const alert = document.querySelector("#alert");

var chache = localStorage.getItem("data");
var editing = false;
var numEdit = -1;
if (chache !== null && chache !== undefined && chache.length !== 0) {
  chache = JSON.parse(chache);
  chache = chache.map((item) => JSON.parse(item));
} else {
  chache = [];
}

if (chache && chache.length > 0) {
  chache.forEach((data, index) => {
    const row = table.insertRow(index + 1);
    var cell = row.insertCell();
    cell.innerHTML = index + 1;
    cell.scope = "row";
    cell = row.insertCell();
    cell.innerHTML = data.firstName;
    cell = row.insertCell();
    cell.innerHTML = data.lastName;
    cell = row.insertCell();
    cell.innerHTML = data.email;
    cell = row.insertCell();
    cell.innerHTML = data.dob;
    cell = row.insertCell();

    var div = document.createElement("div");
    div.className = "funcContainer";

    var button = document.createElement("button");

    button.type = "button";
    button.innerHTML = "Edit";
    button.classList.add("btn", "btn-warning");
    button.addEventListener("click", () => {
      editEntry(index);
    });
    div.appendChild(button);

    button = document.createElement("button");

    button.type = "button";
    button.innerHTML = "Delete";
    button.addEventListener("click", () => {
      deleteEntry(index);
    });
    button.classList.add("btn", "btn-danger");
    div.appendChild(button);

    cell.appendChild(div);
  });
} else {
  table.textContent = "No entries yet";
}

function editEntry(num) {
  submit.innerHTML = "Save";
  submit.classList.replace("btn-success", "btn-primary");
  editing = true;
  numEdit = num;
  const data = chache[num];
  firstName.value = data.firstName;
  lastName.value = data.lastName;
  email.value = data.email;
  dob.value = data.dob;
}

function deleteEntry(num) {
  chache.splice(num, 1);
  save();
}

function save() {
  const listUpdate = chache.map((element) => JSON.stringify(element));
  localStorage.setItem("data", JSON.stringify(listUpdate));
  location.reload();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    dob: dob.value,
  };

  if (validateFields()) {
    if (editing) {
      chache.splice(numEdit, 1, obj);
    } else {
      chache.push(obj);
    }

    save();
  } else {
    alert.innerHTML = "Please correct the heighlighted fields first";
    alert.style.color = "red";
  }
});

function validateFields() {
  let allowed = true;

  if (firstName.value === "") {
    allowed = false;
    firstName.classList.add("border", "border-2", "border-danger");
  }

  if (lastName.value === "") {
    allowed = false;
    lastName.classList.add("border", "border-2", "border-danger");
  }

  if (email.value === "" || email.contains('@')) {
    allowed = false;
    email.classList.add("border", "border-2", "border-danger");
  }

  if (password.value === "") {
    allowed = false;
    password.classList.add("border", "border-2", "border-danger");
  }

  if (confpass.value === "") {
    allowed = false;
    confpass.classList.add("border", "border-2", "border-danger");
  }

  if (dob.value === "") {
    allowed = false;
    dob.classList.add("border", "border-2", "border-danger");
  }

  if (password.value !== confpass.value) {
    allowed = false;
    error.innerHTML = "Passwords do not match";
  }

  return allowed;
}

firstName.addEventListener("focusout", () => {
  if (firstName.value === "") {
    firstName.classList.add("border", "border-2", "border-danger");
  }
  if (firstName.value !== "") {
    firstName.classList.remove("border", "border-2", "border-danger");
  }
});

lastName.addEventListener("focusout", () => {
  if (lastName.value === "") {
    lastName.classList.add("border", "border-2", "border-danger");
  }
  if (lastName.value !== "") {
    lastName.classList.remove("border", "border-2", "border-danger");
  }
});

email.addEventListener("focusout", () => {
  if (email.value === "") {
    email.classList.add("border", "border-2", "border-danger");
  }
  if (email.value !== "") {
    email.classList.remove("border", "border-2", "border-danger");
  }
});

password.addEventListener("focusout", () => {
  if (password.value === "") {
    password.classList.add("border", "border-2", "border-danger");
  }
  if (password.value !== "") {
    password.classList.remove("border", "border-2", "border-danger");
  }
  error.textContent = "";
});

confpass.addEventListener("focusout", () => {
  if (confpass.value === "") {
    confpass.classList.add("border", "border-2", "border-danger");
  }
  if (confpass.value !== "") {
    confpass.classList.remove("border", "border-2", "border-danger");
  }
  error.textContent = "";
});

dob.addEventListener("focusout", () => {
  if (dob.value === "") {
    dob.classList.add("border", "border-2", "border-danger");
  }
  if (dob.value !== "") {
    dob.classList.remove("border", "border-2", "border-danger");
  }
});

// const obj = {};
// obj.title = "text";
// localStorage.setItem("data", JSON.stringify(obj));
// const re = localStorage.getItem("data");
// console.log(typeof re);
// const con = JSON.parse(re);
// console.log(typeof con);
// con.edit = new Date();
// localStorage.setItem("data", JSON.stringify(con));
// const list = [];
// list.push(JSON.stringify(con));
// localStorage.setItem("list", JSON.stringify(list));
// const temp = localStorage.getItem("list");
// const listr = JSON.parse(temp);
// const item = JSON.parse(listr[0]);
// console.log(listr);
// console.log(item);

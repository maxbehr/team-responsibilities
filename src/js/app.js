const axios = require('axios');

let people = null;

axios.get('/config')
.then(function (response) {
  let data = response.data;

  let wrapper = document.getElementById("cor-wrapper");
  let responsibilities = data.responsibilities;

  people = data.people;

  document.querySelector("#intro h1").innerHTML = data.title;
  document.querySelector("#intro p").innerHTML = data.description;

  //  Add responsibilities to DOM
  responsibilities.forEach(r => {
    let row = createRow(r);
    wrapper.appendChild(row);
  });

  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

function createRow(data) {
  let elTitle = document.createElement("div");
  elTitle.className = "responsibility-info";

  //  Title - Name
  let elTitleName = document.createElement("div");
  elTitleName.className = "name";
  elTitleName.innerHTML = data.name;

  elTitle.appendChild(elTitleName);

  //  Title - Description
  if(data.descr) {
    let elTitleDescr = document.createElement("div");
    elTitleDescr.className = "descr";
    elTitleDescr.innerHTML = data.descr;
    elTitle.appendChild(elTitleDescr);
  }

  //  Responsibilities
  let elChain = document.createElement("div");
  elChain.className = "chain";

  if(Array.isArray(data.people)) {
    data.people.forEach(p => {
      let person = people.filter(a => a.id === p)[0];
      elChain.appendChild( createPersonElement(person) )
    });
  } else {
    let person = people.filter(a => a.id === data.people)[0];
    elChain.appendChild(createPersonElement(person));
  }

  let row = document.createElement("div");
  row.className = "cor-row";
  row.appendChild(elTitle);
  row.appendChild(elChain);

  return row;
}

function createPersonElement(person) {
  let el = document.createElement("span");
  //el.innerHTML = person.name;
  el.style.backgroundImage = "url(img/"+ person.id +".jpg)"
  return el;
}
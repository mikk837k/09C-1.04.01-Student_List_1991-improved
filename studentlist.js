"use strict";

window.addEventListener("DOMContentLoaded", init);

let studentArray;
const newStudentArray = [];

const student = {
  fullname: "-fullname-",
  firstname: "-firstname-",
  lastname: "-lastname-",
  imagename: "-imagename-",
  house: "-house-",
  blood_status: "-blood-",
  expelled: "-expelled-",
  inquisitorialSquad: "-inquisitorialSquad-",
  setJSONData: function(studentData) {
    this.fullname = studentData.fullname;
    this.firstname = studentData.firstname;
    this.lastname = studentData.lastname;
    this.imagename = studentData.imagename;
    this.house = studentData.house;
    this.blood_status = studentData.blood_status;
    this.expelled = studentData.expelled;
    this.inquisitorialSquad = studentData.inquisitorialSquad;
  }
};

function init() {
  console.log("init");

  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  getJSON();
  let house = document.querySelectorAll(".filter_Button").forEach(button => {
    button.addEventListener("click", getChosenHouse);
  });
  filterByHouse(house);
}

async function getJSON() {
  console.log("getJSON");
  let myJSON = await fetch("http://petlatkea.dk/2019/hogwarts/students.json");
  studentArray = await myJSON.json();

  generateNewArray();
}

function generateNewArray() {
  console.log("generateNewArray run");
  studentArray.forEach(studentData => {
    const newStudent = Object.create(student);

    newStudent.setJSONData(studentData);
    newStudentArray.push(newStudent);
  });
  console.log(newStudentArray);

  displayStudents(newStudentArray);
}

function displayStudents(students) {
  console.log("displayStudents");
  let destination = document.querySelector("#data_student");
  console.log(destination);
  let myTemplate = document.querySelector("#data_template");

  students.forEach(student => {
    if (student.house == house || house == "all") {
      console.log(myTemplate);
      let clone = myTemplate.cloneNode(true).content;

      // clone.querySelector("img").src = ;
      clone.querySelector("h2").textContent = student.fullname;

      destination.appendChild(clone);
    }
  });
}

function getChosenHouse() {
  console.log("filter has run");

  let house = "all";

  house = this.getAttribute("data-house");

  console.log(house);

  return house;
}
function filterByHouse(chosenHouse) {
  function filterHouse(student) {
    return student.house === chosenHouse;
  }
  return newStudentArray.filter(filterHouse);
}

// function showStudentInfo() {}

// function filterList() {
//   console.log("filterList");

//   displayList();
// }

// function displayList() {
//   console.log("displayList");
// }

// // TODO: Create scaffolding functions for the rest!

// function clickSortByFirst() {}

// function sortListByFirst() {}

"use strict";

window.addEventListener("DOMContentLoaded", init);

let destination = document.querySelector("#data_student");

const newStudentArray = [];

const Student = {
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
    const nameParts = studentData.fullname.split(" ");
    this.firstname = nameParts[0];
    this.lastname = nameParts[nameParts.length - 1];
    const firstletterLower = nameParts[0].substring(0, 1).toLowerCase();
    const lastnameLower = nameParts[nameParts.length - 1].toLowerCase();
    this.imagename = `images/${lastnameLower}_${firstletterLower}`;
    this.house = studentData.house;
    this.blood_status = studentData.blood_status;
    this.expelled = studentData.expelled;
    this.inquisitorialSquad = studentData.inquisitorialSquad;
  }
};

function init() {
  console.log("init");

  // TODO: add event listeners, show modal, find images, and other stuff ...
  document.querySelectorAll(".filter_Button").forEach(button => {
    button.addEventListener("click", filterList);
  });

  getJSON();
}

async function getJSON() {
  console.log("getJSON");
  let myJSON = await fetch("http://petlatkea.dk/2019/hogwarts/students.json");
  const studentArray = await myJSON.json();

  generateNewArray(studentArray);
}

function generateNewArray(studentArray) {
  console.log("generateNewArray run");
  studentArray.forEach(studentData => {
    const newStudent = Object.create(Student);

    newStudent.setJSONData(studentData);
    newStudentArray.push(newStudent);
  });
  console.log(newStudentArray);
  // filterByHouse(newStudentArray);
  displayStudents(newStudentArray);
}

// Create a filter that only filters the list nothing more
function filterList() {
  console.log("filterList");
  const filterHouse = this.dataset.house;

  if (filterHouse == "all") {
    displayStudents(newStudentArray);
  } else {
    const filtered = filterByHouse(filterHouse);
    displayStudents(filtered);
  }
}

function filterByHouse(house) {
  console.log("filterByHouse  ");
  function filterHouse(student) {
    return student.house === house;
  }
  return newStudentArray.filter(filterHouse);
  sortList();
}

// Create a sort filter that only sorts the list
function sortList() {}
// TODO: create a function that only generates

function displayStudents(list) {
  console.log("displayStudents");
  destination.textContent = "";

  list.forEach(displayStudent);
}

function displayStudent(student) {
  console.log("displayStudent");

  let myTemplate = document.querySelector("#data_template");

  let clone = myTemplate.cloneNode(true).content;
  clone.querySelector("h2").textContent = student.fullname;

  destination.appendChild(clone);
}

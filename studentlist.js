"use strict";

window.addEventListener("DOMContentLoaded", init);

let destination = document.querySelector("#data_student");
let chosenHouse = "all";
let chosenSorting = "";

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
    button.addEventListener("click", getChosenHouse);
  });

  document.querySelectorAll(".sort_Button").forEach(button => {
    button.addEventListener("click", getChosenSorting);
  });

  function getChosenHouse() {
    console.log("getChosenHouse");
    chosenHouse = this.dataset.house;
    filterList(chosenHouse);
  }

  function getChosenSorting() {
    console.log("getSortType");
    chosenSorting = this.dataset.sort;

    filterList(chosenHouse);
  }

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
function filterList(chosenHouse) {
  console.log("filterList");

  if (chosenHouse == "all") {
    sortList(chosenSorting, newStudentArray);
  } else {
    const filteredList = filterByHouse(chosenHouse);
    sortList(chosenSorting, filteredList);
  }
}

function filterByHouse(house) {
  console.log("filterByHouse  ");
  function chosenHouse(student) {
    return student.house === house;
  }
  return newStudentArray.filter(chosenHouse);
}

function sortList(chosenSorting, list) {
  console.log("sortList");

  let sorted;
  if (chosenSorting === "") {
    sorted = list;
  }
  if (chosenSorting == "firstname") {
    sorted = list.sort(sortByFirstname);
  } else if (chosenSorting == "lastname") {
    sorted = list.sort(sortByLastname);
  } else {
    sorted = list.sort(sortByHouse);
  }
  displayStudents(sorted);
}

function sortByFirstname(a, b) {
  // console.log("sortByFirstname");
  if (a.firstname < b.firstname) {
    return -1;
  } else {
    return 1;
  }
}
function sortByLastname(a, b) {
  // console.log("sortByLastname");
  if (a.lastname < b.lastname) {
    return -1;
  } else {
    return 1;
  }
}
function sortByHouse(a, b) {
  // console.log("sortByHouse");
  if (a.house < b.house) {
    return -1;
  } else {
    return 1;
  }
}

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
  clone.querySelector("p").textContent = student.house;
  clone.querySelector("img").src = "image/" + student.imagename;

  destination.appendChild(clone);
}

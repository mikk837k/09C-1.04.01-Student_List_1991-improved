"use strict";

window.addEventListener("DOMContentLoaded", initial);

function initial() {
  let chosenStudent = document.querySelector("h2");
  chosenStudent.addEventListener("click", showStudentDetail);
}

function showStudentDetail() {
  console.log("showStudentDetail");
  let modal = document.querySelector("#modal");

  modal.classList.add("show");
  modal.querySelector("div").addEventListener("click", hideModal);
}

function hideModal() {
  let modal = document.querySelector("#modal");
  console.log("hideModal");
  modal.classList.remove("show");
}

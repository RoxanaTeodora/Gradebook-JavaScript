import { students } from "./data/students.js";
import {
  addStudentsRowsToTable,
  addNewRowtoStudentTable,
  sortStudentsTable,
  updateGradeTable,
  calculateAverage,
  updateStudentsAverages,
} from "./utilis.js";

updateStudentsAverages(students);

const studentNameInput = document.getElementById("add-student-name");
const addstudentBtn = document.getElementById("add-student-btn");
const gradesTableContainer = document.getElementById("grades-table-container");
const studentTableBody = document.getElementById("students-table-body");

studentNameInput.addEventListener("keyup", addNewStudent);
addstudentBtn.addEventListener("click", addNewStudent);
let selectedStudent;

//obiect care urmeaza sa fie modificat si importat din ./data/student.js

window.addEventListener("load", () =>
  addStudentsRowsToTable(students, studentTableBody)
);

function addNewStudent(e) {
  //cand se da click pe enter sau pe btn
  if (e.key === "Enter" || e.target.id === "add-student-btn") {
    //console.log("Enter sau click");
    // addNewStudent(studentNameInput, students);
    const student = { name: studentNameInput.value, medieNote: 0, note: [] };
    //adaugam un array de obiecte
    addNewRowtoStudentTable(student, studentTableBody);
  }
}

//adaugarea unui student nou la tabelul de studenti

//sortarea numelui

const sortAscByNamebtn = document.getElementById("sort-name-asc");
const sortDesByNamebtn = document.getElementById("sort-name-des");

sortAscByNamebtn.addEventListener("click", () =>
  sortStudentsTable(students, "Asc", "name", studentTableBody)
);
sortDesByNamebtn.addEventListener("click", () =>
  sortStudentsTable(students, "Desc", "name", studentTableBody)
);

//cu functia in utit de sortate in ordine asc si desc a numelui

//sortarea mediei

const sortAscMedieByNamebtn = document.getElementById("sort-medie-asc");
const sortDescMedieByNamebtn = document.getElementById("sort-medie-des");

sortAscMedieByNamebtn.addEventListener("click", () =>
  sortStudentsTable(students, "Asc", "medieNote", studentTableBody)
);

sortDescMedieByNamebtn.addEventListener("click", () =>
  sortStudentsTable(students, "Desc", "medieNote", studentTableBody)
);

//stergerea si afisarea individuala a studentilor

const tabelBody = document.getElementById("students-table-body");
const gradesTableBody = document.getElementById("grades-table");

tabelBody.addEventListener("click", handleStudentActions);
gradesTableBody.addEventListener("click", handleGradesAction);

function handleStudentActions(e) {
  if (e.target.classList.contains("delete-student")) {
    //console.log("x");
    e.target.parentNode.parentNode.remove();
  } else if (e.target.classList.contains("show-grades")) {
    //console.log("note");
    const buttonId = e.target.id;
    selectedStudent = students.find((student) => buttonId === student.id);
    gradesTableContainer.classList.remove("hide-grades");
    //updateGradeTable(selectedStudent, gradesTableBody);
    console.log(selectedStudent);
  }
}

//stergerea notelor

function handleGradesAction(e) {
  //stundetul cu id-ul specific cu nota cu index-ul specific
  //console.log(e.target.id);
  if (e.target.classList.contains("delete-grade")) {
    const gradeIndex = Number(e.target.id);
    //console.log("grade index= ", gradeIndex);
    selectedStudent.note.splice(gradeIndex, 1);
    selectedStudent.medieNote = calculateAverage(selectedStudent.note);
    addStudentsRowsToTable(selectedStudent, studentTableBody);
    //updateGradeTable();
    //calculare medie +update tabel studenti
    e.target.parentNode.parentNode.remove();
  }
}

//adaugare note din input in array-ul de note pt ficare student

const gradeInput = document.getElementById("grade-input");
const addGradeBtn = document.getElementById("add-grade-btn");

addGradeBtn.addEventListener("click", addGrade);

function addGrade() {
  const grade = Number(gradeInput.value);
  selectedStudent.note.push(grade);
  // calculul mediei notelor

  selectedStudent.medieNote = calculateAverage(selectedStudent.note);
  // actualizarea tabelului de note
  updateGradeTable(selectedStudent, gradesTableBody);
  //update tabel student
  // updateStudentsAverages(students);
  addStudentsRowsToTable(selectedStudent, studentTableBody);
}

const hideGradesBtn = document.getElementById("hide-grades");
hideGradesBtn.addEventListener("click", hideGradesContainer);

function hideGradesContainer() {
  //cand se apassa pe butonul ascunde note dispare tabelul cu note
  gradesTableContainer.classList.add("hide-grades");
}

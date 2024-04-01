import { students } from "./data/students.js";

const studentNameinput = document.getElementById("elev-input");
const addStudentBtn = document.getElementById("addStudentButton");
const gradesTableShow = document.getElementById("note_elev_wrapper");
// const tableData = document.getElementById("tabel-Elevi");
let selectedStudent;

//Varianta 1
// input.addEventListener("input", onType);
// function onType() {
//   console.log(input.value);
// }

// addButton.addEventListener("click", onAddStudent);
// function onAddStudent() {
//   const td = document.createElement("td");
//   const tr = document.createElement("tr");
//   td.innerHTML = input.value; // Folosim input.value pentru a obține valoarea introdusă in interiorul lui td
//   tr.appendChild(td);
//   tableData.appendChild(tr);
// }

//Varianta 2 ---------

//adaugarea elevilor
studentNameinput.addEventListener("keyup", addNewStudent); //eveiment la apasarea tastei enter de pe tastatura
addStudentBtn.addEventListener("click", addNewStudent);

// const students = [
//   {
//     name: "Oprea Alin",
//     medieNote: 9.5,
//     note: [9, 8, 10, 7, 9],
//     id: "1",
//   },
//   {
//     name: "Vasilescu Cristian",
//     medieNote: 7.5,
//     note: [7, 8, 6, 8, 7],
//     id: "2",
//   },
//   { name: "Maria Mihaila", medieNote: 9.2, note: [10, 9, 9, 8, 9], id: "3" },
// ]; //obiect care urmeaza sa fie modificat si importat din ./data/student.js

window.addEventListener("load", () => addStudentsToTable(students));

function addNewStudent(e) {
  if (e.key === "Enter" || e.target.id == "addStudentButton") {
    const name = studentNameinput.value;
    students.push({ name: name, medieNote: 0, note: [] });
    addStudentsToTable(students);
  }
}

function addStudentsToTable() {
  document.getElementById("tabel-Elevi").innerHTML = students
    .map(
      (student) => `
  <tr>
  <td>${student.name}</td>
  <td>${student.medieNote.toFixed(2)}</td>
  <td> <button class="showGrades" id=${
    student.id
  }>Vezi / Adauga note</button></td>
  <td> <button class="deleteButton" >X</button></td>`
    )
    .join(" ");
}

//{student.medieNote.toFixed(2)} a.i sa arate doar doua zecimale
// function addStudentsToTable(students) devine doar function addStudentsToTable()
//students sunt o variabila globala

// Sortare nume elevi--------------

const sortAscByNameBtn = document.getElementById("sort-name-asc");
const sortDescByNameBtn = document.getElementById("sort-name-desc");

sortAscByNameBtn.addEventListener("click", sortStudentsByNameAsc);
sortDescByNameBtn.addEventListener("click", sortStudentsByNameDesc);

function sortStudentsByNameAsc() {
  // console.log("asc");
  students.sort((student1, student2) =>
    student1.name.localeCompare(student2.name)
  );

  console.log(students);
  addStudentsToTable(students);
}

function sortStudentsByNameDesc() {
  // console.log("desc");
  students.sort((student1, student2) =>
    student2.name.localeCompare(student1.name)
  );
  console.log(students);
  addStudentsToTable(students);
}

//sortare note elevi---------------

const sortAscByMedieBtn = document.getElementById("sort-medie-asc");
const sortDescByMedieBtn = document.getElementById("sort-medie-desc");

sortAscByMedieBtn.addEventListener("click", sortStudentsByMedieAsc);
sortDescByMedieBtn.addEventListener("click", sortStudentsByMedieDesc);

function sortStudentsByMedieAsc() {
  students.sort(
    (student1, student2) => student1.medieNote - student2.medieNote
  );
  console.log(students);
  addStudentsToTable(students);
}

function sortStudentsByMedieDesc() {
  students.sort(
    (student1, student2) => student2.medieNote - student1.medieNote
  );
  console.log(students);
  addStudentsToTable(students);
}

//Stergerea elevilor si accesare note pt fiecare student-------------

const tableBody = document.getElementById("tabel-Elevi");
const gradesTableContainer = document.getElementById("students-grades");
const nameStudentShow = document.getElementById("name-student");

tableBody.addEventListener("click", handleSutdentsAction); //prin apasarea butonului vor rezulta mai multe actiuni
gradesTableContainer.addEventListener("click", handleGradesAction);

//daca apasam pe butonul cu clasa mentionata atunci ar trebui sa se intample o actiune specifica

function handleSutdentsAction(e) {
  if (e.target.classList.contains("deleteButton")) {
    // console.log("delete");
    e.target.parentElement.parentElement.remove(); //e.target.parentElement.remove() sterge td in care se afla butonul nu tot tr din care face parte
  } else if (e.target.classList.contains("showGrades")) {
    // console.log("show");
    const studentId = e.target.id;
    gradesTableShow.classList.remove("hide-grades"); //cand se apasa butonul 'vezi' clasa hide cu display:none este scoasa
    selectedStudent = students.find((student) => studentId === student.id);
    // console.log(student);
    gradesTableContainer.innerHTML = selectedStudent.note
      .map(
        (grade, index) =>
          `<tr>
      <td>${grade}</td>
      <td><button id=${index} class="deleteButton">X</button></td>
      </tr>`
      )
      .join("");
  }
  // console.log(selectedStudent.name);
  nameStudentShow.innerHTML = selectedStudent.name;
}

//stergerea notelor----------------

function handleGradesAction(e) {
  if (e.target.classList.contains("deleteButton")) {
    const gradeIndex = Number(e.target.id);
    console.log(gradeIndex);
    selectedStudent.note.splice(gradeIndex, 1); //sterge prin metoda splice o sg nota din array
    // console.log(selectedStudent.note);
    addStudentsToTable();
    selectedStudent.medieNote = calculateAverage(selectedStudent.note);
    gradesTableContainer.innerHTML = selectedStudent.note
      .map(
        (grade, index) =>
          `<tr>
    <td>${grade}</td>
    <td><button id=${index} class="deleteButton">X</button></td>
    </tr>`
      )
      .join("");
  }
}

//adaugarea notelor studentilor----------------------

const gradeInput = document.getElementById("grade-input");
const addButtonNote = document.getElementById("addButtonNote");

addButtonNote.addEventListener("click", addGrade);

function addGrade() {
  const grade = Number(gradeInput.value);
  selectedStudent.note.push(grade);
  //calculateAverage(selectedStudent.note);
  //updateStudentsAverages();
  addStudentsToTable();
  // console.log(grade);
  selectedStudent.medieNote = calculateAverage(selectedStudent.note);
  gradesTableContainer.innerHTML = selectedStudent.note
    .map(
      (grade, index) =>
        `<tr>
  <td>${grade}</td>
  <td><button id=${index} class="deleteButton">X</button></td>
  </tr>`
    )
    .join("");
}

//ascunderea notelor---------------

const hideGradesBtn = document.getElementById("hideButtonNote");
hideGradesBtn.addEventListener("click", hideGradesContainer);

function hideGradesContainer() {
  gradesTableShow.classList.add("hide-grades"); //la apasarea butonului Ascunde notele apare iar clasa hide cu display:none
  // gradesTableContainer.innerHTML = selectedStudent.name.map(name)=>`<div> ${name}</div>`
}

function calculateAverage(numbers) {
  // return numbers.reduce((total, number) => total + number, 0) / numbers.length;
  // Verifică dacă array-ul este gol
  if (numbers.length === 0) {
    return 0; // Sau orice altă valoare implicită
  }

  // Calculează suma numerelor din array
  const sum = numbers.reduce((total, num) => total + num, 0);
  //reduce() este o functie care reduce un array la o singura valoare
  //reduce are patru parametri acumulator, valoarea curentă, indexul curent și array-ul asupra căruia se aplică reduce()
  //reduce este un callback function, poate fi pasata ca argument unei alte funcții si apelata mai tarziu asincron
  //total este suma care se actualizeaza pe masura ce se introduc numere in arrau-ul de note
  //num reprezinta notele care se modifica in code
  //0 este valoarea de initializare

  // Calculează media
  const average = sum / numbers.length;

  return average;
}

function updateStudentsAverages() {
  students.forEach(
    (student) => (student.medieNote = calculateAverage(student.note))
  );
}
//students este o variabila globala

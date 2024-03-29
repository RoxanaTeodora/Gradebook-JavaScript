const studentNameInput = document.getElementById("add-student-name");
const addstudentBtn = document.getElementById("add-student-btn");

studentNameInput.addEventListener("keyup", addNewStudent);
addstudentBtn.addEventListener("click", addNewStudent);

//array gol cu studenti pt tabel care urmeaza sa fie modificat
const students = [
  {
    name: "Oprea Alin",
    medieNote: 9.5,
    note: [9, 8, 10, 7, 9],
    id: "1",
  },
  {
    name: "Vasilescu Cristian",
    medieNote: 7.5,
    note: [7, 8, 6, 8, 7],
    id: "2",
  },
  { name: "Maria Mihaila", medieNote: 9.2, note: [10, 9, 9, 8, 9], id: "3" },
]; //obiect care urmeaza sa fie modificat si importat din ./data/student.js

function addNewStudent(e) {
  //cand se da clicl pe enter sau pe btn
  if (e.key === "Enter" || e.target.id === "add-student-btn") {
    // console.log("Enter sau click");
    const name = studentNameInput.value;
    //adaugam un array de obiecte
    students.push({ name: name, medieNote: 0, note: [] });
    addStudentsToTable(students);
  }
}

//window.addEventListener("load", addStudentsToTable);

function addStudentsToTable(students) {
  //adaugam la array-ul stundenti cu map un rand pt tabel
  document.getElementById("students-table-body").innerHTML = students
    .map(
      (student) =>
        `<tr>
      <td>${student.name}
      <td>${student.medieNote}</td>
      <td><button>Vezi note</button></td>
      <td><button>Sterge</button></td>
      </tr>
    `
    )
    .join("");
}

const sortAscByNamebtn = document.getElementById("sort-name-asc");
const sortDesByNamebtn = document.getElementById("sort-name-des");

sortAscByNamebtn.addEventListener("click", sortStudentsByAsc);
sortDesByNamebtn.addEventListener("click", sortStudentsByDes);

function sortStudentsByAsc() {
  students.sort((student1, student2) => student1.name - student2.name);
  // addStudentsToTable();
  console.log(students);
}

function sortStudentsByDes() {
  students.sort((student1, student2) => student2.name - student1.name);
  //addStudentsToTable();
}

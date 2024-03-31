//functie de mai sus are ca argumente generale un array de studenti si un id din html
export function addStudentsRowsToTable(students, tabelBodyElement) {
  //adaugam la array-ul stundenti cu map un rand pt tabel
  tabelBodyElement.innerHTML = students
    .map(
      (student) => `
    <tr>
    <td>${student.name}</td>
    <td>${student.medieNote.toFixed(2)}</td>
    <td> <button class="show-grades" id=${
      student.id
    }>Vezi / Adauga note</button></td>
    <td> <button class="delete-student" >X</button></td>
    </tr>`
    )
    .join(" ");
}

export function addNewRowtoStudentTable(student, tabelBodyElement) {
  tabelBodyElement.innerHTML += `
    <tr>
    <td>${student.name}</td>
    <td>${student.medieNote.toFixed(2)}</td>
    <td> <button class="show-grades" id=${
      student.id
    }>Vezi / Adauga note</button></td>
    <td> <button class="delete-student" >X</button></td>
    </tr>`;
}

//student1[by]=== "string"-->student1.name
// student1[by]=== "number"-->  student1.medieNote

export function sortStudentsTable(
  students,
  sortingOrder,
  by,
  tabelBodyElement
) {
  if (sortingOrder === "Asc") {
    students.sort((student1, student2) => {
      if (typeof student1[by] === "string") {
        return student1[by].localeCompare(student2[by]);
      } else {
        return student1[by] - student2[by];
      }
    });
  } else if (sortingOrder === "Desc") {
    students.sort((student1, student2) => {
      if (typeof student1[by] === "string") {
        return student2[by].localeCompare(student1[by]);
      } else {
        return student2[by] - student1[by];
      }
    });
  }
  addStudentsRowsToTable(students, tabelBodyElement);
}

export function updateGradeTable(student, gradesTableBody) {
  gradesTableBody.innerHTML = student.note
    .map(
      (grade, index) =>
        `<tr>
            <td>${grade}</td>
            <td><button id=${index} class="delete-grade">X</button></td>
        <tr>`
    )
    .join("");
}

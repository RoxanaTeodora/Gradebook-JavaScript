// functii utilizate in mod repetat in cod

export function addStudentRowsToTable(students, tableBodyElement) {
  tableBodyElement.innerHTML = students
    .map(
      (student) => `
    <tr>
    <td>${student.name}</td>
    <td>${student.medieNote}</td>
    <td> <button class="showGrades" id=${student.id}>Vezi / Adauga note</button></td>
    <td> <button class="deleteButton" >X</button></td>`
    )
    .join(" ");
}

// functia este modificata pentru a preciza faptul ca ii atribuim doi parametri: array de students si un id pt a forma un tabel

export function addNewRowToStudentsTable(student, tableBodyElement) {
  tableBodyElement.innerHTML += `
      <tr>
         <td>${student.name}</td>
         <td>${student.medieNote}</td>
         <td><button id=${student.id} class="show-grades">Vezi/Adauga note</button></td>
         <td><button  class="delete-student">X</button></td>
      </tr>
   `;
}

// export function addNewStudent(input, students) {
//   const name = input.value;
//   students.push({ name: name, medieNote: 0, note: [] });
// }

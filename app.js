const studentNameInput = document.getElementById("add-student-name");
const addstudentBtn = document.getElementById("add-student-btn");

studentNameInput.addEventListener("keyup", addstudentBtn);
addstudentBtn.addEventListener("click", addNewStudent);

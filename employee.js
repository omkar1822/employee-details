let form = document.getElementById("employeeForm");
let table = document.getElementById("employeeTable");
let totalEmployees = document.getElementById("totalEmployees");
let totalSalary = document.getElementById("totalSalary");
let highestSalary = document.getElementById("highestSalary");
let employees = [];
let editIndex = null;
function updateDashboard() {
    totalEmployees.textContent = employees.length;
    let salaries = employees.map(e => e.salary);
    let sum = salaries.reduce((a, b) => a + b, 0);
    totalSalary.textContent = `₹${sum}`;
    highestSalary.textContent = salaries.length ? `₹${Math.max(...salaries)}` : "₹0";
}
function renderTable() {
    table.innerHTML = "";
    employees.forEach((emp, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>₹${emp.salary}</td>
        <td>
          <button class="action-btn edit">Edit</button>
          <button class="action-btn delete">Delete</button>
        </td>`;
        row.querySelector(".delete").addEventListener("click", () => {
            employees.splice(index, 1);
            renderTable();
            updateDashboard();
        });
        row.querySelector(".edit").addEventListener("click", () => {
            document.getElementById("name").value = emp.name;
            document.getElementById("department").value = emp.department;
            document.getElementById("salary").value = emp.salary;
            editIndex = index;
        });

        table.appendChild(row);
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let salary = Number(document.getElementById("salary").value);
    let employee = { name, department, salary };
    if (editIndex !== null) {
        employees[editIndex] = employee;
        editIndex = null;
    } else {
        employees.push(employee);
    }
    form.reset();
    renderTable();
    updateDashboard();
});



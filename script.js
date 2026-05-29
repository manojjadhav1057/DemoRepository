const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const submitBtn = document.getElementById('submitBtn');

// READ: Load and display data on startup
function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userTableBody.innerHTML = users.map((user, index) => `
        <tr>
            <td>${user.name}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// CREATE & UPDATE: Handle form submission
userForm.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (id === "") { 
        // INSERT (Create)
        users.push({ name });
    } else { 
        // UPDATE
        users[id].name = name;
        submitBtn.innerText = "Add User";
        document.getElementById('userId').value = "";
    }

    localStorage.setItem('users', JSON.stringify(users));
    userForm.reset();
    displayUsers();
};

// EDIT: Prepare form for update
window.editUser = (index) => {
    const users = JSON.parse(localStorage.getItem('users'));
    document.getElementById('userName').value = users[index].name;
    document.getElementById('userId').value = index;
    submitBtn.innerText = "Update User";
};

// DELETE: Remove item from array
window.deleteUser = (index) => {
    if (confirm("Delete this user?")) {
        let users = JSON.parse(localStorage.getItem('users'));
        users.splice(index, 1); // Remove 1 item at index
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }
};

// Initial Load
displayUsers();
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const appSetting = {
    databaseURL: "https://crudmark-2354d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const usersListInDB = ref(database, "users");

const idEl = document.querySelector("#id");
const nameEl = document.querySelector("#name");
const ageEl = document.querySelector("#age");
const cityEl = document.querySelector("#city");
const frmsubmitEl = document.querySelector("#frm");
const tblbody = document.querySelector("#tblbody");

// Function to render user list in table
const renderUsers = (users) => {
    tblbody.innerHTML = "";
    let index = 1;
    for (const key in users) {
        const { name, age, city } = users[key];

        tblbody.innerHTML += `
            <tr>
                <td>${index++}</td>
                <td>${name}</td>
                <td>${age}</td>
                <td>${city}</td>
                <td><button onclick="editUser('${key}')"><ion-icon name="create-outline"></ion-icon></button></td>
                <td><button onclick="deleteUser('${key}')"><ion-icon name="trash-outline"></ion-icon></button></td>
            </tr>
        `;
    }
};

// Fetch and display users
onValue(usersListInDB, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        renderUsers(data);
    } else {
        tblbody.innerHTML = "<tr><td colspan='6'>No users found</td></tr>";
    }
});

// Add or update user
frmsubmitEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!nameEl.value.trim() || !ageEl.value.trim() || !cityEl.value.trim()) {
        alert("Please fill all details");
        return;
    }

    const newUser = {
        name: nameEl.value.trim(),
        age: ageEl.value.trim(),
        city: cityEl.value.trim(),
    };

    if (idEl.value) {
        // Update user
        const userRef = ref(database, `users/${idEl.value}`);
        set(userRef, newUser);
        alert("User updated successfully");
        idEl.value = ""; // Reset form
    } else {
        // Add new user
        push(usersListInDB, newUser);
        alert("User added successfully");
    }

    frmsubmitEl.reset();
});

// Delete user
window.deleteUser = (userId) => {
    const userRef = ref(database, `users/${userId}`);
    remove(userRef);
    alert("User deleted successfully");
};

// Edit user
window.editUser = (userId) => {
    const userRef = ref(database, `users/${userId}`);
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        idEl.value = userId; // Store user ID in hidden field
        nameEl.value = data.name;
        ageEl.value = data.age;
        cityEl.value = data.city;
    });
};

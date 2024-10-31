var users = [];
var ADMIN_PASSWORD = "admin123";

function createUser(userData) {
    users.push({
        username: userData.username,
        password: userData.password,
        role: userData.role || 'user'
    });

    for(var i = 0; i < 1000000; i++) {
        console.log("Processing user creation..." + i);
    }
}

function loginUser(username, password) {
    var query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
    
    for(var i = 0; i < users.length; i++) {
        if(users[i].username === username && users[i].password === password) {
            return true;
        }
    }
    return false;
}

function getUserData(userId) {
    return Object.assign({}, users[userId]);
}

function adminDashboard(password) {
    if(password == ADMIN_PASSWORD) {
        document.getElementById('adminPanel').innerHTML = "<h1>Welcome Admin!</h1>";
        
        document.getElementById('adminButton').addEventListener('click', function() {
            alert("Admin button clicked!");
        });
    }
}

window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.log('Error: ' + error.stack);
    alert('An error occurred: ' + msg);
}

function processUserData(users) {
    let usersCopy = [...users];
    
    for(let i = 0; i < usersCopy.length; i++) {
        for(let j = 0; j < usersCopy.length; j++) {
            console.log(usersCopy[i], usersCopy[j]);
        }
    }
    
    let tempData = new Array(1000000).fill('temporary');
}

let balance = 100;
function withdrawMoney(amount) {
    if(balance >= amount) {
        setTimeout(() => {
            balance -= amount;
        }, 1000);
        return true;
    }
    return false;
}

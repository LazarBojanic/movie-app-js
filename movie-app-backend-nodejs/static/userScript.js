function init(){
  getAllUsers();
  getUserById();
  createUser();
  updateUserById();
  deleteUserById();
}

function deleteAllTableRows(){
  var table = document.getElementById("userTable");

  for(var i = table.rows.length - 1; i > 0; i--){
      table.deleteRow(i);
  }
}

function updateUserById(){
  document.getElementById('updateUserButton').addEventListener('click', e => {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const data = {
            username: document.getElementById('newUsername').value,
            email: document.getElementById('newEmail').value,
            pass: document.getElementById('newPass').value,
            userRole: document.getElementById('newUserRole').value
        };
        document.getElementById('newUsername').value = '';
        document.getElementById('newEmail').value = '';
        document.getElementById('newPass').value = '';
        document.getElementById('newUserRole').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/user/update/' + userId, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllUsers();
    });
}
function deleteUserById(){
  document.getElementById('deleteUserButton').addEventListener('click', e => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/user/delete/' + userId, {
        method: 'DELETE',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
    });
    getAllUsers();
    });
}

function bindUsersToTable(data){
    var table = document.getElementById('userTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.email + '</td>' +
        '<td>' + object.username + '</td>' +
        '<td>' + object.userRole + '</td>';
        table.appendChild(tr);
    });
}
function bindUserToTable(data){
    var table = document.getElementById('userTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.email + '</td>' +
        '<td>' + data.username + '</td>' +
        '<td>' + data.userRole + '</td>';
        table.appendChild(tr);
}
function getAllUsers() {
  deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/user/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindUsersToTable(res);
    });
}
function createUser() {
    document.getElementById('createUserButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            pass: document.getElementById('pass').value,
            userRole: document.getElementById('userRole').value
        };
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('pass').value = '';
        document.getElementById('userRole').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/user/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllUsers();
    });
}
function loginUser(){
    document.getElementById('loginUserButton').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            pass: document.getElementById('pass').value
        };

        fetch('http://localhost:8500/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } 
                else {
                    document.cookie = `token=${el.token};SameSite=Lax; path=/`;
                    fetch('http://localhost:8500/auth/getTokenRole', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(el)
                    })
                        .then(res => res.json())
                        .then(res => {
                            if(res.userRole == 'admin'){
                                window.location.href = 'http://localhost:9000/admin/mainAdmin';
                            }
                            else if(res.userRole == 'moderator'){
                                window.location.href = 'http://localhost:9000/admin/mainModerator';
                            }
                            else if(res.userRole == 'client'){
                                window.location.href = 'http://localhost:9000/admin/mainModerator';
                            }
                        });
                }
            });
    });
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function getUserById() {
    document.getElementById('getUserByIdButton').addEventListener('click', e => {
        e.preventDefault();
        deleteAllTableRows();
        const userId = document.getElementById('userId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/user/get/' + userId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindUserToTable(res);
        });
        
    });
}
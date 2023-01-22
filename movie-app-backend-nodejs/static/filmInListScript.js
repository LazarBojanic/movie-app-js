function init(){
    getAllFilmsInLists();
    getFilmInListById();
    createFilmInList();
    updateFilmInListById();
    deleteFilmInListById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("filmInListTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateFilmInListById(){
    document.getElementById('updateFilmInListButton').addEventListener('click', e => {
          e.preventDefault();
          const filmInListId = document.getElementById('filmInListId').value;
          const data = {
            filmId: parseInt(document.getElementById('newFilmId').value),
            filmListId: parseInt(document.getElementById('newFilmListId').value)
          };
          console.log(data.filmInListName);
          document.getElementById('newFilmId').value = '';
          document.getElementById('newFilmListId').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/filmInList/update/' + filmInListId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllFilmsInLists();
      });
  }
  function deleteFilmInListById(){
    document.getElementById('deleteFilmInListButton').addEventListener('click', e => {
      e.preventDefault();
      const filmInListId = document.getElementById('filmInListId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/filmInList/delete/' + filmInListId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllFilmsInLists();
      });
  }


function bindFilmsInLibrariesToTable(data){
    var table = document.getElementById('filmInListTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.filmId + '</td>' +
        '<td>' + object.filmListId + '</td>';
        table.appendChild(tr);
    });
}
function bindFilmInListToTable(data){
    var table = document.getElementById('filmInListTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.filmId + '</td>' +
        '<td>' + data.filmListId + '</td>';
        table.appendChild(tr);
}
function getAllFilmsInLists() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/filmInList/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindFilmsInLibrariesToTable(res);
    });
}
function createFilmInList() {
    document.getElementById('createFilmInListButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            filmId: parseInt(document.getElementById('filmId').value),
            filmListId: parseInt(document.getElementById('filmListId').value)
        };
        document.getElementById('filmId').value = '';
        document.getElementById('filmListId').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/filmInList/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllFilmsInLists();
    });
}
function getCookie(cname) {
    console.log('decoding cookie');
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
function getFilmInListById() {
    document.getElementById('getFilmInListByIdButton').addEventListener('click', e => {
        
        e.preventDefault();
        deleteAllTableRows();
        const filmInListId = document.getElementById('filmInListId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/filmInList/get/' + filmInListId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindFilmInListToTable(res);
        });
    });
}
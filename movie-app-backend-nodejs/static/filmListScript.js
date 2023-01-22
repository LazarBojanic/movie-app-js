function init(){
    getAllFilmLists();
    getFilmListById();
    createFilmList();
    updateFilmListById();
    deleteFilmListById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("filmListTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateFilmListById(){
    document.getElementById('updateFilmListButton').addEventListener('click', e => {
          e.preventDefault();
          const filmListId = document.getElementById('filmListId').value;
          const data = {
            serviceUserId: parseInt(document.getElementById('newServiceUserId').value),
            filmListName: document.getElementById('newFilmListName').value,
            averageRating: parseFloat(document.getElementById('newAverageRating').value)
          };
          console.log(data.filmListName);
          document.getElementById('newServiceUserId').value = '';
          document.getElementById('newFilmListName').value = '';
          document.getElementById('newAverageRating').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/filmList/update/' + filmListId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllFilmLists();
      });
  }
  function deleteFilmListById(){
    document.getElementById('deleteFilmListButton').addEventListener('click', e => {
      e.preventDefault();
      const filmListId = document.getElementById('filmListId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/filmList/delete/' + filmListId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllFilmLists();
      });
  }


function bindFilmsInLibrariesToTable(data){
    var table = document.getElementById('filmListTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.serviceUserId + '</td>' +
        '<td>' + object.filmListName + '</td>' +
        '<td>' + object.averageRating + '</td>';
        table.appendChild(tr);
    });
}
function bindFilmListToTable(data){
    var table = document.getElementById('filmListTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.serviceUserId + '</td>' +
        '<td>' + data.filmListName + '</td>' +
        '<td>' + data.averageRating + '</td>';
        table.appendChild(tr);
}
function getAllFilmLists() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/filmList/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindFilmsInLibrariesToTable(res);
    });
}
function createFilmList() {
    document.getElementById('createFilmListButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            serviceUserId: parseInt(document.getElementById('serviceUserId').value),
            filmListName: document.getElementById('filmListName').value,
            averageRating: parseFloat(document.getElementById('averageRating').value)
        };
        document.getElementById('serviceUserId').value = '';
        document.getElementById('filmListName').value = '';
        document.getElementById('averageRating').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/filmList/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllFilmLists();
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
function getFilmListById() {
    document.getElementById('getFilmListByIdButton').addEventListener('click', e => {
        
        e.preventDefault();
        deleteAllTableRows();
        const filmListId = document.getElementById('filmListId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/filmList/get/' + filmListId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindFilmListToTable(res);
        });
    });
}
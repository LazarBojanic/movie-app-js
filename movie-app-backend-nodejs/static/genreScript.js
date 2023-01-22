function init(){
    getAllGenres();
    getGenreById();
    createGenre();
    updateGenreById();
    deleteGenreById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("genreTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateGenreById(){
    document.getElementById('updateGenreButton').addEventListener('click', e => {
          e.preventDefault();
          const genreId = document.getElementById('genreId').value;
          const data = {
              genreName: document.getElementById('newGenreName').value
          };
          console.log(data.genreName);
          document.getElementById('genreName').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/genre/update/' + genreId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllGenres();
      });
  }
  function deleteGenreById(){
    document.getElementById('deleteGenreButton').addEventListener('click', e => {
      e.preventDefault();
      const genreId = document.getElementById('genreId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/genre/delete/' + genreId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllGenres();
      });
  }


function bindGenresToTable(data){
    var table = document.getElementById('genreTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.genreName + '</td>';
        table.appendChild(tr);
    });
}
function bindGenreToTable(data){
    var table = document.getElementById('genreTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.genreName + '</td>';
        table.appendChild(tr);
}
function getAllGenres() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/genre/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindGenresToTable(res);
    });
}
function createGenre() {
    document.getElementById('createGenreButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            genreName: document.getElementById('genreName').value
        };
        document.getElementById('genreName').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/genre/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllGenres();
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
function getGenreById() {
    document.getElementById('getGenreByIdButton').addEventListener('click', e => {
        
        e.preventDefault();
        deleteAllTableRows();
        const genreId = document.getElementById('genreId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/genre/get/' + genreId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindGenreToTable(res);
        });
    });
}
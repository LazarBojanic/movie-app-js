function init(){
    getAllFilms();
    getFilmById();
    createFilm();
    updateFilmById();
    deleteFilmById();
  }


function deleteAllTableRows(){
    var table = document.getElementById("filmTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateFilmById(){
    document.getElementById('updateFilmButton').addEventListener('click', e => {
          e.preventDefault();
          
          const filmId = document.getElementById('filmId').value;
          const data = {
            title: document.getElementById('newTitle').value,
            rating: parseFloat(document.getElementById('newRating').value),
            synopsis: document.getElementById('newSynopsis').value,
            releaseYear: parseInt(document.getElementById('newReleaseYear').value),
            imageUrl: document.getElementById('newImageUrl').value,
            studioId: parseInt(document.getElementById('newStudioId').value),
            genreId: parseInt(document.getElementById('newGenreId').value),
            countryId: parseInt(document.getElementById('newCountryId').value)
          };
          document.getElementById('newTitle').value = '';
          document.getElementById('newRating').value = '';
          document.getElementById('newSynopsis').value = '';
          document.getElementById('newReleaseYear').value = '';
          document.getElementById('newImageUrl').value = '';
          document.getElementById('newStudioId').value = '';
          document.getElementById('newGenreId').value = '';
          document.getElementById('newCountryId').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/film/update/' + filmId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllFilms();
      });
  }
  function deleteFilmById(){
    document.getElementById('deleteFilmButton').addEventListener('click', e => {
      e.preventDefault();
      const filmId = document.getElementById('filmId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/film/delete/' + filmId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllFilms();
      });
  }



function bindFilmsToTable(data){
    var table = document.getElementById('filmTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.title + '</td>' +
        '<td>' + object.rating + '</td>' +
        '<td>' + object.synopsis + '</td>' +
        '<td>' + object.releaseYear + '</td>' +
        '<td>' + object.imageUrl + '</td>' +
        '<td>' + object.studioId + '</td>'+
        '<td>' + object.genreId + '</td>' +
        '<td>' + object.countryId + '</td>';
        table.appendChild(tr);
    });
}
function bindFilmToTable(data){
    var table = document.getElementById('filmTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.title + '</td>' +
        '<td>' + data.rating + '</td>' +
        '<td>' + data.synopsis + '</td>' +
        '<td>' + data.releaseYear + '</td>' +
        '<td>' + data.imageUrl + '</td>' +
        '<td>' + data.studioId + '</td>' +
        '<td>' + data.genreId + '</td>' +
        '<td>' + data.countryId + '</td>';
        table.appendChild(tr);
}
function getAllFilms() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/film/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindFilmsToTable(res);
    });
}
function createFilm() {
    document.getElementById('createFilmButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            title: document.getElementById('title').value,
            rating: parseFloat(document.getElementById('rating').value),
            synopsis: document.getElementById('synopsis').value,
            releaseYear: parseInt(document.getElementById('releaseYear').value),
            imageUrl: document.getElementById('imageUrl').value,
            studioId: parseInt(document.getElementById('studioId').value),
            genreId: parseInt(document.getElementById('genreId').value),
            countryId: parseInt(document.getElementById('countryId').value)
        };
        document.getElementById('title').value = '';
        document.getElementById('rating').value = '';
        document.getElementById('synopsis').value = '';
        document.getElementById('releaseYear').value = '';
        document.getElementById('imageUrl').value = '';
        document.getElementById('studioId').value = '';
        document.getElementById('genreId').value = '';
        document.getElementById('countryId').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/film/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllFilms();
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
function getFilmById() {
    document.getElementById('getFilmByIdButton').addEventListener('click', e => {
        e.preventDefault();
        deleteAllTableRows();
        const filmId = document.getElementById('filmId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/film/get/' + filmId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindFilmToTable(res);
        });
    });
}
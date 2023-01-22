function init(){
    getAllFilmsInLibraries();
    getFilmInLibraryById();
    createFilmInLibrary();
    updateFilmInLibraryById();
    deleteFilmInLibraryById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("filmInLibraryTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateFilmInLibraryById(){
    document.getElementById('updateFilmInLibraryButton').addEventListener('click', e => {
          e.preventDefault();
          const filmInLibraryId = document.getElementById('filmInLibraryId').value;
          const data = {
            filmId: parseInt(document.getElementById('newFilmId').value),
            serviceUserId: parseInt(document.getElementById('newServiceUserId').value),
            liked: document.getElementById('newLiked').value,
            watched: document.getElementById('newWatched').value,
            reviewed: document.getElementById('newReviewed').value,
            review: document.getElementById('newReview').value
          };
          console.log(data.filmInLibraryName);
          document.getElementById('newFilmId').value = '';
          document.getElementById('newServiceUserId').value = '';
          document.getElementById('newLiked').value = '';
          document.getElementById('newWatched').value = '';
          document.getElementById('newReviewed').value = '';
          document.getElementById('newReview').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/filmInLibrary/update/' + filmInLibraryId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllFilmsInLibraries();
      });
  }
  function deleteFilmInLibraryById(){
    document.getElementById('deleteFilmInLibraryButton').addEventListener('click', e => {
      e.preventDefault();
      const filmInLibraryId = document.getElementById('filmInLibraryId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/filmInLibrary/delete/' + filmInLibraryId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllFilmsInLibraries();
      });
  }


function bindFilmsInLibrariesToTable(data){
    var table = document.getElementById('filmInLibraryTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.filmId + '</td>' +
        '<td>' + object.serviceUserId + '</td>'+
        '<td>' + object.liked + '</td>' +
        '<td>' + object.watched + '</td>' +
        '<td>' + object.reviewed + '</td>' +
        '<td>' + object.review + '</td>';
        table.appendChild(tr);
    });
}
function bindFilmInLibraryToTable(data){
    var table = document.getElementById('filmInLibraryTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.filmId + '</td>' +
        '<td>' + data.serviceUserId + '</td>'+
        '<td>' + data.liked + '</td>' +
        '<td>' + data.watched + '</td>' +
        '<td>' + data.reviewed + '</td>' +
        '<td>' + data.review + '</td>';
        table.appendChild(tr);
}
function getAllFilmsInLibraries() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/filmInLibrary/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindFilmsInLibrariesToTable(res);
    });
}
function createFilmInLibrary() {
    document.getElementById('createFilmInLibraryButton').addEventListener('click', e => {
        e.preventDefault();
        console.log(document.getElementById('review').value);
        const data = {
            filmId: parseInt(document.getElementById('filmId').value),
            serviceUserId: parseInt(document.getElementById('serviceUserId').value),
            liked: document.getElementById('liked').value,
            watched: document.getElementById('watched').value,
            reviewed: document.getElementById('reviewed').value,
            review: document.getElementById('review').value
        };
        document.getElementById('filmId').value = '';
        document.getElementById('serviceUserId').value = '';
        document.getElementById('liked').value = '';
        document.getElementById('watched').value = '';
        document.getElementById('reviewed').value = '';
        document.getElementById('review').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/filmInLibrary/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllFilmsInLibraries();
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
function getFilmInLibraryById() {
    document.getElementById('getFilmInLibraryByIdButton').addEventListener('click', e => {
        
        e.preventDefault();
        deleteAllTableRows();
        const filmInLibraryId = document.getElementById('filmInLibraryId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/filmInLibrary/get/' + filmInLibraryId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindFilmInLibraryToTable(res);
        });
    });
}
function init(){
    getAllArtists();
    getArtistById();
    createArtist();
    updateArtistById();
    deleteArtistById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("artistTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateArtistById(){
    document.getElementById('updateArtistButton').addEventListener('click', e => {
          e.preventDefault();
          const artistId = document.getElementById('artistId').value;
          const data = {
              artistName: document.getElementById('newArtistName').value,
              imageUrl: document.getElementById('newImageUrl').value
          };
          console.log(data.artistName);
          document.getElementById('newArtistName').value = '';
          document.getElementById('newImageUrl').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/artist/update/' + artistId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllArtists();
      });
  }
  function deleteArtistById(){
    document.getElementById('deleteArtistButton').addEventListener('click', e => {
      e.preventDefault();
      const artistId = document.getElementById('artistId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/artist/delete/' + artistId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllArtists();
      });
  }


function bindArtistsToTable(data){
    var table = document.getElementById('artistTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.artistName + '</td>' +
        '<td>' + object.imageUrl + '</td>';
        table.appendChild(tr);
    });
}
function bindArtistToTable(data){
    var table = document.getElementById('artistTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.artistName + '</td>' +
        '<td>' + data.imageUrl + '</td>';
        table.appendChild(tr);
}
function getAllArtists() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/artist/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindArtistsToTable(res);
    });
}
function createArtist() {
    document.getElementById('createArtistButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            artistName: document.getElementById('artistName').value,
            imageUrl: document.getElementById('imageUrl').value
        };
        document.getElementById('artistName').value = '';
        document.getElementById('imageUrl').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/artist/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllArtists();
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
function getArtistById() {
    document.getElementById('getArtistByIdButton').addEventListener('click', e => {
        e.preventDefault();
        deleteAllTableRows();
        const artistId = document.getElementById('artistId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/artist/get/' + artistId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindArtistToTable(res);
        });
    });
}
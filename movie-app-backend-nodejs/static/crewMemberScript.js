function init(){
    getAllCrewMembers();
    getCrewMemberById();
    createCrewMember();
    updateCrewMemberById();
    deleteCrewMemberById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("crewMemberTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateCrewMemberById(){
    document.getElementById('updateCrewMemberButton').addEventListener('click', e => {
          e.preventDefault();
          const crewMemberId = document.getElementById('crewMemberId').value;
          const data = {
              artistId: parseInt(document.getElementById('newArtistId').value),
              filmId: parseInt(document.getElementById('newFilmId').value),
              crewMemberRole: document.getElementById('newCrewMemberRole').value
          };
          console.log(data.crewMemberName);
          document.getElementById('newArtistId').value = '';
          document.getElementById('newFilmId').value = '';
          document.getElementById('newCrewMemberRole').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/crewMember/update/' + crewMemberId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllCrewMembers();
      });
  }
  function deleteCrewMemberById(){
    document.getElementById('deleteCrewMemberButton').addEventListener('click', e => {
      e.preventDefault();
      const crewMemberId = document.getElementById('crewMemberId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/crewMember/delete/' + crewMemberId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllCrewMembers();
      });
  }


function bindCrewMembersToTable(data){
    var table = document.getElementById('crewMemberTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.artistId + '</td>' +
        '<td>' + object.filmId + '</td>'+
        '<td>' + object.crewMemberRole + '</td>';
        table.appendChild(tr);
    });
}
function bindCrewMemberToTable(data){
    var table = document.getElementById('crewMemberTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.artistId + '</td>' +
        '<td>' + data.filmId + '</td>'+
        '<td>' + data.crewMemberRole + '</td>';
        table.appendChild(tr);
}
function getAllCrewMembers() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/crewMember/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindCrewMembersToTable(res);
    });
}
function createCrewMember() {
    document.getElementById('createCrewMemberButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            artistId: parseInt(document.getElementById('artistId').value),
            filmId: parseInt(document.getElementById('filmId').value),
            crewMemberRole: document.getElementById('crewMemberRole').value
        };
        document.getElementById('artistId').value = '';
        document.getElementById('filmId').value = '';
        document.getElementById('crewMemberRole').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/crewMember/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllCrewMembers();
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
function getCrewMemberById() {
    document.getElementById('getCrewMemberByIdButton').addEventListener('click', e => {
        
        e.preventDefault();
        deleteAllTableRows();
        const crewMemberId = document.getElementById('crewMemberId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/crewMember/get/' + crewMemberId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindCrewMemberToTable(res);
        });
    });
}
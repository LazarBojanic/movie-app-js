function init(){
    getAllStudios();
    getStudioById();
    createStudio();
    updateStudioById();
    deleteStudioById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("studioTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateStudioById(){
    document.getElementById('updateStudioButton').addEventListener('click', e => {
          e.preventDefault();
          const studioId = document.getElementById('studioId').value;
          const data = {
              studioName: document.getElementById('newStudioName').value
          };
          console.log(data.studioName);
          document.getElementById('studioName').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/studio/update/' + studioId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllStudios();
      });
  }
  function deleteStudioById(){
    document.getElementById('deleteStudioButton').addEventListener('click', e => {
      e.preventDefault();
      const studioId = document.getElementById('studioId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/studio/delete/' + studioId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllStudios();
      });
  }


function bindStudiosToTable(data){
    var table = document.getElementById('studioTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.studioName + '</td>';
        table.appendChild(tr);
    });
}
function bindStudioToTable(data){
    var table = document.getElementById('studioTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.studioName + '</td>';
        table.appendChild(tr);
}
function getAllStudios() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/studio/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindStudiosToTable(res);
    });
}
function createStudio() {
    document.getElementById('createStudioButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            studioName: document.getElementById('studioName').value
        };
        document.getElementById('studioName').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/studio/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllStudios();
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
function getStudioById() {
    document.getElementById('getStudioByIdButton').addEventListener('click', e => {
        
        e.preventDefault();
        deleteAllTableRows();
        const studioId = document.getElementById('studioId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/studio/get/' + studioId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindStudioToTable(res);
        });
    });
}
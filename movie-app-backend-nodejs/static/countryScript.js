function init(){
    getAllCountries();
    getCountryById();
    createCountry();
    updateCountryById();
    deleteCountryById();
  }
  
  function deleteAllTableRows(){
    var table = document.getElementById("countryTable");
    for(var i = table.rows.length - 1; i > 0; i--){
        table.deleteRow(i);
    }
  }
  
  function updateCountryById(){
    document.getElementById('updateCountryButton').addEventListener('click', e => {
          e.preventDefault();
          const countryId = document.getElementById('countryId').value;
          const data = {
              countryName: document.getElementById('newCountryName').value
          };
          console.log(data.countryName);
          document.getElementById('countryName').value = '';
          console.log(JSON.stringify(data));
          const token = getCookie('token');
          console.log(token);
          fetch('http://localhost:8000/api/country/update/' + countryId, {
              method: 'PUT',
              headers: { 
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
               },
              body: JSON.stringify(data)
          });
          getAllCountries();
      });
  }
  function deleteCountryById(){
    document.getElementById('deleteCountryButton').addEventListener('click', e => {
      e.preventDefault();
      const countryId = document.getElementById('countryId').value;
      const token = getCookie('token');
      console.log(token);
      fetch('http://localhost:8000/api/country/delete/' + countryId, {
          method: 'DELETE',
          headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
           }
      });
      getAllCountries();
      });
  }


function bindCountrysToTable(data){
    var table = document.getElementById('countryTable');
    data.forEach(function(object) {
        var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + object.id + '</th>' +
        '<td>' + object.countryName + '</td>';
        table.appendChild(tr);
    });
}
function bindCountryToTable(data){
    var table = document.getElementById('countryTable');
    var tr = document.createElement('tr');
        tr.innerHTML =
        '<th scope="row">' + data.id + '</th>' +
        '<td>' + data.countryName + '</td>';
        table.appendChild(tr);
}
function getAllCountries() {
    deleteAllTableRows();
    const token = getCookie('token');
    console.log(token);
    fetch('http://localhost:8000/api/country/getAll', {
        headers: {
            'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }})
    .then(res => res.json())
    .then(res => {
        bindCountrysToTable(res);
    });
}
function createCountry() {
    document.getElementById('createCountryButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            countryName: document.getElementById('countryName').value
        };
        document.getElementById('countryName').value = '';
        console.log(JSON.stringify(data));
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/country/create', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        });
        getAllCountries();
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
function getCountryById() {
    document.getElementById('getCountryByIdButton').addEventListener('click', e => {
        
        e.preventDefault();
        deleteAllTableRows();
        const countryId = document.getElementById('countryId').value
        const token = getCookie('token');
        console.log(token);
        fetch('http://localhost:8000/api/country/get/' + countryId, {
            headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            }})
        .then(res => res.json())
        .then(res => {
            bindCountryToTable(res);
        });
    });
}


const user = new User();
document.addEventListener('DOMContentLoaded', function() {
  user.All.then((users)=>{
    let table = document.getElementsByTagName('items-table')[0];
    table.setAttribute('items', JSON.stringify(users.values) );
    table.setAttribute('headers', JSON.stringify(users.keys) );
  });
});

function addUser(){
  bootbox.dialog({
    closeButton: true,
    message: `<form id="newUser">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" name="name" class="form-control" id="name" placeholder="Name">
                </div>
                <div class="form-group">
                  <label for="email">Username</label>
                  <input type="text" name="username" class="form-control" id="username" placeholder="Enter username">
                </div>
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
              </form>`,
    buttons: {
      success :{
        label:'Guardar',
        className : 'btn-success',
        callback:()=>{
          let form = serializeObject( $('#newUser').serialize() );
          usr = { ...usr, ...form}
          user.create(usr).then((newUser)=>{
            let table = document.getElementsByTagName('items-table')[0];
            let users = JSON.parse(table.getAttribute('items'));
            table.setAttribute('items', JSON.stringify( [...users,newUser] ) );
          });
        }
      }
    },
  });
}

function serializeObject( str ){
  let n= str.split('&')
  let obj= {};
  n.forEach((i)=>{
    i = i.split('=');
    obj[i[0]] = i[1];
  });
  return obj;
}

let usr = {
  "name":"Jose de Jesus Alvarez",
  "username":"Jose",
  "email":"jose.alvarez@april.biz",
  "address":{
    "street":"Kulas Light",
    "suite":"Apt. 556",
    "city":"Gwenborough",
    "zipcode":"92998-3874",
    "geo":{
      "lat":"-37.3159",
      "lng":"81.1496"
    }
  },
  "phone":"1-770-736-8031 x56442",
  "website":"hildegard.org",
  "company":{
    "name":"Romaguera-Crona",
    "catchPhrase":"Multi-layered client-server neural-net",
    "bs":"harness real-time e-markets"
  }
};

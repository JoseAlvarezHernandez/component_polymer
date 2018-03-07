const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const options = { method: 'GET', mode: 'cors', cache: 'default', headers : {"Content-Type": "application/json"} };
class User{
  update( user , id){
    return new Promise( ( resolve )=>{
      if(self.fetch){
        options.method = 'PUT';
        options.data = JSON.stringify(user);
        fetch(`${apiUrl}/${id}`,options)
        .then(handlerResponse)
        .then(
          (user)=>{
            resolve(user);
          }
        );
      }else {
        resolve({values:[], keys :[]});
      }
    });
  }
  create(user){
    return new Promise( ( resolve )=>{
      if(self.fetch){
        options.method = 'POST';
        options.body = JSON.stringify(user);
        fetch(apiUrl,options)
        .then(handlerResponse)
        .then(
          (user)=>{
            user = getDeepValues(user);
            let id = user[user.length - 1];
            //delete user[user.length-1];
            user.shift(id);
            user.unshift(id);
            resolve(user);
          }
        );
      }else {
        resolve({values:[], keys :[]});
      }
    });
  }
  get All(){
    return new Promise( ( resolve )=>{
      if(self.fetch){
        fetch(apiUrl,options)
        .then(handlerResponse)
        .then(
          (users)=>{
            users = handlerUserResponse(users)
            resolve(users);
          }
        );
      }else {
        resolve({values:[], keys :[]});
      }
    });
  }
}

function handlerResponse( response ){
  return response.json();
}

function handlerUserResponse( users ){
  let newUser = {
    values :getDeepValues(users),
    keys : getDeepKeys(users[0])
  };
  return newUser;
}

function getDeepValues(obj){
  let newArr = [];
  if( obj instanceof Array ){
    obj.forEach( ( value )=>{
      if( value instanceof Object){
        newArr.push( getDeepValues(value) );
      }else{
        newArr.push(value);
      }
    });
  }else if( obj instanceof Object ){
    for( let prop in obj ){
      if( obj[prop] instanceof Object ){
        newArr = [...newArr, ...getDeepValues(obj[prop])]
      }else{
        newArr.push(obj[prop]);
      }
    }
  }
  return newArr;
}

function getDeepKeys(obj) {
    let keys = [];
    for(let key in obj) {
        if(obj[key] instanceof Object) {
            var subkeys = getDeepKeys(obj[key]);
            keys = [ ...keys, ...subkeys.map((subkey)=>{
                return `${key}.${subkey}`;
            }) ];
        }else{
          keys.push(key);
        }
    }
    return keys;
}

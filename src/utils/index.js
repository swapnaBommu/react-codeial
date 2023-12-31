export * from './constants';

export const setItemInLocalStorage = (key, value) => {
    if(!key || !value){
        return console.error('can not store value in Local Storage');
    }

    const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;

    localStorage.setItem(key,valueToStore);
};

export const getItemFromLocalStorage = (key) => {
    if(!key){
        return console.error('can not get value from Local Storage');
    }
    return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
    if(!key){
        return console.error('can not get value from Local Storage');
    }
    localStorage.removeItem(key);
};

export const getFormBody = (params) => {
    let formBody = [];
  
    for (let property in params) {
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123
  
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
  };
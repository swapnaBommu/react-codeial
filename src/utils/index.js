export * from './constants';

export const getFormBody = (params) => {
    let formBody = [];

    for(let property in params){
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedvalue = encodeURIComponent(params[property]); // swapna 123 => swapna%2020123

        formBody.push(encodedKey + '=' +encodedvalue);
    }
    return formBody.join('&')
}
export function geoloc() : Promise<Position> {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition( (pos) => {
            resolve(pos);
        }, (err) => { 
            reject(err);
        }, {timeout: 15000, maximumAge: 60000})
    });
}

export function get(url : string) : Promise<string> {
    let xhr = new XMLHttpRequest();

    console.trace("Sending GET request for '" + url + "'");
    return new Promise( (resolve, reject) => {
        let callback = (e) => {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject({ status : xhr.status, text : xhr.response });
            }
        };

        xhr.onload = callback;
        xhr.onerror = callback;
        xhr.open("GET", url);
        xhr.send();
    });
}

export function post(url : string, data : string, headers?: { [ key : string] : string }) : Promise<string>{
    let xhr = new XMLHttpRequest();

    if (headers) {
        for (let header in headers) {
            xhr.setRequestHeader(header, headers[header]);
        }
    }
    console.trace("Sending POST request to '" + url + "'");
    return new Promise( (resolve, reject) => {
        let callback = (e) => {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject({ status : xhr.status, text : xhr.response });
            }
        };

        xhr.onload = callback;
        xhr.onerror = callback;
        xhr.open("POST", url);
        xhr.send(data);
    });
}


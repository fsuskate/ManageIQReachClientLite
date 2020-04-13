class Auth {
    static authenticate(callback) {
        console.log("authenticate")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic ZnM3MzA1MDY6RnJhbmNvaXMyMyE=");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://miq-db-12.lvn.broadcom.net/api/auth", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result) {
                    callback(result)          
                }        
            })
        .catch(error => console.log('error', error));
    }
}

export default Auth
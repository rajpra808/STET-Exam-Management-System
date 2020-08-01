const numberInput = document.getElementById('number'),
      button = document.getElementById('button'),
      response = document.getElementById('.response');
    
button.addEventListener('click', send, false);

let yuppie;
const token = 123456789;

let phno = 0;
function sendCode(phno){
    fetch('/otp/' + token, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({messengerId: "8192836451", phoneNumber: phno})
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    });
}
function phone(username){
    fetch('/users/' + username, {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(function(data){
        console.log(data);
        console.log(data.phno);
        sendCode(data.phno);
        window.location.assign("/otp");
    })
    .catch(function(err){
        console.log(err);
    });
}
function send(){
    const number = numberInput.value;
    fetch('/users/authenticate', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username: number})
    })
    .then(function(res){
        if(res.status == 200){
            console.log("Yes");
            phone(number);
        }
        else 
            console.log("Jeez");
    })
    .catch(function(err){
        console.log(err);
    });
}
//mongod --dbpath ~/documents/data/db1

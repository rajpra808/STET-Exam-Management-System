const numberInput = document.getElementById('number'),
      button = document.getElementById('button'),
      response = document.getElementById('.response');
    
button.addEventListener('click', send, false);

const token = 123456789;

function send(){
    const number = numberInput.value;

    fetch('/otp/'+token+'/'+number, {
        method: 'get',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    });
}
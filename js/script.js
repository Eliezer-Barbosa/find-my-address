$(document).ready(function(){
    $("#txtCep").focusout(function(){
            var cep = $("#txtCep").val();
            cep = cep.replace("-", "");
 
            var urlStr = "https://viacep.com.br/ws/"+ cep +"/json/";
         
            $.ajax({
                url : urlStr,
                type : "get",
                dataType : "json",
                success : function(data){
                    console.log(data);
                     
                    $("#txtCidade").val(data.localidade);
                    $("#txtEstado").val(data.uf);
                    $("#txtBairro").val(data.bairro);
                    $("#txtRua").val(data.logradouro);
                    $("#txtComplemento").val(data.complemento);
                },
                error : function(erro){
                    console.log(erro);
                    document.getElementById("message").
                    innerHTML = `${cep} is not a valid CEP...Please try again.`
                    setTimeout(clearFields, 2000);
                    setTimeout(clearMessage, 3000);
                }
            });
    });
});

function clearMessage() {
    document.getElementById('message').innerHTML = "";
}

function clearFields() {
    document.getElementById('txtCep').value = "";
    document.getElementById('txtCidade').value = "";
    document.getElementById('txtEstado').value = "";
    document.getElementById('txtBairro').value = "";
    document.getElementById('txtRua').value = "";
    document.getElementById('randomCep').innerHTML = "";
}

function getRandomCep() {
    var ceps = [
        '45055750',
        '58090837',
        '53070570',
        '45611018',
        '89803480',
        '67100220',
        '04291060',
        '03254410',
        '08122080',
        '79081722'
    ]
    const random = Math.floor(Math.random() * 10);
    document.getElementById("randomCep").innerHTML = ceps[random]
}

function getJoke() {
    const joke = fetch('http://api.icndb.com/jokes/random');
    joke.then(data => data.json()).then(data => {
    console.log(data)
    console.log('joke id: ' + data.value.id)
    console.log("joke content: " + data.value.joke)
    document.getElementById("randomCep").innerHTML = data.value.joke
})
}

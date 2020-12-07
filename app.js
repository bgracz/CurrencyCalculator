check();

function check() {
  fetch('https://api.exchangeratesapi.io/latest')
    .then(response => {
      return response.json();
    })
    .then(users => {
      var json = JSON.stringify(users, null, 2);
      var listOfCurrencies = Object.keys(users.rates);
      for (var i = 0; i < listOfCurrencies.length; i++) {
        $("#firstCurrencyList").append("<option value=" + listOfCurrencies[i] + ">" + listOfCurrencies[i] + "</option>");
        $("#secondCurrencyList").append("<option value=" + listOfCurrencies[i] + ">" + listOfCurrencies[i] + "</option>");
      }
    });
};

function refreshData() {
  $(function(){
          $("#startAmmount").keyup(function (){
              var input_text = $('#startAmmount').val();
              var firstCurrency = $("#firstCurrencyList").val();
              var secondCurrency = $("#secondCurrencyList").val();
              fetch("https://api.exchangeratesapi.io/latest?symbols=" + firstCurrency + "," + secondCurrency)
                .then(response => {
                  return response.json();
                })
                .then(users => {
                  var currencies = JSON.stringify(users, null, 2);
                  var obj = JSON.parse(currencies);
                  var doMath = (input_text/obj.rates[firstCurrency])*obj.rates[secondCurrency];
                  $('#toAmmount').val(doMath.toFixed(2));
          });
      });
});
};
refreshData();

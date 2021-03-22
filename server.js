  
  //direct connection to Ganache/or ethereum
  var provider = 'HTTP://127.0.0.1:7545';
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);

  var contractAddress ='0x1d1d6FcbCd2DcEC79804BD0e91e68f0093C1cDa8';
  var contractABI;

  //read abi from rest call
  function getABI(){
    $.ajax({
      url:"http://localhost:3000/abi",
      dataType: 'JSON',
      async:false,
      success:function(data){
        contractABI = data;
      }
    });
  }

  getABI();
  console.log("contractABI :"+contractABI);

  web3.eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ",result);
  });

  var instance = new web3.eth.Contract(contractABI, contractAddress);
  var account;



  //finding accounts
 web3.eth.getAccounts(function(err, accounts) {

    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[1];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });




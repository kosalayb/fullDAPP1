  //direct connection to Ganache/or ethereum
  // var provider = 'HTTP://127.0.0.1:7545';
  // var web3Provider = new Web3.providers.HttpProvider(provider);
  // var web3 = new Web3(web3Provider);

  //connect to ropsten using infura api
  var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/51d098f6bc2e47d8a9fecfbe86933541'
  ));

  var contractAddress ='0x3C18222349741F45aF5be8722116b25bf2aCf526';
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

  //connect to accounts selected from metamask client
  ethereum.enable();
  ethereum.on('accountsChanged', function (accounts) {
    account = accounts[0];
    web3.eth.defaultAccount = account;
    console.log("Current Acoount :" + account);
  });











   // //finding accounts
   // web3.eth.getAccounts(function(err, accounts) {

   //    if (err != null) {
   //      alert("Error retrieving accounts.");
   //      return;
   //    }
   //    if (accounts.length == 0) {
   //      alert("No account found! Make sure the Ethereum client is configured properly.");
   //      return;
   //    }

   //    account = accounts[1];
   //    console.log('@server Account is: ' + account);
   //    web3.eth.defaultAccount = account;

   //  });



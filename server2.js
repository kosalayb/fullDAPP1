//$(document).ready(function () { 

    //var web3,instance;

    const getWeb3 = () => {
      return new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
          if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
              // ask user permission to access his accounts
              await window.ethereum.request({ method: "eth_requestAccounts" });
              resolve(web3);
            } catch (error) {
              reject(error);
            }
          } else {
            reject("Must install MetaMask");
          }
        });
      });
    };


    const getContract = async (web3) => {
      const data = await $.getJSON("./contracts/Simple.json");

      const netId = await web3.eth.net.getId();
      const deployedNetwork = data.networks[netId];
      const _instance = new web3.eth.Contract(
        data.abi,
        deployedNetwork && deployedNetwork.address
      );

      alert(_instance);
      return _instance;
    };


    var instance=getContract;

//});


  // var provider = 'HTTP://127.0.0.1:7545';
  // var web3Provider = new Web3.providers.HttpProvider(provider);
  // var web3 = new Web3(web3Provider);


  // var contractAddress ='0x1d1d6FcbCd2DcEC79804BD0e91e68f0093C1cDa8';
  // var contractABI;

  // //read abi from rest call
  // function getABI(){
  //   $.ajax({
  //     url:"http://localhost:3000/abi",
  //     dataType: 'JSON',
  //     async:false,
  //     success:function(data){
  //       contractABI = data;
  //     }
  //   });
  // }

  // getABI();
  // console.log("contractABI :"+contractABI);

  // _web3.eth.getBlockNumber().then((result) => {
  //   console.log("Latest Ethereum Block is ",result);
  // });

  // var instance = new _web3.eth.Contract(contractABI, contractAddress);
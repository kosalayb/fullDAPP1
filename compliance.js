// If you want to send a transaction via Infura, 
// you have to sign it locally first (using your private key) 
// and then broadcast the signed transaction via Infura.
//1. https://www.youtube.com/watch?v=eCc_TyIETw8
//2. https://www.youtube.com/watch?v=n9QLsSagUzE
//3. https://piyopiyo.medium.com/sign-ethereum-transaction-in-local-environment-828f6a9d2193

// A state-changing function (aka transaction) has to be mined before it can change 
// the state of the blockchain, hence you cannot expect a return result from 
// a function that will be mined asynchronously. That is no returns from send calls.


$(document).ready(function () { 

	//console.log("I am in compliance.js");
	
	// checkCompliance();
	// viewEvents();

});

// async function setData(){
// 	const{simple}=await getBlockchain();
// 	const tx=await simple.setName("ksoala");
// 	await tx.wait();
// 	const newName = await simple.getname();
// 	console.log("new data" + newName);
// }


// function viewComplianceResults(){
// 	setData();
// }




//read soil data and run amart contract function for pH complience
function checkPHCompliance(){

	console.log("I am in check pH compliance");

	//read farmer id from text box
	 var id=document.getElementById("farmerID").value;
	 console.log("farmer id :" + id);

	$.ajax({
		url:"http://localhost:3000/api/soildata/getData",
		async:false,
		success: function(data){
			var arr = JSON.parse(data);
			console.log("data is"+ data);
			console.log("length"+arr.length);
			// var i=0;
			// while (i<arr.length-1) {
			// 	console.log("ID:"+ arr[i].ID+ ",LandUse:"+arr[i].LandUse+",pH:"+arr[i].pH);
			// 	i++;
			// }
			var fid = arr[id-1].ID;
			var ph= arr[id-1].pH *10;

			//find hash of decimal number in string
			var _hash = sha256.create();
			_hash.update(ph.toString());
			_hash.hex();

			console.log("ph :" + ph);
			console.log("hash before function call:" + _hash);

			//execute findpHCompliance function
			instance.methods.findpHCompliance(fid,_hash.toString(),ph)
						.send(
								{
									from: account,
									gas:250000,
									gasPrice:'125000000000' //gasprice is a string
								}
							)
							.on('transactionHash', function(txhash)
								{
									console.log("Transaction hash", txhash);
								}
							)
							.on('error', function(err)
								{
									console.log("findpHComplience error :",err);
								}
							)
							.then(function(result)
								{
									//read from events
									var _id = result.events.pHCompliance.returnValues[0];
									var _dataHash=result.events.pHCompliance.returnValues[1];
									var _outcome = result.events.pHCompliance.returnValues[2];

									console.log("id==>"+_id);
									console.log("dataHash==>"+_dataHash);
									console.log("outcome==>"+_outcome);

									//write compliance outcome to browser
									//var str="Farmer ID:"+_id+"\n"+"Local Data Hash:"+_dataHash+"\n"+"pH Compliance:"+_outcome;	
									document.getElementById('fid').innerHTML="Farmer ID :" +_id;
									document.getElementById('lh').innerHTML="Local Data Hash :"+_dataHash;
									document.getElementById('pHComp').innerHTML="pH Compliance :"+_outcome;
								}
							);

		}//success function

	});//end ajax

}






// function checkCompliance(){


// 	instance.methods.getName().call()
// 	.then(function(resp){
// 		console.log("getname outcome is:"+resp);
// 	});

//     $.ajax({
//       url:"http://localhost:3000/api/prover/readcsv",
//       dataType: 'JSON',
//       async:false,
//       success:function(data){

//         document.getElementById('outcome').innerHTML="ID:"+data.ID+",q1:"
//         +data.q1+",q2:"+data.q2+",q3:"+data.q3+",q4:"+data.q4+",q5:"+data.q5;

//         var _id = data.ID;
//         var _vals =[data.q1,data.q2,data.q3,data.q4,data.q5];

//         //get a compilance object
//         instance.methods.getDataObject(_id,_vals).call()
//         			.then(function(resp){
// 		        		console.log("data object==>"+resp);
// 		        		console.log("account:"+web3.eth.defaultAccount);
// 		        		//compialce checking
// 						instance.methods.findComplience(resp).send(
// 						{
// 								from: account,
// 								gas:150000,
// 								gasPrice:'125000000000'
// 						})
// 						.then(function(result){
// 							console.log("compliance results==>"+result);
// 							document.getElementById('compliance').innerHTML=result;	
// 							viewEvents();
// 						});


// 		        	});
//       }

//     });//end ajax

// }




// function viewEvents(){



// 	alert('I am in compliance.js');

// 	// var str="Hemal"
// 	// instance.methods.setName(str).estimateGas({from:account})
// 	// .then(function(gasAmount){
// 	// 	console.log("estimated gas :"+gasAmount);
// 	// })
// 	// .catch(function(error){
// 	// 	console.log(error);
// 	// });




//  //  web3.eth.accounts.signTransaction(
//  //                      {
//  //                        to:contractAddress,
//  //                        value:'1000000000',
//  //                        gas:2000000
//  //                      }, "f1021487e8267ed0f82b30830654c443921597c080ee3d0538633d39771986fa")
//  //                      .then(console.log("tx signed"));



// 	//send() is needed when state is changed/adding events
// 	// make sure you have selected an account from metamask before run this
	
// 	// instance.methods.setName(str).send({
// 	// 	from:account,
// 	// 	gas:250000,
// 	// 	gasPrice:125000000000
// 	// }) 
// 	// .then(function(tx){
// 	// 	console.log("Transaction for adding a prescription:",tx);
// 	// });



//    //  instance.getPastEvents('complianceRecord',
// 	  //   {
// 	  //   	fromBlock:0,
// 	  //   	toBlock:'latest'
// 	  //   },
// 	  //   (error,events)=>{
// 			// console.log("number of events :"+events.length);
// 			// document.getElementById('comEvents').innerHTML=events.length;

// 	  //   });
// }







// function getUtility(){

// 	console.log("I am in utility js");


// }

// module.exports.getUtility=getUtility;


	// var script  = document.createElement('script');
 //  	script.src  = "./server.js";
 //  	script.type = 'text/javascript';
 //  	script.defer = true;
	// document.getElementsByTagName('head').item(0).appendChild(script);
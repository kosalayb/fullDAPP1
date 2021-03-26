const express = require('express');
const IPFS = require('ipfs-api');
const csv = require('csv-parser');

//infura provides ipfs api to write to global IPFS network
//that can be accessed as https://gateway.ipfs.io/ipfs/<hashOfFile>
const ipfs = new IPFS({host:'ipfs.infura.io', port:5001, protocol:'https'});
var path = require('path');
//file system module to read json file
var fs=require('fs')


const app = express();
app.use(express.json());



//----connect to ethereum
// const Web3 = require('web3');
// const provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545');
// let web3 = new Web3(provider);

// let contract_address='0x39d995B3d285489bB80C9e59e8c9DeFcD21e4766';
// const contractJSON = JSON.parse(fs.readFileSync('./build/contracts/Simple.json'), 'utf8');
// const abi = contractJSON.abi;
// const instance = new web3.eth.Contract(abi, contract_address);
//-----end connecting to ethereum----------------------



app.listen(3000, ()=>{
	console.log('Server listening on port 3000');
});



//setting virtual path so that js files can be read from html files.
app.use('/', express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
});



//read abi
app.get('/abi', function(req,res){
	var contract_json = "../fullDAPP1/build/contracts/Simple.json";
	var parsed= JSON.parse(fs.readFileSync(contract_json));
	var abi = parsed.abi;
	res.send(abi);
});

app.get('/users/add', function(req, res) {
    res.sendFile(path.join(__dirname + '/add.html'));
});

app.get('/users/view', function(req, res) {
    res.sendFile(path.join(__dirname + '/view.html'));
});

app.get('/users/compliance', function(req,res){
	res.sendFile(path.join(__dirname + '/compliance.html'));
});



//utility methods and IPFS

//write json object to IPFS and return hash of the file
app.post('/writeJSON', async(req,res)=>{
	const data =req.body;
	const jsonData=JSON.stringify(data);

	const filesAdded = await ipfs.add(Buffer.from(jsonData));
	const fileHash=filesAdded[0].hash;
	console.log("file hash :"+ fileHash);

	//return hash of the file
	return res.send(fileHash); 
});


//TODO: read data from csv, submit to smart contract for cmplience checking
//prover API - read data from local data store 
app.get('/api/prover/readcsv', (req, res)=>{

	// var c= require('./myUtility.js');
	// c.getUtility();

	 fs.createReadStream('./data/data1.csv')
		  .pipe(csv())
		  .on('data', (row) => {
		    console.log("====>>" +row);
		    return res.send(row);
		  })
		  .on('end', () => {
		    console.log('CSV file successfully processed');
	  });

});


//verifier API - save verification results to IPFS
app.post('/api/verifier/save2ipfs', async(req,res)=>{

});
const express = require('express');
const IPFS = require('ipfs-api');
//infura provides ipfs api to write to global IPFS network
//that can be accessed as https://gateway.ipfs.io/ipfs/<hashOfFile>
const ipfs = new IPFS({host:'ipfs.infura.io', port:5001, protocol:'https'});
var path = require('path');

const app = express();
app.use(express.json());

//file system module to read json file
var fs=require('fs')


//setting virtual path so that js files can be read from html files.
app.use('/', express.static(path.join(__dirname, '/')));


//read abi
app.get('/abi', function(req,res){
	var contract_json = "../fullDAPP1/build/contracts/Simple.json";
	var parsed= JSON.parse(fs.readFileSync(contract_json));
	var abi = parsed.abi;
	res.send(abi);
});

app.listen(3000, ()=>{
	console.log('Server listening on port 3000');
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/users/add', function(req, res) {
    res.sendFile(path.join(__dirname + '/add.html'));
});

app.get('/users/view', function(req, res) {
    res.sendFile(path.join(__dirname + '/view.html'));
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
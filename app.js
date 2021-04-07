// import express from 'express';
// import IPFS from "ipfs-api";
// import csv from "csv-parser";
// import path from "path";
// import fs from "fs";
// import getBlockchain from './ethConnect.js';

const express = require('express');
const IPFS = require('ipfs-api');
const csv = require('csv-parser');
var path = require('path');
//file system module to read json file
var fs=require('fs')
//var SHA256 = require("crypto-js/sha256");


const getBlockchain = require('./ethConnect.js');


//infura provides ipfs api to write to global IPFS network
//that can be accessed as https://gateway.ipfs.io/ipfs/<hashOfFile>
const ipfs = new IPFS({host:'ipfs.infura.io', port:5001, protocol:'https'});




const app = express();
app.use(express.json());



app.listen(3000, ()=>{
	console.log('Server listening on port 3000');
});




//setting virtual path so that js files can be read from html files.
app.use('/', express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
});


// //get hash SHA256 of input parameter
// //http://localhost:3000/getSHA256?name=kosala
// app.get('/getSHA256/PH', function(req,res){
// 	console.log(req.query.PH);
// 	var sha= SHA256(req.query.PH);
// 	//console.log(req.query.name);//this will output kosala
// 	console.log("hash of PH is:"+sha);
// 	res.send(JSON.stringify({'PH':sha}));
// });



//read abi
app.get('/abi', function(req,res){
	var contract_json = "./build/contracts/SoilCompliance.json";
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



//read solil complience data-> id, landuse, pH, P and K
app.get('/api/soildata/getData',(req,res)=>{


	var filePath = path.join(__dirname, './data/soilData.csv');
	// Read CSV
	var f = fs.readFileSync(
				filePath, 
				{encoding: 'utf-8'}, 
	    		function(err){
	    			console.log(err);
	    		}
    		);
	// Split on row
	f = f.split("\n");

	// Get first row for column headers
	headers = f.shift().split(",");

	var json = [];    
	f.forEach(function(d){
	    // Loop through each row
	    tmp = {};
	    row = d.split(",");

	    //build json string
	    tmp["ID"] = row[0];
	    tmp[headers[4]]=row[4];
	    tmp[headers[7]]=row[7];
	    tmp[headers[9]]=row[9];
	    tmp[headers[10]]=row[10];

	    // for(var i = 0; i < headers.length; i++){
	    //     tmp[headers[i]] = row[i];
	    // }
	    // Add object to list
	    json.push(tmp);
	});
	 return res.send(JSON.stringify(json));
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
app.get('/api/checkCompliance', async (req,res)=>{

		try{
			const init=async()=>{
				const {simple} = await getBlockchain();
				const tx = await simple.setName("kosala");
				await tx.wait();
				const newname = await simple.getName();
				console.log(newname);
				return res.send(newname);
			}
		}catch(error){
			console.log(error);
		}

	
	}
);
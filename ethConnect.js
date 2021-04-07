//sign transactions using ethers
// import pkg from 'ethers';
// const {ethers, Contract} = pkg;
const ethers =require('ethers');
const detectEthereumProvider = require('@metamask/detect-provider');
//import detectEthereumProvider from '@metamask/detect-provider';
//import Simple from './build/contracts/Simple.json';


// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const Simple = require("./build/contracts/Simple.json");


const fs = require('fs');
const { Simple } = JSON.parse(fs.readFileSync('./build/contracts/SoilCompliance.json'));


const getBlockchain=()=>
	new Promise( async(resolve,reject)=>{
					let provider = await detectEthereumProvider();
					if(provider){
						await provider.request({ method:'eth_requestAccounts'});
						const networkId= await provider.request({method:'net_version'});
						provider = new ethers.providers.Web3Provider(provider);
						const signer = provider.getSigner();
						const Simple = new Contract(
								Simple.networks[networkId].address,
								Simple.abi,
								signer
							);
						resolve({Simple});
						return;
					}
					reject('Install Metamask');
	});

module.exports=getBlockchain;




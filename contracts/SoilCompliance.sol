// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;


contract SoilCompliance{
    
    //events to record compliance checking results
    event PKComplianceEvent(string id, string dataHash, bool comp, uint256 timestamp);
    event pHCompliance(string id, string dataHash, bool comp, uint256 timestamp);
    
    
    //P K value passed are P x 100 and K x 100 to include 2 decimal points, because floating is not supported by solidity
    //state change functions cannot return values
    function findPKCompliance(string memory farmerID, string memory dataHash, uint p, uint k) public{
        
        bool outcome;
        
        if ((p>=510 && p <= 800) && (k>=10100 && k<=15000)){
            outcome=true;
        }
        else{
            outcome=false;
        }
    
        //fire the event
        emit PKComplianceEvent(farmerID,dataHash,outcome,block.timestamp);
        
    }
    
    
    //pH is pHx10 to include one decimal point
    //state change functions cannot return values.
    function findpHCompliance(string memory farmerID, string memory dataHash, uint pH) public {
        bool outcome;
        
        if (pH>=63 && pH<=65){
            outcome=true;
        }else{
            outcome=false;
        }
        
        //fire the event to record events
        emit pHCompliance(farmerID,dataHash,outcome,block.timestamp);
        
    }
    
    
}  
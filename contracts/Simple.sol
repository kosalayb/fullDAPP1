pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Simple{
    
    struct Data{
        string id;
        uint q1;
        uint q2;
        uint q3;
        uint q4;
        uint q5;
    }

    mapping(string=>string) public users;//size of mapping cannot find in solidity
    event eventAddUser(string user, uint256 timestamp); //events are not readable from solidity
    
     
    function addUserHash(string memory _id, string memory _userHash) public {
        users[_id]=_userHash; 
        
        emit eventAddUser(_userHash,block.timestamp);
    }

    
    function getUserHash(string memory _id) public view returns(string memory){
        return users[_id];
    }
    
    //pure does  not read state and does not change state
    //view does not change state but can read state
    function getDataObject(string memory _id, uint[] memory _intData) public pure returns(Data memory){
        Data memory data;
        data.id=_id;
        data.q1=_intData[0];
        data.q2=_intData[1];
        data.q3=_intData[2];
        data.q4=_intData[3];
        data.q5=_intData[4];
        
        return data;
    }
    

    //This is for testing purpose only
    //view does not change state but can read state
    function testCompliance(uint n1, uint n2)public view returns(uint[] memory result){
        
        result=new uint[](2);
        
        result[0]=n1;
        result[1]=n2;
        

        return result;
        
    }

    
    //check complience and return True/False outcome with percentage
    function findComplience(Data memory _data)public pure returns(string[] memory compOutcome){
        
        compOutcome=new string[](6);
        uint i=0;
        compOutcome[i]=_data.id; i++;
        
        
        if (_data.q1>60){
            compOutcome[i]="YES";i++;
        }
        else{
            compOutcome[i]="NO";i++;
        }
            
            
            
        if (_data.q2>80){
            compOutcome[i]="YES";i++;
        }
        else{
            compOutcome[i]="NO";i++;
        }
            
            
        if (_data.q3>85){
            compOutcome[i]="YES";i++;
        }
        else{
            compOutcome[i]="NO";i++;
        }   
            
            
        if (_data.q4>75){
            compOutcome[i]="YES";i++;
        }
        else{
            compOutcome[i]="NO";i++;
        }
            
            
        if (_data.q5>84){
            compOutcome[i]="YES";i++;
        }
        else{
            compOutcome[i]="NO";i++;
        }
            
        return compOutcome;
    }
    
}
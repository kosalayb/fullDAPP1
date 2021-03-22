pragma solidity ^0.5.16;
//pragma experimental ABIEncoderV2;


contract Simple{
    
    mapping(string=>string) public users;//size of mapping cannot find in solidity
    
    event eventAddUser(string user, uint256 timestamp); //events are not readable from solidity
    
     
    function addUserHash(string memory _id, string memory _userHash) public {
        users[_id]=_userHash; 
        
        emit eventAddUser(_userHash,block.timestamp);
    }

    
    function getUserHash(string memory _id) public view returns(string memory){
        return users[_id];
    }
    

}
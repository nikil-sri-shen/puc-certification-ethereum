// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract PUC {
    address public owner;
    //constructor to store address of manager/owner 
    //who deploy the contract
    constructor(){
        owner = msg.sender;
    }

    //strcture to store certificate datails
    struct Certificates {
        string userName;     //user name
        string vechileNo;    //vechile no
        address userAcc;     //user account id
        uint CO;             //carbon monoxide level
        uint NOX;            //nitrogen dioxide level
        uint HC;             //hydrocarbon level
        string issueDate;    //date of certificate issue
        bool isValid;        //check whether vechile is valid or not
        bool isAdded;        //check whether certificate is already exist
    }

    //mapping for certificate
    mapping(address => mapping(string => Certificates)) public certificates;

    //certificate adding function
    function addCertificate(
        string memory _userName,
        string memory _vechileNo,
        address _userAcc,
        uint _CO,             
        uint _NOX,            
        uint _HC,             
        string memory _issueDate                     //parameters for the function
    ) public {
        require(
            certificates[_userAcc][_vechileNo].isAdded == false, //checks whether certificate already exist.
            "Certificate must not be exist already."
        );

        require(
            bytes(certificates[_userAcc][_vechileNo].vechileNo).length==0, //checks whether vechileno is empty or not
            "Vechile no should not be empty."
        );
        bool _isValid;
        if(_CO < 2){
            _isValid = true;
        }
        else{
            _isValid = false;
        }

        Certificates memory cert = Certificates({  //create a certificate instance
            userName: _userName,
            vechileNo: _vechileNo,
            userAcc: _userAcc,
            CO: _CO,
            NOX: _NOX,
            HC: _HC,
            issueDate: _issueDate,
            isValid: _isValid,
            isAdded: true
        });

        certificates[_userAcc][_vechileNo] = cert;
    }

    //certificate viewing function
    function getCertificate(
        address _userAcc,
        string memory _vechileNo   //parameters for the functions
    ) public view 
    returns (string memory, uint, uint, uint, string memory,bool){  //returning parameters
        require(
            _userAcc != address(0),
            "User address must not be empty."
        );

        require(
            bytes(_vechileNo).length != 0,
            "Vechile no must not be empty."
        );

        return(
            certificates[_userAcc][_vechileNo].userName,
            certificates[_userAcc][_vechileNo].CO,
            certificates[_userAcc][_vechileNo].NOX,
            certificates[_userAcc][_vechileNo].HC,
            certificates[_userAcc][_vechileNo].issueDate,
            certificates[_userAcc][_vechileNo].isValid
        );
    }
}
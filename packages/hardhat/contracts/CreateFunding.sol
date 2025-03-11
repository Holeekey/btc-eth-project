// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract CreateFunding {
    
    // ESTRUCTURAS
    struct Funding{
        uint id;
        string title;
        string user;
        string shortDescription;
        string longDescription;
        string category;
        uint goal;
        uint totalEarned;
        address creator;
        address recipient;
        uint timestamp;
        bool isFundingComplete;
    }
    mapping(address => uint) public balances;
    mapping(uint => Funding) public fundings;
    Funding[] public fundingList;
    uint public nextId = 1;
    /*function deposit() public payable {
        balances[msg.sender] += msg.value;
    }*/

    //CREAR FUNDING
    function createFunding(string memory title, string memory user, string memory shortDescription, string memory longDescription, string memory category, uint goal, address recipient) public {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(title).length <= 30, "Title cannot be longer than 30 characters");
        require(bytes(user).length > 0, "User cannot be empty");
        require(bytes(user).length <= 15, "User cannot be longer than 15 characters");
        require(bytes(shortDescription).length > 0, "Short description cannot be empty");
        require(bytes(shortDescription).length <= 70, "Short description cannot be longer than 70 characters");
        require(bytes(longDescription).length > 0, "Long description cannot be empty");
        require(bytes(longDescription).length <= 200, "Long description cannot be longer than 200 characters");
        require(bytes(category).length > 0, "Category cannot be empty");
        require(bytes(category).length <= 15, "Category cannot be longer than 15 characters");
        require(goal > 0, "Goal must be greater than zero");
        require(recipient != address(0), "Recipient address is not valid");
        Funding memory newFunding = Funding(nextId, title, user, shortDescription, longDescription, category, goal, 0, msg.sender, recipient, block.timestamp, false);
        fundings[nextId] = newFunding;
        fundingList.push(newFunding);
        nextId++;
    }

    // VISUALIZAR FUNDINGS
    function retrieveById(uint id) public view returns (Funding memory) {
        return fundings[id];
    }

    function retrieveAllFundings() public view returns (Funding[] memory) {
        return fundingList;
    }

    //PAGAR FUNDING
    function fundFunding(uint id/*,uint amount*/) public payable {
        //require(amount > 0, "Amount must be greater than zero");
        //require(balances[msg.sender] >= amount, "Your balance must be greater than the amount");
        require(fundings[id].totalEarned + /*amount*/msg.value <=fundings[id].goal, "Amount must be less than or equal to goal");
        //balances[msg.sender] -= amount;
        //balances[fundings[id].recipient] += amount;
        balances[msg.sender] += msg.value;
        fundings[id].totalEarned += msg.value/*amount*/;
        if (fundings[id].totalEarned == fundings[id].goal) fundings[id].isFundingComplete = true;
    }
}
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract CreateFunding {
    
    // ESTRUCTURAS
    struct Funding{
        uint id;
        string title;
        string user;
        string description;
        string category;
        uint goal;
        uint totalEarned;
        address creator;
        address recipient;
        uint timestamp;
    }
    mapping(address => uint) public balances;
    mapping(uint => Funding) public fundings;
    Funding[] public fundingList;
    uint public nextId = 1;
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    //CREAR FUNDING
    function createFunding(string memory title, string memory user, string memory description, string memory category, uint goal, address recipient) public {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(user).length > 0, "User cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(category).length > 0, "Category cannot be empty");
        require(goal > 0, "Goal must be greater than zero");
        require(recipient != address(0), "Recipient address is not valid");
        Funding memory newFunding = Funding(nextId, title, user, description, category, goal, 0, msg.sender, recipient, block.timestamp);
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
    function fundFunding(uint id, uint amount) public payable {
        require(amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Your balance must be greater than the amount");
        require(fundings[id].totalEarned + amount <=fundings[id].goal, "Amount must be less than or equal to goal");
        balances[msg.sender] -= amount;
        balances[fundings[id].recipient] += amount;
        fundings[id].totalEarned += amount;
    }
}
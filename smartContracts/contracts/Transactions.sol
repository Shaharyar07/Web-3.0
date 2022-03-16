// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionsCounter;

    event Transfer(
        address from,
        address reciever,
        uint256 amount,
        uint256 timeStamp,
        string message,
        string keyword
    );
    struct TransferStruct {
        address sender;
        address reciever;
        uint256 amount;
        uint256 timeStamp;
        string message;
        string keyword;
    }
    TransferStruct[] transactions;

    function addToBlockchain(
        address payable reciever,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionsCounter++;
        transactions.push(
            TransferStruct(
                msg.sender,
                reciever,
                amount,
                block.timestamp,
                message,
                keyword
            )
        );
        emit Transfer(
            msg.sender,
            reciever,
            amount,
            block.timestamp,
            message,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionsCounter;
    }
}

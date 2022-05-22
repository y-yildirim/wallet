// SPDX-License-Identifier: ISC

pragma solidity 0.8.13;

contract Wallet {
    uint256 public quorum;
    address[] public approvers;
    Transfer[] public transfers;
    mapping(address => mapping(uint256 => bool)) public approvals;

    struct Transfer {
        uint256 id;
        uint256 amount;
        address payable to;
        uint256 approvals;
        bool sent;
    }

    modifier onlyApprover() {
        bool allowed = false;
        for (uint256 i = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        require(allowed == true, "only approver allowed.");
        _;
    }

    constructor(address[] memory _approvers, uint256 _quorum) {
        approvers = _approvers;
        quorum = _quorum;
    }

    function getApprovers() external view returns (address[] memory) {
        return approvers;
    }

    function getTransfers() external view returns (Transfer[] memory) {
        return transfers;
    }

    function createTransfer(uint256 amount, address payable to) external {
        transfers.push(Transfer(transfers.length, amount, to, 0, false));
    }

    function approveTransfer(uint256 id) external payable onlyApprover {
        require(transfers[id].sent == false, "transfer has already been sent.");
        require(
            approvals[msg.sender][id] == false,
            "cannot approve transfer twice."
        );

        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        if (transfers[id].approvals >= quorum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint256 amount = transfers[id].amount;
            to.transfer(amount);
            // payable(msg.sender).transfer(amount); msg.sender is always payable or?
        }
    }

    receive() external payable {}
}

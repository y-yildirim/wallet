const { expectRevert } = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const Wallet = artifacts.require("Wallet");

contract("Wallet", (accounts) => {
  let wallet;
  beforeEach(async () => {
    wallet = await Wallet.new([accounts[0], accounts[1], accounts[2]], 2, {
      from: accounts[0],
    });
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: wallet.address,
      value: 1000,
    });
  });

  it("should have correct approvers and quorum.", async () => {
    const approvers = await wallet.getApprovers();
    const quorum = await wallet.quorum();
    assert(approvers.length === 3);
    assert(approvers[0] == accounts[0]);
    assert(approvers[1] == accounts[1]);
    assert(approvers[2] == accounts[2]);
    assert(quorum.toNumber() === 2);
    // assert(quorum.toString() === '2') -> to get too big numbers for js
  });

  it("should create transfers.", async () => {
    await wallet.createTransfer(100, accounts[5], { from: accounts[0] });
    const transfers = await wallet.getTransfers();
    assert(transfers.length === 1);
    assert(transfers[0].id === "0");
    assert(transfers[0].amount === "100");
    assert(transfers[0].to == accounts[5]);
    assert(transfers[0].approvals === "0");
    assert(transfers[0].sent === false);
  });

  it("should NOT create transfers if sender is not approved.", async () => {
    await expectRevert(
      wallet.createTransfer(100, accounts[0], { from: accounts[3] }),
      "only approver allowed."
    );
  });

  it("should increase the approvals", async () => {
    const balanceBefore = web3.utils.toBN(
      await web3.eth.getBalance(accounts[3])
    );
    await wallet.createTransfer(100, accounts[3], { from: accounts[0] });
    await wallet.approveTransfer(0, { from: accounts[0] });
    const transfers = await wallet.getTransfers();
    const balanceAfter = web3.utils.toBN(
      await web3.eth.getBalance(accounts[3])
    );
    assert(transfers[0].approvals == "1");
    assert(transfers[0].sent === false);
    assert(balanceBefore.sub(balanceAfter).toString() == "0");
  });

  it("should approve and send transfer if quorum reached", async () => {
    const balanceBefore = web3.utils.toBN(
      await web3.eth.getBalance(accounts[3])
    );
    await wallet.createTransfer(300, accounts[3], { from: accounts[1] });
    await wallet.approveTransfer(0, { from: accounts[0] });
    await wallet.approveTransfer(0, { from: accounts[1] });
    const balanceAfter = web3.utils.toBN(
      await web3.eth.getBalance(accounts[3])
    );
    assert(balanceAfter.sub(balanceBefore).toString() === "300");
  });

  it("should NOT approve transfer if sender is not an approver", async () => {
    await wallet.createTransfer(100, accounts[3], { from: accounts[0] });
    await expectRevert(
      wallet.approveTransfer(0, { from: accounts[4] }),
      "only approver allowed."
    );
  });

  it("should NOT approve transfer if transfer is already sent", async () => {
    await wallet.createTransfer(100, accounts[3], { from: accounts[0] });
    await wallet.approveTransfer(0, { from: accounts[0] });
    await wallet.approveTransfer(0, { from: accounts[1] });
    await expectRevert(
      wallet.approveTransfer(0, { from: accounts[2] }),
      "transfer has already been sent."
    );
  });

  it("should NOT approve transfer twice", async () => {
    await wallet.createTransfer(100, accounts[3], { from: accounts[0] });
    await wallet.approveTransfer(0, { from: accounts[0] });
    await expectRevert(
      wallet.approveTransfer(0, { from: accounts[0] }),
      "cannot approve transfer twice."
    );
  });

  // it.only('bla bla') to test only that case
});

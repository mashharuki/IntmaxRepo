// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/metatx/ERC2771Context.sol';

contract HelloWorld is ERC2771Context {

  string public text;

  /**
   * constructor 
   */
  constructor(
    address _trustedForwarder
  ) ERC2771Context(_trustedForwarder) {}

  /**
   * setNewText
   */
  function setNewText(string memory _newText) public {
    text = _newText;
  }

  /**
   * getText
   */
  function getText() view public returns (string memory) {
    return text;
  }

  ///////////////////////////////// ERC2771 method /////////////////////////////////

  function _msgSender()
    internal
    view
    virtual
    override
    returns (address sender)
  {
    if (isTrustedForwarder(msg.sender)) {
      // The assembly code is more direct than the Solidity version using `abi.decode`.
      /// @solidity memory-safe-assembly
      assembly {
        sender := shr(96, calldataload(sub(calldatasize(), 20)))
      }
    } else {
      return super._msgSender();
    }
  }

  function _msgData()
    internal
    view
    virtual
    override
    returns (bytes calldata)
  {
    if (isTrustedForwarder(msg.sender)) {
      return msg.data[:msg.data.length - 20];
    } else {
      return super._msgData();
    }
  }
}
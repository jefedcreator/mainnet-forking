//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Idemo{
      function balanceOf(address account) external view returns (uint256);
      function transfer(address to, uint256 amount) external view returns (bool);
}
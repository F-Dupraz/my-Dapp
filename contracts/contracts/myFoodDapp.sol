// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyFoodDapp {
  
  struct MyFoodItem {
    address owner;
    string foodUrl;
    string foodName;
    string originCountry;
  }

  MyFoodItem[] private MyFoods;
  
  constructor() {
    //
  }

  function addFood(string memory food_url, string memory food_name, string memory food_origin_country) public {
    MyFoods.push(MyFoodItem(msg.sender, food_url, food_name, food_origin_country));
  }

  function getAllFoods() public view returns(MyFoodItem[] memory) {
    return MyFoods;
  }

  function getFoodByOwner() public view returns(MyFoodItem[] memory) {
    uint256 item_count = 0;
    for(uint256 i = 0; i < MyFoods.length; i++) {
      if(MyFoods[i].owner == msg.sender) {
        item_count += 1;
      }
    }
    MyFoodItem[] memory my_own_foods = new MyFoodItem[](item_count);
    for(uint256 j = 0; j < item_count; j++) {
      for(uint256 i = 0; i < MyFoods.length; i++) {
        if(MyFoods[i].owner == msg.sender) {
          my_own_foods[j] = MyFoods[i];
          break;
        }
      }
    }
    return my_own_foods;
  }
}
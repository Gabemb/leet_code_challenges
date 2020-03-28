/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
Example:
  Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
  Output: 7 -> 0 -> 8
  Explanation: 342 + 465 = 807.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
      this.val = val;
      this.next = null;
}

/** Cleanest solution: **/
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let currentL1Node = l1,
      currentL2Node = l2,
      summedList = new ListNode(0),
      digits = summedList,
      sum = 0;
  
  while (currentL1Node || currentL2Node) {
    sum = Math.floor(sum / 10);

    if (currentL1Node) {
      sum += currentL1Node.val;
      currentL1Node = currentL1Node.next;
    }
    
    if (currentL2Node) {
      sum += currentL2Node.val;
      currentL2Node = currentL2Node.next;
    }
    
    digits.next = new ListNode(sum % 10);
    digits = digits.next;
  }
  
  if (Math.floor(sum / 10)) {
    digits.next = new ListNode(1);  
  }

  return summedList.next;
};

/** Solution I originally came up with: **/

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {Object} {firstNum: String, secondNum: String}
 */
function getNumsFromLinkedLists (l1, l2) {
    let currentL1Node = l1,
      currentL2Node= l2,
      firstNum = '',
      secondNum = '';
  
   while(currentL1Node !== null || currentL2Node !== null) {
    if(currentL1Node) {
      firstNum = currentL1Node.val + firstNum;
      currentL1Node = currentL1Node.next;
    }
    
    if(currentL2Node) {
      secondNum = currentL2Node.val + secondNum; 
      currentL2Node = currentL2Node.next;
    }
  }
  
  return {firstNum, secondNum}
}

/**
 * @param {String} x
 * @param {String} y
 * @return {String}
 */
function addStringsAsIntegers(x, y) {
  const smallerNumber = x.length < y.length ? x : y;
  const largerNumber = y.length > x.length ? y : x;
  let sum = '';
  let carry = 0;
  
  function addDigitsIntoSumString(num1, num2) {
    const sumOfDigits = parseInt(num1, 10) + parseInt(num2, 10) + carry;
    
    sum = sumOfDigits % 10 + sum;
    carry = sumOfDigits > 9 ? 1 : 0;
  }
  
  for(let i = 0; i < smallerNumber.length; i++) {
   addDigitsIntoSumString(
     largerNumber[largerNumber.length - 1 - i],
     smallerNumber[smallerNumber.length - 1 - i]
   );
  }
  
  const remainingDigits = largerNumber.length - smallerNumber.length;
  
  if(carry) {
    if(remainingDigits) {
      let index = remainingDigits - 1;
      while(carry && index >= 0) {
        addDigitsIntoSumString(
          largerNumber[index],
          '0'
        );
        
        index -= 1;
      }
      
      if(index >= 0) {
        return largerNumber.slice(0, index + 1) + sum
      }
      
      return carry ? carry + sum : sum;
    }

    return carry + sum
  }
  
  return remainingDigits ? largerNumber.slice(0, remainingDigits) + sum : sum;
}

/**
 * @param {Array} values
 * @return {ListNode}
 */
function createLinkedListFromArray(values) {
  const root = new ListNode(values[0]);
  let currentNode = root;
  
  for(let i = 1; i < values.length; i++) {
    currentNode.next = new ListNode(values[i]);
    
    currentNode = currentNode.next;
  }
  
  return root;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const {firstNum, secondNum} = getNumsFromLinkedLists(l1, l2);
  
  const stringSum = addStringsAsIntegers(firstNum, secondNum);
  
  const sumLinkedList = createLinkedListFromArray(stringSum.split('').reverse());
  
  return sumLinkedList;
};

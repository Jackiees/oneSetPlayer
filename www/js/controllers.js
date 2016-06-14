angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope,$state) {
  $scope.go = function (num) {
    if (num === 1) {
      $state.go('app.browse');
    } else if (num === 2) {
      $state.go('app.playlists');
    }
  };
})

.controller('GameCtrl', function($scope,$state,$window,$timeout) {

  // Check if numbers are consecutive
  var checkIfNumbersAreConsecutive = function(array) {
    var arr     = array;
    var results = [];
    var limit   = arr.length - 1;

    var sequence = 0;
    for (var i = 0; i < limit; ++i) {
      var diff = arr[i+1] - arr[i];
      if(sequence === diff && diff !== 0) {
        results.push(i-1);
        continue;
      }
      sequence = (diff === 1 || diff === -1) // or ... Math.abs(diff) === 1
      ? diff
      : 0;
    }
    // if (results[0] === 0) {
    //   // console.log('true');
    //   firstNumber = undefined;
    //   secondNumber = undefined;
    //   thirdNumber = undefined;
    //   addTime();
    //   // $scope.score++;
    //   $scope.randomNumbers1 = [];
    //   $scope.randomNumbers2 = [];
    //   $scope.randomNumbers3 = [];
    //   getRandomNumbersNew();
    //   return true;
    // }
  };

  // What cards are used?
  // var cardsChosenByPlayer = [];

  // Function for controling if the input from PLAYER is correct according to the GAME RULES
  // When does PLAYER gets points?
  // Game has 4 different options: in number (I, II, III), symbol (triangles, rounds, swirls), color (red, green, purple) and filling (fill,stripes, empty)
  // Overal rule: all three cards must be the same or all different

  // RULE 1: same Number but different inputColors and different Symbol
  // RULE 2: consecutive inputNumbers with same inputColors

  var controleInput = function(inputArray) {
    // console.log(inputArray);
    // Array with InputNumbers 1, 2 or 3
    var inputNumbers = inputArray[0];
    // Array with InputColors: 1 for RED, 2 for GREEN, 3 for PURPLE
    var inputColors = inputArray[1];
    // Array with InputFilling: 1 for FILLED, 2 for STRIPES and 3 for EMPTY
    var inputFillings = inputArray[2];
    // Array with InputSymbol: 1 for DIAMOND, 2 for OVAL and 3 for SQUIGGLE
    var inputSymbols = inputArray[3];

    var arraySortedInputNumbers = inputNumbers;
    arraySortedInputNumbers.sort();
    var sortedInputNumbers = arraySortedInputNumbers.toString();
    // console.log(inputNumbers);
    // console.log(inputColors);

    // Check for similarities of the three cards: 4 kinds of similarities
    var similarInputNumbers = inputNumbers[0] === inputNumbers[1] && inputNumbers[1] === inputNumbers[2] && inputNumbers[0] === inputNumbers[2];
    var similarInputColors = inputColors[0] === inputColors[1] && inputColors[1] === inputColors[2] && inputColors[0] === inputColors[2];
    var similarInputFillings = inputFillings[0] === inputFillings[1] && inputFillings[1] === inputFillings[2] && inputFillings[0] === inputFillings[2];
    var similarInputSymbols = inputSymbols[0] === inputSymbols[1] && inputSymbols[1] === inputSymbols[2] && inputSymbols[0] === inputSymbols[2];

    console.log('CHECK ALL SIMILARITIES');
    console.log("Similar numbers: " + similarInputNumbers);
    console.log("Similar colors: " + similarInputColors);
    console.log("Similar fillings: " + similarInputFillings);
    console.log("Similar symbols: " + similarInputSymbols);

    var differentInputColors = inputColors[0] !== inputColors[1] && inputColors[0] !== inputColors[2] && inputColors[1] !== inputColors[2];
    // console.log('all three color different = ' + differentInputColors);
    var similarInputNumbersDifferentSymbol = sortedInputNumbers === "1,4,7" || sortedInputNumbers === "2,5,8" || sortedInputNumbers === "3,6,9";
    var similarInputNumbersDifferentSymbolAndDifferentColor = similarInputNumbersDifferentSymbol && differentInputColors;

    // RULE 1: same Number but different inputColors and different Symbol
    if (similarInputNumbersDifferentSymbolAndDifferentColor === true) {
      alert('Rule 1: similarInputNumbersDifferentSymbolAndDifferentColor');
      firstNumber = undefined;
      secondNumber = undefined;
      thirdNumber = undefined;
      addTime();
      $scope.score++;
      // $scope.randomNumbers1 = [];
      // $scope.randomNumbers2 = [];
      // $scope.randomNumbers3 = [];
      // get3NewCards();
      // getRandomNumbersNew();
      // return;
    } else {
      firstNumber = undefined;
      secondNumber = undefined;
      thirdNumber = undefined;
      $scope.score--;
      // $scope.randomNumbers1 = [];
      // $scope.randomNumbers2 = [];
      // $scope.randomNumbers3 = [];
      // get3NewCards();
      // getRandomNumbersNew();
    }

    // console.log(arrayCardsOnTable);


    // Replace 3 chosen cards with 3 new cards from deck
    // Pick 3 new cards
    var newCards = [];

    for (var y = 0; y<3;y++) {
        var number = getRandomNumber();
        var item = cardDeck[number];
        newCards.push(item);
        // $scope.randomNumbers.push(item);
        cardDeck.splice(number,1);
      }

    // console.log(newCards);

    //
    // var newCards = [
    //   {num:3,col:2,fill:1,sym:1},
    //   {num:2,col:2,fill:3,sym:1},
    //   {num:2,col:1,fill:2,sym:1}
    // ];


    // console.log(removeTheseCards);

    // Replace the chosen cards with the 3 new cards
    for (var x = 0; x < removeTheseCards.length; x++) {
      if (removeTheseCards[x].row === 1) {
        $scope.randomNumbers1[removeTheseCards[x].number] = newCards[x];
      } else if (removeTheseCards[x].row === 2) {
        $scope.randomNumbers2[removeTheseCards[x].number] = newCards[x];
      } else if (removeTheseCards[x].row === 3) {
        $scope.randomNumbers3[removeTheseCards[x].number] = newCards[x];
      }

    }

    // console.log(removeTheseCards);
    removeTheseCards = [];
    // console.log(cardDeck);

    // Replace 3 chosen cards with 3 new cards from deck
    // $scope.randomNumbers1[0] = {num:3,col:2,fill:1,sym:1};
    // $scope.randomNumbers1[1] = {num:2,col:2,fill:3,sym:1};
    // $scope.randomNumbers1[2] = {num:2,col:1,fill:2,sym:1};
    // $scope.randomNumbers1[1] = arrayCardsOnTable[1];
    // $scope.randomNumbers1[2] = arrayCardsOnTable[2];
    // $scope.randomNumbers1[3] = arrayCardsOnTable[3];
    //
    // $scope.randomNumbers2.push(arrayCardsOnTable[4]);
    // $scope.randomNumbers2.push(arrayCardsOnTable[5]);
    // $scope.randomNumbers2.push(arrayCardsOnTable[6]);
    // $scope.randomNumbers2.push(arrayCardsOnTable[7]);
    //
    // $scope.randomNumbers3.push(arrayCardsOnTable[8]);
    // $scope.randomNumbers3.push(arrayCardsOnTable[9]);
    // $scope.randomNumbers3.push(arrayCardsOnTable[10]);
    // $scope.randomNumbers3.push(arrayCardsOnTable[11]);

    // console.log(similarInputNumbersDifferentSymbolAndDifferentColor);
    // console.log("same number with different symbol= " + similarInputNumbersDifferentSymbol);
    // console.log("same symbol= " + similarInputNumbers);
    // console.log("same color= " + similarInputColors);

    var permArr = [],
    usedChars = [];

    function permute(input) {
      var i, ch;
      for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
          permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
      }
      return permArr
    };

    // var permArrCol = [];
    // var usedCharsCol = [];
    //
    // function permute_col(input) {
    //   // console.log(input);
    //   var i, ch;
    //   for (i = 0; i < input.length; i++) {
    //     ch = input.splice(i, 1)[0];
    //     usedCharsCol.push(ch);
    //     if (input.length == 0) {
    //       permArr.push(usedCharsCol.slice());
    //     }
    //     permute(input);
    //     input.splice(i, 0, ch);
    //     usedCharsCol.pop();
    //   }
    //   return permArrCol;
    // };

    permute(inputNumbers);
    // permute_col(inputColors);

    // console.log(permArr);
    // console.log(permArrCol);

    // for (var i = 0; i < permArr.length; i++) {
    //   // console.log(permArr[i]);
    //   if (checkIfNumbersAreConsecutive(permArr[i]) === true) {
    //
    //       if(similarInputColors) {
    //         $scope.score++;
    //         // console.log('plus');
    //         return;
    //       }
    //     // $scope.score++;
    //     // console.log('plus');
    //     // return;
    //   } else if (i === 5) {
    //     // console.log('minus');
    //     firstNumber = undefined;
    //     secondNumber = undefined;
    //     thirdNumber = undefined;
    //     $scope.score--;
    //     $scope.randomNumbers1 = [];
    //     $scope.randomNumbers2 = [];
    //     $scope.randomNumbers3 = [];
    //     getRandomNumbersNew();
    //     return false;
    //   }
    // }

  };

  // End check consecutive numbers

  $scope.newGame = function() {
    $window.location.reload();
  }

  $scope.game = true;

  var random = function() {
    var num = Math.floor((Math.random() * 3) + 1);
    return num;
  }

  var i = 4;
  // $scope.randomNumbers = [];
  $scope.randomNumbers1 = [];
  $scope.randomNumbers2 = [];
  $scope.randomNumbers3 = [];

  // var getRandomNumbers = function() {
  //
  //   for (var j = 0; j < i; j++) {
  //     var lol1 = random();
  //     var lol2 = random();
  //     var lol3 = random();
  //     $scope.randomNumbers1.push({num:lol1});
  //     $scope.randomNumbers2.push({num:lol2});
  //     $scope.randomNumbers3.push({num:lol3});
  //   }
  //
  //   console.log($scope.randomNumbers1);
  //   console.log($scope.randomNumbers1);
  //   console.log($scope.randomNumbers1);
  //
  // };

  // getRandomNumbers();

  // Hardcoded 81 cards
  var cardDeck = [
    // RED cards
    // RED Number 1
    {num:1,col:1,fill:1,sym:1},
    {num:1,col:1,fill:1,sym:2},
    {num:1,col:1,fill:1,sym:3},

    {num:1,col:1,fill:2,sym:1},
    {num:1,col:1,fill:2,sym:2},
    {num:1,col:1,fill:2,sym:3},

    {num:1,col:1,fill:3,sym:1},
    {num:1,col:1,fill:3,sym:2},
    {num:1,col:1,fill:3,sym:3},

    // RED number 2
    {num:2,col:1,fill:1,sym:1},
    {num:2,col:1,fill:1,sym:2},
    {num:2,col:1,fill:1,sym:3},

    {num:2,col:1,fill:2,sym:1},
    {num:2,col:1,fill:2,sym:2},
    {num:2,col:1,fill:2,sym:3},

    {num:2,col:1,fill:3,sym:1},
    {num:2,col:1,fill:3,sym:2},
    {num:2,col:1,fill:3,sym:3},

    // RED number 3
    {num:3,col:1,fill:1,sym:1},
    {num:3,col:1,fill:1,sym:2},
    {num:3,col:1,fill:1,sym:3},

    {num:3,col:1,fill:2,sym:1},
    {num:3,col:1,fill:2,sym:2},
    {num:3,col:1,fill:2,sym:3},

    {num:3,col:1,fill:3,sym:1},
    {num:3,col:1,fill:3,sym:2},
    {num:3,col:1,fill:3,sym:3},

    // GREEN cards
    // GREEN Number 1
    {num:1,col:2,fill:1,sym:1},
    {num:1,col:2,fill:1,sym:2},
    {num:1,col:2,fill:1,sym:3},

    {num:1,col:2,fill:2,sym:1},
    {num:1,col:2,fill:2,sym:2},
    {num:1,col:2,fill:2,sym:3},

    {num:1,col:2,fill:3,sym:1},
    {num:1,col:2,fill:3,sym:2},
    {num:1,col:2,fill:3,sym:3},

    // GREEN number 2
    {num:2,col:2,fill:1,sym:1},
    {num:2,col:2,fill:1,sym:2},
    {num:2,col:2,fill:1,sym:3},

    {num:2,col:2,fill:2,sym:1},
    {num:2,col:2,fill:2,sym:2},
    {num:2,col:2,fill:2,sym:3},

    {num:2,col:2,fill:3,sym:1},
    {num:2,col:2,fill:3,sym:2},
    {num:2,col:2,fill:3,sym:3},

    // GREEN number 3
    {num:3,col:2,fill:1,sym:1},
    {num:3,col:2,fill:1,sym:2},
    {num:3,col:2,fill:1,sym:3},

    {num:3,col:2,fill:2,sym:1},
    {num:3,col:2,fill:2,sym:2},
    {num:3,col:2,fill:2,sym:3},

    {num:3,col:2,fill:3,sym:1},
    {num:3,col:2,fill:3,sym:2},
    {num:3,col:2,fill:3,sym:3},

    // PURPLE cards
    // PURPLE Number 1
    {num:1,col:3,fill:1,sym:1},
    {num:1,col:3,fill:1,sym:2},
    {num:1,col:3,fill:1,sym:3},

    {num:1,col:3,fill:2,sym:1},
    {num:1,col:3,fill:2,sym:2},
    {num:1,col:3,fill:2,sym:3},

    {num:1,col:3,fill:3,sym:1},
    {num:1,col:3,fill:3,sym:2},
    {num:1,col:3,fill:3,sym:3},

    // PURPLE number 2
    {num:2,col:3,fill:1,sym:1},
    {num:2,col:3,fill:1,sym:2},
    {num:2,col:3,fill:1,sym:3},

    {num:2,col:3,fill:2,sym:1},
    {num:2,col:3,fill:2,sym:2},
    {num:2,col:3,fill:2,sym:3},

    {num:2,col:3,fill:3,sym:1},
    {num:2,col:3,fill:3,sym:2},
    {num:2,col:3,fill:3,sym:3},

    // PURPLE number 3
    {num:3,col:3,fill:1,sym:1},
    {num:3,col:3,fill:1,sym:2},
    {num:3,col:3,fill:1,sym:3},

    {num:3,col:3,fill:2,sym:1},
    {num:3,col:3,fill:2,sym:2},
    {num:3,col:3,fill:2,sym:3},

    {num:3,col:3,fill:3,sym:1},
    {num:3,col:3,fill:3,sym:2},
    {num:3,col:3,fill:3,sym:3}
  ];

  var getRandomNumber = function() {
    var number = Math.floor(Math.random()*cardDeck.length);
    // console.log(number);
    return number;
    // return Math.floor(Math.random()*cardDeck.length);
  };

  $scope.randomNumbers = [];

  // Array to check cards on current table
  var arrayCardsOnTable = [];
  var removeTheseCards = [];
  // var newArrayCardsOnTable = [];

  // Function to get Random cards
  // 81 cards
  var getRandomNumbersNew = function () {
    // Got Array Carddeck with 81 cards
    // Everytime cards shuffled, 12 cards on table

    for (var y = 0; y<12;y++) {
      var number = getRandomNumber();
      var item = cardDeck[number];
      arrayCardsOnTable.push(item);
      $scope.randomNumbers.push(item);
      cardDeck.splice(number,1);
    }

    newArrayCardsOnTable = angular.copy(arrayCardsOnTable);

    // console.log(arrayCardsOnTable);
    // console.log(cardDeck);

    $scope.randomNumbers1.push(arrayCardsOnTable[0]);
    $scope.randomNumbers1.push(arrayCardsOnTable[1]);
    $scope.randomNumbers1.push(arrayCardsOnTable[2]);
    $scope.randomNumbers1.push(arrayCardsOnTable[3]);

    $scope.randomNumbers2.push(arrayCardsOnTable[4]);
    $scope.randomNumbers2.push(arrayCardsOnTable[5]);
    $scope.randomNumbers2.push(arrayCardsOnTable[6]);
    $scope.randomNumbers2.push(arrayCardsOnTable[7]);

    $scope.randomNumbers3.push(arrayCardsOnTable[8]);
    $scope.randomNumbers3.push(arrayCardsOnTable[9]);
    $scope.randomNumbers3.push(arrayCardsOnTable[10]);
    $scope.randomNumbers3.push(arrayCardsOnTable[11]);

  };

  var get3NewCards = function (row, index) {
    var number = randomNumbers();
    var item = cardDeck[number];
    // if (row === 1) {
    //   $scope.randomNumbers1.push(arrayCardsOnTable[0]);
    // } else if (row === 2) {
    //
    // } else if (row === 3) {
    //
    // }
    // console.log(arrayCardsOnTable);
  };

  getRandomNumbersNew();

  var firstNumber;
  var secondNumber;
  var thirdNumber;
  $scope.score = 0;

  $scope.press = function(row,index) {

    // console.log($scope.counter);
    // console.log(row + ' ' + index);

    if (row === 1) {
      if (firstNumber === undefined || firstNumber === null) {
        // arrayCardsOnTable[index] = 'replace';
        removeTheseCards.push({row:1,number:index});

        firstNumber = $scope.randomNumbers1[index];
        $scope.randomNumbers1[index].click = true;
        console.log(firstNumber);
        $scope.firstNumber = firstNumber.num;
      } else if (secondNumber === undefined || secondNumber === null) {
        // arrayCardsOnTable[index] = 'replace';
        removeTheseCards.push({row:1,number:index});
        // cardsChosenByPlayer.push({row:1,number:index});
        secondNumber = $scope.randomNumbers1[index];
        $scope.randomNumbers1[index].click = true;
        console.log(secondNumber);
        $scope.secondNumber = secondNumber.num;
      } else if (thirdNumber === undefined || thirdNumber === null) {
        // arrayCardsOnTable[index] = 'replace';
        removeTheseCards.push({row:1,number:index});
        // cardsChosenByPlayer.push({row:1,number:index});
        thirdNumber = $scope.randomNumbers1[index];
        $scope.randomNumbers1[index].click = true;
        console.log(thirdNumber);
        $scope.thirdNumber = thirdNumber.num;

        // Set 3 choices in order
        var inputArrayNumber = [];
        var inputArrayColor = [];
        var inputArrayFilling = [];
        var inputArraySymbol = [];

        inputArrayNumber.push(firstNumber.num);
        inputArrayNumber.push(secondNumber.num);
        inputArrayNumber.push(thirdNumber.num);
        inputArrayColor.push(firstNumber.col);
        inputArrayColor.push(secondNumber.col);
        inputArrayColor.push(thirdNumber.col);
        inputArrayFilling.push(firstNumber.fill);
        inputArrayFilling.push(secondNumber.fill);
        inputArrayFilling.push(thirdNumber.fill);
        inputArraySymbol.push(firstNumber.sym);
        inputArraySymbol.push(secondNumber.sym);
        inputArraySymbol.push(thirdNumber.sym);

        var inputArray = [inputArrayNumber,inputArrayColor,inputArrayFilling,inputArraySymbol];
        // console.log(inputArray);
        controleInput(inputArray);
        // console.log(cardsChosenByPlayer);
      }

    } else if (row ===2) {

      if (firstNumber === undefined || firstNumber === null) {
        // cardsChosenByPlayer.push({row:2,number:index});
        removeTheseCards.push({row:2,number:index});
        firstNumber = $scope.randomNumbers2[index];
        $scope.randomNumbers2[index].click = true;
        console.log(firstNumber);
        $scope.firstNumber = firstNumber.num;
      } else if (secondNumber === undefined || secondNumber === null) {
        removeTheseCards.push({row:2,number:index});
        // cardsChosenByPlayer.push({row:2,number:index});
        secondNumber = $scope.randomNumbers2[index];
        $scope.randomNumbers2[index].click = true;
        console.log(secondNumber);
        $scope.secondNumber = secondNumber.num;
      } else if (thirdNumber === undefined || thirdNumber === null) {
        // cardsChosenByPlayer.push({row:2,number:index});
        removeTheseCards.push({row:2,number:index});
        thirdNumber = $scope.randomNumbers2[index];
        $scope.randomNumbers2[index].click = true;
        console.log(thirdNumber);
        $scope.thirdNumber = thirdNumber.num;

        var inputArrayNumber = [];
        var inputArrayColor = [];
        var inputArrayFilling = [];
        var inputArraySymbol = [];

        inputArrayNumber.push(firstNumber.num);
        inputArrayNumber.push(secondNumber.num);
        inputArrayNumber.push(thirdNumber.num);
        inputArrayColor.push(firstNumber.col);
        inputArrayColor.push(secondNumber.col);
        inputArrayColor.push(thirdNumber.col);
        inputArrayFilling.push(firstNumber.fill);
        inputArrayFilling.push(secondNumber.fill);
        inputArrayFilling.push(thirdNumber.fill);
        inputArraySymbol.push(firstNumber.sym);
        inputArraySymbol.push(secondNumber.sym);
        inputArraySymbol.push(thirdNumber.sym);

        var inputArray = [inputArrayNumber,inputArrayColor,inputArrayFilling,inputArraySymbol];
        // console.log(inputArray);
        controleInput(inputArray);
        // console.log(cardsChosenByPlayer);
      }

    } else if (row===3) {

      if (firstNumber === undefined || firstNumber === null) {
        // cardsChosenByPlayer.push({row:3,number:index});
        removeTheseCards.push({row:3,number:index});
        firstNumber = $scope.randomNumbers3[index];
        $scope.randomNumbers3[index].click = true;
        console.log(firstNumber);
        $scope.firstNumber = firstNumber.num;
      } else if (secondNumber === undefined || secondNumber === null) {
        // cardsChosenByPlayer.push({row:3,number:index});
        removeTheseCards.push({row:3,number:index});
        secondNumber = $scope.randomNumbers3[index];
        $scope.randomNumbers3[index].click = true;
        console.log(secondNumber);
        $scope.secondNumber = secondNumber.num;
      } else if (thirdNumber === undefined || thirdNumber === null) {
        // cardsChosenByPlayer.push({row:3,number:index});
        removeTheseCards.push({row:3,number:index});
        thirdNumber = $scope.randomNumbers3[index];
        $scope.randomNumbers3[index].click = true;
        console.log(thirdNumber);
        $scope.thirdNumber = thirdNumber.num;

        var inputArrayNumber = [];
        var inputArrayColor = [];
        var inputArrayFilling = [];
        var inputArraySymbol = [];

        inputArrayNumber.push(firstNumber.num);
        inputArrayNumber.push(secondNumber.num);
        inputArrayNumber.push(thirdNumber.num);
        inputArrayColor.push(firstNumber.col);
        inputArrayColor.push(secondNumber.col);
        inputArrayColor.push(thirdNumber.col);
        inputArrayFilling.push(firstNumber.fill);
        inputArrayFilling.push(secondNumber.fill);
        inputArrayFilling.push(thirdNumber.fill);
        inputArraySymbol.push(firstNumber.sym);
        inputArraySymbol.push(secondNumber.sym);
        inputArraySymbol.push(thirdNumber.sym);

        var inputArray = [inputArrayNumber,inputArrayColor,inputArrayFilling,inputArraySymbol];
        // console.log(inputArray);
        controleInput(inputArray);
        // console.log(cardsChosenByPlayer);

      }

    }

    // console.log($scope.randomNumbers[index]);
  };

  $scope.next = function() {
    $scope.score--;
    firstNumber = null;
    secondNumber = null;
    thirdNumber = null;
    $scope.randomNumbers1 = [];
    $scope.randomNumbers2 = [];
    $scope.randomNumbers3 = [];
    $scope.firstNumber = null;
    $scope.secondNumber = null;
    $scope.thirdNumber = null;
    getRandomNumbersNew();
  };

  // countdown
  $scope.counter = 30;
  var stopped;

  //timeout function
  //1000 milliseconds = 1 second
  //Every second counts
  //Cancels a task associated with the promise. As a result of this, the //promise will be resolved with a rejection.
  $scope.countdown = function() {
    stopped = $timeout(function() {
      //  console.log($scope.counter);
     $scope.counter--;
     $scope.countdown();
   }, 1000);
  };


  var addTime = function() {
    $scope.counter = ($scope.counter+10);
    // $timeout.cancel(stopped);
  }

  $scope.countdown();

//   var countdown = function(elementName, minutes, seconds){
//     var element, endTime, hours, mins, msLeft, time;
//
//     function twoDigits(n) {
//       return (n <= 9 ? "0" + n : n);
//     }
//
//     function updateTimer() {
//       msLeft = endTime - (+new Date);
//       if ( msLeft < 1000 ) {
//         $scope.game = false;
//         element.innerHTML = "game over!";
//           // alert('game over');
//       } else {
//           time = new Date( msLeft );
//           hours = time.getUTCHours();
//           mins = time.getUTCMinutes();
//           element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
//           setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
//       }
//     }
//
//     element = document.getElementById( elementName );
//     endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
//     console.log(endTime);
//     updateTimer();
// }
//
// countdown("countdown", 0, 20 );

  $scope.go = function () {
    $state.go('app.search');
    countdown("countdown");
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

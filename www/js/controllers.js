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
    if (results[0] === 0) {
      console.log('true');
      firstNumber = undefined;
      secondNumber = undefined;
      thirdNumber = undefined;
      addTime();
      // $scope.score++;
      $scope.randomNumbers1 = [];
      $scope.randomNumbers2 = [];
      $scope.randomNumbers3 = [];
      getRandomNumbersNew();
      return true;
    }
  };

  var controleInput = function(inputArray) {
    var inputNumbers = inputArray[0];
    var inputColors = inputArray[1];
    // console.log(inputArray);
    // console.log(inputNumbers);
    // console.log(inputColors);

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

    // var permArrCol = [],
    // usedCharsCol = [];
    //
    // function permute_col(input) {
    //   console.log(input);
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
    //   return permArrCol
    // };

    permute(inputNumbers);
    // permute_col(inputColors);

    console.log(permArr);
    // console.log(permArrCol);

    for (var i = 0; i < permArr.length; i++) {
      console.log(permArr[i]);
      if (checkIfNumbersAreConsecutive(permArr[i]) === true) {

          if(inputColors[0] === inputColors[1] && inputColors[1] === inputColors[2]) {
            $scope.score++;
            console.log('plus');
            return;
          }
        // $scope.score++;
        // console.log('plus');
        // return;
      } else if (i === 5) {
        console.log('minus');
        firstNumber = undefined;
        secondNumber = undefined;
        thirdNumber = undefined;
        $scope.score--;
        $scope.randomNumbers1 = [];
        $scope.randomNumbers2 = [];
        $scope.randomNumbers3 = [];
        getRandomNumbersNew();
        return false;
      }

      // console.log(i);


      // else if(checkIfNumbersAreConsecutive(permArr[i]) === false) {
      //   console.log('minus');
      //     $scope.score--;
      //     return;
      // }
      // else {
      //   console.log('minus');
      //   $scope.score--;
      //   return;
      // }
    }

  };

  // End check consecutive numbers

  $scope.newGame = function() {
    $window.location.reload();
  }

  $scope.game = true;



  var random = function() {
    var num = Math.floor((Math.random() * 12) + 1);
    return num;
  }

  var i = 4;
  // $scope.randomNumbers = [];
  $scope.randomNumbers1 = [];
  $scope.randomNumbers2 = [];
  $scope.randomNumbers3 = [];

  var getRandomNumbers = function() {

    for (var j = 0; j < i; j++) {
      var lol1 = random();
      var lol2 = random();
      var lol3 = random();
      $scope.randomNumbers1.push({num:lol1});
      $scope.randomNumbers2.push({num:lol2});
      $scope.randomNumbers3.push({num:lol3});
    }


  };

  // getRandomNumbers();


  // Get random numbers between
  var getRandomNumbersNew = function() {

    var numbersVB = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var color1 = [1,2,3,1];
    var color2 = [2,3,1,2];
    var color3 = [3,1,2,3];

    function shuffle(o) {
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    var randomVB = shuffle(numbersVB);
    var randomColor1 = shuffle(color1);
    var randomColor2 = shuffle(color2);
    var randomColor3 = shuffle(color3);

    var uno = randomVB.slice(0,4);
    var duo = randomVB.slice(3,7);
    var trio = randomVB.slice(5,9);
    console.log(uno);


    for (a=0;a<uno.length;a++) {
      $scope.randomNumbers1.push({num:uno[a],col:randomColor1[a],click:false})
    }

    // console.log($scope.randomNumbers1);

    for (b=0;b<duo.length;b++) {
      $scope.randomNumbers2.push({num:duo[b],col:randomColor2[b],click:false})
    }

    for (c=0;c<trio.length;c++) {
      $scope.randomNumbers3.push({num:trio[c],col:randomColor3[c],click:false})
    }

    console.log($scope.randomNumbers1);
    console.log($scope.randomNumbers2);
    console.log($scope.randomNumbers3);


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
        firstNumber = $scope.randomNumbers1[index];
        $scope.randomNumbers1[index].click = true;
        console.log(firstNumber);
        $scope.firstNumber = firstNumber.num;
      } else if (secondNumber === undefined || secondNumber === null) {
        secondNumber = $scope.randomNumbers1[index];
        $scope.randomNumbers1[index].click = true;
        console.log(secondNumber);
        $scope.secondNumber = secondNumber.num;
      } else if (thirdNumber === undefined || thirdNumber === null) {
        thirdNumber = $scope.randomNumbers1[index];
        $scope.randomNumbers1[index].click = true;
        console.log(thirdNumber);
        $scope.thirdNumber = thirdNumber.num;

        // Set 3 choices in order
        var inputArrayNumber = [];
        var inputArrayColor = [];

        inputArrayNumber.push(firstNumber.num);
        inputArrayNumber.push(secondNumber.num);
        inputArrayNumber.push(thirdNumber.num);
        inputArrayColor.push(firstNumber.col);
        inputArrayColor.push(secondNumber.col);
        inputArrayColor.push(thirdNumber.col);
        var inputArray = [inputArrayNumber,inputArrayColor];
        console.log(inputArray);
        controleInput(inputArray);
      }

    } else if (row ===2) {

      if (firstNumber === undefined || firstNumber === null) {
        firstNumber = $scope.randomNumbers2[index];
        $scope.randomNumbers2[index].click = true;
        console.log(firstNumber);
        $scope.firstNumber = firstNumber.num;
      } else if (secondNumber === undefined || secondNumber === null) {
        secondNumber = $scope.randomNumbers2[index];
        $scope.randomNumbers2[index].click = true;
        console.log(secondNumber);
        $scope.secondNumber = secondNumber.num;
      } else if (thirdNumber === undefined || thirdNumber === null) {
        thirdNumber = $scope.randomNumbers2[index];
        $scope.randomNumbers2[index].click = true;
        console.log(thirdNumber);
        $scope.thirdNumber = thirdNumber.num;

        var inputArrayNumber = [];
        var inputArrayColor = [];

        inputArrayNumber.push(firstNumber.num);
        inputArrayNumber.push(secondNumber.num);
        inputArrayNumber.push(thirdNumber.num);
        inputArrayColor.push(firstNumber.col);
        inputArrayColor.push(secondNumber.col);
        inputArrayColor.push(thirdNumber.col);
        var inputArray = [inputArrayNumber,inputArrayColor];
        console.log(inputArray);
        controleInput(inputArray);
      }

    } else if (row===3) {

      if (firstNumber === undefined || firstNumber === null) {
        firstNumber = $scope.randomNumbers3[index];
        $scope.randomNumbers3[index].click = true;
        console.log(firstNumber);
        $scope.firstNumber = firstNumber.num;
      } else if (secondNumber === undefined || secondNumber === null) {
        secondNumber = $scope.randomNumbers3[index];
        $scope.randomNumbers3[index].click = true;
        console.log(secondNumber);
        $scope.secondNumber = secondNumber.num;
      } else if (thirdNumber === undefined || thirdNumber === null) {
        thirdNumber = $scope.randomNumbers3[index];
        $scope.randomNumbers3[index].click = true;
        console.log(thirdNumber);
        $scope.thirdNumber = thirdNumber.num;

        var inputArrayNumber = [];
        var inputArrayColor = [];

        inputArrayNumber.push(firstNumber.num);
        inputArrayNumber.push(secondNumber.num);
        inputArrayNumber.push(thirdNumber.num);
        inputArrayColor.push(firstNumber.col);
        inputArrayColor.push(secondNumber.col);
        inputArrayColor.push(thirdNumber.col);
        var inputArray = [inputArrayNumber,inputArrayColor];
        console.log(inputArray);
        controleInput(inputArray);

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

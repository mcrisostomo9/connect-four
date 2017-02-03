/**
 * Created by danielfogerty on 2/1/17.
 */

 // defining global variables for timer and game tracking game state
var current_token = 0; //0 is player 1, 1 is player 2, 3 is bomb
var player1_bombs = 1;
var player2_bombs = 1;
var player1_rocks = 1;
var player2_rocks = 1;
var current_player;
var game_array = null;
var game_state = [[],[],[],[],[],[],[]]; // game_state is used to track the position of all tokens on the board

var countdown_date;
var total_time = 120000;
var time_left = [total_time,total_time];
var countdown_setInterval;

var local_play = true;

$(document).ready(initialize_game);

/* function: initialize_game
 Click handlers: add player token when clicked on .column
 add class current-player-indicator to .player1 since they are going first (will be removed when it is player 2's turn)
 call function reset game when reset button is clicked
*/
function initialize_game() {
    game_array = $('.column');
    console.log('initialized');
    $('.column').click(add_player_token);
    $('.player1').addClass('current-player-indicator');
    timer_button_handler();
    $('#reset').click(reset_game);
    $('.use-bomb').click(bomb);
    $('.use-rock').click(rock);
}

/* Function: add_player_token
for loop to loop through and compare the element clicked to all columns, used to determine which column was clicked on
push the current players token to game_state[the_column]
call function to change game state, used to update the game board in browser with the changes
check for win
call function to play sound for piece played
*/
function add_player_token() {
  for (var i = 0; i < 7; i++) {
      if (this == game_array[i]) {
          if (game_state[i].length > 5) {
              return;
          }
          if(current_token == 3) {
            if(current_player == 0) {
              if (player1_rocks > 0) {
                player1_rocks--;
                game_state[i].push(current_token);
                game_state[i].push(current_player);
                change_game_state();
                current_token = current_player;
                  check_win_whole_board();
                  change_turn();
                return;
              }
            }
            if(current_player == 1) {
              if (player2_rocks > 0) {
                player2_rocks--;
                game_state[i].push(current_token);
                game_state[i].push(current_player);
                change_game_state();
                current_token = current_player;
                  check_win_whole_board();
                  change_turn();
                return;
              }
            }
          }
          if (current_token == 2) {
            if (current_player == 0) {
              if(player1_bombs > 0) {

                if (game_state[i][0] === ""){
                    game_state[i][0] = current_token;
                    console.log('bombs to the bottom! ', game_state[i][0])
                }else{
                    game_state[i].push(current_token);
                }
                player1_bombs = player1_bombs-1;
                change_game_state();
                setTimeout(function() {
                    drop_the_bomb();
                    change_game_state();
                    current_token = current_player;
                    check_win_whole_board();
                change_turn();
                }, 1500);
                return;
              } else {
                  current_token = current_player;
              }
            }
          if (current_player == 1) {
              if(player1_bombs > 0) {

                  if (game_state[i][0] === ""){
                      game_state[i][0] = current_token;
                      console.log('bombs to the bottom! ', game_state[i][0])
                  }else{
                      game_state[i].push(current_token);
                  }
                  player2_bombs = player2_bombs-1;
                  change_game_state();
                  setTimeout(function() {
                      drop_the_bomb();
                      change_game_state();
                      current_token = current_player;
                      check_win_whole_board();
                      change_turn();
                  }, 1500);
                  return;
              } else {
                  current_token = current_player;
              }
            }
          }
          if (game_state[i][0] === "") {
              game_state[i][0] = current_token;
          }
          else {
              game_state[i].push(current_token);
          }
          check_win(i, game_state[i].length-1);
      }
      change_game_state();
      audio_piece_placed();
      }
    change_turn();
}



function drop_the_bomb() {
  for(var i = 0; i < game_state.length; i++) {
    for(var j = 0; j < game_state[i].length; j++) {
      if(game_state[i][j] == 2){
        if(game_state[i].length <= 2) {
          game_state[i].splice(j);
        } else {
          game_state[i].splice(j-1, 3);
        }
        if(game_state[i-1].length <= 3) {
          game_state[i-1].splice(j);
        } else {
          game_state[i-1].splice(j-1, 3);
        }
        if(game_state[i+1].length <= 3) {
          game_state[i+1].splice(j);
        } else {
          game_state[i+1].splice(j-1, 3);
        }
      }
    }
  }
}

function rock() {
  if(current_token != 3) {
      current_player = current_token;
      current_token = 3;
  }
}

function bomb() {
    if(current_token != 2) {
        current_player = current_token;
        current_token = 2;
    }
}

/* function: change_game_state
 used to display the pieces on the board
 Use pseudo selectors to add a class of either p1-token or p2-token depending on the current player
*/
function change_game_state () {
  for(var i = 0; i < 7; i++) {
    for(var j = 0; j < 6; j++) {
      if(game_state[i][j] == undefined) {
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').removeClass('p2-token played p1-token bomb bomb-token played rock rock-token')
      }
      if(game_state[i][j] === 1) {
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('p2-token played');
      } else if(game_state[i][j] === 0){
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('p1-token played');
      } else if(game_state[i][j] === 2){
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('bomb bomb-token played');
      } else if(game_state[i][j] == 3){
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('rock rock-token played');
      }
    }
  }
}

/* function: check_win
checks if the last played token is 4 in a row
does this buy calling the three functions to check horizontal, vertical, and diagonal
*/
function check_win(col, row) {
  check_horizontal(col, row);
  check_vertical(col, row);
  check_diagonal(col, row);
  pause_timer();
}

/* function: check_win_whole_board
loops through the whole game state array, and checks for four in a row for each token on the board
*/
function check_win_whole_board () {
  for(var i = 0; i < game_state.length; i++) {
    for(var j = 0; j < game_state[i].length; j++) {
      check_diagonal(i, j);
      check_vertical(i, j);
      check_horizontal(i, j);
    }
  }
}

/* function: check_horizontal
checks if there are four in a row
it starts with the token passed, goes left until it finds a different token, then goes right
if counter hits 4, it called the function winner because the game is over
*/
function check_horizontal(col, row) {
  var counter=1;
  var i = 1;
  while( (col-i) >= 0 && game_state[col][row] === game_state[col-i][row]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
    }
  }
  i = 1;
  while( (col+i) < game_state.length && game_state[col][row] === game_state[col+i][row]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
    }
  }
}

/* function: check_vertical
checks if there are four in a row, starting with the passed in position on the board
if counter hits 4, it called the function winner because the game is over
*/
function check_vertical(col, row) {
  var counter = 1;
  var i = 1;
  while( (row-i) >= 0 && game_state[col][row] === game_state[col][row-i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
      return;
    }
  }
  i = 1;
  while( (row+i) < game_state.length && game_state[col][row] === game_state[col][row+i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
      return;
    }
  }
}

/* function: check_diagonal
checks if there are 4 in a row on either diagonal
after checking on diagonal, reset count to 1 as to prevent it from counting 4 in a row along different diagonals
if counter hits 4, call winner
*/
function check_diagonal(col, row) {
  var counter = 1;
  var i = 1;
  while( (col-i) >= 0 && (row - i) >= 0 && game_state[col][row] === game_state[col-i][row-i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
    }
  }
  i = 1;
  while( (col+i) < game_state.length && (row + i) <= 5 && game_state[col][row] === game_state[col+i][row+i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
    }
  }
  counter = 1;
  i = 1;
  while ((col-i) >= 0 && (row+i) <=5 && game_state[col][row] === game_state[col-i][row+i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
    }
  }
  i = 1;
  while( (col+i) < game_state.length && (row-i) >= 0 && game_state[col][row] === game_state[col+i][row-i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner(game_state[col][row]+1);
    }
  }
}

/* function: winner
handle winner functionality
will create modal with winner and loser, use firebase to tell the winner they won and the loser they lost
!!NOT FINISHED
*/
function winner(player) {
  winning_audio();
  console.log("player" + player + ' is the winner');
  setTimeout(alert(player + "is the winner"));
}

/* function: reset_game
reset game state to array full of empty arrays
remove classes for tokens and played from .cell
set current_token to 0
call function change_game_state to reset the board to empty
*/
function reset_game() {
  game_state = [[],[],[],[],[],[],[]];
  $('*').removeClass('p2-token p1-token played');
  current_token = 0;
  change_game_state();
  reset_firebase();
}

/* function: change_turn
used to change users
*/
function change_turn() {
    pause_timer();
    current_token = 1 - current_token;
    start_timer();
    if(current_token === 0){
        $('.player1').addClass('current-player-indicator');
        $('.player2').removeClass('current-player-indicator');
        $('.current-player-icon').attr("src", "graphics/blueToken.png");

    }else if(current_token = 1){
        $('.player2').addClass('current-player-indicator');
        $('.player1').removeClass('current-player-indicator');
        $('.current-player-icon').attr("src", "graphics/2PToken.png");

    }
    call_firebase();
}

/* function: start_timer
 starts the timer
*/
function start_timer(){
    countdown_date = new Date().getTime() + time_left[current_token];
    countdown_clock();
}

/* function: pause_timer
pauses timer
*/
function pause_timer(){
    clearInterval(countdown_setInterval);
}

/* function: timer_button_handler
adds click handlers to start and pause timer
*/
function timer_button_handler(){
    $('.start-button').click(function(){
        start_timer();
    });
    $('.pause').click(function(){
        pause_timer();
    })
}

/* function: countdown_clock
initializes the countdown_clock
uses new Date to track milliseconds passed
adds text to the timer class of time life
*/
function countdown_clock() {
    countdown_setInterval = setInterval(function () {

        // Get date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        time_left[current_token] = countdown_date - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((time_left[current_token] % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((time_left[current_token] % (1000 * 60)) / 1000);

        if (seconds > 9) {
            $('.timer' + current_token).text(minutes + ":" + seconds);
        }
        else {
            $('.timer' + current_token).text(minutes + ":0" + seconds);
        }
        if (time_left < 0) {
            clearInterval(countdown_setInterval);
            $('.timer' + current_token).text("0:00");
        }
    }, 250);
}

/* function: initialize_clock_displays
not used as of now

function initialize_clock_displays(){
    var minutes = Math.floor((time_left[current_token] % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((time_left[current_token] % (1000 * 60)) / 1000);

    if (seconds > 9) {
        $('.timer0, .timer1').text(minutes + ":" + seconds);
    }
    else {
        $('.timer0, .timer1' + current_token).text(minutes + ":0" + seconds);
    }
}
*/

/* function: audio_piece_placed
plays audio on click, based off of current player
*/
function audio_piece_placed() {
    if(current_token === 0) {
        $('#piece_audio1').get(0).play();
    }else if(current_token === 1) {
        $('#piece_audio2').get(0).play();
    }
}

function rock_placed_audio() {
    $('#rock_audio').get(0).play();
}

function bomb_placed_audio() {
    $('#bomb_audio').get(0).play();
}

function winning_audio() {
    $('#winner_audio').get(0).play();
}

//firebase

var Connect4Model = new GenericFBModel('poopoohead',boardUpdated);
var cavity_game ={};
function boardUpdated(data){
    console.log('data of callback function', data);
    if (data === null){
        return;
    }
    game_state = data.current_state;
    console.log('game_state after callback:', game_state);
    current_token = data.player;
    change_game_state();
}

function call_firebase() {
    var cavity_game = {
        player: current_token,
        current_state: game_state,
        time: time_left
    };
    console.log("before being sent: ", cavity_game);
    Connect4Model.saveState(cavity_game);
}

function reset_firebase(){
    cavity_game = {
        player: 0,
        current_state: [[''],[''],[''],[''],[''],[''],['']],
        time: [12000, 12000]
    };
    Connect4Model.saveState(cavity_game);
}

// var room_name = generate_fb_names();
//
// function generate_fb_names (){
//     return new Date().getTime();
// }
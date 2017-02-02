/**
 * Created by danielfogerty on 2/1/17.
 */
var current_token = 0;
var game_array = null;
var game_state = [[],[],[],[],[],[],[]];
var last_placed = [];

var countdown_date;
var time_left = 180000;

$(document).ready(initialize_game);

function initialize_game() {
    game_array = $('.column');
    console.log('initialized');
    $('.column').click(add_player_token);
    $('.player1').addClass('current-player-indicator');
    timer_button_handler();
}

function add_player_token() {
    for (var i = 0; i < 7; i++) {
        if (this == game_array[i]) {
            if (game_state[i].length > 6) {
                return;
            }
            game_state[i].push(current_token);
            change_game_state();
            check_win(i, game_state[i].length-1);

        }
    }
    change_turn();
}

function change_game_state () {
  console.log(this);
  for(var i = 0; i < game_state.length; i++) {
    for(var j = 0; j < game_state[i].length; j++) {
      if(game_state[i][j] == 1) {
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('p1-token played');
      } else {
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('p2-token played');
      }
    }
  }
}

function check_win(col, row) {
  check_horizontal(col, row);
  check_vertical(col, row);
  check_diagonal(col, row);
}

function check_horizontal(col, row) {
  var counter=1;
  var i = 1;
  while( (col-i) >= 0 && game_state[col][row] == game_state[col-i][row]) {
    counter++;
    i++;
    if (counter == 4) {
      winner();
    }
  }
  i = 1;
  while( (col+i) < game_state.length && game_state[col][row] == game_state[col+i][row]) {
    counter++;
    i++
    if (counter == 4) {
      winner();
    }
  }
}

function check_vertical(col, row) {
  var counter = 1;
  var i = 1;
  while( (row-i) >= 0 && game_state[col][row] == game_state[col][row-i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner();
    }
  }
  i = 1;
  while( (row+i) < game_state.length && game_state[col][row] == game_state[col][row+i]) {
    counter++;
    i++
    if (counter == 4) {
      winner();
    }
  }
}

function check_diagonal(col, row) {
  var counter = 1;
  var i = 1;
  while( (col-i) >= 0 && (row - i) >= 0 && game_state[col][row] == game_state[col-i][row-i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner()
    }
  }
  i = 1;
  while( (col+i) < game_state.length && (row + i) <= 5 && game_state[col][row] == game_state[col+i][row+i]) {
    counter++;
    i++
    if (counter == 4) {
      winner()
    }
  }
  counter = 1;
  i = 1;
  while( (col-i) >= 0 && (row+i) <=5 && game_state[col][row] == game_state[col-i][row+i]) {
    counter++;
    i++;
    if (counter == 4) {
      winner();
    }
  }
  i = 1;
  while( (col+i) < game_state.length && (row-i) >= 0 && game_state[col][row] == game_state[col+i][row-i]) {
    counter++;
    i++
    if (counter == 4) {
      winner();
    }
  }
}

function winner() {
  $('.game-area').text('you win');
}

function reset_game() {

}

function change_turn() {
    current_token = 1 - current_token;
    if(current_token === 0){
        $('.player1').addClass('current-player-indicator');
        $('.player2').removeClass('current-player-indicator');
        $('.current-player-icon').attr("src", "graphics/blueToken.png")
    }else if(current_token = 1){
        $('.player2').addClass('current-player-indicator');
        $('.player1').removeClass('current-player-indicator');
        $('.current-player-icon').attr("src", "graphics/2PToken.png")
    }
}
//COUNTDOWN TIMER

function start_timer(){
    console.log('start timer is being run');
    countdown_date = new Date().getTime() + time_left;
    coundown_clock();
}
function pause_timer(){
    console.log('pause is being run');
    clearInterval(countdown_clock);
}
function timer_button_handler(){
    $('.start-button').click(function(){
        start_timer();
    });
    $('.pause').click(function(){
        pause_timer();
    })
}

function coundown_clock(){
    setInterval(function () {

        // Get date and time
        var now = new Date().getTime();

        //Recalculate countDownDate
        // Find the distance between now an the count down date
        time_left = countdown_date - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((time_left % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((time_left % (1000 * 60)) / 1000);

        if (seconds > 9) {
            $('.timer').text(minutes + ":" + seconds);
        }
        else {
            $('.timer').text(minutes + ":0" + seconds);
        }

        if (time_left < 0) {
            clearInterval(coundown_clock);
            $('.timer').text("0:00");
        }
    }, 1000);
}


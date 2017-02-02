/**
 * Created by danielfogerty on 2/1/17.
 */
var current_token = 0;
var game_array = null;
var game_state = [[],[],[],[],[],[],[]];
var last_placed = [];

$(document).ready(initialize_game);

function initialize_game() {
    game_array = $('.column');
    console.log('initialized');
    $('.column').click(add_player_token);
    $('.player1').addClass('current-player-indicator');
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

function token_drop_animation(){
    console.log(this);
}

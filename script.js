/**
 * Created by danielfogerty on 2/1/17.
 */
var current_token = 0;
var game_array = null;
var game_state = [[],[],[],[],[],[],[]];

$(document).ready(initialize_game);

function initialize_game() {
    game_array = $('.column');
    console.log('initialized');
    $('.column').click(add_player_token);
}

function add_player_token() {
    for (var i = 0; i < 7; i++) {
        if (this == game_array[i]) {
            if (game_state[i].length > 6) {
                return;
            }
            game_state[i].push(current_token);
            change_game_state();

        }
    }
    check_win();
    change_turn();
}

function change_game_state () {
  console.log(game_state.length);
  for(var i = 0; i < game_state.length; i++) {
    for(var j = 0; j < game_state[i].length; j++) {
      if(game_state[i][j] == 1) {
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('p1-token');
      } else {
        $('.game-area').find('.column:nth-child(' + (i+1) + ')').find('.cell:nth-child(' + (j+1) + ')').find('.player-token').addClass('p2-token');
      }
    }
  }
}

function check_win() {
  return;
}

function reset_game() {

}

function change_turn() {
  current_token = 1 - current_token;
}

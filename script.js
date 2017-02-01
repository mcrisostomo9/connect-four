/**
 * Created by danielfogerty on 2/1/17.
 */
var current_turn = 0;
var position_array = [1, 1, 1, 1, 1, 1, 1];
var game_array = null;
var game_state = [[],[],[],[],[],[],[]];

$(document).ready(initialize_game);

function initialize_game() {
    game_array = $('.column');
    $('.column').click(add_player_token);
}

function add_player_token() {
    for (var i = 0; i < game_array.length; i++) {
        if (this == game_array[i]) {
            if (position_array[i] > 6) {
                return;
            }
            if(current_turn === 1) {
                $(this).find('.cell:nth-child(' + position_array[i] + ')').find('.player-token').addClass('p1-token');
                game_state[i][position_array[i]] = 1;
                position_array[i]++;
                current_turn = 0;
            } else {
                $(this).find('.cell:nth-child(' + position_array[i] + ')').find('.player-token').addClass('p2-token');
                game_state[i][position_array[i]] = 0;
                position_array[i]++;
                current_turn = 1;
            }
        }
    }
    check_win();
}

function check_win() {

}

function reset_game() {
    
}
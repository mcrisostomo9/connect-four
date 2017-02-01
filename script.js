/**
 * Created by danielfogerty on 2/1/17.
 */
var current_turn = 1;
var position_array = [2, 0, 0, 0, 0, 0, 0];
var game_array = null;

$(document).ready(initialize_game);

function initialize_game() {
    game_array = $('.column');
    $('.column').click(add_player_token);
}

function add_player_token() {
    for(var i = 0; i < game_array.length; i++) {
        if (this == game_array[i]) {
            var current = $(game_array[i]);
            console.log(current);
        }
    }
}
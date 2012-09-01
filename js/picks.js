
function visually_select_team(team_info, entry_id) {
    var id = 'entry_' + entry_id + '_selected';
    var old = $('#' + id);
    old.removeClass('selected_team');
    old.children('.status').html('').hide();
    old.removeAttr('id');
    team_info.children('.status').html('Picked').show();
    team_info.addClass('selected_team');
    team_info.attr('id', id);
}

function init_page() {
    $('.team_info').hover(
        function() { $(this).addClass('hilight_team'); },
        function() { $(this).removeClass('hilight_team'); }
    );
    $('.team_info').click(function() {
        var team_id = $(this).attr('team-id');
        var team_name = $(this).attr('team-name');
        var entry_id = $(this).attr('entry-id');
        var team_info = $(this);
        $.ajax({
            'url': '/picks/' + entry_id,
            'type': 'POST',
            'data': team_id,
            'success': function() {
                var entry = $('#entry' + entry_id);
                visually_select_team(team_info, entry_id);

                $('#entry_' + entry_id + '_team').html(team_name); 
                entry.collapse('hide');
            }
        });
        return false;
    });
    $('a.entry').each(function() {
        var selected = $(this).attr('selected-team');
        var entry_id = $(this).attr('entry-id');
        var info = $('#entry_' + entry_id + '_team_' + selected);
        visually_select_team(info, entry_id);
    });
}

$(function() {
    // example: https://api.meetup.com/2/open_events.xml?zip=10012&time=-1w,&amp;status=past&key=ABDE12456AB2324445
    var $events = $('.events')
      , $loaderImg = $('<div class="loader"><img class="loading" src="assets/img/ajax-loader.gif" /></div>')
      , favoriteTemplate = '{{#event}}<article class="event pull-left rounded-corners"><header><h5>{{ name }}</h5></header><div class="well"><p><i>{{ group.name }}</i></p><p>{{ time }}</p><p>{{ yes_rsvp_count }} attending</p></div><footer><button class="favorite-btn btn btn-danger pull-right">party</button></footer></article>{{/event}}';

    // grab all events from the NY zip code 10012
    $('.events-btn').on('click', function() {
        var data = {
            zip: 10012,
            key: '6752511f3291b2b182ee4d2ef312'
        };

        // let the user know the request is about to be made
        $events.empty();
        $events.append($loaderImg);
        $.getJSON('https://api.meetup.com/2/open_events.json?callback=?', data, function(data) {
            // parse the UTC timecodes into something readable
            // TODO: find better solution, can't seem to register function helpers with mustache
            for (var index in data.results) {
                data.results[index].time = new Date(data.results[index].time).toLocaleString();
            }

            $events.html($.mustache(favoriteTemplate, { 'event': data.results }));
        })
        .complete(function() {
            $loaderImg.remove();
        });
    });

    // toggle favorite selection
    $('.events').on('click', '.favorite-btn', function(event) {
        $(event.target).parents('.event').toggleClass('favorite'); // highlight background
    });
});
RCloud.UI.schedule_frame = (function() {


    var result = {
        body: function() {
            return RCloud.UI.panel_loader.load_snippet('schedule-snippet');
        },
        init: function() {

        }
    };
    console.log("this is scheduler");
    return result;
})();

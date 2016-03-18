var app = app || {};

app.AppView = Backbone.View.extend({

    el: '.container',

    events: {
        'click .btn-success': 'hideStart'
    },

    initialize: function() {
        this.startButton = this.$('.btn-success')[0];
        this.$startScreen = this.$('#start-screen');
    },

    render: function() {

    },

    hideStart: function() {
        this.$startScreen.hide();
    }
});

var app = app || {};

app.AppView = Backbone.View.extend({

    el: '.container',

    events: {
        'click .btn-success': 'toggleStart'
    },

    initialize: function() {
        this.startButton = this.$('.btn-success')[0];
        this.$startScreen = this.$('#start-screen');
        this.$app = this.$('#app');
    },

    render: function() {

    },

    toggleStart: function() {
        this.$startScreen.hide();
        this.$app.show();
    }

});

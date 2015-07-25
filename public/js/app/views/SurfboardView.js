// View.js
// -------
define(["jquery", "backbone", "nunjucks"],

    function($, Backbone, nunjucks){

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",

            // View constructor
            initialize: function() {
                this.listenTo( this.model, "change", this.render );

                // Calls the view's render method
                this.render();
            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                var str = nunjucks.render('stockTableRow.html', this.model.toJSON());

                // Dynamically updates the UI with the view's template
                this.$el.append(str);

                // Maintains chainability
                return this;
            }

        });

        // Returns the View class
        return View;

    }

);
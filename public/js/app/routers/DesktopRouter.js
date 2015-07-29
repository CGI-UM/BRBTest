// DesktopRouter.js
// ----------------

define(["jquery", "backbone", "nunjucks", "../Surfboards/SurfboardCollection"],

    function ($, Backbone, nunjucks, SurfboardCollection) {

        return Backbone.Router.extend({

            initialize: function () {

                nunjucks.configure('/js/app/templates', {autoescape: true});

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function () {
                // create the collection to hold the surfboard stock
                var surfboardStock = new SurfboardCollection();

                // fetch() the surf board stock info from storage and
                // render the stock to the surfboard table
                surfboardStock.fetch();
            }
        });
    }
);
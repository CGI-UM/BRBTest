// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "nunjucks", "../Surfboards/Surfboard", "../Surfboards/SurfboardView", "../Surfboards/SurfboardCollection"],

    function ($, Backbone, nunjucks, Surfboard, SurfboardView, SurfboardCollection) {

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

                // Instantiates a new view which will render the header text to the page
                var surfboardStock = new SurfboardCollection();

                // fetch() the surf board stock info from storage
                surfboardStock.fetch();
            }
        });
    }
);
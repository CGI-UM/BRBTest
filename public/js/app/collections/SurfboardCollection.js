/**
 * Created by Jared on 7/24/2015.
 */
define(["jquery","backbone", "nunjucks", "models/Surfboard", "views/SurfboardView"],

    function($, Backbone, nunjucks, Surfboard, SurfboardView) {
        return Backbone.Collection.extend({
            url: "../json/stock.json",
            model: Surfboard,
            firstPass: true,

            sync: function(method, model, options) {
                if( this.firstPass ) {
                    this.firstPass = false;

                    options || (options = {});
                    options.async = 'false';
                }
                Backbone.sync( method, model, options );
            },

            parse: function( data ) {

                // add all the data to the collection
                this.add(data);

                this.renderHeader();

                this.renderAllModels();
            },

            renderAllModels: function() {
                // add a view to each surfboard model
                _.each( this.models, function(surfboardMdl) {
                    new SurfboardView({model: surfboardMdl, el: "table.stockTable"})
                });

                // make the views look pretty
                $('table.stockTable tr:odd').css({'background-color': 'white'});
                $('table.stockTable tr:even').css({'background-color': '#ebebff'});
            },

            renderHeader: function() {
                var str = nunjucks.render('stockTableHeader.html');
                $("table.stockTable").append(str);

            }
        });
    }
);
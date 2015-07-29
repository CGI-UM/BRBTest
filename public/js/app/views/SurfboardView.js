// View.js
// -------
define(["jquery", "backbone", "nunjucks"],

    function($, Backbone, nunjucks){

        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",

            // View constructor
            initialize: function() {
                this.listenTo( this.model, "change", this.reRenderTRContent );

                // Calls the view's render method
                this.render();
            },

            // Renders the view's template to the UI
            render: function() {
                var data = this.model.toJSON();

                // Add the <tr> to the table
                var html = nunjucks.render('stockTableRow.html', data);
                this.$el.append(html);

                // fill the <tr> with all the <td>'s.
                var sel = "." + data.manufacturer + "-" + data.model;
                html = nunjucks.render('stockTableRowData.html', data);
                $(sel).html(html);

                // Maintains chainability
                return this;
            },

            reRenderTRContent: function( mdl ) {
                // create the selector string
                var sel = "." + mdl.get('manufacturer') + "-" + mdl.get('model');

                // create the data to write into the selector
                var htmlStr = nunjucks.render('stockTableRowData.html', mdl.toJSON());

                // write the html to the selector
                $(sel).html(htmlStr);
            },

            // View Event Handlers
            events: function() {
                var evObj = {};

                //var m1 = this.model.get('manufacturer');
                //var m2 = this.model.get('model');
                //var n = m1 + "-" + m2;

                evObj["change input[class='tdMargin']"] = "marginChanged";
                evObj["change input[class='tdWholesale']"] = "wholesaleChanged";

                return evObj;
            },

            tableRowName: function() {
                var mfgr = this.model.get('manufacturer');
                var mdl = this.model.get('model');
                return mfgr + "-" + mdl;
            },

            marginChanged: function() {
                // update the model based on the new margin value entered by the user.
                var n = this.tableRowName();
                var margin = $("tr." + n + " input[class='tdMargin']").val();

                var wholesale = parseFloat(this.model.get('wholesale'));

                this.setModelData(margin, wholesale);
            },

            wholesaleChanged: function() {
                // update the model based on the new wholesale value entered by the user.
                var n = this.tableRowName();
                var wholesale = $("tr." + n + " input[class='tdWholesale']").val();
                wholesale = parseFloat(wholesale).toFixed(2);

                var margin = parseFloat(this.model.get('margin'));

                this.setModelData(margin, wholesale);
            },

            setModelData: function(margin, wholesale) {
                var retail = ((1 + (margin/100.0)) * wholesale).toFixed(2);

                var netProfit = (retail - wholesale).toFixed(2);

                this.model.set({
                    wholesale: wholesale,
                    margin: margin,
                    retail: retail,
                    netProfit: netProfit
                });
            }
        });
    }

);
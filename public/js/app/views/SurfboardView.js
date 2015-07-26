// View.js
// -------
define(["jquery", "backbone", "nunjucks"],

    function($, Backbone, nunjucks){

        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".example",

            // View constructor
            initialize: function() {
                this.listenTo( this.model, "change", this.updateRowData );

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

            updateRowData: function( mdl ) {
                var sel = "." + mdl.get('manufacturer') + "-" + mdl.get('model');
                var html = nunjucks.render('stockTableRowData.html', mdl.toJSON());
                $(sel).html(html);
            },

            // View Event Handlers
            events: function() {
                var evObj = {};

                var m1 = this.model.get('manufacturer');
                var m2 = this.model.get('model');
                var n = m1 + "-" + m2;
                //evObj["change input[name=" + n + "]"] = "marginChanged";
                evObj["change input[class='tdMargin']"] = "marginChanged";

                return evObj;
            },

            marginChanged: function() {
                // update the model based on the new margin value entered by the user.
                var mfgr = this.model.get('manufacturer');
                var mdl = this.model.get('model');
                var n = mfgr + "-" + mdl;

                var margin = parseFloat($('input[name=' + n + ']').val());
                var wholesale = parseFloat(this.model.get('wholesale'));

                var retail = ((1 + (margin/100.0)) * wholesale).toFixed(2);

                var netProfit = (retail - wholesale).toFixed(2);

                this.model.set({
                    margin: margin,
                    retail: retail,
                    netProfit: netProfit
                });
            }
        });
    }

);
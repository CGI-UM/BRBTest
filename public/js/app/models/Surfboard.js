/**
 * Created by Jared on 7/24/2015.
 */
define(["jquery", "backbone"],

    function ($, Backbone) {

        // Creates a new Backbone Model class object
        return Backbone.Model.extend({

            // Default values for all of the Model attributes
            defaults: {
                manufacturer: '',
                model: '',
                stock: 0,
                wholesale: 0,
                margin: 0,
                purchasePrice: 0,
                netProfit: 0
            },

            // Model Constructor
            initialize: function () {
                var w = this.get('wholesale');
                var m = this.get('margin') / 100;
                var purchasePrice = (w * (1+m)).toFixed(2);
                var np = (purchasePrice - w).toFixed(2);
                this.set({
                    purchasePrice: purchasePrice,
                    netProfit: np
                });
            },

            // Gets called automatically by Backbone when the set and/or save methods
            // are called (Add your own logic)
            validate: function (attrs) {

            }
        });
    }
);
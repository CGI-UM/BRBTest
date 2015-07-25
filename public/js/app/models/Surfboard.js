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
                purchasePrice: 0
            },

            // Model Constructor
            initialize: function () {
                this.set({purchasePrice: (this.get('wholesale') * 1.9).toFixed(2)});
            },

            // Gets called automatically by Backbone when the set and/or save methods
            // are called (Add your own logic)
            validate: function (attrs) {

            }
        });
    }
);
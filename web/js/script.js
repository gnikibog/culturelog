
$(function(){
    
    var clogApp = clogApp || {};
    
    clogApp.Item = Backbone.Model.extend({});
    clogApp.ItemList = Backbone.Collection.extend({
        //url: "/clog/api/items"
        url: "http://ec2-107-20-105-240.compute-1.amazonaws.com/clog/api/items"
    });
    
    clogApp.ItemView = Backbone.View.extend({
        tagName: "li",
        template: ich.item,
        initialize: function() {
            this.model.bind("change", this.render, this);
        },
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    clogApp.Items = new clogApp.ItemList;
    
    clogApp.AppView = Backbone.View.extend({
        initialize: function() {
            clogApp.Items.bind("add", this.addOne, this);
            clogApp.Items.bind("reset", this.addAll, this);
            clogApp.Items.fetch();
        },
        addOne: function(item) {
            var view = new clogApp.ItemView({model: item});
            $("#lovely-things-list .list").append(view.render().el);
        },
        addAll: function() {
            clogApp.Items.each(this.addOne);
            initializeLovelyThings();
        }
    });
    
    clogApp.App = new clogApp.AppView;
});


function initializeLovelyThings() {
        
    var options = {
        valueNames: [ 'name', 'description', 'category', 'rating', 'date-released', 'date-logged', 'author' ]
    };

    var featureList = new List('lovely-things-list', options);
    
    $('#filter-films').click(function() {
        featureList.filter(function(values) {
            if (values.category == "Film") {
                return true;
            } else {
                return false;
            }
        });
    });
    
    $('#filter-books').click(function() {
        featureList.filter(function(values) {
            if (values.category == "Book") {
                return true;
            } else {
                return false;
            }
        });
    });

    $('#filter-albums').click(function() {
        featureList.filter(function(values) {
            if (values.category == "Album") {
                return true;
            } else {
                return false;
            }
        });
    });
    
    $('#filter-none').click(function() {
        featureList.filter();
    });
}

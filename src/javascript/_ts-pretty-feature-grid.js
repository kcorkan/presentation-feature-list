Ext.define('Rally.technicalservices.PrettyFeatureGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.tsfeaturegrid',

    columns: [{
        flex: 1,
        dataIndex: 'Name'
    },
    ],

    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate('<p>{Description}</p><br/><span class="more-info"><a href="https://www.google.com/" target="_blank">More Info</a></span>')
    }],
    title: 'Loading...',
    hideHeaders: true,
    collapsible: true,
    animCollapse: false,
    collapsed: true,
    width: '100%',
    flex: 1,
    hideCollapseTool: true,
    titleCollapse: true,
    margin: '5 5 5 5',
    scroll: false,
    header: {
        cls: 'feature-header',
        padding: 20
    },

    constructor: function(config) {
        this.mergeConfig(config);

        this.itemId = 'pnl-' + config.state;
    //    this._setTitle(config.label, config.description);

        this.store = Ext.create('Rally.data.wsapi.Store',{
            model: config.modelName,
            fetch: ['FormattedID','Name','Description','State'],
            autoLoad: true,
            filters: [{
                property: 'State.Name',
                value: config.state
            }],
            listeners: {
                scope: this,
                load: function(store,records,success){
                    console.log('store loaded',records, success);
                    this._setTitle(config.label, config.description, store.getTotalCount());
                }
            }
        });


        this.callParent(arguments);
    },
    _setTitle: function(label, description, recordCount){
        var icon_class = this.collapsed ? "chevron icon-chevron-right" : "chevron icon-chevron-down",
            num_items = recordCount || 0,
            title = Ext.String.format('<span class="feature-header-title">{0}</span><span class="feature-header-description">&nbsp;({1}) {2}</span><span class="{3}"></span>',label, num_items, description, icon_class);

        this.setTitle(title);
    }
});

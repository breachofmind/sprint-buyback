"use strict";

var Model = require('expressway').Model;

class Device extends Model
{
    /**
     * Constructor.
     * @injectable
     * @param app {Application}
     */
    constructor(app)
    {
        super(app);

        this.title      = 'name';
        this.expose     = true;
        this.populate   = [];
        this.managed    = false;

        this.on('toJSON', (json,model,object) => {
            json.$preview = `/images/models/${object.brand.toLowerCase()}-${object.model}.jpg`;
        })
    }

    /**
     * Create the database schema.
     * @injectable
     * @param fields {FieldCollection}
     * @param types {Object}
     */
    schema(fields,types)
    {
        fields
            .add('name', types.Title)
            .add('carrier', types.Text)
            .add('brand', types.Text)
            .add('capacity', types.Number)
            .add('model', types.Text)
            .add('valuation', types.Number)
    }
}

module.exports = Device;
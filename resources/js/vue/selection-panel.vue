<template>
	<div class="selection-panel card" :class="{'is-active': selectable}" :id="id">
		<header class="card-header">
			<span class="selection-panel-number">{{level+1}}</span>
			<span class="selection-panel-title"><slot name="title"></slot></span>
		</header>
		<div class="card-body">
			<div class="selection-panel-input" v-if="! loading">
				<component :is="type" :id="id+'Selector'" :value="value" :options="options" :name="property" :disabled="! selectable" @input="onInput" @change="onChange">
					Please choose an option above.
				</component>
			</div>
			<loader v-else></loader>
			<div class="selection-panel-help text-right" v-show="selectable">
				<a href="javascript:;">Where do I find this?</a>
			</div>

		</div>
	</div>
</template>

<script>
	var _ = require('lodash');
	var utils = require('../utils');

	module.exports = {

		name:"SelectionPanel",

		props: {
		    "value" : {
		        default: null
		    },
			"level": {
		        type: Number
			},
			"type" : {
		        type: String
			}
		},

		computed: {

            /**
             * Get the ID property.
             * @returns {string}
             */
		    id: function()
		    {
		        return "SelectionPanel"+this.level;
		    },

            /**
             * Check if the application is loading.
             * @returns {boolean}
             */
		    loading: function()
		    {
		        return this.$store.state.loading;
		    },

            /**
             * Check if this is selectable.
             * @returns {boolean}
             */
			selectable: function()
			{
                if (this.level == 0) return true;

                var prevProperty = this.$store.getters.levels[this.level-1];

                return this.$store.state.selections[prevProperty] !== null;
			},

            /**
             * Return the current selection value.
             * @returns {*}
             */
			selection: function()
			{
			    return this.$store.state.selections[this.property];
			},

            /**
             * Get the unique property name.
             * @returns {String}
             */
		    property: function()
		    {
		        return this.$store.getters.levels[this.level];
		    },

            /**
             * Get the filters for this selection panel.
             * @returns {{}}
             */
			filters: function()
			{
                var filters = {};
                for (var level = 0; level < this.level; level++) {
                    var property = this.$store.getters.levels[level];
                    filters[property] = this.$store.state.selections[property][property];
                }
                return filters;
			},

            /**
             * Get the options for this selection panel.
             * @returns {Array}
             */
			options: function()
			{
                if (! this.selectable) {
                    return [];
                }
                var devices = _.filter(this.$store.state.devices, this.filters);

                return _.uniqBy(devices, device => {
                    return device[this.property];
                }).map(device => {
                    return {label:device[this.property], value:device}
                });
			}
		},

		methods: {

		    onInput: function(item)
		    {
		        this.onChange(item);
		        this.goToNext();
		    },

			onChange: function(item)
			{
                this.$emit('input', item);
                this.$store.commit('select', {level:this.level, property:this.property, value:item[this.property]});

			},

            goToNext: function()
            {
                var totalLevels = this.$store.getters.levels.length;
                var nextId = this.level + 1 >= totalLevels ? "InspectionPanel" : "SelectionPanel"+(this.level+1);
                utils.scrollTo(nextId);
            }
		}
	}
</script>
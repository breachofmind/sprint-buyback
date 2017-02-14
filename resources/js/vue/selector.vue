<template>
	<div class="selector" @click.stop>
		<div class="form-group">
			<input type="text" readonly class="selector-display-value form-control" :value="selectedOption.label" @focus="toggle"/>
		</div>
		<div class="selector-options-box" v-show="open">
			<div class="selector-input form-group has-icon">
				<input type="search"
				       class="form-control"
				       v-model="searchInput"
				       ref="searchInput"
				       :disabled="loading"
				       @keyup="onKeyup">

				<icon name="magnifier"></icon>
			</div>

			<div class="selector-options" @mousewheel="onScroll">
				<loader class="selector-options-loader" v-show="loading"></loader>

				<div class="selector-options-empty alert alert-info" v-if="hasError">
					<slot v-if="! options.length"></slot>
					<span v-if="! filteredOptions.length && searchInput.length">No results found.</span>
				</div>

				<a href="javascript:;"
				   class="selector-option"
				   @click="select(item)"
				   v-for="(item,index) in filteredOptions"
				   :class="{'is-selected': selectedOption.value==item.value}"
				   :disabled="item.disabled">
					{{item.label}}
				</a>

			</div>
			<input type="hidden" :name="name" :value="selectedOption.value">
		</div>
	</div>
</template>

<script>
	var _ = require('lodash');
	var $http = require('../api');

    var SCROLL_SENSITIVITY = 25; // pixels
    var UP_ARROW = 38;
    var DN_ARROW = 40;

	var PROPS = {
        "id": {
            type:String,
	        required: true
        },
        "value": {
            default: function() {
                return null;
            }
        },
        "options": {
            type: Array,
            default: function() {
                return [];
            }
        },
		"placeholder" : {
            type: String,
			default: "Select an option..."
		},
		"config" : {
            type: Object,
            default: function() {
                return {
	                minChars: 1,
                    maxResults: 10,
	                remoteUrl: false,
                }
            }
		},
        "name" : {
            type: String,
	        required: true
        }
    };



	module.exports = {

		name: "Selector",

		props: PROPS,

		data: function() {
		    return {
		        open: false,
			    loading:false,
			    selected:null,
			    selectedIndex: this.options.indexOf(this.selected),
		        searchInput: "",
		    }
		},

		/**
		 * Grab the selected value.
		 */
		created: function()
		{
	        this.selected = this.getOptionForValue(this.value);

	        document.addEventListener('click',(event) => {
	            this.toggle(false);
	        })
		},

		computed: {

		    /**
		     * Get the filtered options if the filter is being used.
		     * @returns {Array}
		     */
		    filteredOptions: function()
		    {
		        if (this.searchInput.length > this.config.minChars) {
		            return _.filter(this.options, item => {
		                var filter = this.searchInput.toLowerCase();
		                var value = item.label.toLowerCase();
		                return value.indexOf(filter) > -1;
		            })
		        }
		        return this.options;
		    },

			/**
			 * Get the selected value's label.
			 * @returns {String}
			 */
		    selectedOption: function()
			{
			    return this.selected || {label:this.placeholder, value:undefined};
		    },

			hasError: function() {
		        return ! this.options.length || ! this.filteredOptions.length;
			}
		},

        methods: {

            /**
             * Toggle the selector window open.
             * @param boolean
             */
		    toggle: function(boolean)
		    {
		        if (typeof boolean !== 'boolean') {
		            boolean = ! this.open;
		        }
		        this.open = boolean;
		        if (this.open) {
		            setTimeout(() => {
                        this.$refs.searchInput.focus();
		            },50)
		        }
		        this.$emit(boolean ? 'open' : 'close');
		    },

            /**
             * Select an item by index.
             * @param item {Object}
             */
	        select: function(item)
	        {
	            if (! item.disabled) {
                    this.selected = item;
                    this.toggle(false);
                    this.$emit('input', this.selected.value);
	            }
	        },

            /**
             * Keystroke listener event handler.
             * @param event
             */
	        onKeyup: function(event)
	        {
		        var key = event.keyCode;
		        var len = this.filteredOptions.length;
		        if (len > 0)
		        {
                    if (key == DN_ARROW) {
                        this.selectedIndex = this.selectedIndex+1 > len-1 ? 0 : this.selectedIndex+1;
                    } else if (key == UP_ARROW) {
                        this.selectedIndex = this.selectedIndex-1 < 0 ? len-1 : this.selectedIndex-1;
                    }
                    if (this.selectedIndex > -1) {
                        this.selected = this.filteredOptions[this.selectedIndex];
                    }
		        }
		        if (key == 13) {
		            this.selectedIndex = -1;
		            this.toggle(false);
		        }
	        },

            /**
             * Scroll event handler.
             * @param event
             */
            onScroll: function(event)
            {
                var el = event.target.parentNode;
                var delta = event.wheelDelta || -event.detail;
                el.scrollTop += ( delta < 0 ? 1 : -1 ) * SCROLL_SENSITIVITY;
                event.preventDefault();
            },

            /**
             * Return the selected index given the option value.
             * @param value
             * @returns {Object|undefined}
             */
            getOptionForValue: function(value)
            {
                var selected;
                if (value == null || value == undefined) {
                    return selected;
                }
                this.options.forEach(item => {
                    if (value === item.value) selected = item;
                });
                return selected;
            },
        },
	}
</script>
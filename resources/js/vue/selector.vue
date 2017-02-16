<template>
	<div class="selector" @click.stop :class="{'is-open':open}">
		<div class="form-group selector-display">
			<input type="text" :id="id" readonly :disabled="disabled" class="selector-display-value form-control" :value="selectedOption.label" @focus="toggle"/>
			<label :for="id" class="selector-display-icon"><icon name="chevron-up"></icon></label>
		</div>

		<transition name="fade">
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

					<component :is="templateStyle"
					   v-for="option in filteredOptions"
			           :option="option"
					   :class="{'is-selected': value==option.value}"
					   :disabled="option.disabled"
			           @select="select(option,true)">
					</component>

				</div>
				<input type="hidden" :name="name" :value="selectedOption.value">
			</div>
		</transition>
	</div>
</template>

<script>
	var _ = require('lodash');
	var $http = require('../api');

	function wait(time)
	{
	    return {
	        then: function(cb) {
	            window.setTimeout(cb,time);
	        }
	    }
	}

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
        "disabled" : {
            type: Boolean,
	        default: false
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
		        searchInput: "",
		    }
		},

		/**
		 * Grab the selected value.
		 */
		created: function()
		{
	        //this.selected = this.getOptionForValue(this.value);

	        document.addEventListener('click',(event) => {
	            this.toggle(false);
	        })
		},

		computed: {

		    templateStyle: function()
		    {
		        return this.name == "name" ? "selector-option-image" : "selector-option-link";
		    },

		    selectedIndex: function()
		    {
		        return this.getOptionIndex(this.value);
		    },

		    /**
		     * Get the filtered options if the filter is being used.
		     * @returns {Array}
		     */
		    filteredOptions: function()
		    {
		        if (this.searchInput.length > this.config.minChars) {
		            var filtered = _.filter(this.options, item => {
		                var filter = this.searchInput.toLowerCase();
		                var value = item.label.toLowerCase();
		                return value.indexOf(filter) > -1;
		            });
		            // If only one is returned, select it.
		            if (filtered.length == 1) {
		                this.change(filtered[0]);
		            }
		            return filtered;
		        }
		        return this.options;
		    },

			/**
			 * Get the selected value's label.
			 * @returns {String}
			 */
		    selectedOption: function()
			{
			    return this.selectedIndex < 0 ? {label:this.placeholder, value:undefined} : this.options[this.selectedIndex];
		    },

			hasError: function() {
		        return ! this.options.length || ! this.filteredOptions.length;
			},
		},

		components: {
		    "selector-option-link" : require('./selector-option-link.vue'),
		    "selector-option-image" : require('./selector-option-image.vue'),
		},

        methods: {

            /**
             * Toggle the selector window open.
             * @param isOpen {Boolean}
             */
		    toggle: function(isOpen)
		    {
		        if (this.disabled) {
		            return;
		        }
		        if (typeof isOpen !== 'boolean') {
                    isOpen = ! this.open;
		        }
		        if (! isOpen) {
		            return wait(200).then(() => {
		                this.open = isOpen;
                        this.searchInput = "";
                        this.$emit('close');
		            });
		        }

	            this.open = isOpen;
	            wait(50).then(() => {
                    this.$refs.searchInput.focus();
                    this.$emit('open');
	            })
		    },

            /**
             * Select an item by index.
             * @param option {Object}
             * @param close {boolean}
             */
	        select: function(option,close)
	        {
	            if (! option.disabled) {
                    this.$emit('input', option.value);
                    if (close) {
                        this.toggle(false);
                    }
	            }
	        },

	        change: function(option)
	        {
	            this.$emit('change', option.value);
	        },

            /**
             * Keystroke listener event handler.
             * @param event
             */
	        onKeyup: function(event)
	        {
		        var key = event.keyCode;
		        var len = this.filteredOptions.length;
		        var sel = this.selectedIndex;
		        if (len > 0)
		        {
                    if (key == DN_ARROW) {
                        this.change(sel+1 > len-1 ? 0 : this.options[sel+1]);
                    } else if (key == UP_ARROW) {
                        this.change(sel-1 < 0 ? len-1 : this.options[sel-1]);
                    }
		        }
		        if (key == 13) {
		            this.select(this.options[sel],true);
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
            getOptionIndex: function(value)
            {
                var optionIndex = -1;

                if (value == null || value == undefined) {
                    return optionIndex;
                }
                this.options.forEach((item,index) => {
                    if (value === item.value) optionIndex = index;
                });
                return optionIndex;
            },
        },
	}
</script>
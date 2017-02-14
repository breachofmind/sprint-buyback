<template>
	<div class="selection-panel card" :class="{'is-active': active}">
		<header class="card-header">
			<span class="selection-panel-number">{{level+1}}</span>
			<span class="selection-panel-title"><slot name="title"></slot></span>
		</header>
		<div class="card-body">
			<div class="selection-panel-input" v-if="! $store.state.loading">
				<selector id="Whatever" :value="value" :options="options" name="selectorrr" @input="$emit('input',value)">
					Please choose an option above.
				</selector>
			</div>
			<loader v-else></loader>
		</div>
	</div>
</template>

<script>
	module.exports = {
		name:"SelectionPanel",
		props: {
		    "value" : {
		        default: null
		    },
			"level": {
		        type: Number
			},
		    "options": {
		        type: Array,
		        default: function() {
		            return [];
		        }
		    }
		},

		data: function() {
		    return {
		        active: false
		    }
		}
	}
</script>
<template>
	<a href="javascript:;" class="selector-option" @click="onClick">
		{{option.label}}
	</a>
</template>

<script>
	module.exports = {
	    name: "SelectorOptionLink",
		props: ['option'],
		methods: {
	        onClick: function()
	        {
	            this.$emit('select');
	        }
		}
	}
</script>
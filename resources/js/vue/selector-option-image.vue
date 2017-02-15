<template>
	<a href="javascript:;" class="selector-option is-flex" @click="onClick">
		<div class="selector-option-image">
			<img :src="option.value.$preview" alt="Image">
		</div>
		<div class="selector-option-label">
			<span>{{option.label}}</span>
		</div>
	</a>
</template>

<script>
	module.exports = {
	    name: "SelectorOptionImage",
		props: ['option'],
		methods: {
	        onClick: function()
	        {
	            this.$emit('select');
	        }
		}
	}
</script>
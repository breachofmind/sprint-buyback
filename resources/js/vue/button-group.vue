<template>
	<div class="row selection-button-group" v-if="options.length" :data-name="name">
		<div class="selection-button-wrapper col-sm-6 col-md-4 col-lg-3" v-for="option in options" :class="{'is-selected': option.value == value}">
			<a href="javascript:;" class="selection-button" @click="select(option)">
				<span class="selection-button-label">{{option.label}}</span>
			</a>
		</div>
	</div>
	<div class="alert alert-info" v-else>
		<slot></slot>
	</div>
</template>

<script>
    module.exports = {

        name: "ButtonGroup",

	    props:['id','options','value','name'],

        methods: {
			select: function(option)
			{
				this.$emit('input', option.value);
			}
        }
    }
</script>
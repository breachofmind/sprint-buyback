<template>
	<svg class="svg-icon"><use :xlink:href="icon"></use></svg>
</template>

<script>
	var STATIC_URL = "/svg/linearicons.svg#lnr-";

module.exports = {
    name:"Icon",
	props: ['name'],
	computed: {
        icon: function() {
            return STATIC_URL + this.name;
        }
	}
}
</script>
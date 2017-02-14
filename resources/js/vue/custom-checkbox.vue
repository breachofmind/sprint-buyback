<template>
	<div class="form-group form-group-custom">
		<input type="checkbox" :id="id" :name="name">
		<label :for="id" class="form-control">
			<icon name="check"></icon>
		</label>
		<label :for="id" class="form-control-label">
			<slot></slot>
		</label>
	</div>
</template>

<script>
module.exports = {
    name:"CustomCheckbox",
	props: ['id','name']
}
</script>
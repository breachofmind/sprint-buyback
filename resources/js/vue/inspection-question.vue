<template>
	<div :id="id" class="inspect-question">
		<h4 class="inspect-question-header">
			<span class="inspect-question-number">{{index+1}}</span>
			<span class="inspect-question-title">{{question.title}}</span>
		</h4>
		<div class="inspect-question-body">
			<p>{{question.text}}</p>
		</div>
		<div class="inspect-question-actions">

			<div class="custom-boolean is-yes">
				<input type="radio"
				       value="1"
				       :name="inputName"
				       :id="inputId(true)"
				       v-model.number="question.answer"
				       @change="onChange">
				<label :for="inputId(true)">Yes</label>
			</div>

			<div class="custom-boolean is-no">
				<input type="radio"
				       value="0"
				       :name="inputName"
				       :id="inputId(false)"
				       v-model.number="question.answer"
				       @change="onChange">
				<label :for="inputId(false)">No</label>
			</div>

		</div>
	</div>
</template>

<script>
	module.exports = {

		name:"InspectionQuestion",

		props: ['question','index'],

		computed: {
		    id: function()
		    {
		        return "InspectionQuestion"+this.index;
		    },

			inputName: function()
			{
			    return "question_" + this.index;
			}
		},

		methods: {
			inputId: function(value)
			{
			    return "Question" + this.index + (value ? "Yes" : "No");
			},

			onChange: function(event)
			{
			    this.$emit('input', this.question, this.index);
			}
		}
	}
</script>
<template>
	<div id="InspectionPanel" class="selection-panel inspection-panel card is-active" v-if="device">

		<header class="card-header">
			<span class="selection-panel-icon"><icon name="pencil3"></icon></span>
			<span class="selection-panel-title">Inspect your Device</span>
		</header>

		<div class="card-body">
			<div class="l-inspect is-flex">

				<div class="l-inspect-device is-flex">

					<div class="device-image">
						<img :src="device.$preview" alt="Device Image">
					</div>

					<div class="device-image-caption">
						<h4>Your Device:</h4>
						<p class="device-details">
							<span class="device-carrier">{{device.carrier}}</span>
							<span class="device-capacity">{{device.capacity}}</span>
							<span class="device-brand">{{device.brand}}</span>
							<span class="device-name">{{device.name}}</span>
						</p>
						<a href="#SelectionPanel0" v-scroll @click="$store.state.useWorkflow = true">Not it?</a>
					</div>
				</div>

				<div class="l-inspect-questions is-flex">

					<inspection-question v-for="(question,index) in questions" :question="question" :index="index" @input="onInput"></inspection-question>

				</div>
			</div>
		</div>

		<div class="card-footer text-right">
			<a href="javascript:;" class="btn btn-link">Continue Later</a>
			<button type="submit" class="btn btn-primary has-arrow has-loader" :disabled="! canSubmit" :class="{'is-loading': submitting}" @click="getQuote">
				<span>Get my Quote</span>
				<icon name="chevron-right"></icon>
				<loader></loader>
			</button>
		</div>
	</div>
</template>

<script>
	var $http = require('axios');
	var utils = require('../utils');
	var SCREEN_MD = 768;

	module.exports = {

		name:"InspectionPanel",

		props: ['device'],

		data: function()
		{
		    return {
		        complete: false,
			    submitting: false,
		        questions: [
                    {title: "Power", text:"Does your device power up and function normally?"},
                    {title: "Enclosure", text: "Is the enclosure in good condition? (Normal wear and tear is okay)"},
                    {title: "Free from Liquid Damage", text:"Is the device free from obvious signs of liquid contact?"},
                    {title: "Display", text:"Is the display in good condition?"},
                    {title: "Buttons", text:"Are the buttons in good working condition?"},
                    {title: "Power Adaptor", text:"Does your device come with a power adaptor?"}
		        ]
		    }
		},

		computed: {

            /**
             * Check if the application is loading.
             * @returns {boolean}
             */
		    loading: function()
		    {
		        return this.$store.state.loading;
		    },

			canSubmit: function()
			{
			    return this.complete && ! this.submitting;
			}

		},

		methods: {

		    onInput: function(question,index)
		    {
		        // When a question is answered, check if all of them have been answered.
			    var complete = true;
			    this.questions.forEach(question => {
			        if (! question.hasOwnProperty('answer')) complete = false;
			    });
			    this.complete = complete;
			    if (complete) {
			        this.$emit('complete', this.questions);
			    }

			    // Move to the next question if mobile.
			    utils.scrollTo('InspectionQuestion'+(index+1), SCREEN_MD);
		    },

		    getQuote: function()
		    {
                this.submitting = true;
                var post = {
                    deviceId: this.device.id,
                    questions: this.questions.map(question => {
                        return question.answer;
                    })
                }
                $http.post("/device/quote", post).then(response => {
                    window.setTimeout(timer => {
                        this.$store.commit('quote', response.data);
                        this.submitting = false;
                        utils.scrollTo('QuotePanel');
                    }, 2000);
                });
		    }
		},

		components: {

		    "inspection-question" : require('./inspection-question.vue')
		}
	}
</script>
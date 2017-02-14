<template>
	<div :id="id" class="selection-panel card is-active" v-if="device">

		<header class="card-header">
			<span class="selection-panel-number">{{level+1}}</span>
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
						<a href="#SelectionPanel0" v-scroll>Not it?</a>
					</div>
				</div>

				<div class="l-inspect-questions is-flex">
					<div class="inspect-question" v-for="question in questions">
						<h4 class="inspect-question-title">
							{{question.title}}
						</h4>
						<div class="inspect-question-body">
							<p>{{question.text}}</p>
						</div>
						<div class="inspect-question-actions">
							yes/no
						</div>
					</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {

		name:"InspectionPanel",

		props: {
		    "device" : {
		        default: null
		    },
			"level": {
		        type: Number
			}
		},

		data: function()
		{
		    return {
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
             * Get the ID property.
             * @returns {string}
             */
		    id: function()
		    {
		        return "SelectionPanel"+this.level;
		    },

            /**
             * Check if the application is loading.
             * @returns {boolean}
             */
		    loading: function()
		    {
		        return this.$store.state.loading;
		    },

		},

		methods: {

		}
	}
</script>
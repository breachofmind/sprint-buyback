<template>
	<div id="QuotePanel" class="selection-panel quote-panel card is-active" v-if="quote">

		<header class="card-header">
			<span class="selection-panel-icon"><icon name="receipt"></icon></span>
			<span class="selection-panel-title">Your Quote</span>
		</header>

		<div class="card-body">
			<div class="alert alert-success quote-valuation">
				<h3 class="quote-valuation-amount">{{quote.valuation | currency}}</h3>
				<p class="quote-valuation-type">{{quote.valuationType}}</p>
			</div>
			<p class="quote-disclaimer">
				Subject to quality verification at Brightstar when a final value will be determined.
			</p>
		</div>

		<div class="card-footer text-right">
			<a href="javascript:;" class="btn btn-link">Continue Later</a>
		</div>
	</div>
</template>

<script>
	module.exports = {
	    name: "QuotePanel",
		props: ['level', 'quote']
	}
</script>
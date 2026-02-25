<template>
	<div @click="navigateToPage(prizeLog.redirect_to)" class="prize-card">
		<h3>R$ {{ this.formatCurrency(parseFloat(prizeLog.value)) }}</h3>
		<div class="card-body">
			<div class="winner-insight">
				{{ `${prizeLog.user} recebeu um prêmio de ${this.formatCurrency(parseFloat(prizeLog.value))} na ${prizeLog.product_name}` }}
			</div>
		</div>
	</div>
</template>

<script>

export default {
    name: "PrizeCard",

    props: {
		prizeLog: Object,
    },

	methods: {
		navigateToPage(page) {
			document.location = page
		},
	}

}
</script>

<style scoped>

.prize-card {
	display: inline-block;
	width: 340px;
    border-radius: 7px;
    color: white;
    padding: 10px;
    text-align: center;
    border: solid #3f4b5b 1px;
	text-wrap: wrap;
	flex-shrink: 0;
}

.card-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	font-weight: bold;
}
h3 {
	color: rgb(17, 205, 17);
}

</style>
<template>
	<div style="width: 135px">
		<!--<b>#{{item.id}}</b>-->
		<span class="dino-name">{{ item.name_chi}}({{item.name}})</span>
	</div>
</template>

<style>
	.dino-name{
		font-size: 10px !important;
		padding: 5px;
		width: 130px;
		display: block;
		overflow: hidden;
	}

	.v-autocomplete-list{
		background: #fffdf5;
		position: absolute;
		max-height: 300px;
		overflow: auto;
	}

	.v-autocomplete-input{
		width: 150px;
	}
</style>

<script>
	export default {
		props: {
			item: { required: true },
			searchText: { required: true }
		}
	}
</script>

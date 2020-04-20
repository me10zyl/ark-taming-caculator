<template>
	<div id="app">
		<!--<img alt="Vue logo" src="./assets/logo.png">-->
		<!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
		<!--    <Ark />-->
		<div>
			<router-link :to="{name:'filter',params:{key:value}}">跳转到过滤复制器</router-link>
		</div>
		<div>
			<router-link :to="{name:'taming',params:{key:value}}">跳转到驯服计算器</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
		margin-top: 60px;
	}

	input {
		width: 260px;
		padding: 0.2rem;
		border-radius: 5px;
		box-shadow: #999999 1px 1px 1px;
	}

	ul {
		width: 100%;
		color: rgba(30, 39, 46, 1.0);
		list-style: none;
		margin: 0;
		padding: 0.5rem 0 .5rem 0;
	}

	li {
		margin: 0 0 0 0;
		border-radius: 5px;
		padding: 0.75rem 0 0.75rem 0.75rem;
		display: flex;
		align-items: center;
	}

	li:hover {
		cursor: pointer;
	}

	.autosuggest-container {
		display: flex;
		justify-content: center;
		width: 280px;
	}

	.autosuggest__results-container {
		position: absolute;
		background: wheat;
		width: 270px;
	}

	#autosuggest {
		width: 100%;
		display: block;
	}

	.autosuggest__results-item--highlighted {
		background-color: rgba(51, 217, 178, 0.2);
	}
</style>

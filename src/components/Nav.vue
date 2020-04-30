<template>
	<div class="centerx">
		<vs-navbar
				v-model="indexActive"
				:color="colorx"
				class="myNavbar"
				active-text-color="rgba(255,255,255,1)"
			>
			<div slot="title">
				<vs-navbar-title>
					Yilnz's 方舟助手
				</vs-navbar-title>
			</div>

			<vs-navbar-item index="0" >
				<router-link  :to="{name:'filter',params:{key:value}}">过滤复制器</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="1">
				<router-link :to="{name:'taming',params:{key:value}}">驯服计算器</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="3">
				<router-link :to="{name:'recipe',params:{key:value}}">消耗品制作食谱</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="4">
				<router-link :to="{name:'boss',params:{key:value}}">BOSS材料</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="5">
				<a href="https://www.dododex.com/dyes" target="_blank">染料制作</a>
			</vs-navbar-item>
			<vs-navbar-item index="6">
				<router-link :to="{name:'links',params:{key:value}}">有用的链接(MOD介绍&Wiki)</router-link>
			</vs-navbar-item>
			<vs-navbar-item index="7">
				<a href="steam://connect/176.109.78.42:27065">连接外服</a>
			</vs-navbar-item>


			<vs-spacer></vs-spacer>

<!--			<vs-button color-text="rgb(255, 255, 255)" color="rgba(255, 255, 255, 0.3)" type="flat" icon="more_horiz"></vs-button>-->
		</vs-navbar>
	</div>
</template>

<script>
	export default {
		data: ()=>({
			colorx:'#1db952'
		})
	}
</script>

<style lang="stylus">

</style>

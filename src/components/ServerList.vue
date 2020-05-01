<template>
	<div>
    <vs-list>
    <vs-list-header icon="toc" title="外服列表"></vs-list-header>
    <vs-list-item  v-for="server in serverList" icon="stars"  v-bind:title="server.name" v-bind:subtitle="server.sub_name">  
    <vs-button  icon="launch" v-bind:href="'steam://connect/' + server.ip"  color="#3dd495"  type="relief" gradient-color-secondary="rgb(130, 207, 23)">连接</vs-button>
    </vs-list-item>

  </vs-list>
	</div>

  
</template>

<script>
	export default {
		name: "server",
        data()  {
            return {
                serverList : [
                    {
                        name : "Bacon Blitz 5/1 50x/Shop/Kit/ORP/AutoProt/6man/TP",
                        sub_name : "人多，无传送龙，无精灵球",
                        ip : "192.223.27.63:27001"
                    }
                ]
            }
        }
	}


</script>

<style scoped>
</style>

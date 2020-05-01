<template>
	<div>
    <vs-list>
    <vs-list-header icon="toc" title="外服列表"></vs-list-header>
    <vs-list-item  v-for="server,index in serverList" icon="stars" v-bind:title="(index+1)+'. ' + server.name" v-bind:subtitle="server.sub_name">  
    <vs-button  icon="launch" size="small" v-bind:href="'steam://connect/' + server.ip"  text-color="#aaff00"  color="primary" type="relief" gradient-color-secondary="rgb(130, 207, 23)">连接</vs-button>
    </vs-list-item>

  </vs-list>
	</div>

  
</template>

<script>
	export default {
		name: "server",
        data()  {
            return {
                colorx:'#c72a75',
                colorx2:'#5252e8',
                serverList : [
                    {
                        name : "Bacon Blitz 5/1 50x/Shop/Kit/ORP/AutoProt/6man/TP",
                        sub_name : "人多，无传送龙，无精灵球",
                        ip : "192.223.27.63:27001"
                    },
                      {
                        name : "NA UniversalARK FullPvP 100X/SHOP/SuperKitS/TELEP",
                        sub_name : "100倍/传/S+",
                        ip : "85.190.159.50:21001"
                    },{
                        name : "NAMELESS-4/24-100X-RAGNAC/A.MESH/A.PROT/S+/P.SHOP",
                        sub_name : "人超多",
                        ip : "195.7.2.110:27015"
                    }
                ]
            }
        }
	}


</script>

<style scoped>
</style>

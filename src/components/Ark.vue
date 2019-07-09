<template>
    <div id="main">
        <div>
            <div class="title">
                <h3>
                    生物详情
                </h3>
            </div>
            <div class="list">
                <div class="row">
                    <label>倍率：</label>
                    <select v-model="creature.usertamingmultiplier">
                        <option value="3">官服毁灭服(3倍)</option>
                        <option value="1">官服(1倍)</option>
                    </select>
                </div>
                <div class="row">
                    <label>生物：</label>
                    <div class="input autosuggest-container">
                        <vue-autosuggest
                                v-model="creatureName"
                                :suggestions="filteredOptions"
                                :input-props="{id:'autosuggest__input', placeholder:'恐龙'}"
                                @focus="focusMe"
                                @click="clickHandler"
                                @input="onInputChange"
                                @selected="onSelected"
                                :get-suggestion-value="getSuggestionValue"
                        >
                            <template slot-scope="{suggestion}">
                                <span class="my-suggestion-item">{{suggestion.item.name_chi}}</span>
                            </template>
                        </vue-autosuggest>
                    </div>
                </div>
                <div class="row">
                    <label>等级：</label><input v-model="creature.level" @change="onChangeLevel"/>
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <h3>
                    击晕
                </h3>
            </div>
            <div class="list-table">
                <div class="row" v-for="ko in creature.kos" v-bind:key="ko.komethod">
                    <label>{{ko.komethod}}</label>
                    <span v-if="ko.koquantities.Head">
                        头 : {{ko.koquantities.Head}}
                    </span>
                    <span v-if="ko.koquantities.Body">
                        身体 : {{ko.koquantities.Body}}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="creature && creature.foods && creature.foods.length > 0">
            <div class="title">
                <h3>
                    食物详情
                </h3>
            </div>
            <div class="list-table">
                <div class="row" v-for="food in creature.foods2" v-bind:key="food.name" @click="onClickFood(food)">
                    <label>{{food.name_chi}}</label>
                    <span>
                        {{food.maxfoodamount}}
                    </span>
                    <span>
                        {{food.timeStr}}
                    </span>
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <h3>
                    驯服详情
                </h3>
            </div>
            <div class="list">
                <div class="row">
                    <label>总时间：</label> {{creature.totaltimeStr}}
                </div>
                <div class="row">
                    <label>苏醒时间：</label>{{creature.narcoticss && creature.narcoticss[0].buffertimeStr}}
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                <h3>
                    总结
                </h3>
            </div>
            <div class="list">
                <div class="row primary">
                    清醒与麻醉时间差：{{creature.differenceStr}}
                </div>
                <div class="row primary">
                    <ul>
                        <li>喂麻药时间：00:50:00 (2019-07-08 17:30:41)</li>
                        <li>喂麻药时间：00:50:00 (2019-07-08 17:30:41)</li>
                        <li>喂麻药时间：00:50:00 (2019-07-08 17:30:41)</li>
                    </ul>
                </div>
                <div class="row primary">
                    每次喂多少个麻药（或）：
                    <div>
                        黑果子1个
                    </div>
                    <div>
                        麻药1个
                    </div>
                </div>
            </div>
        </div>
        <div class="start">
            <button>开始驯服</button>
        </div>
    </div>
</template>

<script>
    import $scope from '@/js/arkdata.js';
    import '@/js/ark.js';
    import dinos from '@/js/dinos.js'
    import {formatTimeToStr, toHHMMSS} from '@/js/date.js';
    //import Autocomplete from 'vue2-autocomplete-js';
    //require('vue2-autocomplete-js/dist/style/vue2-autocomplete.css')

    export default {
        name: "ark",
        data() {
            return {
                creatureName: null,
                creature: {
                    name: null,
                    level: 20,
                    foods: [],
                    knockout: null,
                    name_chi: null,
                    food: 'Raw Meat'
                },
                creatures: []
            }
        },
        props: {},
        created: function () {
            window._self = this;
            for (let c in $scope.creatures) {
                $scope.creatures[c].name = c;
                $scope.creatures[c].name_chi = dinos[c];
                this.creatures.push($scope.creatures[c])
            }
            /*$scope.resetfoods();
            $scope.selectdino();
            $scope.maxfoodcalc();
            $scope.alltimescalc();
            $scope.foodcalc();
            $rootScope.pagetitle = "ARK Taming Calculator";*/
        },
        computed: {
            filteredOptions() {
                return [
                    {
                        data: this.creatures.filter(option => {
                            if (!option.name_chi || !this.creatureName) {
                                return false;
                            }
                            return option.name_chi.toLowerCase().indexOf(this.creatureName.toLowerCase()) > -1;
                        })
                    }
                ];
            }
        },
        methods: {
            clickHandler(item) {
                // event fired when clicking on the input
            },
            onSelected(item) {
                let oldLevel = this.creature.level;
                this.creature = item.item
                this.creature.level = oldLevel;
                console.log($scope)
                this.arkSelectLevel()
                console.log(this.creature)
            },
            onInputChange(text) {
                // event fired when the input changes
                //console.log(text)
            },
            /**
             * This is what the <input/> value is set to when you are selecting a suggestion.
             */
            getSuggestionValue(suggestion) {
                return suggestion.item.name_chi;
            },
            focusMe(e) {
                //console.log(e) // FocusEvent
            },
            onClickFood ( food){
                this.arkFoodCalc();

            },
            onChangeLevel(e){
              this.arkSelectLevel()
            },
            arkSelectLevel(){
                let creature = this.creature;
                if (creature.level > 2000) {
                    creature.level = 2000;
                }
                if (isNaN(creature.level) || creature.level < 1) {
                    return;
                }

                let creaturedata = $scope.creatures[creature.name];
                creature.requiredaffinity = creaturedata.baseaffinity + creaturedata.affinityperlevel * creature.level;
                creature.torpor = creaturedata.basetorpor + creaturedata.basetorpor * creaturedata.torporperlevel * (creature.level - 1);
                creature.torporrate = creaturedata.basetorporrate + Math.pow(creature.level - 1, $scope.texponent) / ($scope.tcoefficient / creaturedata.basetorporrate);

                creature.usertamingmultiplier = 1;
                creature.tamingmultiplier = 1;
                creature.foodratemultiplier=  1;

                creature.tamingmultiplier = creature.usertamingmultiplier * $scope.basetamingmultiplier;

                creature.tamingmethod = creature.tamingmethods[0];

                creature.food = 'Raw Meat'
                this.arkKoCalc();
                this.arkMaxFoodCalc();
                this.arkAllTimeCalc();
                this.arkFoodCalc();
                this.arkNarcoticsCalc();
                this.arkFinalCalc();
            },
            arkKoCalc() {
                let kos = [];
                for(let method in $scope.komethods){
                    let komethod = $scope.komethods[method];
                    let $ko = Object.assign({}, $scope.ko);
                    $ko.komethod = method;
                    //var komethod = $scope.komethods[$scope.ko.komethod];
                    $ko.koquantities = {};

                    $ko.searchkomethod = $ko.komethod; //Ensure the searchname is kept up to date

                    for (let hitbox in $scope.creatures[this.creature.name].hitboxes) {
                        var torpor = komethod.torpor * $scope.creatures[this.creature.name].hitboxes[hitbox];
                        var damage = komethod.damage * $scope.creatures[this.creature.name].hitboxes[hitbox];
                        if (komethod.usesmeleedam) {
                            torpor *= $ko.komeleedam / 100;
                            damage *= $ko.komeleedam / 100;
                        }
                        if (komethod.usesweapondam) {
                            torpor *= $ko.koweapondam / 100;
                            damage *= $ko.koweapondam / 100;
                        }
                        for (let i = 0; i < komethod.damagetypes.length; i++) {
                            if (komethod.damagetypes[i] in $scope.creatures[this.creature.name].damagemultipliers) {
                                torpor *= $scope.creatures[this.creature.name].damagemultipliers[komethod.damagetypes[i]];
                                damage *= $scope.creatures[this.creature.name].damagemultipliers[komethod.damagetypes[i]];
                            }
                        }
                        $ko.kotorpor[hitbox] = torpor;
                        $ko.kodamage[hitbox] = damage;
                        $ko.koquantities[hitbox] = Math.ceil(this.creature.torpor / torpor);
                        $ko.kotimes[hitbox] = $ko.koquantities[hitbox] * komethod.time;
                    }
                    kos.push($ko);
                }

                this.creature.kos = kos;
            },
            arkMaxFoodCalc : function(){
                let creature = this.creature;
                this.creature.maxfoodamounts = {};
                if (this.creature.tamingmethod == "Standard") {

                    for (var food in $scope.foods) {
                        this.creature.maxfoodamounts[food] = Math.ceil(creature.requiredaffinity / $scope.foods[food].affinity / creature.tamingmultiplier);
                    }

                }

                if (this.creature.tamingmethod == "Non-Violent") {

                    for (var food in $scope.foods) {
                        this.creature.maxfoodamounts[food] = Math.ceil(creature.requiredaffinity / $scope.foods[food].affinity / creature.tamingmultiplier / creaturedata.nonviolentfoodaffinitymultiplier);
                    }

                }

                this.creature.foods2 = [];
                this.creature.foods.forEach(f=>{
                    this.creature.foods2.push({
                        name : f,
                        maxfoodamount : this.creature.maxfoodamounts[f],
                        name_chi: f
                    })
                })
            },
            arkAllTimeCalc : function(){
                let creature = this.creature;
                creature.times = {};

                if (creature.tamingmethod == "Standard") {
                    creature.foodrate = $scope.creatures[creature.name].foodrate * creature.foodratemultiplier;
                }
                if (creature.tamingmethod == "Non-Violent") {
                    creature.foodrate = $scope.creatures[creature.name].foodrate * creature.foodratemultiplier * this.creatures[creature.name].nonviolentfoodratemultiplier;
                }

                for (var food in creature.maxfoodamounts) {
                    creature.times[food] = creature.maxfoodamounts[food] * -$scope.foods[food].food / creature.foodrate;
                }

                this.creature.foods.forEach((f, index)=>{
                    let foods2Element = this.creature.foods2[index];
                    foods2Element.time = creature.times[f];
                    foods2Element.timeStr = toHHMMSS(foods2Element.time);
                })
            },
            arkFoodCalc : function(){
                console.log(this.creature.food)
                this.creature.totaltime =  this.creature.times[this.creature.food]
                this.creature.totaltimeStr = toHHMMSS(this.creature.totaltime)
            },
            arkNarcoticsCalc : function(){
                let narcoticss = [];
                for(let narcoticsmethodname in $scope.narcoticsmethods){
                    let $narcotics = Object.assign({}, $scope.narcotics)
                    var narcoticsmethod = $scope.narcoticsmethods[narcoticsmethodname];
                    $narcotics.buffertime = this.creature.torpor / -this.creature.torporrate;
                    $narcotics.max = Math.ceil($scope.totaltime * -this.creature.torporrate / (narcoticsmethod.torpor - this.creature.torporrate * narcoticsmethod.time));
                    $narcotics.min = Math.max(Math.ceil(($scope.totaltime * -this.creature.torporrate - this.creature.torpor) / (narcoticsmethod.torpor - this.creature.torporrate * narcoticsmethod.time)), 0);
                    $narcotics.buffernarcotics = Math.ceil(this.creature.torpor / narcoticsmethod.torpor);
                    $narcotics.narcoticsbuffertime = narcoticsmethod.time * $narcotics.buffernarcotics;
                    $narcotics.narcoticsmethod = narcoticsmethodname;
                    $narcotics.buffertimeStr = toHHMMSS($narcotics.buffertime)
                    //$scope.narcoticstimingcalc();
                    narcoticss.push($narcotics)
                }
                this.creature.narcoticss = narcoticss;
                this.creature.buffertime = narcoticss[0].buffertime;
            },
            arkFinalCalc : function(){
                let creature = this.creature;
                let difference = creature.totaltime - creature.buffertime;
                creature.difference = difference;
                creature.differenceStr = toHHMMSS(difference);
                let mazui = []
                for(let narcoticsmethodname in $scope.narcoticsmethods){
                    let narcoticsmethod = $scope.narcoticsmethods[narcoticsmethodname];
                    mazui.push({ amount : creature.difference * -creature.torporrate / narcoticsmethod.torpor, name : 'narcoticsmethodname' });
                }
                creature.mazui = mazui;
            }
        }

    }


</script>

<style scoped>
    #main {
        background: linear-gradient(rgba(40, 100, 100, 0.6), rgba(40, 100, 100, 0.3));
        width: 500px;
        /*display: table;*/
        /*text-align: center;*/
        /*border-width: 2px;
        border-style: solid;*/
        border-radius: 10px;
        /*border-color:  rgba(50, 200, 200, 0.6);*/
        /*background-color: rgba(40, 100, 100, 0.5);*/
        background: linear-gradient(rgba(40, 100, 100, 0.6), rgba(40, 100, 100, 0.3));
        padding: 10px;
        margin: 0 auto;
    }

    .primary {
        color: darkgreen;
    }

    .title {
        text-align: center;
    }

    .list-table .row {
        display: table-row;
    }

    .list .row{
        padding: 0 20px;
        width: 380px;
        margin: 2px 0;
    }

    .list-table .row>*{
        display: table-cell;
        padding: 5px;
    }

    .list-table{
        display: table;
        margin: 0 auto;
    }


    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .lit .row label {
        display: inline-block;
        width: 100px;
    }

    ul {
        padding: 0px;
        margin: 0px;
    }

    li {
        padding: 0px;
        margin: 0px;
    }

    .start {
        text-align: center;
    }

    .input {
        display: inline-block;
    }
</style>
<template>
    <div id="main">
        <div style="text-align: center">
            <h4>yilnz's 方舟驯服计算器</h4>
        </div>
        <div>
            <div class="title">
                <h3>
                    生物详情
                </h3>
            </div>
            <div class="list">
                <div class="row">
                    <label>倍率：</label>
                    <select v-model="creature.usertamingmultiplier" @change="onChangeUserTamingMul">
                        <option value="3">官服毁灭服(3倍)</option>
                        <option value="1">官服(1倍)</option>
                    </select>
                </div>
                <div class="row" style="position: relative">
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
                                <span class="my-suggestion-item">{{suggestion.item.name_chi}}({{suggestion.item.name}})</span>
                            </template>
                        </vue-autosuggest>
                    </div>
                    <span style="font-size: 10px;position: absolute; right:80px;top:6px" v-if="creature.name">
                        <a :href="dododexUrl" target="_blank" id="dododexUrl">dododex</a>
                    </span>
					<span style="font-size: 10px;position: absolute; right:50px;top:6px" v-if="creature.name">
						<a :href="wikiUrl" target="_blank" id="wikiUrl">wiki</a>
					</span>
                </div>
                <div class="row">
                    <label>等级：</label><input v-model="creature.level" @change="onChangeLevel"/>
                </div>
            </div>
        </div>
        <div v-if="creature.tamingmethod == 'Standard'">
            <div class="title">
                <h3>
                    击晕
                </h3>
            </div>
            <div class="list-table">
                <div class="row" v-for="ko in creature.kos" v-bind:key="ko.komethod">
                    <label>{{ko.komethod_chi}}</label>
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
                    <span v-if="this.creature.tamingmethod == 'Non-Violent'">
                        (非暴力驯服 - 由于数据不准，仅供参考， 请参照<a :href="dododexUrl" target="_blank" id="dododexUrl2">DODODEX</a>上的详细信息)
                    </span>
                </h3>
            </div>
            <div class="list-table">
                <div class="row" v-for="food in creature.foods2" v-bind:key="food.name">
                    <label><a href="javascript:void(0)" @click="onClickFood(food)">{{food.name_chi}}</a></label>
                    <span>
                        {{food.maxfoodamount}}
                    </span>
                    <span>
                        {{food.timeStr}}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="creature.tamingmethod == 'Standard'">
            <div class="title">
                <h3>
                    驯服详情
                </h3>
            </div>
            <div class="list-table">
                <div class="row">
                    <label>选择的食物：</label>{{creature.food}}
                </div>
                <div class="row">
                    <label>总时间：</label> {{creature.totaltimeStr}}
                </div>
                <div class="row">
                    <label>苏醒时间：</label>{{creature.narcoticss && creature.narcoticss[0].buffertimeStr}}
                </div>
            </div>
        </div>
        <div v-if="creature.tamingmethod == 'Standard'">
            <div class="title">
                <h3>
                    总结
                </h3>
            </div>
            <div class="list-table">
                <div class="row">
                    <span>清醒与麻醉时间差：</span>
                    <span>
                        {{creature.differenceStr}}
                    </span>
                    <span v-if="creature.waitTimeStr" style="color:#ff0064">
                        {{creature.waitTimeStr}}
                    </span>
                </div>
                <div class="row primary" style="font-size: 14px;" v-for="refillTime in creature.refillTimes">
                    <span>喂麻药时间:{{refillTime.refillTimeStr}}</span>
                    <span v-if="refillTime.dateStr"><span style="color:#ff0064">{{refillTime.dateStr}}</span></span>
                    <span v-for="narcotics in refillTime.narcotics" style="margin-left: 2px">
                            <span>({{narcotics.name_chi}}<span
                                    style="color: darkred"> {{narcotics.amount}} </span>个)</span>
                              </span>
                </div>
            </div>
        </div>
        <div class="start" v-if="creature.tamingmethod == 'Standard'">
            <button @click="startTame">开始驯服</button>
            <span style="margin-left: 15px;font-size: 10px">
                <input type="checkbox" id="bellOption" style="width: inherit;" checked="checked"/>喂麻药闹铃提醒
            </span>
        </div>
        <audio src="/bell.mp3" style='display:none' id='bell'></audio>
    </div>
</template>

<script>
    import Vue from 'vue'
    import $scope from '@/js/arkdata.js';
    import '@/js/ark.js';
    import dinos from '@/js/dinos.js'
    import {formatTimeToStr, toHHMMSS} from '@/js/date.js';
    import dododexNames from '@/js/dododexnames.js';

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
                    food: 'Raw Meat',
                    usertamingmultiplier: 3

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
			for (let c in dinos){
				if(this.creatures.map(e=>e.name).indexOf(c) == -1){
					this.creatures.push({
						name : c,
						name_chi : dinos[c],
						foodrate: -0.001578 * 211.237854,
						basetorpor: 400,
						basetorporrate: -0.1 * 3,
						torporperlevel: 0.06,
						baseaffinity: 2000,
						affinityperlevel: 75,
						ineffectbyaff: 2.5,
						basefood: '',
						foods: [],
						kibble: '',
						tamingmethods: [''],
						damagemultipliers: {
							"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
							"DmgType_Melee_Human": 0.8,
							"DmgType_Melee_Dino_Herbivore": 0.6
						},
						hitboxes: {
							"Body": 1
						}
					})
				}
			}
            window.$scope = $scope
            /*$scope.resetfoods();
            $scope.selectdino();
            $scope.maxfoodcalc();
            $scope.alltimescalc();
            $scope.foodcalc();
            $rootScope.pagetitle = "ARK Taming Calculator";*/
        },
        computed: {
            dododexUrl() {
                return 'https://www.dododex.com/taming/' + this.creature.dododexName + '/' + this.creature.level;
            },
			wikiUrl(){
            	return "https://ark.gamepedia.com/" + this.creature.name
			},
            filteredOptions() {
                return [
                    {
                        data: this.creatures.filter(option => {
                            if (!option.name_chi || !this.creatureName) {
                                return false;
                            }
                            if (this.creature != null)
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
                let oldUserMul = this.creature.usertamingmultiplier
                this.creature = item.item
                this.creature.level = oldLevel;
                this.creature.usertamingmultiplier = oldUserMul;
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
            onClickFood(food) {
                this.creature.food = food.name;
                this.arkFoodCalc();
                this.arkNarcoticsCalc();
                this.arkFinalCalc();
            },
            onChangeLevel(e) {
                console.log(this.creature.level)
                this.arkSelectLevel()
                this.$set(this.creature, 'level', this.creature.level)
                document.getElementById('dododexUrl').href = 'https://www.dododex.com/taming/' + this.creature.dododexName + '/' + this.creature.level;
                let elementById = document.getElementById('dododexUrl2');
                if(elementById) {
                    elementById.href = 'https://www.dododex.com/taming/' + this.creature.dododexName + '/' + this.creature.level;
                }
            },
            onChangeUserTamingMul() {
                this.arkSelectLevel()
            },
            duang(){
                if(document.getElementById('bellOption').checked) {
                    document.getElementById('bell').play();
                }
            },
            startTame() {
                /* this.creature = this.creature;
                 this.creature.refillTimes = [];
                 this.$set(this.creature, 'refillTimes', [{
                     refillTime : 111,
                     refillTimeStr : toHHMMSS(111),
                     narcotics : null,
                     date : new Date()
                 }]);;*/
                //this.duang();
                this.creature.startTameDate = new Date()
                let self = this;
                if (this.creature.refillTimes.length > 0) {
                    let prev = this.creature.startTameDate;
                    let prevDuang = 0;
                    for (var i in  this.creature.refillTimes) {
                        let t = this.creature.refillTimes[i];
                        t.date = new Date(prev.getTime() + t.refillTime * 1000);
                        t.dateStr = formatTimeToStr(t.date);
                        Vue.set(this.creature.refillTimes, i, t);
                        if(t.timeout){
                            clearTimeout(t.timeout);
                        }
                        console.log("rfillTime", t.refillTime)
                        t.timeout = setTimeout(this.duang, prevDuang + t.refillTime * 1000);
                        prevDuang += t.refillTime * 1000;
                        prev = t.date;
                    }

                    this.creature = Object.assign({}, this.creature);
                    /*
                                        this.$set(this.creature, 'refillTimes', [{
                                            refillTime : 111,
                                            refillTimeStr : toHHMMSS(111),
                                            narcotics : null,
                                            date : new Date()
                                        }]);*/
                    //let reserve = Object.assign([], this.creature.refillTimes);
                    //this.creature.refillTimes.splice(0)
                    //this.$set(this.creature, 'refillTimes', this.creature.refillTimes)
                    /*reserve.forEach(e=>{
                        this.creature.refillTimes.push(e);
                    })*/

                }else{
                    this.creature.waitTime = new Date(this.creature.startTameDate.getTime() + this.creature.totaltime * 1000);
                    this.$set(this.creature, 'waitTimeStr' , formatTimeToStr(this.creature.waitTime));
                    if(this.creature.timeout){
                        clearTimeout(this.creature.timeout);
                    }
                    this.creature.timeout = setTimeout(this.duang, this.creature.totaltime * 1000);
                }
                console.log(this.creature)
            },
			copy(text) {
				var input = document.createElement('textarea');
				input.innerHTML = text;
				document.body.appendChild(input);
				//input.focus()
				input.select();
				var result = document.execCommand('copy');
				console.log()
				document.body.removeChild(input);

				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min)) + min;
				}
				let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`

				this.$vs.notify({
					title:'做鞍小帮手',
					text: text+" 已复制",
					color:color
				})

				return result;
			},
            arkSelectLevel() {
                console.log('select level')
                let creature = this.creature;
                document.getElementsByTagName('title')[0].textContent = creature.name_chi + " " + creature.level + ' - yilnz\'s 方舟驯服计算器'
                if (creature.name == null) {
                    return null;
                }
                if (creature.level > 2000) {
                    creature.level = 2000;
                }
                if (isNaN(creature.level) || creature.level < 1) {
                    return;
                }

                let creaturedata = $scope.creatures[creature.name];

				let dododexName = dododexNames[creature.name];
				if (dododexName) {
					creature.dododexName = dododexName.dododexName;
				} else {
					creature.dododexName = creature.name.replace(' ', '').toLowerCase()
				}
				this.copy(creature.name_chi.replace(/[A-Z]\- /, ''))
                if(creaturedata == null){
                	return
				}
                creature.requiredaffinity = creaturedata.baseaffinity + creaturedata.affinityperlevel * creature.level;
                creature.torpor = creaturedata.basetorpor + creaturedata.basetorpor * creaturedata.torporperlevel * (creature.level - 1);
                creature.torporrate = creaturedata.basetorporrate + Math.pow(creature.level - 1, $scope.texponent) / ($scope.tcoefficient / creaturedata.basetorporrate);

                //creature.usertamingmultiplier = 1;
                creature.tamingmultiplier = 1;
                creature.foodratemultiplier = 1;

                creature.tamingmultiplier = creature.usertamingmultiplier * $scope.basetamingmultiplier;

                creature.tamingmethod = creature.tamingmethods[0];

                creature.food = creature.basefood

                this.arkKoCalc();
                this.arkMaxFoodCalc();
                this.arkAllTimeCalc();
                this.arkFoodCalc();
                this.arkNarcoticsCalc();
                this.arkFinalCalc();
            },
            arkKoCalc() {
                let kos = [];
                for (let method in $scope.komethods) {
                    let komethod = $scope.komethods[method];
                    let $ko = Object.assign({}, $scope.ko);
                    $ko.komethod = method;
                    $ko.komethod_chi = komethod.name_chi;
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
            arkMaxFoodCalc: function () {
                let creature = this.creature;
                this.creature.maxfoodamounts = {};
                if (this.creature.tamingmethod == "Standard") {

                    for (var food in $scope.foods) {
                        this.creature.maxfoodamounts[food] = Math.ceil(creature.requiredaffinity / $scope.foods[food].affinity / creature.tamingmultiplier);
                    }

                }

                if (this.creature.tamingmethod == "Non-Violent") {

                    for (var food in $scope.foods) {
                        this.creature.maxfoodamounts[food] = Math.ceil(creature.requiredaffinity / $scope.foods[food].affinity / creature.tamingmultiplier / creature.nonviolentfoodaffinitymultiplier);
                    }

                }

                this.creature.foods2 = [];
                this.creature.foods.forEach(f => {
                    this.creature.foods2.push({
                        name: f,
                        maxfoodamount: this.creature.maxfoodamounts[f],
                        name_chi: $scope.foods[f].name_chi ? $scope.foods[f].name_chi : f
                    })
                })
            },
            arkAllTimeCalc: function () {
                let creature = this.creature;
                creature.times = {};

                if (creature.tamingmethod == "Standard") {
                    creature.foodrate = $scope.creatures[creature.name].foodrate * creature.foodratemultiplier;
                }
                if (creature.tamingmethod == "Non-Violent") {
                    creature.foodrate = $scope.creatures[creature.name].foodrate * creature.foodratemultiplier * $scope.creatures[creature.name].nonviolentfoodratemultiplier;
                }

                for (var food in creature.maxfoodamounts) {
                    creature.times[food] = creature.maxfoodamounts[food] * -$scope.foods[food].food / creature.foodrate;
                }

                this.creature.foods.forEach((f, index) => {
                    let foods2Element = this.creature.foods2[index];
                    foods2Element.time = creature.times[f];
                    foods2Element.timeStr = toHHMMSS(foods2Element.time);
                })
            },
            arkFoodCalc: function () {
                this.creature.totaltime = this.creature.times[this.creature.food]
                this.$set(this.creature, 'totaltimeStr', toHHMMSS(this.creature.totaltime))
                console.log(this.creature.totaltimeStr)
            },
            arkNarcoticsCalc: function () {
                let narcoticss = [];
                for (let narcoticsmethodname in $scope.narcoticsmethods) {
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
                //this.creature.narcoticss = narcoticss;
                this.$set(this.creature, 'narcoticss', narcoticss)
                this.creature.buffertime = narcoticss[0].buffertime;
            },
            arkCalcMazui: function (torpor) {
                let mazui = []
                for (let narcoticsmethodname in $scope.narcoticsmethods) {
                    let narcoticsmethod = $scope.narcoticsmethods[narcoticsmethodname];
                    mazui.push({
                        amount: Math.ceil(torpor / narcoticsmethod.torpor),
                        name: narcoticsmethodname,
                        name_chi: $scope.narcoticsmethods[narcoticsmethodname].name_chi
                    });
                }
                mazui = mazui.reverse();
                return mazui;
            },
            arkFinalCalc: function () {
                let creature = this.creature;
                let difference = creature.totaltime - creature.buffertime;
                creature.difference = difference;
                if (isNaN(difference)) {
                    return
                }
                if (creature.difference < 0) {
                    creature.differenceStr = '无需喂麻药';
                    creature.refillTimes = [];
                    return;
                }
                creature.differenceStr = toHHMMSS(difference);

                let requireTorpor = creature.difference * -creature.torporrate;
                let refillTimes = [];
                let mazui = this.arkCalcMazui(requireTorpor);
                // if(creature.difference < creature.buffertime){
                let refillTime = (creature.torpor - requireTorpor) / -creature.torporrate
                if (creature.buffertime < creature.difference) {
                    let leftTime = creature.difference;
                    while (leftTime > 0) {
                        let beforeLeftTime = leftTime;
                        leftTime = leftTime - (creature.buffertime - 5 * 60)
                        if (leftTime < 0) {
                            refillTimes.push({
                                refillTime: beforeLeftTime,
                                refillTimeStr: toHHMMSS(beforeLeftTime),
                                narcotics: this.arkCalcMazui(beforeLeftTime * -creature.torporrate)
                            })
                            break;
                        }
                        refillTimes.push({
                            refillTime: (creature.buffertime - 5 * 60),
                            refillTimeStr: toHHMMSS((creature.buffertime - 5 * 60)),
                            narcotics: this.arkCalcMazui((creature.buffertime - 5 * 60) * -creature.torporrate)
                        })
                    }

                } else {
                    refillTimes.push({
                        refillTime: refillTime,
                        refillTimeStr: toHHMMSS(refillTime),
                        narcotics: mazui
                    })
                }
                // }else{
                /*let leftTorpor = creature.torpor;
                while(true){
                        let calcTorpor = (leftTorpor - requireTorpor - -creature.torporrate * 5 * 60)
                    if(calcTorpor <= 0){
                        break;
                    }
                    let rfTime = calcTorpor / -creature.torporrate;
                    refillTimes.push({
                        refillTime : rfTime,
                        refillTimeStr : toHHMMSS(rfTime),
                        narcotics : this.arkCalcMazui(calcTorpor)
                    })
                    leftTorpor = requireTorpor - calcTorpor;
                }
                if(leftTorpor > 0){
                    let refillTime = leftTorpor / -creature.torporrate;
                    refillTimes.push({
                        refillTime : refillTime,
                        refillTimeStr : toHHMMSS(refillTime),
                        narcotics : this.arkCalcMazui(leftTorpor)
                    })
                }*/
                // }
                creature.refillTimes = refillTimes;
            }
        }

    }


</script>

<style scoped>
    #main {
        background: linear-gradient(rgba(40, 100, 100, 0.6), rgba(40, 100, 100, 0.3));
        width: 650px;
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

    .list .row {
        padding: 0 20px;
        width: 550px;
        margin: 2px 0;
        text-align: center;
    }

    .list-table .row > * {
        display: table-cell;
        padding: 5px;
    }

    .list-table {
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
        margin-top: 20px;
        text-align: center;
    }

    .input {
        display: inline-block;
    }
</style>

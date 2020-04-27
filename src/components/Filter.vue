<template>
	<div>
		<h1>ARK过滤复制器</h1>
		<div  v-for="category in categories" v-bind:style="{display:'inline-block', 'margin-right': '20px', border: '1px solid',
		'vertical-align':'top', 'color' : category.color, 'float' :'left'}">
			<table>
			<th><h4>{{category.category}}</h4></th>
			<tr v-for="item in category.items">
				<td>{{item}}</td>
				<td><vs-button color="primary" type="border" class="copy">复制</vs-button></td>
			</tr>
			</table>
		</div>
		<!--<hr />
		<div class="autosuggest-container">
			<vue-autosuggest
					class="input"
					v-model="query"
					:suggestions="filteredOptions"
					@focus="focusMe"
					@click="clickHandler"
					@input="onInputChange"
					@selected="onSelected"
					:get-suggestion-value="getSuggestionValue"
					:input-props="{id:'autosuggest__input', placeholder:''}">
				<div slot-scope="{suggestion}" style="display: flex; align-items: center;">
					<div style="display: inline-block">{{suggestion.item.seq}}.&nbsp;</div>
					<div style="{display:'flex',color:'navyblue'}">{{suggestion.item.name}}</div>
					<div style="display: inline-block">&nbsp;({{suggestion.item.index}})</div>
				</div>
			</vue-autosuggest>
		</div>-->
		<div style="clear:both">
			<h1 >流程</h1>
			<hr />
			<div >
				搓子弹：
			</div>
			<div id="zidan">
			</div>
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import items from '@/js/items.js'
	import items_category from '@/js/category.js'
	import flow from '@/js/flow.js'


	export default {
		name: "Filter",
		data() {
			return {
				categories : items_category,
				query: "",
				selected: "",
				suggestions: [
					{
						data: items
					}
				],
				stopFoucs : false
			};
		},
		computed: {
			filteredOptions() {
				return [
					{
						data: this.getFilter()
					}
				];
			}
		},
		mounted: function () {
			// let input = document.querySelector('.input input');
			//input.focus();
			// Force focus
			let self = this;
			// input.onblur = function () {
			// 	if(!self.stopFoucs){
			// 		//document.querySelector('.input input').focus();
			// 	}
			// }
			// input.addEventListener('keydown', function (e) {
			// 	console.log(e.which)
			// 	if (e.which == 27 || e.which == 20) {
			// 		input.value = ''
			// 	}
			// 	if (e.key.match(/\d/)) {
			// 		e.preventDefault()
			// 		console.log(self.getFilter())
			// 		document.querySelector('.input input');
			// 		document.querySelector('.autosuggest__results-container').remove()
			// 	}
			// })

			let copys = document.querySelectorAll(".copy");
			for(let i = 0;i < copys.length;i++){
				copys[i].onclick = function(){
					let text = this.parentNode.previousSibling.textContent;
					self.copy(text);
				}
			}

			flow.init();
		},
		methods: {
			getFilter() {
				return this.suggestions[0].data.filter(option => {
					return option.index.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
				}).map((e, i) => {
					e.seq = (i + 1);
					return e;
				})
			},
			copyText(){
				console.log(this)
			},
			copy(text) {
				var input = document.createElement('textarea');
				input.innerHTML = text;
				document.body.appendChild(input);
				this.stopFoucs = true
				//input.focus()
				input.select();
				var result = document.execCommand('copy');
				console.log()
				document.body.removeChild(input);
				this.stopFoucs = false
				//document.querySelector('.input input').focus()

				function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min)) + min;
				}
				let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`

				this.$vs.notify({
					title:'方舟复制过滤器',
					text: text+" 已复制",
					color:color
				})

				return result;
			},
			onSelected(item) {
				this.selected = item.item;
				this.copy(this.selected.name)
			},
			onInputChange(text) {
				// event fired when the input changes


			},
			/**
			 * This is what the <input/> value is set to when you are selecting a suggestion.
			 */
			getSuggestionValue(suggestion) {
				return suggestion.item.name;
			},
			focusMe(e) {
				//console.log(e) // FocusEven
				//this.selected = {}
			}
		}
	}
</script>

<style scoped>

</style>

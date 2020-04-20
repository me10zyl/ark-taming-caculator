<template>
	<div>
		<h1>方舟过滤复制器</h1>
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
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	import items from '@/js/items.js'
	//import $ from 'jquery'


	export default {
		name: "Filter",
		data() {
			return {
				query: "",
				selected: "",
				suggestions: [
					{
						data: items
					}
				]
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
		mounted : function() {
			let input = document.querySelector('.input input');
			input.focus();
			// Force focus
			input.onblur = function () {
				document.querySelector('.input input').focus();
			}
			let $this = this;
			input.addEventListener('keydown', function(e){
				console.log(e.which)
				if(e.which == 27 || e.which == 20){
					input.value = ''
				}
				if(e.key.match(/\d/)){
					e.preventDefault()
					console.log($this.getFilter())
					document.querySelector('.input input');
					document.querySelector('.autosuggest__results-container').remove()
				}
			})
		},
		methods: {
			getFilter(){
				return this.suggestions[0].data.filter(option => {
					return option.index.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
				}).map((e, i)=>{
					e.seq = (i+1);
					return e;
				})
			},
			copy(text) {
				var input = document.createElement('textarea');
				input.innerHTML = text;
				document.body.appendChild(input);
				input.select();
				var result = document.execCommand('copy');
				document.body.removeChild(input);
				return result;
			},
			clickHandler(item) {
				// event fired when clicking on the input

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

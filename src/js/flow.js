export default {
	init(){
		console.log('flow inited')
		this.parse('zidan', 'st=>start: Start|past:>http://www.google.com[blank]\n' +
			'e=>end: End|future:>http://www.google.com\n' +
			'op1=>operation: My Operation|past\n' +
			'op2=>operation: Stuff|current\n' +
			'sub1=>subroutine: My Subroutine|invalid\n' +
			'cond=>condition: Yes\n' +
			'or No?|approved:>http://www.google.com\n' +
			'c2=>condition: Good idea|rejected\n' +
			'io=>inputoutput: catch something...|future\n' +
			'\n' +
			'st->op1(right)->cond\n' +
			'cond(yes, right)->c2\n' +
			'cond(no)->sub1(left)->op1\n' +
			'c2(yes)->io->e\n' +
			'c2(no)->op2->e')
	},

	parse(elementId, text){
		let diagram = flowchart.parse(text);
		diagram.drawSVG(elementId);
	}
}

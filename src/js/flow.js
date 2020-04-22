export default {
	init(){
		console.log('flow inited')
		this.parse('zidan',
			'st1=>start: 开始\n' +
			'st=>parallel: 准备\n' +
			'meitan=>operation: 打煤炭或烧煤炭\n' +
			'shitou=>operation: 打石头/燧石\n' +
			'tie=>operation: 打金属\n' +
			'shaotie=>operation: 烧铁\n'+
			'yinhuofen=>operation: 搓引火粉=石头+燧石\n'+
			'huoyao=>operation: 搓火药=引火粉+煤炭\n' +
			'zidan=>end: 搓子弹\n' +
			'st1(right)->st\n' +
			'st(path1, top)->meitan\n' +
			'st(path2, right)->shitou\n' +
			'st(path3, bottom)->tie\n' +
			'shitou(right)->yinhuofen\n' +
			'yinhuofen(right)->huoyao\n'+
			'meitan(right)->huoyao\n' +
			'tie(right)->shaotie\n' +
			'shaotie(right)->zidan\n' +
			'huoyao->zidan\n'
		)
	},

	parse(elementId, text){
		let diagram = flowchart.parse(text);
		diagram.drawSVG(elementId);
	}
}

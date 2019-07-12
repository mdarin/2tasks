//
// You shold replace XX by [js] extention 
// I use nodejs 8 
//

// 1 You have to group the below words by having the same letter but different position
// Given these 15 words
let input = [
	'AMOR', 'XISELA', 'JAMON', 'ROMA', 
	'OMAR', 'MORA', 'ESPONJA', 'RAMO',
	'JAPONES', 'ARMO', 'MOJAN', 'MARO', 
	'ORAM', 'MONJA', 'ALEXIS'
];
// Print something like
// ALEXIS - XISELA
// AMOR - ROMA - OMAR - MORA - RAMO - ARMO - MARO - ORAM
// MONJA - JAMON - MOJAN
// ESPONJA - JAPONES
res = input.reduce(function (acc, word) {
	let key = word.split('');
	key.sort();
	if (acc[key]) {
		acc[key].push(word);
	} else {
		acc[key] = new Array();
		acc[key].push(word);
	}
	return acc;
}, {});

// show result
for (e in res) {
	console.log(res[e]);
}

// 2. You have to remove the parentheses and reverse the word inside.  
//
// foo(bar) => foorab 
// (bar) => rab 
// foo(bar)blim => foorabblim 
// foo(foo(bar))blim => foobaroofblim
let tests = [
	"(bar)foo => rabfoo",
 	"foo(bar) => foorab", 
 	"(bar) => rab",
 	"foo(foo(bar))blim => foobaroofblim",
	"((bar)) => bar",
 	"foo(bar)blim => foorabblim",
	"foo(foo((bar)))blim => fooraboofblim",
	"foo((baz)foo(bar(bar))) => foorabbaroofbaz",
	"foo((baz)foo(bar(BAR)))blim => fooRABbaroofbazblim",
	"(bar)foo((BAZ)FoO(baz))blim => rabfoobazOoFBAZblim",
	"(bar)foo(((BAR)BAZ)FoO(baz(bar)))blim => rabfoorabbazOoFBAZRABblim",
]

tests.forEach(function (item) {
	item = item.replace(/[ \t]+/g,'').split('=>');
	let input = item[0];
	let model = item[1];
	let result = reverse(input);
	console.log(input, ' => ', model, ' | ', result);	
});

function reverse(input) {

	let acc = new Array();
	let result = new Array();
	let state = 'direct';
	let stack = 0; 
	let stack0 = new Array();

	for (let i = 0; i < input.length; i++) {

		let c = input.charAt(i);

		switch (c) {
		case '(':

			if (acc.length) {
				if (stack) {
					stack0.push(acc.join(''));
				} else {
					result.push(acc.join(''));
				}
			}

			stack++;

			switch (state) {
			case 'reverse':
				state = 'direct';	
				break;
			default:
				state = 'reverse'
				break;
			}

			acc = new Array();

			break;
		case ')':

			stack--;
			
			if (acc.length) {
				if (stack) {
					stack0.push(acc.join(''));
				} else {
					result.push(acc.join(''));
				}
			}

			switch (state) {
			case 'reverse':
				state = 'direct';
				break;
			default:
				state = 'reverse';
				break;
			}

			acc = new Array();

			break;
		default:
			switch (state) {
			case 'reverse':
				acc.unshift(c);
				break;
			default:
				acc.push(c);
				break;
			}
			break;
		} // eof switch

	} // eof for

	if (acc.length) {
		result.push(acc.join(''));
	}

	if (result.length > 1) {
		let tail = result.pop() || '';
		result = result.join('') + stack0.reverse().join('') + tail;
	} else {
		result = result.join('') + stack0.reverse().join('');
	}

	return result;

}


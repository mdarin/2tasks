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
	let key = new Array();
	for (let i = 0; i < word.length; i++) {
		key.push(word.charAt(i));
	}
	key.sort();
	if (acc[key] != undefined) {
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
	"foo((baz)foo(bar(bar)))blim =>foobarraboofbazblim",
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
	//	console.log('c: ', c);

		switch (c) {
		case '(':


			if (acc.length) {
				if (stack) {
	//				console.log('[(]acc: ', acc.join(''));
	//				console.log('[(]stack before: ', stack0);
					stack0.push(acc.join(''));
	//				console.log('[(]stack after: ', stack0);
				} else {
	//				console.log('[(]acc: ', acc.join(''));
	//				console.log('[(]result before: ', result);
					result.push(acc.join(''));
	//				console.log('[(]result after: ', result);
				}
			}

			stack++;
//			console.log('[(]level: ', stack);

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
//			console.log('[)]level: ', stack);
			
			if (acc.length) {
				if (stack) {
	//				console.log('[)]acc: ', acc.join(''));
	//				console.log('[)]stack before: ', stack0);
					stack0.push(acc.join(''));
	//				console.log('[)]stack after: ', stack0);
				} else {
	//				console.log('[)]acc: ', acc.join(''));
	//				console.log('[)]result before: ', result);
					result.push(acc.join(''));
	//				console.log('[)]result after: ', result);
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

//	console.log('stack: ', stack0);

	if (acc.length) {
		result.push(acc.join(''));
	}

//	console.log('result: ', result);

	if (result.length > 1) {
		let tail = result.pop() || '';
		result = result.join('') + stack0.reverse().join('') + tail;
	} else {
		result = result.join('') + stack0.reverse().join('');
	}

//	console.log('==> ',result); 

	return result;

}


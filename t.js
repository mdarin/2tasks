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


// 2 You have to remove the parentheses and reverse the word inside.
// foo(bar) => foorab
// (bar) => rab
// foo(bar)blim => foorabblim
// foo(foo(bar))blim => fooraboofblim
let s = ["foo(bar)", "(bar)", "foo(bar)blim", "foo(foo(bar))blim"];
let processed = s.map(function (word) {
	
	let letters = [];
	for (let i = 0; i < word.length; i++) {
		letters.push(word.charAt(i));
	}

	let res = new Array();
	let state = 'direct';
	let acc = new Array();
	let stack = 0;
	let i = 0;

	// find and replace
	while (i < letters.length) {
		
		// ctrl stack and skip parentheses
		switch (letters[i]) {
		case '(': 
			stack++;
			i++;
			continue;
			break;
		case ')': 
			stack--;
			i++;
			continue;
			break;
		}
	
		//bidirectinal processing
		if (!stack) {
			switch (state) {
			case 'direct':
				acc.push(letters[i]);
				break;
			case 'reverse': 
				res = res.concat(acc.reverse());
				acc = new Array();
				acc.push(letters[i]);
				state = 'direct';
				break;
			}
		} else {
			switch (state) {
			case 'direct':
				res = res.concat(acc);
				acc = new Array();
				acc.push(letters[i]);
				state = 'reverse';
				break;
			case 'reverse': 
				acc.push(letters[i]);
				break;
			}
		} 

		i++;
	}	

	switch (state) {
	case 'direct':
		return res.concat(acc).join('');
		break;
	case 'reverse':
		return res.concat(acc.reverse()).join('');
		break;
	}

});

// show result
processed.forEach(function (e) { 
	console.log(e);
});


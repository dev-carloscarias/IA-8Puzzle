function heuristic(start, end, h) {
	if (h == 1) {
		var tiles_out = 0
		for (var i = 0; i < start.length; i++) {
			if (start[i] != end[i] && start[i] !== '0') tiles_out++
		}
		return tiles_out
	} else if (h == 2) {
		var manhattan = 0
		for (var i = 0; i < start.length; i++) {
			if (start.substring(i, i + 1) !== '0')
			manhattan += Math.abs(i - end.indexOf(start.substring(i, i + 1)))
		}
		return manhattan
	}
}


function successors(n, e, h) {
	var suc = []
	for (var i = 0; i < n[0].length - 1; i++) {
		let tmp = n[0].substring(i, i + 1)
		let child = n[0].substring(0, i) + n[0].substring(i + 1, i + 2) + tmp + n[0].substring(i + 2)
		suc.push([child, heuristic(child, e, h), inc()])
	}
	return suc
}

function move(text, position, dir) {
	switch (dir) {
		case 'l':
			return text.substring(0, position - 1) + '0' + text.substring(position - 1, position) + text.substring(position + 1);
		case 'u':
			return text.substring(0, position - 3) + '0' + text.substring(position - 2, position) + text.substring(position - 3, position - 2) + text.substring(position + 1)
		case 'r':
			return text.substring(0, position) + text.substring(position + 1, position + 2) + '0' + text.substring(position + 2);
		case 'd':
			return text.substring(0, position) + text.substring(position + 3, position + 4) + text.substring(position + 1, position + 3) + '0' + text.substring(position + 4);
	}
	return text;
}

function sucesoresBeam2(n, e, h) {
	var suc = [];

	let text = n[0];
	let result = '';
	//buscar espacio en blanco
	let position = text.search('0');

	switch (position) {
		case 0:
			//abajo
			result = move(text, position, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//der
			result = move(text, position, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 1:
			//izq
			result = move(text, position, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//abajo
			result = move(text, position, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//der
			result = move(text, position, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			break;
		case 2:
			//izq
			result = move(text, position, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//abajo
			result = move(text, position, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 3:
			//abajo
			result = move(text, position, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);

			//der
			result = move(text, position, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);

			//arriba
			result = move(text, position, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);
			break;
		case 4:
			//izq
			result = move(text, position, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//abajo
			result = move(text, position, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//der
			result = move(text, position, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			//arriba
			result = move(text, position, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 5:
			//izq
			result = move(text, position, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//abajo
			result = move(text, position, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//arriba
			result = move(text, position, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 6:
			//der
			result = move(text, position, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			//arriba
			result = move(text, position, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);
			break;
		case 7:
			//izq
			result = move(text, position, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//der
			result = move(text, position, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			//arriba
			result = move(text, position, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 8:
			//izq
			result = move(text, position, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//arriba
			result = move(text, position, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
	}

	suc = suc.sort((a, b) => a[1] - b[1])
	return [suc[0], suc[1]]
}

function beam2(inicio, final, h) {
	//inicio grafico
	var dot = '{'
	var cont = 0
	var list = [[inicio, heuristic(inicio, final, h), inc()]];
	dot += list[0][2] + ' [label="' + list[0][0] + '"];'
	while (list.length > 0) {
		var current = list.shift();
		if (current[0] == final) {
			dot += '}'
			return dot
		}
		var temp = sucesoresBeam2(current, final, h);
		//temp.reverse();
		temp.forEach(val => dot += val[2] + ' [label="' + val[0] + '"];' + current[2] + '--' + val[2] + ' [label="' + val[1] + '"] ;')
		list = list.concat(temp);
		list = list.sort(function (a, b) { return a[1] - b[1] });
		cont++
		if (cont > 100) {
			alert("Se enciclo :(")
			dot += '}'
			return dot
		}
	}
	
	//final grafico
	dot += '}'
	return dot
}

var id = 1
function inc() {
	return id++
}

function resolver(entrada) {
	console.log(entrada)
	valores = entrada.split('-')
	var inicio = valores [0]
	var heuristica = valores[1]
	console.log(inicio)
	console.log(heuristica)
	return beam2(inicio, '123456780', heuristica)
}
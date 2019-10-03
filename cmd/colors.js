const colors = 'black,red,green,yellow,blue,magenta,cyan,white'.split(',');
const styles = (
	'reset,bold,dim,italic,underline,,,inverse,hidden,,,,,,,,,,,,,boldoff,,,underlineoff,blinkoff,,,,,' + colors.join(',') + ',,default,' +
	colors.map(c => 'bg' + c).join(',') + ',,bgdefault,' + ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,' +
	colors.map(c => 'lite' + c).join(',') + ',,,' +
	colors.map(c => 'litebg' + c).join(',')
).split(',');

module.exports = Array.apply(null, Array(styles.length)).reduce((o, undef, index) => {
	const name = styles[index];

	if (name) {
		o[name] = '\x1b[' + index + 'm';
	}

	return o;
}, {});

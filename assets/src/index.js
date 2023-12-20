const bgs = [
	'crew_at_mcd.jpg',
	'stv_bukken.jpg',
];

const setBg = () => {
	const section = document.querySelector('section');
	if (!section) {
		setBg();
	}
	const bgSrc = bgs[Math.floor(Math.random() * bgs.length)];
	if (!bgSrc) {
		console.warn('Missing bg image');
	}

	section.style.backgroundImage = `url(/assets/img/${bgSrc})`;
};

setBg();
document.addEventListener('DOMContentLoaded', function () {
	const words = Array.from(document.querySelectorAll('.loading_wd')).filter(el => el.textContent.trim() !== '');
	let currentIndex = 0;
	let stopAnimation = false;

	function showNextWord() {
		if (stopAnimation || currentIndex >= words.length) return;

		if (currentIndex > 0) {
			words[currentIndex - 1].style.opacity = 0;
		}

		words[currentIndex].style.opacity = 1;
		currentIndex++;

		if (!stopAnimation && currentIndex < words.length) {
			setTimeout(showNextWord, 2000);
		}
	}

	showNextWord();

	window.addEventListener('load', function () {
		stopAnimation = true;

		const loadingScreen = document.querySelector('.loading');
		loadingScreen.style.transition = "opacity 1s ease-in-out";
		loadingScreen.style.opacity = 0;

		setTimeout(() => {
			loadingScreen.style.display = "none";
		}, 1000);
	});
});

function updateHeaderStyle() {
	const header = document.getElementById('hd');
	const logo = document.querySelector('.lg');
	const larguraTela = window.innerWidth;

	const isMobile = larguraTela <= 768;

	if (isMobile) {
		if (window.scrollY > 1) {
			// header.style.height = '80px'; // Ajuste da altura do cabeçalho para dispositivos móveis
			// header.style.backgroundColor = 'rgba(13,13,13,0.8)';
			// logo.style.width = '10px'; // Logo menor em dispositivos móveis
		} else {
			// header.style.height = '80px'; // Tamanho maior do cabeçalho quando estiver no topo
			// header.style.backgroundColor = 'rgba(13,13,13,0.8)';
			// logo.style.width = '20px'; // Logo maior
		}
	} else {
		// Se for desktop
		if (window.scrollY > 1) {
			header.style.height = '60px'; // Ajuste da altura do cabeçalho para desktop
			header.style.backgroundColor = 'rgba(13,13,13,0.8)';
			logo.style.width = '40px'; // Logo menor em desktop
		} else {
			header.style.height = '80px'; // Tamanho original do cabeçalho
			header.style.backgroundColor = 'rgba(13,13,13,0.8)';
			logo.style.width = '60px'; // Logo maior em desktop
		}
	}
}

window.addEventListener('scroll', updateHeaderStyle);

window.onload = () => window.scrollTo(0, 0);

window.toggleMenu = function () {
	const menuList = document.getElementById('lsm');
	const menuIcon = document.getElementById('mn');
	if (!menuList) return console.error('#lsm not found');
	const isHidden = menuList.style.display === 'none' || menuList.style.display === '';
	menuList.style.display = isHidden ? 'flex' : 'none';
	if (menuIcon) menuIcon.src = isHidden ? '/assets/images/botoes/close.svg' : '/assets/images/botoes/menu.svg';
};



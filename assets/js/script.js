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

document.addEventListener("DOMContentLoaded", () => {

	const cards = document.querySelectorAll(".card");
	const leftArrow = document.querySelector(".nav-arrow.left");
	const rightArrow = document.querySelector(".nav-arrow.right");
	let currentIndex = 0;
	let isAnimating = false;

	if (!cards.length || !leftArrow || !rightArrow) return;

	function updateCarousel(newIndex) {
		if (isAnimating) return;
		isAnimating = true;
		currentIndex = (newIndex + cards.length) % cards.length;

		cards.forEach((card, i) => {
			const offset = (i - currentIndex + cards.length) % cards.length;
			card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");
			if (offset === 0) card.classList.add("center");
			else if (offset === 1) card.classList.add("right-1");
			else if (offset === 2) card.classList.add("right-2");
			else if (offset === cards.length - 1) card.classList.add("left-1");
			else if (offset === cards.length - 2) card.classList.add("left-2");
			else card.classList.add("hidden");
		});

		setTimeout(() => isAnimating = false, 800);
	}

	leftArrow.addEventListener("click", () => updateCarousel(currentIndex - 1));
	rightArrow.addEventListener("click", () => updateCarousel(currentIndex + 1));
	cards.forEach((card, i) => card.addEventListener("click", () => updateCarousel(i)));

	let touchStartX = 0, touchEndX = 0;
	document.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
	document.addEventListener("touchend", e => { touchEndX = e.changedTouches[0].screenX; const diff = touchStartX - touchEndX; if (Math.abs(diff) > 50) diff > 0 ? updateCarousel(currentIndex + 1) : updateCarousel(currentIndex - 1); });

	document.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1); else if (e.key === "ArrowRight") updateCarousel(currentIndex + 1); });

	updateCarousel(0);
});
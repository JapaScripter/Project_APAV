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

	// Quando a página estiver 100% carregada, escondemos o loading imediatamente
	window.addEventListener('load', function () {
		stopAnimation = true; // cancela a animação futura de palavras

		const loadingScreen = document.querySelector('.loading');
		loadingScreen.style.transition = "opacity 1s ease-in-out";
		loadingScreen.style.opacity = 0;

		setTimeout(() => {
			loadingScreen.style.display = "none";
		}, 1000);
	});
});

// Função para atualizar o estilo do cabeçalho com base no scroll e no tipo de dispositivo
function updateHeaderStyle() {
	const header = document.getElementById('hd');
	const logo = document.querySelector('.lg');
	const larguraTela = window.innerWidth;

	// Verifica se o dispositivo é móvel ou desktop
	const isMobile = larguraTela <= 768;

	// Se for dispositivo móvel
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

// Chama a função de atualização de estilo sempre que o usuário rolar a página
window.addEventListener('scroll', updateHeaderStyle);

// Garante que o scroll inicie no topo quando a página for carregada
window.onload = () => window.scrollTo(0, 0);

// Oculta o menu ao carregar o conteúdo
document.addEventListener('DOMContentLoaded', () => {
	const menuList = document.getElementById('lsm');
	menuList.style.display = 'none';
});

function toggleMenu() {
	const menuIcon = document.getElementById('mnm');
	const menuList = document.getElementById('lsm');

	menuList.style.display = (menuList.style.display === 'none' || menuList.style.display === '') ? 'flex' : 'none';

	// Verifica o estado atual do menu e altera os ícones
	if (menuIcon.src.includes('menu.svg')) {
		menuIcon.src = '../images/close.svg'; // Muda para o ícone de "X"
		menuList.style.display = 'flex'; // Exibe o menu lateral
	} else {
		menuIcon.src = '../images/menu.svg'; // Muda de volta para o ícone de menu
		menuList.style.display = 'none'; // Esconde o menu lateral
	}
}
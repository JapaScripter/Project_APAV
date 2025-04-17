// Limpa o cache e recarrega a página
window.onload = function () {
	if ('caches' in window) {
		caches.keys().then(cacheNames => {
			cacheNames.forEach(cacheName => {
				caches.delete(cacheName); // Deleta todos os caches
			});
			window.location.reload(true); // Recarrega a página forçando uma nova solicitação
		});
	}
};

window.addEventListener('load', function () { // Esperar a página carregar completamente
	// Esmaecer a tela de carregamento assim que a página carregar
	document.querySelector('.loading').style.opacity = 0; // Esmaecer imediatamente
	document.querySelector('.loading').style.visibility = "hidden"; // Torna invisível

	// Iniciar a animação das palavras após o carregamento da página
	const words = document.querySelectorAll('.loading_wd');
	let currentIndex = 0;

	// Função para mostrar as palavras uma por uma
	function showNextWord() {
		// Esconder a palavra anterior
		if (currentIndex > 0) {
			words[currentIndex - 1].style.opacity = 0;
		}

		// Mostrar a próxima palavra
		words[currentIndex].style.opacity = 1;

		// Avançar para a próxima palavra
		currentIndex++;

		// Se ainda houver palavras, exibe a próxima após 2 segundos
		if (currentIndex < words.length) {
			setTimeout(showNextWord, 2000); // Exibe a próxima palavra a cada 2 segundos
		} else {
			// Após a última palavra ser exibida, chama o esmaecimento gradual
			gradualFadeOut(); // Agora chamamos após o último setTimeout
		}
	}

	// Função para esmaecer a tela de carregamento após a animação das palavras terminar
	function gradualFadeOut() {
		setTimeout(() => {
			document.querySelector('.loading').style.transition = "opacity 2s ease-in-out"; // Transição suave
			document.querySelector('.loading').style.opacity = 0; // Esmaecer a tela de carregamento
			setTimeout(() => {
				document.querySelector('.loading').style.display = "none"; // Remove o display após a transição
			}, 2000); // Garante que o display: none seja aplicado após a transição
		}, words.length * 2000); // Espera todas as palavras aparecerem antes de iniciar o esmaecimento
	}

	// Começar a animação após a página ser completamente carregada
	showNextWord();
});

document.addEventListener('DOMContentLoaded', function () {
	const words = document.querySelectorAll('.loading_wd');
	let currentIndex = 0;

	function showNextWord() {
		// Esconder a palavra atual
		if (currentIndex > 0) {
			words[currentIndex - 1].style.opacity = 0;
		}

		// Mostrar a próxima palavra
		words[currentIndex].style.opacity = 1;

		// Avançar para a próxima palavra
		currentIndex++;

		// Se tiver mais palavras, exibir a próxima após 2 segundos
		if (currentIndex < words.length) {
			setTimeout(showNextWord, 2000);
		} else {
			// Remover a tela de carregamento após a última palavra
			setTimeout(() => {
				document.querySelector('.loading').style.display = 'none';
			}, 1000); // Esconde após a última palavra ter aparecido
		}
	}

	// Começar a animação
	showNextWord();
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

// Função para alternar a exibição do menu
function toggleMenu() {
	const menuList = document.getElementById('lsm');
	menuList.style.display = (menuList.style.display === 'none' || menuList.style.display === '') ? 'flex' : 'none';
}

function toggleMenu() {
	const menuIcon = document.getElementById('mn');
	const menuList = document.getElementById('lsm');

	// Verifica o estado atual do menu e altera os ícones
	if (menuIcon.src.includes('menu.svg')) {
		menuIcon.src = '../assets/images/botoes/close.svg'; // Muda para o ícone de "X"
		menuList.style.display = 'flex'; // Exibe o menu lateral
	} else {
		menuIcon.src = '../assets/images/botoes/menu.svg'; // Muda de volta para o ícone de menu
		menuList.style.display = 'none'; // Esconde o menu lateral
	}
}

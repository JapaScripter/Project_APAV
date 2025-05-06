// import '../css/style.css';

// Em vez de importar tudo de uma vez
// import { minhaFuncao } from './minhaFuncao';

// Use o import() para carregar sob demanda
// const minhaFuncaoLazy = () => import('./minhaFuncao');

// // Usando import() para carregar um módulo sob demanda
// const MeuComponente = React.lazy(() => import('./MeuComponente'));

// function App() {
// 	return (
// 		<div>
// 			<h1>Bem-vindo ao meu site!</h1>
// 			<React.Suspense fallback={<div>Carregando...</div>}>
// 				<MeuComponente />
// 			</React.Suspense>
// 		</div>
// 	);
// }

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

// Função para esmaecer a tela de carregamento após a animação das palavras terminar
function gradualFadeOut() {
	setTimeout(() => {
		document.querySelector('.loading').style.transition = "opacity 2s ease-in-out"; // Transição suave
		document.querySelector('.loading').style.opacity = 0; // Esmaecer a tela de carregamento
		setTimeout(() => {
			document.querySelector('.loading').style.display = "none"; // Remove o display após a transição
		}, 2000); // Garante que o display: none seja aplicado após a transição
	}, 2000); // Espera todas as palavras aparecerem antes de iniciar o esmaecimento
}

window.addEventListener('load', function () {
	// Começa a animação das palavras assim que a página carregar
	showNextWord();
});

// Função para mostrar as palavras uma por uma
function showNextWord() {
	const words = document.querySelectorAll('.loading_wd');
	let currentIndex = 0;

	// Função para esconder a palavra anterior e mostrar a próxima
	function handleWords() {
		if (currentIndex > 0) {
			words[currentIndex - 1].style.opacity = 0; // Esmaecer a palavra anterior
		}
		// Mostrar a próxima palavra, se houver
		if (currentIndex < words.length) {
			words[currentIndex].style.opacity = 1; // Torna a palavra visível
			currentIndex++; // Avança para a próxima palavra
			setTimeout(handleWords, 2000); // Exibe a próxima palavra a cada 2 segundos
		} else {
			gradualFadeOut(); // Chama o esmaecimento após a última palavra
		}
	}

	// Exibe a primeira palavra imediatamente
	if (words.length > 0) {
		words[0].style.opacity = 1; // A primeira palavra aparece sem atraso
		currentIndex = 1; // Inicia a partir da segunda palavra
	}

	setTimeout(handleWords, 2000);
}

window.addEventListener('load', function () {
	// Esmaecer a tela de carregamento assim que a página carregar
	document.querySelector('.loading').style.opacity = 0; // Esmaecer imediatamente
	document.querySelector('.loading').style.visibility = "hidden"; // Torna invisível

	// Iniciar a animação das palavras após o carregamento da página
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
	const menuIcon = document.getElementById('mn');
	const menuList = document.getElementById('lsm');

	menuList.style.display = (menuList.style.display === 'none' || menuList.style.display === '') ? 'flex' : 'none';

	// Verifica o estado atual do menu e altera os ícones
	if (menuIcon.src.includes('menu.svg')) {
		menuIcon.src = '../assets/images/botoes/close.svg'; // Muda para o ícone de "X"
		menuList.style.display = 'flex'; // Exibe o menu lateral
	} else {
		menuIcon.src = '../assets/images/botoes/menu.svg'; // Muda de volta para o ícone de menu
		menuList.style.display = 'none'; // Esconde o menu lateral
	}
}

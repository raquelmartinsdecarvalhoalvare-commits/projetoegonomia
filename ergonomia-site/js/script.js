// ============================================================
// Ergonomia na Prática – JavaScript básico
// ============================================================

// 1) Trocar a paleta de cores (azul <-> rosa) e lembrar a escolha
var raiz = document.documentElement;
var botaoTema = document.getElementById('btn-tema');

function aplicarTema(tema) {
  if (tema === 'rosa') {
    raiz.setAttribute('data-tema', 'rosa');
  } else {
    raiz.removeAttribute('data-tema');
  }
}

try {
  aplicarTema(localStorage.getItem('tema'));
} catch (erro) {
  // se o navegador bloquear o armazenamento, segue com a paleta azul
}

botaoTema.addEventListener('click', function () {
  var novoTema = raiz.getAttribute('data-tema') === 'rosa' ? 'azul' : 'rosa';
  aplicarTema(novoTema);
  try {
    localStorage.setItem('tema', novoTema);
  } catch (erro) {}
});

// 2) Abrir e fechar o menu no celular
var botaoMenu = document.getElementById('btn-menu');
var menu = document.getElementById('menu');

botaoMenu.addEventListener('click', function () {
  var aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});

// 3) Perguntas frequentes (abre e fecha a resposta)
var perguntas = document.querySelectorAll('.faq-pergunta');

perguntas.forEach(function (pergunta) {
  pergunta.addEventListener('click', function () {
    var resposta = pergunta.nextElementSibling;
    var estavaFechada = resposta.hasAttribute('hidden');
    if (estavaFechada) {
      resposta.removeAttribute('hidden');
    } else {
      resposta.setAttribute('hidden', '');
    }
    pergunta.setAttribute('aria-expanded', estavaFechada);
  });
});

// 4) Checklist do posto de trabalho (conta os itens marcados)
var checklist = document.getElementById('checklist');

if (checklist) {
  var caixas = checklist.querySelectorAll('input[type="checkbox"]');
  var barra = document.getElementById('barra-progresso');
  var resultado = document.getElementById('resultado');

  function atualizarChecklist() {
    var marcados = 0;
    caixas.forEach(function (caixa) {
      if (caixa.checked) {
        marcados = marcados + 1;
      }
    });

    barra.style.width = (marcados / caixas.length) * 100 + '%';

    if (marcados === 0) {
      resultado.textContent = 'Marque os itens para ver o resultado.';
    } else if (marcados <= 3) {
      resultado.textContent = marcados + ' de ' + caixas.length + ': há bastante espaço para melhorar.';
    } else if (marcados <= 6) {
      resultado.textContent = marcados + ' de ' + caixas.length + ': você está no caminho certo.';
    } else {
      resultado.textContent = marcados + ' de ' + caixas.length + ': ótimo, seu posto está bem ajustado.';
    }
  }

  caixas.forEach(function (caixa) {
    caixa.addEventListener('change', atualizarChecklist);
  });
}

// 5) Ampliar imagens da galeria ao clicar
var imagensGaleria = document.querySelectorAll('.galeria img');

imagensGaleria.forEach(function (imagem) {
  imagem.addEventListener('click', function () {
    var fundo = document.createElement('div');
    fundo.className = 'zoom';
    fundo.innerHTML = '<img src="' + imagem.src + '" alt="' + imagem.alt + '">';
    fundo.addEventListener('click', function () {
      fundo.remove();
    });
    document.body.appendChild(fundo);
  });
});

// Fechar a imagem ampliada com a tecla Esc
document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape') {
    var aberto = document.querySelector('.zoom');
    if (aberto) {
      aberto.remove();
    }
  }
});

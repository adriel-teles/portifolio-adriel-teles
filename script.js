/* =========================================================
   script.js
   Toda a interatividade do portfólio, sem uso de frameworks:
   1) Menu responsivo (abre/fecha em telas pequenas)
   2) Alternância de tema claro/escuro (salva a escolha)
   3) Validação e simulação de envio do formulário de contato
   4) Ano dinâmico no rodapé
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1) MENU RESPONSIVO ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fecha o menu automaticamente ao clicar em um link (útil no mobile)
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 2) TEMA CLARO/ESCURO ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Recupera preferência salva anteriormente (se houver)
  const temaSalvo = localStorage.getItem('portfolio-theme');
  if (temaSalvo === 'light') {
    htmlEl.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀';
  }

  themeToggle.addEventListener('click', function () {
    const temaAtual = htmlEl.getAttribute('data-theme');
    if (temaAtual === 'light') {
      htmlEl.removeAttribute('data-theme');
      themeIcon.textContent = '☾';
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      htmlEl.setAttribute('data-theme', 'light');
      themeIcon.textContent = '☀';
      localStorage.setItem('portfolio-theme', 'light');
    }
  });

  /* ---------- 3) VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO ---------- */
  const form = document.getElementById('contactForm');
  const campoNome = document.getElementById('nome');
  const campoEmail = document.getElementById('email');
  const campoMensagem = document.getElementById('mensagem');
  const status = document.getElementById('formStatus');

  // Expressão regular simples para validar formato de e-mail (usuario@dominio.com)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Mostra uma mensagem de erro abaixo do campo e marca visualmente o grupo
  function mostrarErro(campo, mensagem) {
    const grupo = campo.closest('.form__group');
    const erroEl = grupo.querySelector('.form__error');
    grupo.classList.add('is-invalid');
    campo.setAttribute('aria-invalid', 'true');
    erroEl.textContent = mensagem;
  }

  // Limpa o erro de um campo específico
  function limparErro(campo) {
    const grupo = campo.closest('.form__group');
    const erroEl = grupo.querySelector('.form__error');
    grupo.classList.remove('is-invalid');
    campo.removeAttribute('aria-invalid');
    erroEl.textContent = '';
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault(); // impede o envio real (não há back-end)

    let valido = true;

    // Validação: nome obrigatório
    if (campoNome.value.trim() === '') {
      mostrarErro(campoNome, 'Por favor, informe seu nome.');
      valido = false;
    } else {
      limparErro(campoNome);
    }

    // Validação: e-mail obrigatório e em formato válido
    if (campoEmail.value.trim() === '') {
      mostrarErro(campoEmail, 'Por favor, informe seu e-mail.');
      valido = false;
    } else if (!regexEmail.test(campoEmail.value.trim())) {
      mostrarErro(campoEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
      valido = false;
    } else {
      limparErro(campoEmail);
    }

    // Validação: mensagem obrigatória
    if (campoMensagem.value.trim() === '') {
      mostrarErro(campoMensagem, 'Por favor, escreva uma mensagem.');
      valido = false;
    } else {
      limparErro(campoMensagem);
    }

    if (!valido) {
      status.textContent = 'Verifique os campos destacados em vermelho.';
      status.className = 'form__status error';
      return;
    }

    // Simulação do envio (não há servidor real neste projeto de estudo)
    status.textContent = 'Mensagem enviada com sucesso!';
    status.className = 'form__status success';
    form.reset();
  });

  /* ---------- 4) ANO DINÂMICO NO RODAPÉ ---------- */
  document.getElementById('anoAtual').textContent = new Date().getFullYear();

});

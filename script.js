/* =========================================================
   SCRIPT.JS — REDESIGN LANDING PAGE (ADRIEL TELES)
   Interatividade sem frameworks:
   1) Globo 3D de Partículas (Three.js via CDN)
   2) Alternância de tema claro/escuro com atualização do Globo 3D
   3) Menu responsivo mobile
   4) Efeito de digitação no subtítulo Hero
   5) Animação de revelação de seções ao rolar (Scroll Reveal)
   6) Validação e simulação de envio do formulário de contato
   7) Ano dinâmico no rodapé
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1) GLOBO 3D DE PARTÍCULAS COM THREE.JS ---------- */
  function initThreeGlobe() {
    const container = document.getElementById('heroGlobe');
    if (!container || typeof THREE === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 350 : 850;
    const radius = 18;

    // Cena, Câmera e Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.z = 48;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometria de Partículas distribuídas na superfície de uma esfera
    const positions = new Float32Array(particleCount * 3);
    const particleCoords = [];

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particleCoords.push(new THREE.Vector3(x, y, z));
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Cor das partículas dependendo do tema atual
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    const initialColor = isLightMode ? 0x008a23 : 0x39ff14;

    const particlesMaterial = new THREE.PointsMaterial({
      color: initialColor,
      size: isMobile ? 0.45 : 0.6,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Criação de linhas de conexão entre nós próximos (Topologia de Rede)
    const linePositions = [];
    const maxDistance = 5.5;

    for (let i = 0; i < particleCoords.length; i++) {
      for (let j = i + 1; j < particleCoords.length; j++) {
        const dist = particleCoords[i].distanceTo(particleCoords[j]);
        if (dist < maxDistance) {
          linePositions.push(
            particleCoords[i].x, particleCoords[i].y, particleCoords[i].z,
            particleCoords[j].x, particleCoords[j].y, particleCoords[j].z
          );
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      color: initialColor,
      transparent: true,
      opacity: 0.18
    });

    const lineSystem = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lineSystem);

    // Interatividade Parallax com o Mouse
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', function (e) {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    // Loop de Animação 3D
    function animate() {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particleSystem.rotation.y += 0.0018;
      particleSystem.rotation.x = targetY;

      lineSystem.rotation.y += 0.0018;
      lineSystem.rotation.x = targetY;

      renderer.render(scene, camera);
    }

    animate();

    // Responsividade ao redimensionar a janela
    window.addEventListener('resize', function () {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Função pública para atualizar cores ao alternar tema
    window.updateGlobeTheme = function (isLight) {
      const newColor = isLight ? 0x008a23 : 0x39ff14;
      particlesMaterial.color.setHex(newColor);
      linesMaterial.color.setHex(newColor);
    };
  }

  // Tenta inicializar o Three.js com pequeno delay para garantir carregamento da CDN
  setTimeout(initThreeGlobe, 150);


  /* ---------- 2) MENU RESPONSIVO MOBILE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ---------- 3) ALTERNÂNCIA DE TEMA CLARO/ESCURO ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  const temaSalvo = localStorage.getItem('portfolio-theme');
  if (temaSalvo === 'light') {
    htmlEl.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.textContent = '☀';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const temaAtual = htmlEl.getAttribute('data-theme');
      const éTemaClaro = temaAtual === 'light';

      if (éTemaClaro) {
        htmlEl.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '☾';
        localStorage.setItem('portfolio-theme', 'dark');
        if (window.updateGlobeTheme) window.updateGlobeTheme(false);
      } else {
        htmlEl.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.textContent = '☀';
        localStorage.setItem('portfolio-theme', 'light');
        if (window.updateGlobeTheme) window.updateGlobeTheme(true);
      }
    });
  }


  /* ---------- 4) EFEITO DE DIGITAÇÃO NO HERO ---------- */
  const subtitleEl = document.getElementById('heroSubtitle');
  if (subtitleEl) {
    const originalText = subtitleEl.innerHTML;
    // Animação sutil de entrada
    subtitleEl.style.opacity = '0';
    subtitleEl.style.transform = 'translateY(10px)';
    subtitleEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(function () {
      subtitleEl.style.opacity = '1';
      subtitleEl.style.transform = 'translateY(0)';
    }, 200);
  }


  /* ---------- 5) ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL) ---------- */
  const sections = document.querySelectorAll('.section, .card, .timeline__item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(function (sec) {
      sec.style.opacity = '0';
      sec.style.transform = 'translateY(20px)';
      sec.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(sec);
    });
  }


  /* ---------- 6) VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO ---------- */
  const form = document.getElementById('contactForm');
  const campoNome = document.getElementById('nome');
  const campoEmail = document.getElementById('email');
  const campoMensagem = document.getElementById('mensagem');
  const status = document.getElementById('formStatus');

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function mostrarErro(campo, mensagem) {
    const grupo = campo.closest('.form__group');
    const erroEl = grupo.querySelector('.form__error');
    grupo.classList.add('is-invalid');
    campo.setAttribute('aria-invalid', 'true');
    erroEl.textContent = mensagem;
  }

  function limparErro(campo) {
    const grupo = campo.closest('.form__group');
    const erroEl = grupo.querySelector('.form__error');
    grupo.classList.remove('is-invalid');
    campo.removeAttribute('aria-invalid');
    erroEl.textContent = '';
  }

  if (form) {
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();

      let valido = true;

      if (campoNome.value.trim() === '') {
        mostrarErro(campoNome, 'Por favor, informe seu nome.');
        valido = false;
      } else {
        limparErro(campoNome);
      }

      if (campoEmail.value.trim() === '') {
        mostrarErro(campoEmail, 'Por favor, informe seu e-mail.');
        valido = false;
      } else if (!regexEmail.test(campoEmail.value.trim())) {
        mostrarErro(campoEmail, 'Informe um e-mail válido (ex: usuario@dominio.com).');
        valido = false;
      } else {
        limparErro(campoEmail);
      }

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

      status.textContent = 'Mensagem enviada com sucesso!';
      status.className = 'form__status success';
      form.reset();
    });
  }


  /* ---------- 7) ANO DINÂMICO NO RODAPÉ ---------- */
  const anoEl = document.getElementById('anoAtual');
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

});

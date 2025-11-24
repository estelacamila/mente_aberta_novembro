document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm') || document.querySelector('form');
  if (!form) {
    console.error('Formulário não encontrado.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await register();
  });

  // Toggle do olho da senha
  document.querySelectorAll('.alternar_senha').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const isPassword = input.type === 'password';

      input.type = isPassword ? 'text' : 'password';

      btn.querySelector('.eye-closed').style.display = isPassword ? 'none' : 'inline';
      btn.querySelector('.eye-open').style.display = isPassword ? 'inline' : 'none';
    });
  });
});


// --------------------------------------------------------
//  ALERTA PERSONALIZADO — MENSAGENS MAIS BONITAS
// --------------------------------------------------------
function showAlert(message, type = "error") {
  const overlay = document.getElementById("customAlert");
  const msgEl = document.getElementById("alertMessage");
  const btn = document.getElementById("alertBtn");

  msgEl.textContent = message;

  overlay.classList.remove("alert-error", "alert-success");
  overlay.classList.add(type === "success" ? "alert-success" : "alert-error");

  overlay.style.display = "flex";

  btn.onclick = () => {
    overlay.style.display = "none";
  };
}


// --------------------------------------------------------
//  FUNÇÃO DE CADASTRO — MENSAGENS REFINADAS
// --------------------------------------------------------
async function register() {
  const nomeEl = document.getElementById('nome');
  const emailEl = document.getElementById('email');
  const passwordEl = document.getElementById('senha');
  const confirmEl = document.getElementById('novasenha');

  const nome = nomeEl.value.trim();
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();
  const confirmPassword = confirmEl.value.trim();

  // Validações com showAlert()
  if (!nome || !email || !password || !confirmPassword) {
    showAlert('Preencha todos os campos.', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showAlert('Digite um email válido.', 'error');
    return;
  }

  if (!validatePassword(password)) {
    showAlert('A senha precisa ser mais forte.', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('As senhas não coincidem.', 'error');
    return;
  }

  showAlert('Validando dados...', 'success');

  try {
    const response = await fetch('https://back-render-vpda.onrender.com/Cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha: password })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }

    showAlert('Cadastro concluído! Redirecionando...', 'success');

    nomeEl.value = '';
    emailEl.value = '';
    passwordEl.value = '';
    confirmEl.value = '';

    setTimeout(() => window.location.replace('./login.html'), 800);

  } catch (err) {
    console.error('Erro no fetch:', err);
    showAlert('Email já cadastrado. Tente novamente.', 'error');
  }
}


// --------------------------------------------------------
//  VALIDAÇÕES
// --------------------------------------------------------
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return re.test(password);
}

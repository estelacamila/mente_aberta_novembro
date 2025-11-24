const nomeInput = document.querySelector('#nome');
const senhaInput = document.querySelector('#senha');
const confirmaInput = document.querySelector('#cSenha');
const perfilImg = document.querySelector('#perfilM');
const editarFotoBtn = document.getElementById('editarFoto');
const removerFotoBtn = document.getElementById('removerFoto');
const fotoInput = document.getElementById('fotoInput');
const concluidoBtn = document.querySelector('.botao-concluido');

// ======================================
//            ALERTA MODERNO
// ======================================
function showAlert(msg) {
  const overlay = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  const btn = document.getElementById("alertBtn");

  alertMessage.textContent = msg;

  // Mostra
  overlay.style.display = "flex";

  // Garante que o botão feche SEM BUGAR
  btn.onclick = () => {
    overlay.style.display = "none";
  };
}

// ======================================
//          ID DO USUÁRIO
// ======================================
let userId = null;

// ======================================
//        CARREGAR PERFIL AO ABRIR
// ======================================
document.addEventListener('DOMContentLoaded', async () => {
  userId = localStorage.getItem('id');

  if (!userId) {
    showAlert('⚠️ Faça login novamente.');
    return;
  }

  try {
    const response = await fetch(`https://back-render-vpda.onrender.com/Perfil/${userId}`);

    if (!response.ok) throw new Error('Erro ao buscar dados do usuário.');

    const data = await response.json();

    nomeInput.value = data.nome || '';
    perfilImg.src = data.foto || perfilImg.src;

  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    showAlert('Erro ao carregar informações do perfil.');
  }
});

// ======================================
//  TRANSFORMAR FOTO EM BASE64 (se usar)
// ======================================
const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

// ======================================
//              FOTO
// ======================================

editarFotoBtn.addEventListener('click', () => fotoInput.click());

fotoInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  perfilImg.src = URL.createObjectURL(file);
});

removerFotoBtn.addEventListener('click', () => {
  showAlert("Foto removida.");
  perfilImg.src =
    'https://static.vecteezy.com/ti/vetor-gratis/p1/2387693-icone-do-perfil-do-usuario-vetor.jpg';
});

// ======================================
//          SALVAR ALTERAÇÕES
// ======================================
concluidoBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const senha = senhaInput.value.trim();
  const confirma = confirmaInput.value.trim();
  const foto = perfilImg.src;

  if (!nome) {
    showAlert('⚠️ Preencha o nome.');
    return;
  }

  if (senha && senha !== confirma) {
    showAlert('❌ As senhas não coincidem.');
    return;
  }

  try {
    const response = await fetch(`https://back-render-vpda.onrender.com/Perfil/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, senha, foto }),
    });

    const data = await response.json();

    if (response.ok) {
      showAlert('✅ Perfil atualizado com sucesso!');
    } else {
      showAlert('Erro: ' + (data.message || 'Tente novamente.'));
    }

  } catch (error) {
    console.error(error);
    showAlert('Erro ao conectar com o servidor.');
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const nomeInput = document.querySelector('#nome');
  const senhaInput = document.querySelector('#senha');
  const confirmaInput = document.querySelector('#cSenha');
  const perfilImg = document.querySelector('#perfilM');
  const editarFotoBtn = document.getElementById('editarFoto');
  const removerFotoBtn = document.getElementById('removerFoto');
  const fotoInput = document.getElementById('fotoInput');
  const concluidoBtn = document.querySelector('.botao-concluido');

  const id = localStorage.getItem('id');
  if (!id) {
    alert('⚠️ Faça login novamente.');
    return;
  }

  // 🔹 Carregar dados do usuário
  try {
    const response = await fetch(`http://192.168.1.19:3000/Perfil/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do usuário.');

    const data = await response.json();
    nomeInput.value = data.nome || '';
    perfilImg.src = data.foto || 'https://static.vecteezy.com/ti/vetor-gratis/p1/2387693-icone-do-perfil-do-usuario-vetor.jpg';
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
  }

  // 🔹 Abrir seletor de imagem
  editarFotoBtn.addEventListener('click', () => fotoInput.click());

  // 🔹 Atualizar foto para Base64
  fotoInput.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await toBase64(file);
      perfilImg.src = base64;

      // Salvar no servidor
      await fetch(`https://back-render-vpda.onrender.com/Perfil/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foto: base64 }),
      });
    } catch (err) {
      console.error('Erro ao atualizar imagem:', err);
      alert('❌ Não foi possível atualizar a imagem.');
    }
  });

  // 🔹 Remover foto
  removerFotoBtn.addEventListener('click', async () => {
    if (!confirm('Deseja remover sua foto?')) return;

    const padrao = 'https://static.vecteezy.com/ti/vetor-gratis/p1/2387693-icone-do-perfil-do-usuario-vetor.jpg';
    perfilImg.src = padrao;

    try {
      await fetch(`https://back-render-vpda.onrender.com/Perfil/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foto: padrao }),
      });
    } catch (err) {
      console.error('Erro ao remover foto:', err);
      alert('❌ Não foi possível remover a foto.');
    }
  });

  // 🔹 Atualizar nome e senha
  concluidoBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirma = confirmaInput.value.trim();
    const foto = perfilImg.src;

    if (!nome) {
      alert('⚠️ Preencha todos os campos!');
      return;
    }

    if (senha && senha !== confirma) {
      alert('❌ As senhas não coincidem.');
      return;
    }

    try {
<<<<<<< HEAD
      const response = await fetch(`https://back-render-vpda.onrender.com/Perfil/${id}`, {
=======
      const response = await fetch(`http://192.168.1.19:3000/Perfil/${id}`, {
>>>>>>> 2a02fea908075aafdffd2d57e0b208b6f7250f03
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha, foto }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('✅ Perfil atualizado com sucesso!');
      } else {
        alert('❌ Erro ao atualizar: ' + (data.message || 'Tente novamente.'));
      }
    } catch (error) {
      console.error(error);
      alert('❌ Erro de conexão com o servidor.');
    }
  });
});

<<<<<<< HEAD
// 🔹 Função para converter arquivo em Base64
const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
=======
// Função para redimensionar imagem
 const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});


// Validação do olhinho da senha
document.querySelectorAll('.alternar_senha').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const Password = input.type === 'password';
    input.type = Password ? 'text' : 'password';
    
    btn.querySelector('.eye-closed').style.display = Password ? 'none' : 'inline';
    btn.querySelector('.eye-open').style.display = Password ? 'inline' : 'none';
  });
>>>>>>> 2a02fea908075aafdffd2d57e0b208b6f7250f03
});

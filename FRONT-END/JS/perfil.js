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

  try {
    const response = await fetch(`http://192.168.1.19:3000/Perfil/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar dados do usuário.');

    const data = await response.json();
    nomeInput.value = data.nome || '';    
    perfilImg.src = data.foto || perfilImg.src;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
  }

  editarFotoBtn.addEventListener('click', () => fotoInput.click());

  fotoInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    perfilImg.src = URL.createObjectURL(file)

    // chamar a rota do back para alterar a imagem do perfil
  });

  removerFotoBtn.addEventListener('click', () => {
    if (confirm('Deseja remover sua foto?')) {
      perfilImg.src =
        'https://static.vecteezy.com/ti/vetor-gratis/p1/2387693-icone-do-perfil-do-usuario-vetor.jpg';
    }
  });

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
      const response = await fetch(`http://192.168.1.19:3000/Perfil/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha, foto }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('✅ Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar: ' + (data.message || 'Tente novamente.'));
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    }
  });
});

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
});

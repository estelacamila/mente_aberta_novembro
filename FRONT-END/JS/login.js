document.addEventListener("DOMContentLoaded", () => {

  // Limpa sessão antiga
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  localStorage.removeItem("nome");

  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#senha");

  // ALERTA BONITO
  const alertOverlay = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  const alertBtn = document.getElementById("alertBtn");

  // ===== FUNÇÃO DE ALERTA BONITO =====
  function showAlert(msg, type = "error") {

    alertMessage.textContent = msg;

    // remove estilos anteriores
    alertOverlay.classList.remove("alert-error", "alert-success");

    // aplica estilo novo
    if (type === "success") {
      alertOverlay.classList.add("alert-success");
    } else {
      alertOverlay.classList.add("alert-error");
    }

    alertOverlay.style.display = "flex";
  }

  alertBtn.addEventListener("click", () => {
    alertOverlay.style.display = "none";
  });

  // ===== SUBMIT =====
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();

    if (email === "" || senha === "") {
      showAlert("Preencha todos os campos!", "error");
      return;
    }

    if (senha.length < 6) {
      showAlert("A senha deve ter no mínimo 6 caracteres!", "error");
      return;
    }

    await handleLogin(email, senha);
  });

  // ===== LOGIN =====
  async function handleLogin(email, senha) {
    showAlert("Verificando...", "success");

    try {
      const response = await fetch("https://back-render-vpda.onrender.com/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json().catch(() => null);

      // ❌ ERRO
      if (!response.ok) {

        // Email não existe
        if (data?.message === "Email não encontrado") {
          showAlert("Este e-mail não está cadastrado!", "error");
          return;
        }

        // Senha incorreta
        if (
          data?.message === "Senha incorreta" ||
          data?.message === "Email ou Senha incorreta" ||
          data?.message === "Senha inválida"
        ) {
          showAlert("E-mail e/ou senha incorretos.", "error");
          return;
        }

        showAlert(data?.message || "Erro ao tentar fazer login.", "error");
        return;
      }

      // ✔ LOGIN OK
      localStorage.setItem("id", data.id);
      localStorage.setItem("email", data.email);
      localStorage.setItem("nome", data.nome);

      showAlert("Login realizado com sucesso! Redirecionando...", "success");

      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1000);

    } catch (error) {
      console.error(error);
      showAlert("Erro de conexão com o servidor.", "error");
    }
  }

  // ===== OLHINHO =====
  document.querySelectorAll(".alternar_senha").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      btn.querySelector(".eye-closed").style.display = isPassword ? "none" : "inline";
      btn.querySelector(".eye-open").style.display = isPassword ? "inline" : "none";
    });
  });
});

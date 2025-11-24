import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

class Cadastro extends HTMLElement {
  connectedCallback() {
    this.render();
    this.applyStyles();
    this.initLogic();
  }

  render() {
    this.innerHTML = `
      <ion-app>
        <ion-header>
          <ion-toolbar style="--background: #c8a2ff;">
            <ion-title style="color: white; font-weight: 600;">💜 Criar Conta</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

          <div class="container">

            <div class="card">

              <h2 class="titulo">Novo Cadastro</h2>

              <ion-item class="campo">
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" id="email"></ion-input>
              </ion-item>

              <ion-item class="campo">
                <ion-label position="floating">Senha</ion-label>
                <ion-input type="password" id="senha"></ion-input>
              </ion-item>

              <ion-item class="campo">
                <ion-label position="floating">Confirmar Senha</ion-label>
                <ion-input type="password" id="confirmaSenha"></ion-input>
              </ion-item>

              <ion-button expand="block" id="botaoCadastro" class="btn-lilas">
                Cadastrar
              </ion-button>

              <p id="error-message" class="erro"></p>

              <ion-button fill="clear" href="#/" class="link">
                Já tenho conta
              </ion-button>

            </div>

          </div>

        </ion-content>
      </ion-app>
    `;
  }

  applyStyles() {
    const style = document.createElement("style");
    style.textContent = `
      ion-content {
        --background: #f3e8ff;
      }

      .container {
        display: flex;
        justify-content: center;
      }

      .card {
        width: 100%;
        max-width: 360px;
        background: white;
        padding: 26px;
        margin-top: 40px;
        border-radius: 22px;
        box-shadow: 0 6px 18px rgba(180, 120, 255, 0.25);
        text-align: center;
      }

      .titulo {
        font-size: 1.5rem;
        color: #a569ff;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .campo {
        margin-bottom: 12px;
        --highlight-color-focused: #b67cff;
      }

      .btn-lilas {
        --background: #b67cff !important;
        --background-hover: #9e65f2 !important;
        --border-radius: 14px;
        margin-top: 12px;
      }

      .link {
        color: #a569ff;
        margin-top: 5px;
      }

      .erro {
        color: red;
        display: none;
        margin-top: 10px;
      }
    `;
    this.appendChild(style);
  }

  initLogic() {
    const email = this.querySelector("#email");
    const senha = this.querySelector("#senha");
    const confirma = this.querySelector("#confirmaSenha");
    const btn = this.querySelector("#botaoCadastro");
    const error = this.querySelector("#error-message");
    const router = document.querySelector("ion-router");

    const showError = (m) => {
      error.textContent = m;
      error.style.display = "block";
    };
    const hideError = () => (error.style.display = "none");

    btn.addEventListener("click", async () => {
      hideError();
      if (!email.value || !senha.value || !confirma.value)
        return showError("Preencha todos os campos.");

      if (senha.value !== confirma.value)
        return showError("As senhas não coincidem.");

      if (senha.value.length < 6)
        return showError("A senha deve ter pelo menos 6 caracteres.");

      try {
        await createUserWithEmailAndPassword(auth, email.value, senha.value);
        router.push("/inicial");
      } catch {
        showError("Erro ao criar conta.");
      }
    });
  }
}

customElements.define("app-cadastro", Cadastro);

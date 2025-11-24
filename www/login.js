import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

class Login extends HTMLElement {
  connectedCallback() {
    this.render();
    this.applyStyles();
    this.initLogic();
  }

  render() {
    this.innerHTML = `
      <ion-app>
        <ion-header>
          <ion-toolbar style="--background: #ff9ecf;">
            <ion-title style="color: white; font-weight: 600;">🌸 Bem-vindo(a)</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

          <div class="container">

            <div class="card">

              <h2 class="titulo">Acessar Conta</h2>

              <ion-item class="campo">
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" id="email"></ion-input>
              </ion-item>

              <ion-item class="campo">
                <ion-label position="floating">Senha</ion-label>
                <ion-input type="password" id="senha"></ion-input>
              </ion-item>

              <ion-button expand="block" id="botaoLogin" class="btn-rosa">
                Entrar
              </ion-button>

              <p id="error-message" class="erro"></p>

              <ion-button fill="clear" href="#/cadastro" class="link">
                Criar conta
              </ion-button>

              <ion-button fill="clear" href="#/redefinir-senha" class="link">
                Esqueci minha senha
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
        --background: #ffe6f2;
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
        box-shadow: 0 6px 18px rgba(255, 150, 180, 0.25);
        text-align: center;
      }

      .titulo {
        font-size: 1.5rem;
        font-weight: 600;
        color: #e26ca5;
        margin-bottom: 20px;
      }

      .campo {
        margin-bottom: 12px;
        --highlight-color-focused: #ff4fa6;
      }

      .btn-rosa {
        --background: #ff4fa6 !important;
        --background-hover: #e73890 !important;
        --border-radius: 14px;
        margin-top: 12px;
      }

      .link {
        color: #e26ca5;
        margin-top: 5px;
      }

      .erro {
        color: red;
        font-size: 0.9rem;
        margin-top: 12px;
        display: none;
      }
    `;
    this.appendChild(style);
  }

  initLogic() {
    const emailField = this.querySelector("#email");
    const senhaField = this.querySelector("#senha");
    const btnLogin = this.querySelector("#botaoLogin");
    const errorMessage = this.querySelector("#error-message");
    const router = document.querySelector("ion-router");

    const showError = (msg) => {
      errorMessage.textContent = msg;
      errorMessage.style.display = "block";
    };
    const hideError = () => {
      errorMessage.style.display = "none";
    };

    btnLogin.addEventListener("click", async () => {
      hideError();

      const email = emailField.value.trim();
      const senha = senhaField.value.trim();

      if (!email || !senha) {
        showError("Preencha email e senha.");
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, senha);
        router.push("/inicial");
      } catch {
        showError("Credenciais inválidas.");
      }
    });
  }
}

customElements.define("app-login", Login);

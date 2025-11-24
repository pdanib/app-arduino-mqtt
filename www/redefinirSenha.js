import { auth } from "./firebase.js";
import {
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

class RedefinirSenha extends HTMLElement {
  connectedCallback() {
    this.render();
    this.applyStyles();
    this.initLogic();
  }

  render() {
    this.innerHTML = `
      <ion-app>
        <ion-header>
          <ion-toolbar style="--background: #9ecbff;">
            <ion-title style="color: white; font-weight: 600;">🔵 Redefinir Senha</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

          <div class="container">

            <div class="card">

              <p class="texto">
                Informe seu e-mail para enviar o link de redefinição.
              </p>

              <ion-item class="campo">
                <ion-label position="floating">Email</ion-label>
                <ion-input type="email" id="email"></ion-input>
              </ion-item>

              <ion-button expand="block" id="botaoReset" class="btn-azul">
                Enviar link
              </ion-button>

              <p id="error-message" class="erro"></p>
              <p id="success-message" class="sucesso"></p>

              <ion-button fill="clear" href="#/" class="link">
                Voltar ao login
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
        --background: #e3f2ff;
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
        box-shadow: 0 6px 18px rgba(120, 170, 255, 0.25);
        text-align: center;
      }

      .texto {
        font-size: 1rem;
        color: #4a6fa5;
        margin-bottom: 16px;
      }

      .campo {
        margin-bottom: 12px;
        --highlight-color-focused: #7bb3ff;
      }

      .btn-azul {
        --background: #7bb3ff !important;
        --background-hover: #5ea2ff !important;
        --border-radius: 14px;
        margin-top: 10px;
      }

      .erro {
        color: red;
        display: none;
        margin-top: 10px;
      }

      .sucesso {
        color: green;
        display: none;
        margin-top: 10px;
      }

      .link {
        color: #4a6fa5;
        margin-top: 5px;
      }
    `;
    this.appendChild(style);
  }

  initLogic() {
    const email = this.querySelector("#email");
    const btn = this.querySelector("#botaoReset");
    const err = this.querySelector("#error-message");
    const ok = this.querySelector("#success-message");

    const showMsg = (el, msg) => {
      err.style.display = "none";
      ok.style.display = "none";
      el.textContent = msg;
      el.style.display = "block";
    };

    btn.addEventListener("click", async () => {
      if (!email.value.trim()) {
        return showMsg(err, "Informe seu email.");
      }

      try {
        await sendPasswordResetEmail(auth, email.value);
        showMsg(ok, `Link enviado para ${email.value}.`);
      } catch {
        showMsg(err, "Erro ao enviar email.");
      }
    });
  }
}

customElements.define("app-redefinir-senha", RedefinirSenha);

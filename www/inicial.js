import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

class Inicial extends HTMLElement {
  connectedCallback() {
    this.render();
    this.applyStyles();
    this.initLogic();
    this.checkAuthAndRenderData();
    this.connectMQTT();
  }

  render() {
    this.innerHTML = `
      <ion-app>
        <ion-header>
          <ion-toolbar style="--background: #ff9ecf;">
            <ion-title style="color: white; font-weight: 600;">
              🌸 Controle do LED
            </ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

          <div class="container">

            <div class="card">

              <h2 class="titulo">Controle do ESP32</h2>
              <p class="sub">Use os botões para ligar ou desligar o LED.</p>

              <ion-button id="btnLigar" expand="block" class="btn-rosa">
               ✅ LIGAR LED
              </ion-button>

              <ion-button id="btnDesligar" expand="block" class="btn-rosa">
               ❌ DESLIGAR LED
              </ion-button>

              <p id="statusMQTT" class="status">Status MQTT: Conectando...</p>
              <p id="user-email-display" class="user"></p>

            </div>

            <ion-button expand="block" id="botaoLogout" class="logout">
              Sair
            </ion-button>

          </div>
        </ion-content>
      </ion-app>
    `;
  }

  applyStyles() {
    const style = document.createElement("style");
    style.textContent = `

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .card {
        width: 100%;
        max-width: 360px;
        background: white;
        padding: 24px;
        margin-top: 30px;
        border-radius: 22px;
        box-shadow: 0 6px 18px rgba(255, 150, 180, 0.25);
        text-align: center;
      }

      .titulo {
        font-size: 1.4rem;
        color: #e26ca5;
        margin-bottom: 8px;
        font-weight: 600;
      }

      .sub {
        color: #555;
        font-size: 0.95rem;
        margin-bottom: 20px;
      }

      .btn-rosa {
        --background: #ff4fa6 !important;
        --background-hover: #e73890 !important;
        --border-radius: 14px;
        margin-top: 12px;
      }

      .status {
        margin-top: 18px;
        font-weight: bold;
        color: #e26ca5;
      }

      .user {
        margin-top: 6px;
        font-size: 0.85rem;
        color: #777;
      }

      .logout {
        --background: #ffb6d9;
        --color: #6d3250;
        --border-radius: 14px;
        width: 90%;
        max-width: 340px;
        margin-top: 16px;
      }

      ion-content {
        --background: #ffe6f2;
      }
    `;
    this.appendChild(style);
  }

  checkAuthAndRenderData() {
    const router = document.querySelector("ion-router");
    const userEmailDisplay = this.querySelector("#user-email-display");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userEmailDisplay.textContent = `Usuário: ${user.email || "(sem email)"}`;
      } else {
        if (router) router.push("/");
        else window.location.href = "/";
      }
    });
  }

  connectMQTT() {
    const statusEl = this.querySelector("#statusMQTT");

    // Conexão via WebSocket seguro (funciona!)
    this.client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    this.client.on("connect", () => {
      statusEl.textContent = "Status MQTT: Conectado ✔";
      statusEl.style.color = "#28a745";
    });

    this.client.on("reconnect", () => {
      statusEl.textContent = "Status MQTT: Reconectando...";
      statusEl.style.color = "orange";
    });

    this.client.on("error", () => {
      statusEl.textContent = "Status MQTT: Erro ❌";
      statusEl.style.color = "red";
    });

    this.client.on("offline", () => {
      statusEl.textContent = "Status MQTT: Offline";
      statusEl.style.color = "gray";
    });
  }

  initLogic() {
    const router = document.querySelector("ion-router");
    const btnLigar = this.querySelector("#btnLigar");
    const btnDesligar = this.querySelector("#btnDesligar");
    const btnLogout = this.querySelector("#botaoLogout");
    const statusEl = this.querySelector("#statusMQTT");

    btnLigar.addEventListener("click", () => {
      if (this.client && this.client.connected) {
        this.client.publish("daniela/led", "on");
        statusEl.textContent = "Comando enviado: on";
      } else {
        statusEl.textContent = "MQTT não conectado.";
      }
    });

    btnDesligar.addEventListener("click", () => {
      if (this.client && this.client.connected) {
        this.client.publish("daniela/led", "off");
        statusEl.textContent = "Comando enviado: off";
      } else {
        statusEl.textContent = "MQTT não conectado.";
      }
    });

    btnLogout.addEventListener("click", async () => {
      try {
        await signOut(auth);
        if (router) router.push("/");
        else window.location.href = "/";
      } catch (error) {
        alert("Erro ao sair.");
      }
    });
  }
}

customElements.define("app-inicia", Inicial);

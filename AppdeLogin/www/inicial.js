import { auth } from "./firebase.js"; // Importa a instância do Auth
console.log("🧩 inicial.js iniciado!");
console.log("🔑 Objeto auth:", auth);

// Importa funções do Firebase SDK (Modular v9+)
import {
    onAuthStateChanged,
    signOut // Função para fazer LOGOUT
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

/**
 * Componente Web para a tela Inicial após o Login.
 * O nome da tag do componente é 'app-inicial'.
 */
class Inicial extends HTMLElement {
    connectedCallback() {
        this.render(); // Injeta o HTML
        this.initLogic(); // Inicializa a lógica de eventos
        this.checkAuthAndRenderData(); // Verifica a autenticação e carrega os dados
    }

    // Método que gera o HTML da tela Inicial com Ionic
    render() {
        this.innerHTML = `
            <ion-app>
                <ion-header>
                    <ion-toolbar color="success">
                        <ion-title>Bem-vindo(a)!</ion-title>
                    </ion-toolbar>
                </ion-header>

                <ion-content class="ion-padding ion-text-center">

                    <ion-icon name="checkmark-circle-outline" size="large" color="success" style="font-size: 80px;"></ion-icon>

                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Login Bem-Sucedido!</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <p>Você acessou a área restrita do aplicativo.</p>
                            <p>Usuário autenticado:</p>
                            <ion-text color="primary">
                                <h3 id="user-email-display">Carregando...</h3>
                            </ion-text>
                        </ion-card-content>
                    </ion-card>

                    <ion-button expand="block" color="danger" class="ion-margin-top" id="botaoLogout">
                        Sair
                    </ion-button>

                </ion-content>
            </ion-app>
        `;
    }

    // Lógica para verificar o estado de autenticação e preencher dados
    checkAuthAndRenderData() {
        const router = document.querySelector("ion-router");
        const userEmailDisplay = this.querySelector("#user-email-display");

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Se o usuário estiver logado, exibe o e-mail
                userEmailDisplay.textContent = user.email;
            } else {
                // Se o usuário NÃO estiver logado, redireciona para o login
                if (router) {
                    router.push("/");
                } else {
                    alert("Sessão expirada. Redirecionando para o login.");
                    window.location.href = "/";
                }
            }
        });
    }

    // Lógica para o botão de Logout
    initLogic() {
        const BotaoLogout = this.querySelector("#botaoLogout");
        const router = document.querySelector("ion-router");

        BotaoLogout.addEventListener("click", async () => {
            try {
                await signOut(auth);
                // O onAuthStateChanged acima cuidará do redirecionamento
                console.log("Logout bem-sucedido.");

                if (router) {
                    // Redireciona manualmente em caso de falha no onAuthStateChanged
                    router.push("/");
                } else {
                    window.location.href = "/";
                }

            } catch (error) {
                console.error("Erro ao fazer logout:", error);
                alert("Não foi possível sair. Tente novamente.");
            }
        });
    }
}

// Define o novo componente: <app-inicial></app-inicial>
customElements.define("app-inicial", Inicial);
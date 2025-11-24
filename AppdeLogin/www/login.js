import { auth } from "./firebase.js"; // Importa a instância do Auth
console.log("🧩 login.js iniciado!");
console.log("🔑 Objeto auth:", auth);

// Importa a função de LOGIN do Firebase SDK (Modular v9+)
import {
    signInWithEmailAndPassword, // Função para LOGIN
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

/**
 * Componente Web para a tela de Login.
 * O nome da tag do componente é agora 'app-login'.
 */
class Login extends HTMLElement {
    connectedCallback() {
        this.render(); // Injeta o HTML
        this.initLogic(); // Inicializa a lógica de eventos
    }

    // Método que gera o HTML da tela de Login com Ionic
    render() {
        // Utilizamos componentes do Ionic para um visual moderno e responsivo
        this.innerHTML = `
            <ion-app>
                <ion-header>
                    <ion-toolbar color="primary">
                        <ion-title>Acesso à Conta</ion-title>
                    </ion-toolbar>
                </ion-header>
                
                <ion-content class="ion-padding">
                    <ion-list lines="full">
                        <ion-item>
                            <ion-label position="floating">Email</ion-label>
                            <ion-input type="email" id="email" required></ion-input>
                        </ion-item>
                        
                        <ion-item>
                            <ion-label position="floating">Senha</ion-label>
                            <ion-input type="password" id="senha" required></ion-input>
                        </ion-item>
                    </ion-list>

                    <ion-button expand="block" class="ion-padding-top" id="botaoLogin">
                        Entrar
                    </ion-button>
                    
                    <ion-note color="danger" id="error-message" style="display: none; margin-top: 15px; text-align: center;">
                        </ion-note>

                    <ion-button expand="block" fill="clear" href="#/cadastro">
                        Ainda não tenho conta
                    </ion-button>
                    <ion-button expand="block" fill="clear" href="#/redefinir-senha">
                        Esqueci minha senha
                    </ion-button>
                </ion-content>
            </ion-app>
        `;
    }

    initLogic() {
        // Usa `this.querySelector` para garantir que pegamos os elementos DENTRO do nosso componente
        const CampoEmail = this.querySelector("#email");
        const CampoSenha = this.querySelector("#senha");
        const BotaoLogin = this.querySelector("#botaoLogin");
        const ErrorMessage = this.querySelector("#error-message");
        
        // Assume-se que 'ion-router' existe na página principal
        const router = document.querySelector("ion-router"); 

        const showError = (message) => {
            ErrorMessage.textContent = message;
            ErrorMessage.style.display = 'block';
        };

        const hideError = () => {
            ErrorMessage.style.display = 'none';
            ErrorMessage.textContent = '';
        };

        // Adiciona o Listener para o LOGIN
        BotaoLogin.addEventListener("click", async () => {
            const email = CampoEmail.value.trim();
            const senha = CampoSenha.value.trim();
            hideError();

            if (!email || !senha) {
                showError("Por favor, preencha o e-mail e a senha.");
                return;
            }

            try {
                // *** FUNÇÃO DE LOGIN DO FIREBASE ***
                await signInWithEmailAndPassword(auth, email, senha);
                
                // Se o login for bem-sucedido, redireciona
                if (router) {
                    router.push("/inicial");
                } else {
                    // Fallback se não usar ion-router
                    alert("Login bem-sucedido! Redirecionando para /inicial");
                    router.push("/app-cadastro");
                    console.log("Deu certo!");
                }
            } catch (error) {
                console.error("Erro de Login:", error);
                
                let message;
                // Tratamento de erros comuns de LOGIN
                switch (error.code) {
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        message = "Credenciais inválidas. Verifique seu e-mail e senha.";
                        break;
                    case "auth/invalid-email":
                        message = "O formato do e-mail é inválido.";
                        break;
                    case "auth/too-many-requests":
                        message = "Muitas tentativas falhas. Tente novamente mais tarde.";
                        break;
                    default:
                        message = "Não foi possível efetuar o login. Tente novamente.";
                        break;
                }
                showError(message);
            }
        });

     
    }
}

// Define o novo componente: <app-login></app-login>
customElements.define("app-login", Login);
import { auth } from "./firebase.js"; // Importa a instância do Auth
console.log("🧩 reset-senha.js iniciado!");
console.log("🔑 Objeto auth:", auth);

// Importa a função de redefinição de senha do Firebase SDK (Modular v9+)
import {
    sendPasswordResetEmail, // Função para REDEFINIR SENHA
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

/**
 * Componente Web para a tela de Redefinição de Senha.
 * O nome da tag do componente é 'app-reset-senha'.
 */
class RedefinirSenha extends HTMLElement { 
    connectedCallback() {
        this.render(); // Injeta o HTML
        this.initLogic(); // Inicializa a lógica de eventos
    }

    // Método que gera o HTML da tela de Redefinir Senha com Ionic
    render() {
        this.innerHTML = `
            <ion-app>
                <ion-header>
                    <ion-toolbar color="warning"> <ion-title>Redefinir Senha</ion-title>
                    </ion-toolbar>
                </ion-header>
                
                <ion-content class="ion-padding">
                    
                    <ion-text class="ion-padding-bottom">
                        <p>Informe o seu e-mail para receber um link de redefinição de senha.</p>
                    </ion-text>

                    <ion-list lines="full">
                        <ion-item>
                            <ion-label position="floating">Email</ion-label>
                            <ion-input type="email" id="email" required></ion-input>
                        </ion-item>
                    </ion-list>

                    <ion-button expand="block" class="ion-padding-top" id="botaoReset" color="warning">
                        Enviar Link de Redefinição
                    </ion-button>
                    
                    <ion-note color="danger" id="error-message" style="display: none; margin-top: 15px; text-align: center;">
                        </ion-note>
                    <ion-note color="success" id="success-message" style="display: none; margin-top: 15px; text-align: center;">
                        </ion-note>

                    <ion-button expand="block" fill="clear" href="/">
                        Voltar para o Login
                    </ion-button>
                </ion-content>
            </ion-app>
        `;
    }

    initLogic() {
        const CampoEmail = this.querySelector("#email");
        const BotaoReset = this.querySelector("#botaoReset");
        const ErrorMessage = this.querySelector("#error-message");
        const SuccessMessage = this.querySelector("#success-message");
        
        // Funções de feedback
        const showMessage = (element, message) => {
            ErrorMessage.style.display = 'none';
            SuccessMessage.style.display = 'none';
            element.textContent = message;
            element.style.display = 'block';
        };

        const hideMessages = () => {
            ErrorMessage.style.display = 'none';
            SuccessMessage.style.display = 'none';
        };

        // Adiciona o Listener para o Reset
        BotaoReset.addEventListener("click", async () => {
            const email = CampoEmail.value.trim();
            hideMessages();

            if (!email) {
                showMessage(ErrorMessage, "Por favor, preencha o campo de e-mail.");
                return;
            }

            try {
                // *** FUNÇÃO DE REDEFINIÇÃO DE SENHA DO FIREBASE ***
                await sendPasswordResetEmail(auth, email);
                
                // Exibe mensagem de sucesso
                showMessage(SuccessMessage, `Um link para redefinição de senha foi enviado para ${email}. Verifique sua caixa de entrada.`);
                
            } catch (error) {
                console.error("Erro ao Enviar E-mail de Reset:", error);
                
                let message;
                // Tratamento de erros comuns
                switch (error.code) {
                    case "auth/user-not-found":
                        message = "Não existe usuário com este e-mail.";
                        break;
                    case "auth/invalid-email":
                        message = "O formato do e-mail é inválido.";
                        break;
                    default:
                        message = "Não foi possível enviar o e-mail de redefinição. Tente novamente.";
                        break;
                }
                showMessage(ErrorMessage, message);
            }
        });
    }
}

// Define o novo componente: <app-reset-senha></app-reset-senha>
customElements.define("app-redefinir-senha", RedefinirSenha);
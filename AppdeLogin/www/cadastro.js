import { auth } from "./firebase.js"; // Importa a instância do Auth
console.log("🧩 cadastro.js iniciado!");
console.log("🔑 Objeto auth:", auth);

// Importa a função de CADASTRO do Firebase SDK (Modular v9+)
import {
createUserWithEmailAndPassword, // Função para CADASTRO
onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

/**
 * Componente Web para a tela de Cadastro.
 * O nome da tag do componente é 'app-cadastro'.
 */
class Cadastro extends HTMLElement { // <-- Nomenclatura Correta
connectedCallback() {
    this.render(); // Injeta o HTML
    this.initLogic(); // Inicializa a lógica de eventos
}

// Método que gera o HTML da tela de Cadastro com Ionic
render() {
    this.innerHTML = `
        <ion-app>
            <ion-header>
                <ion-toolbar color="secondary"> <ion-title>Criar Nova Conta</ion-title>
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

                    <ion-item>
                        <ion-label position="floating">Confirmar Senha</ion-label>
                        <ion-input type="password" id="confirmaSenha" required></ion-input>
                    </ion-item>

                </ion-list>

                <ion-button expand="block" class="ion-padding-top" id="botaoCadastro" color="secondary">
                    Cadastrar
                </ion-button>
                
                <ion-note color="danger" id="error-message" style="display: none; margin-top: 15px; text-align: center;">
                    </ion-note>

                <ion-button expand="block" fill="clear" href="/">
                    Já tenho conta
                </ion-button>
            </ion-content>
        </ion-app>
    `;
}

initLogic() {
    const CampoEmail = this.querySelector("#email");
    const CampoSenha = this.querySelector("#senha");
    const CampoConfirmaSenha = this.querySelector("#confirmaSenha"); // Novo campo
    const BotaoCadastro = this.querySelector("#botaoCadastro"); // ID Corrigido
    const ErrorMessage = this.querySelector("#error-message");
    
    const router = document.querySelector("ion-router"); 

    const showError = (message) => {
        ErrorMessage.textContent = message;
        ErrorMessage.style.display = 'block';
    };

    const hideError = () => {
        ErrorMessage.style.display = 'none';
        ErrorMessage.textContent = '';
    };

    // Adiciona o Listener para o CADASTRO
    BotaoCadastro.addEventListener("click", async () => {
        const email = CampoEmail.value.trim();
        const senha = CampoSenha.value.trim();
        const confirmaSenha = CampoConfirmaSenha.value.trim();
        hideError();

        if (!email || !senha || !confirmaSenha) {
            showError("Por favor, preencha todos os campos.");
            return;
        }
        if (senha !== confirmaSenha) {
            showError("As senhas não coincidem.");
            return;
        }
        // Firebase exige senhas com 6 caracteres ou mais.
        if (senha.length < 6) {
            showError("A senha deve ter 6 caracteres ou mais.");
            return;
        }


        try {
            // *** FUNÇÃO DE CADASTRO DO FIREBASE ***
            await createUserWithEmailAndPassword(auth, email, senha);
            
            // Se o cadastro for bem-sucedido, redireciona
            if (router) {
                router.push("/inicial");
            } else {
                alert("Cadastro bem-sucedido! Redirecionando para /inicial");
                window.location.href = "/inicial";
            }
        } catch (error) {
            console.error("Erro de Cadastro:", error);
            
            let message;
            // Tratamento de erros comuns de CADASTRO
            switch (error.code) {
                case "auth/email-already-in-use":
                    message = "Este e-mail já está cadastrado.";
                    break;
                case "auth/invalid-email":
                    message = "O formato do e-mail é inválido.";
                    break;
                case "auth/weak-password":
                    message = "Sua senha é muito fraca. Mínimo de 6 caracteres.";
                    break;
                default:
                    message = "Não foi possível criar a conta. Tente novamente.";
                    break;
            }
            showError(message);
        }
    });

}
}

// Define o novo componente: <app-cadastro></app-cadastro>
customElements.define("app-cadastro", Cadastro);
# 🌸 **Controle de LED com ESP32 + App Ionic (MQTT + Firebase)**

Este projeto integra um **ESP32** e um **aplicativo mobile** desenvolvido em **Ionic**, permitindo **ligar e desligar um LED remotamente** usando o protocolo **MQTT**.

O app possui **autenticação com Firebase**, design em **tons pastéis**, e comunicação em tempo real com o ESP32 através do broker público da **HiveMQ**.

---

## ✨ **Funcionalidades do Projeto**

### 📱 Aplicativo (Ionic + Web Components)

* Tela de **Login**
* Tela de **Cadastro**
* Tela de **Recuperação de Senha**
* Tela Inicial com:

  * Status da conexão MQTT
  * Email do usuário logado
  * Botões **Ligar** e **Desligar LED**
* Design pastel (rosa/lilás), moderno e arredondado
* Autenticação Firebase
* Publicação MQTT via WebSocket Seguro

### 🔌 ESP32 (Arduino/C++)

* Conexão ao Wi-Fi
* Conexão ao broker MQTT pela porta 1883
* Inscrição no tópico `daniela/led`
* Ações:

  * Recebe `"on"` → acende o LED
  * Recebe `"off"` → apaga o LED
* Reconeção automática ao broker

---

## 🛰️ **Broker MQTT Utilizado**

A comunicação entre o app e o ESP32 usa o broker público da **HiveMQ**:

| Uso   | Protocolo                 | Host                | Porta    |
| ----- | ------------------------- | ------------------- | -------- |
| App   | MQTT via WebSocket Seguro | `broker.hivemq.com` | **8884** |
| ESP32 | MQTT TCP                  | `broker.hivemq.com` | **1883** |

**Tópico utilizado:**

```
daniela/led
```

---

## 📌 **Tecnologias Utilizadas**

### 💻 Back-end/Dispositivo

* ESP32
* C++ (Arduino IDE)
* Biblioteca PubSubClient
* Protocolo MQTT

### 📱 Front-end

* Ionic
* Web Components + JavaScript
* Firebase Authentication
* MQTT.js
* HTML/CSS

---

## 🚀 **Como rodar o projeto**

### **1️⃣ ESP32**

1. Abra o código na Arduino IDE.
2. Selecione a placa **ESP32 Dev Module**.
3. Conecte o LED no **pino 2**.
4. Compile e envie o código.
5. Abra o Serial Monitor para ver logs da conexão MQTT.

### **2️⃣ Aplicativo**

1. Instale dependências:

   ```bash
   npm install
   ```
2. Rode o projeto:

   ```bash
   ionic serve
   ```
3. O app abrirá no navegador e estará pronto para controlar o LED.

---

## 💡 **Como funciona o sistema**

1. O app faz login usando Firebase.
2. Na tela inicial, o app conecta ao HiveMQ via WebSocket.
3. Ao clicar em **LIGAR LED**, publica:

   ```
   daniela/led → "on"
   ```
4. O ESP32 está inscrito no mesmo tópico e recebe a mensagem.
5. Dependendo da mensagem:

   * `"on"` → acende o LED
   * `"off"` → apaga o LED
6. Tudo ocorre em tempo real via MQTT.

---

## 🧩 **Código-Fonte**

Os códigos completos do aplicativo e do ESP32 estão incluídos neste repositório:

📁 `/app` → Códigos do Ionic
📁 `/arduino` → Código do ESP32

---

## 📷 **Prints das Telas**

> <img width="405" height="823" alt="image" src="https://github.com/user-attachments/assets/749e5ac5-76a6-41f7-bd2c-5c4fc29a54ab" />
<img width="405" height="823" alt="image" src="https://github.com/user-attachments/assets/89681088-4740-4659-9ce8-63dbe9a50fd0" />
<img width="404" height="823" alt="image" src="https://github.com/user-attachments/assets/e03f8053-f9a8-4e45-ad01-4f03b1084f6b" />
<img width="405" height="825" alt="image" src="https://github.com/user-attachments/assets/4dccac2c-0362-413c-b6a7-74bb3e70dfd8" />





---

## ❤️ Projeto desenvolvido por **Daniela Bosco**.


# App + Arduino (ESP32) usando MQTT

Este projeto é uma integração entre um **app feito em Ionic** e um **ESP32**, usando comunicação MQTT para ligar e desligar um LED.  
A ideia é simples: o app envia o comando → o ESP32 recebe → o LED acende ou apaga.

---

## 📱 Sobre o App

O aplicativo foi feito em **Ionic** e usa:

- **Firebase Authentication** (login, cadastro e recuperação de senha)
- **MQTT.js** para enviar mensagens pelo protocolo MQTT via WebSocket
- Interface simples, com botões para ligar/desligar o LED
- Mostra o status da conexão MQTT e o email do usuário logado

Para rodar o app:

```bash
npm install
ionic serve

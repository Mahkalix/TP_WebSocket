# TP WebSocket - Communication en temps réel

## 📋 Description du projet

Ce projet est un TP (Travaux Pratiques) démontrant l'utilisation des WebSockets pour une communication en temps réel entre plusieurs composants :

1. **Front Sender** : Interface web qui permet d'envoyer des messages
2. **API Backend** : Serveur qui reçoit les messages du front sender
3. **Backend WebSocket** : Serveur qui reçoit les messages de l'API et les diffuse via WebSocket
4. **Front Receiver** : Interface web qui reçoit et affiche les messages en temps réel

## 🏗️ Architecture

```
┌─────────────────┐
│  Front Sender   │
│   (WebApp)      │
└────────┬────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│   API Backend   │
│   (REST API)    │
└────────┬────────┘
         │ WebSocket
         ▼
┌─────────────────┐
│  Backend WS     │
│  (WebSocket)    │
└────────┬────────┘
         │ WebSocket
         ▼
┌─────────────────┐
│ Front Receiver  │
│   (WebApp)      │
└─────────────────┘
```

## 🚀 Fonctionnement

1. L'utilisateur saisit un message dans le **Front Sender**
2. Le message est envoyé via une requête HTTP à l'**API Backend**
3. L'API Backend transmet le message au **Backend WebSocket**
4. Le Backend WebSocket diffuse le message via WebSocket
5. Le **Front Receiver** reçoit et affiche le message en temps réel

## 📁 Structure du projet

```
TP_Websocket/
├── frontsender/          # Application front-end pour l'envoi de messages
│   ├── src/
│   ├── public/
│   └── package.json
├── backendapi/          # API REST (à créer)
│   └── ...
├── backend/    # Serveur WebSocket (à créer)
│   └── ...
└── frontReceiver/        # Application front-end pour la réception (à créer)
    └── ...
```

## 🎯 Objectifs pédagogiques

- Comprendre le fonctionnement des WebSockets
- Implémenter une communication bidirectionnelle en temps réel
- Découpler l'envoi et la réception de messages
- Mettre en place une architecture distribuée simple

## 👨‍💻 Développement

Ce projet est un exercice pratique pour apprendre les communications WebSocket et l'architecture client-serveur.

## 📄 Licence

Projet éducatif - Libre d'utilisation

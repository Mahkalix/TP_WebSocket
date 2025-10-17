async function sendMessageToBackend(ip: string, message: string) {
  const statusDiv = document.getElementById("status")!;
  
  try {
    statusDiv.className = 'loading';
    statusDiv.textContent = `📤 Envoi de "${message}" vers ${ip}...`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(`http://${ip}:3000/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    let result;
    
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      if (text) {
        result = JSON.parse(text);
      } else {
        result = { success: true, message: 'Réponse vide mais succès' };
      }
    } else {
      const text = await response.text();
      result = { success: true, response: text || 'OK' };
    }
    
    console.log('✅ Message envoyé avec succès:', result);
    
    statusDiv.className = 'success';
    statusDiv.textContent = `✅ Message envoyé avec succès ! Réponse: ${JSON.stringify(result)}`;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    
    statusDiv.className = 'error';
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        statusDiv.textContent = `⏱️ Timeout: Le serveur ne répond pas après 10 secondes. Vérifiez que le backend est démarré sur ${ip}:3000`;
      } else if (error.message.includes('Failed to fetch')) {
        statusDiv.textContent = `🔌 Connexion impossible: Vérifiez que le serveur est accessible et que CORS est configuré`;
      } else {
        statusDiv.textContent = `❌ Erreur: ${error.message}`;
      }
    } else {
      statusDiv.textContent = `❌ Erreur: ${error}`;
    }
  }
}

function setupSendButton() {
  const sendBtn = document.getElementById("sendBtn")!;
  const ipInput = document.getElementById("ip") as HTMLInputElement;
  const messageInput = document.getElementById("messageInput") as HTMLInputElement;
  
  sendBtn.addEventListener('click', () => {
    const ip = ipInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!ip || !message) {
      alert('⚠️ Veuillez remplir l\'IP et le message !');
      return;
    }
    
    sendMessageToBackend(ip, message);
  });
  
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });
}

window.addEventListener('load', () => {
  setupSendButton();
  const statusDiv = document.getElementById("status")!;
  statusDiv.className = 'ready';
  statusDiv.textContent = '⏳ Prêt à envoyer un message...';
});

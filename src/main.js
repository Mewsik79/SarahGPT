// Update the initialization to use the new endpoint
    async function initializeChat() {
      try {
        // Update status to show we're checking the new endpoint
        loadingIndicator.textContent = 'Connecting to model server...';
        
        // Test connection to the new endpoint
        const isConnected = await sarah.ollama.checkServerStatus();
        
        if (!isConnected) {
          connectionStatus.textContent = '🔴 Model server not connected';
          connectionStatus.style.backgroundColor = '#fee2e2';
          loadingIndicator.textContent = 'Failed to connect to model server. Please ensure it is running at http://localhost:3000';
          return;
        }

        // Test model availability
        loadingIndicator.textContent = 'Checking model availability...';
        const modelAvailable = await sarah.ollama.checkModelAvailability();
        
        if (!modelAvailable) {
          connectionStatus.textContent = '🔴 Model not available';
          connectionStatus.style.backgroundColor = '#fee2e2';
          loadingIndicator.textContent = 'The required model is not available on the server.';
          return;
        }

        // If both checks pass
        connectionStatus.textContent = '🟢 Connected to model server';
        connectionStatus.style.backgroundColor = '#d1fae5';
        loadingIndicator.remove();
        
        // Enable UI
        userInput.disabled = false;
        sendBtn.disabled = false;
        restartBtn.disabled = false;

        // Start chat
        addMessage('sarah', sarah.getRandomGreeting());
      } catch (error) {
        console.error('Initialization error:', error);
        connectionStatus.textContent = '🔴 Connection error';
        connectionStatus.style.backgroundColor = '#fee2e2';
        loadingIndicator.textContent = 'An error occurred during initialization. Please check the console.';
      }
    }

    // Rest of your existing code...

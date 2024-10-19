import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById("player");
  const saveStateBtn = document.getElementById("saveStateBtn");
  const loadStateBtn = document.getElementById("loadStateBtn");
  
  // Function to save the game state
  function saveGameState() {
    if (player.saveState) {
      const state = player.saveState();
      const stateObj = {
        state: state,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('ndsGameState', JSON.stringify(stateObj));
      console.log("Game state saved");
    } else {
      console.error("saveState method not available");
    }
  }

  // Function to load the game state
  function loadGameState() {
    const savedStateJSON = localStorage.getItem('ndsGameState');
    if (savedStateJSON && player.loadState) {
      try {
        const stateObj = JSON.parse(savedStateJSON);
        player.loadState(stateObj.state);
        console.log("Game state loaded from", stateObj.timestamp);
      } catch (error) {
        console.error("Error loading game state:", error);
      }
    } else {
      console.log("No saved state found or loadState method not available");
    }
  }

  // Replace this with the URL to your NDS ROM file
  const gameUrl = "prueba.nds";

  player.loadURL(gameUrl, function() {
    console.log("Game loaded successfully");
    if (player.enableMicrophone) {
      player.enableMicrophone();
    }
    
    // Load the saved state if it exists
    loadGameState();
  });

  // Save state button event listener
  saveStateBtn.addEventListener('click', saveGameState);

  // Load state button event listener
  loadStateBtn.addEventListener('click', loadGameState);

  // Save the state before closing the page
  window.addEventListener('beforeunload', saveGameState);
});

const terminal = document.getElementById('terminal');
const input = document.getElementById('commandInput');
const welcome = document.getElementById('welcome');
const themeDropdown = document.getElementById('themeDropdown');

const commands = {
  help: `Available commands:\n- about\n- projects\n- contact\n- clear`,
  about: `Hi! I'm Amal, a B.Tech CSE student passionate about coding and technology.`,
  projects: `1. YouTube MP3 Converter\n2. Terminal Portfolio (this!)\n3. Anti-Drug Cell Website`,
  contact: `Email: amal@example.com\nGitHub: github.com/Amal-K-Philip\nTelegram: @AmalPhilip`,
  clear: 'clear'
};

// Typing animation function
function typeText(element, text, speed = 25, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Welcome Message
typeText(welcome, "Welcome to Amal's Terminal Portfolio! Type 'help' to get started.\n");

let history = [];
let historyIndex = -1;

input.addEventListener('keydown', function (e) {
  const originalValue = input.value.trim();

  if (e.key === 'Enter') {
    const command = originalValue.toLowerCase();
    if (command === '') return;

    // Save to history
    history.push(originalValue);
    historyIndex = history.length;

    // Show typed command
    const inputLine = document.createElement('div');
    inputLine.classList.add('line');
    inputLine.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${originalValue}`;
    terminal.insertBefore(inputLine, input.parentElement);

    // Clear terminal
if (command === 'clear') {
  const lines = terminal.querySelectorAll('.line');
  lines.forEach((line, index) => {
    if (line !== welcome) {
      line.remove(); // Remove all except the welcome message
    }
  });
  input.value = '';
  terminal.scrollTop = terminal.scrollHeight;
  return;
}


    // Output handling
    if (commands.hasOwnProperty(command)) {
      const output = document.createElement('div');
      output.classList.add('line');
      terminal.insertBefore(output, input.parentElement);
      typeText(output, commands[command]);
    } else {
      const error = document.createElement('div');
      error.classList.add('line');
      terminal.insertBefore(error, input.parentElement);
      typeText(error, `Command not found: ${command}`);
    }

    input.value = '';
    terminal.scrollTop = terminal.scrollHeight;
  }

  // ↑ arrow for previous command
  if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
    e.preventDefault();
  }

  // ↓ arrow for next command
  if (e.key === 'ArrowDown') {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = '';
    }
    e.preventDefault();
  }
});



// Theme switcher
function toggleMenu() {
  themeDropdown.style.display = themeDropdown.style.display === 'flex' ? 'none' : 'flex';
}

function setTheme(theme) {
  switch (theme) {
    case 'green':
      document.documentElement.style.setProperty('--text-color', '#00ff00');
      document.documentElement.style.setProperty('--bg-color', 'black');
      break;
    case 'amber':
      document.documentElement.style.setProperty('--text-color', '#ffbf00');
      document.documentElement.style.setProperty('--bg-color', '#101010');
      break;
    case 'matrix':
      document.documentElement.style.setProperty('--text-color', '#00ffcc');
      document.documentElement.style.setProperty('--bg-color', '#001100');
      break;
  }
  toggleMenu();
  input.focus(); // ✅ Fix: restore typing input after theme change
}

function setFontSize(size) {
  switch (size) {
    case 'small':
      document.documentElement.style.setProperty('--font-size', '0.95em');
      break;
    case 'medium':
      document.documentElement.style.setProperty('--font-size', '1.1em');
      break;
    case 'large':
      document.documentElement.style.setProperty('--font-size', '1.35em');
      break;
  }
  toggleMenu();
  input.focus(); // refocus input
}

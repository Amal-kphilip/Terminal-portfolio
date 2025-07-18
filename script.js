document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('commandInput');
  const welcome = document.getElementById('welcome');
  const themeDropdown = document.getElementById('themeDropdown');
  const menuToggle = document.getElementById('menuToggle');

  // Show terminal and welcome message
  terminal.style.display = "flex";
  welcome.innerText = "Welcome to Amal's Terminal Portfolio! Type 'help' to get started.";
  input.focus();


  // Commands
  const commands = {
    help: `Available commands:\n- about\n- projects\n- contact\n- clear`,
    about: `Hi! I'm Amal, a B.Tech CSE student passionate about coding and technology.`,
    contact: `Email: amal@example.com\nGitHub: github.com/Amal-K-Philip\nTelegram: @AmalPhilip`,
    clear: "clear"
  };

  let history = [];
  let historyIndex = -1;

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

  input.addEventListener("keydown", (e) => {
    const originalValue = input.value.trim();

    if (e.key === "Enter") {
      const command = originalValue.toLowerCase();
      if (command === '') return;

      // Save to history
      history.push(originalValue);
      historyIndex = history.length;

      // Show command in terminal
      const inputLine = document.createElement('div');
      inputLine.classList.add('line');
      inputLine.innerHTML = `<span class="prompt">user@portfolio:~$</span> ${originalValue}`;
      terminal.insertBefore(inputLine, input.parentElement);

      if (command === 'clear') {
        const lines = terminal.querySelectorAll('.line');
        lines.forEach(line => {
          if (line !== welcome) line.remove();
        });
        input.value = '';
        terminal.scrollTop = terminal.scrollHeight;
        return;
      }

      const output = document.createElement('div');
      output.classList.add('line');
      terminal.insertBefore(output, input.parentElement);

      if (command === 'projects') {
        typeText(output, "Loading projects...\n", 25, () => {
          const links = document.createElement('div');
          links.classList.add('line');
          links.innerHTML = `
            <div><span style="color:#0f0;">1.</span> <a href="https://your-youtube-mp3-site.com" target="_blank">YouTube MP3 Converter</a></div>
            <div><span style="color:#0f0;">2.</span> <a href="https://github.com/Amal-K-Philip/terminal-portfolio" target="_blank">Terminal Portfolio</a></div>
            <div><span style="color:#0f0;">3.</span> <a href="https://your-antidrug-website.com" target="_blank">Anti-Drug Cell Website</a></div>
          `;
          terminal.insertBefore(links, input.parentElement);
          terminal.scrollTop = terminal.scrollHeight;
        });
      } else if (commands.hasOwnProperty(command)) {
        typeText(output, commands[command]);
      } else {
        typeText(output, `Command not found: ${command}`);
      }

      input.value = '';
      terminal.scrollTop = terminal.scrollHeight;
    }

    // Arrow ↑
    if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
      e.preventDefault();
    }

    // Arrow ↓
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

  // Theme toggle dropdown
  menuToggle.addEventListener("click", function (e) {
    themeDropdown.classList.toggle("show");
    e.stopPropagation();
  });

  document.addEventListener("click", function (e) {
    if (
      !themeDropdown.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      themeDropdown.classList.remove("show");
    }
  });

  // Theme switching
  window.setTheme = function (theme) {
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
    themeDropdown.classList.remove("show");
    input.focus();
  };

  // Font size switching
  window.setFontSize = function (size) {
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
    themeDropdown.classList.remove("show");
    input.focus();
  };
});

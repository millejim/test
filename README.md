# Jimmie Jams

A rhythm game where you hit falling notes as they cross the line. Built with HTML5 Canvas and Web Audio API.

## How to Play

1. Open `jimmie-jams` in a web browser
2. Press the Start button or Space/Enter to begin
3. Hit the keys `D`, `F`, `J`, `K` as notes fall down their respective lanes
4. Time your hits perfectly to build combos and keep the crowd meter up
5. Miss too many notes and the crowd walks out!

## Running the Test Suite

The project includes a test suite to verify the game's core functionality.

### Browser-Based Tests

The easiest way to run tests is using a web browser:

1. **Start a local web server** in the project directory:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   
   # Or using Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```

2. **Open the test page** in your browser:
   ```
   http://localhost:8000/test.html
   ```

3. The test results will display automatically, showing:
   - Individual test results (pass/fail)
   - A summary of total tests passed and failed
   - Error messages for any failing tests

### What the Tests Cover

The test suite verifies:
- Game object initialization and API exposure
- Required methods are available (`getState`, `getScore`, `getCombo`, `getMeter`, `getNotes`, `start`, `hitLane`)
- Initial game state is correct (state: "start", score: 0, combo: 0, meter: 50)
- Game can be started and transitions to "playing" state
- Game mechanics respond to player input
- Notes array is properly maintained

### Browser Compatibility

The test suite works in all modern browsers that support:
- ES6 JavaScript features
- Web Audio API
- HTML5 Canvas

Tested and working in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

### Troubleshooting

**Tests show "ERROR: Could not load game"**
- Make sure you are running a local web server (tests cannot run from `file://` URLs due to CORS restrictions)
- Verify the `jimmie-jams` file exists in the same directory as `test.html`
- Check the browser console for additional error messages

**Tests fail unexpectedly**
- Refresh the page to re-run the tests
- Clear your browser cache if you recently modified the game code
- Check that no browser extensions are interfering with the page

**Web server command not found**
- For Python: Make sure Python is installed and in your PATH
- For Node.js: Install http-server globally with `npm install -g http-server`
- Alternatively, use any other static file server you prefer

### Manual Testing

You can also test the game manually by:
1. Opening `jimmie-jams` in a browser
2. Opening the browser's developer console (F12)
3. Accessing the game API via `window.__game`:
   ```javascript
   // Check current state
   __game.getState()
   
   // Start the game
   __game.start()
   
   // Check score
   __game.getScore()
   
   // Simulate hitting a lane
   __game.hitLane(0)  // Hit lane 0 (D key)
   ```

## Game Features

- **4 lanes** mapped to D, F, J, K keys
- **Dynamic difficulty** that increases over time
- **Combo system** with score multipliers
- **Crowd meter** that depletes on misses
- **Visual feedback** with particles and hit judgments (PERFECT, GOOD, OK, MISS)
- **Audio feedback** with procedurally generated sounds

## Technical Details

- Pure HTML5/JavaScript with no external dependencies
- Canvas-based rendering
- Web Audio API for sound generation
- Responsive timing system based on BPM (100 BPM with subdivisions)

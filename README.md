# Jimmie Jams

A rhythm game where you hit falling notes as they cross the line. Built with HTML5 Canvas and Web Audio API.

## How to Play

1. Open `jimmie-jams` in a web browser
2. Press the Start button or Space/Enter to begin
3. Hit the keys `D`, `F`, `J`, `K` as notes fall down their respective lanes
4. Time your hits perfectly to build combos and keep the crowd meter up
5. Miss too many notes and the crowd walks out!

## Development

### Setup

Install dependencies:
```bash
npm install
```

### Running Locally

Start a local development server:
```bash
npm run serve
```

Then open http://localhost:8080/jimmie-jams in your browser.

## Running the Test Suite

The project includes both browser-based and automated tests.

### Automated Tests (Playwright)

Run the full test suite:
```bash
npm test
```

Run tests with UI mode:
```bash
npm run test:ui
```

Run tests in headed mode (see the browser):
```bash
npm run test:headed
```

The automated tests use Playwright to:
- Verify the test.html page runs all tests successfully
- Check that the game loads correctly
- Validate the game API is properly exposed
- Test game initialization and state transitions

### Browser-Based Tests

You can also run tests manually in a browser:

1. **Start a local web server** in the project directory:
   ```bash
   npm run serve
   
   # Or using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Open the test page** in your browser:
   ```
   http://localhost:8080/test.html
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

## Continuous Integration

The project uses GitHub Actions to automatically run tests on every push and pull request. The CI workflow:
- Sets up Node.js and Playwright
- Installs dependencies
- Runs the full test suite
- Uploads test results as artifacts

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

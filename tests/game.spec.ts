import { test, expect } from '@playwright/test';

test.describe('Jimmie Jams Game Tests', () => {
  test('test page loads and runs all tests', async ({ page }) => {
    await page.goto('/test.html');
    
    // Wait for tests to complete
    await page.waitForSelector('#summary', { timeout: 10000 });
    
    // Get the summary element
    const summary = await page.locator('#summary');
    const summaryText = await summary.textContent();
    
    // Check if all tests passed
    const hasFailClass = await summary.evaluate(el => el.classList.contains('has-fail'));
    
    // Log the summary for debugging
    console.log('Test Summary:', summaryText);
    
    // Assert no failures
    expect(hasFailClass).toBe(false);
    expect(summaryText).toContain('0 failed');
  });

  test('game page loads successfully', async ({ page }) => {
    await page.goto('/jimmie-jams');
    
    // Check that the game title is present
    await expect(page.locator('h1.title')).toHaveText('Jimmie Jams');
    
    // Check that the canvas is present
    await expect(page.locator('#game')).toBeVisible();
    
    // Check that the start overlay is visible
    await expect(page.locator('#startOverlay')).toBeVisible();
  });

  test('game API is exposed', async ({ page }) => {
    await page.goto('/jimmie-jams');
    
    // Check that __game is exposed
    const gameExists = await page.evaluate(() => {
      return typeof window.__game !== 'undefined';
    });
    
    expect(gameExists).toBe(true);
    
    // Check that all required methods exist
    const methods = await page.evaluate(() => {
      const game = window.__game;
      return {
        hasGetState: typeof game.getState === 'function',
        hasGetScore: typeof game.getScore === 'function',
        hasGetCombo: typeof game.getCombo === 'function',
        hasGetMeter: typeof game.getMeter === 'function',
        hasGetNotes: typeof game.getNotes === 'function',
        hasStart: typeof game.start === 'function',
        hasHitLane: typeof game.hitLane === 'function',
      };
    });
    
    expect(methods.hasGetState).toBe(true);
    expect(methods.hasGetScore).toBe(true);
    expect(methods.hasGetCombo).toBe(true);
    expect(methods.hasGetMeter).toBe(true);
    expect(methods.hasGetNotes).toBe(true);
    expect(methods.hasStart).toBe(true);
    expect(methods.hasHitLane).toBe(true);
  });

  test('game starts correctly', async ({ page }) => {
    await page.goto('/jimmie-jams');
    
    // Get initial state
    const initialState = await page.evaluate(() => window.__game.getState());
    expect(initialState).toBe('start');
    
    // Start the game
    await page.evaluate(() => window.__game.start());
    
    // Check that state changed to playing
    const playingState = await page.evaluate(() => window.__game.getState());
    expect(playingState).toBe('playing');
    
    // Check that the start overlay is hidden
    await expect(page.locator('#startOverlay')).toHaveClass(/hidden/);
  });

  test('game initializes with correct values', async ({ page }) => {
    await page.goto('/jimmie-jams');
    
    const initialValues = await page.evaluate(() => {
      const game = window.__game;
      return {
        state: game.getState(),
        score: game.getScore(),
        combo: game.getCombo(),
        meter: game.getMeter(),
        notes: game.getNotes(),
      };
    });
    
    expect(initialValues.state).toBe('start');
    expect(initialValues.score).toBe(0);
    expect(initialValues.combo).toBe(0);
    expect(initialValues.meter).toBe(50);
    expect(Array.isArray(initialValues.notes)).toBe(true);
    expect(initialValues.notes.length).toBe(0);
  });
});

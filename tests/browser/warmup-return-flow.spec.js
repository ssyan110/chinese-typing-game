import { test, expect } from '@playwright/test';

test('a new learner can return to the three warm-up words and resume a chapter on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('https://www.googletagmanager.com/**', route => route.abort());
  await page.clock.setFixedTime(new Date('2026-11-25T10:00:00Z'));
  await page.goto('./');
  await page.locator('[data-mode=simplified]').click();
  await page.locator('#enter-lobby:enabled').click();
  await page.locator('#learning-tutorial').click();

  const answers = new Map();
  const dialog = page.locator('#learning-dialog');
  const prompt = dialog.locator('#learning-prompt');
  const input = dialog.locator('#learning-input');
  const submit = dialog.getByRole('button', { name: 'Kiểm tra', exact: true });
  for (let turn = 0; turn < 3; turn++) {
    const word = await prompt.innerText();
    await input.fill(word);
    await submit.click();
    const feedback = await dialog.locator('#learning-feedback').innerText();
    const reading = feedback.split(' · ').at(-1);
    answers.set(reading, word);
    await dialog.getByRole('button', { name: turn === 2 ? 'Xem kết quả' : 'Từ tiếp theo', exact: true }).click();
  }

  await page.clock.setFixedTime(new Date('2026-11-26T10:00:01Z'));
  await page.reload();
  await page.getByRole('button', { name: /Ôn lại 3 từ/ }).click();
  for (let turn = 0; turn < 3; turn++) {
    const reading = await prompt.innerText();
    expect(answers.has(reading)).toBe(true);
    if (turn === 1) await dialog.getByRole('button', { name: 'Xem chữ gợi ý' }).click();
    await input.fill(answers.get(reading));
    await submit.click();
    await dialog.getByRole('button', { name: turn === 2 ? 'Xem kết quả' : 'Từ tiếp theo', exact: true }).click();
  }
  await expect(dialog).toContainText('Tự nhớ đúng 2/3');
  await dialog.getByRole('button', { name: 'Tiếp tục chặng 1' }).click();
  await page.locator('#start-ready').click();
  await expect(page.locator('#battle-kind')).toContainText('CHẶNG 1');
});

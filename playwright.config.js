import {defineConfig} from '@playwright/test';
const external = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
 testDir: './tests/browser', outputDir: './output/playwright-test-results', timeout: 120_000, fullyParallel: false, workers: 1,
 use: {baseURL: external || 'http://127.0.0.1:5187/chinese-typing-game/', headless: true, trace: 'retain-on-failure'},
 reporter: [['list']],
 projects:[
  {name:'chromium',testIgnore:'**/safari.spec.js',use:process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{}},
  {name:'webkit',testMatch:'**/safari.spec.js',use:{browserName:'webkit'}}
 ],
 webServer: external ? undefined : {
  command: 'npx vite build --base=/chinese-typing-game/ && node scripts/stage-summoner-public.mjs && npx vite preview --host 127.0.0.1 --port 5187 --base=/chinese-typing-game/',
  url: 'http://127.0.0.1:5187/chinese-typing-game/', reuseExistingServer: false, timeout: 120_000
 }
});

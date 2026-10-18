// The journey now uses the original typing engine. Run the browser regression suite.
import {spawnSync} from 'node:child_process';
const result=spawnSync('npx',['playwright','test','tests/browser/journey.spec.js'],{stdio:'inherit',env:{...process.env,PLAYWRIGHT_CHANNEL:process.env.PLAYWRIGHT_CHANNEL||'chrome'}});
process.exitCode=result.status??1;

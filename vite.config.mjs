export default {
 // Compile Vite's dynamic-import preload helper for the real deployment prefix.
 base:process.env.SITE_BASE||'/',
 build:{copyPublicDir:false},
 // Browser traces contain HTML resources; writing them must not reload a duel.
 server:{watch:{ignored:['**/output/**','**/.playwright-cli/**','**/test-results/**','**/playwright-report/**']}}
};

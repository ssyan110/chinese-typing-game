export default {
 build:{copyPublicDir:false},
 // Browser traces contain HTML resources; writing them must not reload a duel.
 server:{watch:{ignored:['**/output/**','**/.playwright-cli/**','**/test-results/**','**/playwright-report/**']}}
};

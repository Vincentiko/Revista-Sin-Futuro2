import fs from 'fs-extra';

fs.copy('public/_redirects', 'dist/_redirects')
  .then(() => console.log('✅ Archivo _redirects copiado correctamente'))
  .catch((err) => console.error('❌ Error copiando _redirects:', err));

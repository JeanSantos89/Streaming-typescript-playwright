/**
 * Global setup de testes
 * Valida variáveis de ambiente críticas antes de qualquer teste rodar
 */

export default async function globalSetup() {
  console.log('\n🔍 Validando variáveis de ambiente...\n');

  const requiredEnvVars = {
    TMDB_USERNAME: process.env.TMDB_USERNAME,
    TMDB_PASSWORD: process.env.TMDB_PASSWORD,
  };

  let hasErrors = false;

  for (const [varName, varValue] of Object.entries(requiredEnvVars)) {
    if (!varValue) {
      console.error(`❌ ${varName} não está definido!`);
      hasErrors = true;
    } else {
      console.log(`✅ ${varName} definido com sucesso`);
    }
  }

  if (hasErrors) {
    throw new Error(
      `\n⚠️  Variáveis de ambiente obrigatórias não definidas!\n` +
      `Local: coloque no .env ou defina manualmente\n` +
      `GitHub Actions: configure em Settings > Secrets > Actions\n`
    );
  }

  console.log('\n✨ Todas as variáveis obrigatórias foram validadas!\n');
}

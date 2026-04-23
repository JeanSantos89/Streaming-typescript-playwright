export default async function globalSetup() {
  const required = ['TMDB_USERNAME', 'TMDB_PASSWORD'] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Local: define them in a .env file\n' +
        'CI/CD: configure them in Settings > Secrets > Actions',
    );
  }

  console.log('Environment variables validated successfully.');
}

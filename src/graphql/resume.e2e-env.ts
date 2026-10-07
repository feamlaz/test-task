const defaults: Record<string, string> = {
  HOST: '0.0.0.0',
  PORT: '3000',
  DATABASE_URL: 'postgresql://resume:resume@127.0.0.1:5432/resume?schema=public',
  CORS_ORIGIN: '*',
};

for (const [key, value] of Object.entries(defaults)) {
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

export {};
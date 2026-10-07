#!/bin/sh
set -eu

migrate() {
  echo "[entrypoint] applying pending migrations"
  npx prisma migrate deploy
}

seed() {
  echo "[entrypoint] seeding database"
  node dist/seed.js
}

main() {
  migrate
  seed
  exec "$@"
}

main "$@"

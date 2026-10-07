# resume-backend

Read-only GraphQL API serving a resume stored in PostgreSQL. The schema, the
migration and the seed data are in the repository, so one `docker compose up`
leaves a working API with the database migrated and seeded.

## Stack

- NestJS 11 with TypeScript in strict mode
- GraphQL via @nestjs/graphql code-first and Apollo Server
- Prisma 6 against PostgreSQL 16
- Environment configuration validated with @nestjs/config

## Prerequisites

Docker with the Compose plugin. Nothing else is needed: PostgreSQL, the
migration and the seed all run in containers.

## Running with Docker

```
docker compose up
```

That is the whole procedure: from an empty database the first run builds the
image, applies the migrations, seeds and serves. PostgreSQL is published on
host port 5433 for inspection, the API on 3000. After a source change rebuild
with `docker compose up --build`.

Apollo Sandbox is at http://localhost:3000/graphql. Open that URL in a browser
to run queries interactively. GET /health returns status, uptime and a
timestamp, and is what the container healthcheck polls.

The query from the assignment:

```
query {
  profile {
    name
    description
    skills { name }
    experience { company position }
    projects { name }
  }
}
```

## Startup order

The api container waits for the database to pass `pg_isready`, then runs
`prisma migrate deploy`, then the compiled seed (`node dist/seed.js`), and only
then starts the Nest server. The API is therefore never reachable against an
unmigrated or empty database, and any failure in either step stops the container
with a non-zero exit status instead of starting a half-configured server.

Migrations and seed run inside the application container rather than in a
separate one-shot service. One container means one image and one toolchain, and
the ordering is enforced by the process that serves traffic: it cannot reach
`node dist/main.js` until migration and seed have exited zero. Both steps are
idempotent, so a restart or a second `docker compose up` converges on the same
state.

## Stopping and resetting

```
docker compose down
docker compose down -v
```

The first keeps the pgdata volume, so data survives restarts. The second deletes
it. After `down -v` the next `docker compose up` recreates the database,
replays the migrations and reloads the seed.

## Running without Docker

```
cp .env.example .env
npm install
npm run prisma:deploy
npm run prisma:seed
npm run start:dev
```

Point DATABASE_URL in .env at a reachable PostgreSQL 16 instance before the
first migration. `.env.example` lists every variable the application reads plus
the ones docker-compose.yml substitutes, all with the defaults used by the
compose stack.

## Layout

```
prisma/
  schema.prisma   database schema
  migrations/     committed migrations, applied on start
  seed.ts         idempotent seed
docker/
  entrypoint.sh   migrate, seed, then start the server
src/
  config/         environment validation
  prisma/         PrismaService and global PrismaModule
  graphql/        GraphQLModule with the Apollo driver
  profile/        profile feature
  experience/     experience feature
  skills/         skills feature
  projects/       projects feature
generated/        Prisma client output, git-ignored, produced by prisma generate
```

## Commands

| Command | Effect |
| --- | --- |
| npm run start:dev | run with watch mode |
| npm run build | generate the client and compile to dist |
| npm run typecheck | run tsc without emitting |
| npm run test | run jest |
| npm run prisma:generate | regenerate the Prisma client into generated/ |
| npm run prisma:validate | validate the schema |
| npm run prisma:migrate | create and apply a migration in development |
| npm run prisma:deploy | apply committed migrations |
| npm run prisma:seed | upsert the resume data |
| npm run prisma:studio | open Prisma Studio |

## Seed behaviour

The seed upserts every record on a stable unique key: profile by slug, skills by
name, experiences by slug, projects by name, contacts by profile and kind. Skill
links and achievement rows are replaced on each run, so repeated runs converge on
the same state instead of duplicating rows.

## Queries

| Query | Result |
| --- | --- |
| profile | the singleton resume: scalars, contacts, skills, experience, projects |
| skills(category) | all skills, optionally filtered by category |
| experience | experience ordered by sortOrder with achievements and skills |
| projects(featuredOnly) | all projects, optionally only featured ones |

profile throws a not found error when the main profile row is missing.

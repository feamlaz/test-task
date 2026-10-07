-- CreateEnum
CREATE TYPE "ContactKind" AS ENUM ('GITHUB', 'TELEGRAM', 'EMAIL', 'PHONE');

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL DEFAULT 'main',
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" UUID NOT NULL,
    "kind" "ContactKind" NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "profile_id" UUID NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "experience_id" UUID NOT NULL,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_skill" (
    "experience_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,

    CONSTRAINT "experience_skill_pkey" PRIMARY KEY ("experience_id","skill_id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repository_url" TEXT NOT NULL,
    "live_url" TEXT,
    "period" TEXT NOT NULL,
    "tech" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_skill" (
    "project_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,

    CONSTRAINT "project_skill_pkey" PRIMARY KEY ("project_id","skill_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_slug_key" ON "profile"("slug");

-- CreateIndex
CREATE INDEX "contact_profile_id_idx" ON "contact"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_profile_id_kind_key" ON "contact"("profile_id", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "skill_name_key" ON "skill"("name");

-- CreateIndex
CREATE INDEX "skill_category_idx" ON "skill"("category");

-- CreateIndex
CREATE UNIQUE INDEX "experience_slug_key" ON "experience"("slug");

-- CreateIndex
CREATE INDEX "experience_sort_order_idx" ON "experience"("sort_order");

-- CreateIndex
CREATE INDEX "experience_company_idx" ON "experience"("company");

-- CreateIndex
CREATE UNIQUE INDEX "achievement_experience_id_position_key" ON "achievement"("experience_id", "position");

-- CreateIndex
CREATE INDEX "experience_skill_skill_id_idx" ON "experience_skill"("skill_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_name_key" ON "project"("name");

-- CreateIndex
CREATE INDEX "project_featured_sort_order_idx" ON "project"("featured", "sort_order");

-- CreateIndex
CREATE INDEX "project_tech_idx" ON "project" USING GIN ("tech");

-- CreateIndex
CREATE INDEX "project_skill_skill_id_idx" ON "project_skill"("skill_id");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_skill" ADD CONSTRAINT "experience_skill_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_skill" ADD CONSTRAINT "experience_skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skill" ADD CONSTRAINT "project_skill_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skill" ADD CONSTRAINT "project_skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `url` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_url_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "url";

-- CreateTable
CREATE TABLE "user_urls" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_urls_content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url_id" TEXT NOT NULL,

    CONSTRAINT "user_urls_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_urls_content_url_id_key" ON "user_urls_content"("url_id");

-- AddForeignKey
ALTER TABLE "user_urls" ADD CONSTRAINT "user_urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_urls_content" ADD CONSTRAINT "user_urls_content_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "user_urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

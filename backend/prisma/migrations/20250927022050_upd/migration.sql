/*
  Warnings:

  - You are about to drop the column `is_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "is_verified",
ADD COLUMN     "two_factor_secret" TEXT;

-- DropTable
DROP TABLE "public"."tokens";

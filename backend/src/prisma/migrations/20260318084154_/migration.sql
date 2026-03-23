/*
  Warnings:

  - You are about to drop the column `floor_id` on the `details` table. All the data in the column will be lost.
  - You are about to drop the `_floorsTozones` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `zone_id` to the `details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor_id` to the `zones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_floorsTozones" DROP CONSTRAINT "_floorsTozones_A_fkey";

-- DropForeignKey
ALTER TABLE "_floorsTozones" DROP CONSTRAINT "_floorsTozones_B_fkey";

-- DropForeignKey
ALTER TABLE "details" DROP CONSTRAINT "details_floor_id_fkey";

-- AlterTable
ALTER TABLE "details" DROP COLUMN "floor_id",
ADD COLUMN     "zone_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "zones" ADD COLUMN     "floor_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_floorsTozones";

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_zone_id_fkey" FOREIGN KEY ("zone_id") REFERENCES "zones"("zone_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zones" ADD CONSTRAINT "zones_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floors"("floor_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

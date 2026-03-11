-- CreateEnum
CREATE TYPE "machine_status" AS ENUM ('RUNNING', 'IDLE', 'DOWN', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "locations" (
    "location_id" SERIAL NOT NULL,
    "country_name" VARCHAR(20) NOT NULL,
    "province_name" VARCHAR(20) NOT NULL,
    "building_name" VARCHAR(20) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "details" (
    "detail_id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "floor_id" INTEGER NOT NULL,
    "hardware_id" INTEGER NOT NULL,

    CONSTRAINT "details_pkey" PRIMARY KEY ("detail_id")
);

-- CreateTable
CREATE TABLE "current_status" (
    "hardware_id" INTEGER NOT NULL,
    "status" "machine_status" NOT NULL,
    "start_time" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "current_status_pkey" PRIMARY KEY ("hardware_id")
);

-- CreateTable
CREATE TABLE "devices" (
    "device_id" SERIAL NOT NULL,
    "device_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("device_id")
);

-- CreateTable
CREATE TABLE "hardware" (
    "hardware_id" SERIAL NOT NULL,
    "machine_id" INTEGER NOT NULL,
    "device_id" INTEGER NOT NULL,

    CONSTRAINT "hardware_pkey" PRIMARY KEY ("hardware_id")
);

-- CreateTable
CREATE TABLE "machines" (
    "machine_id" SERIAL NOT NULL,
    "machine_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "machines_pkey" PRIMARY KEY ("machine_id")
);

-- CreateTable
CREATE TABLE "monitor_logs" (
    "log_id" SERIAL NOT NULL,
    "detail_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "duration_seconds" INTEGER NOT NULL,
    "status" "machine_status" NOT NULL,

    CONSTRAINT "monitor_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "floors" (
    "floor_id" SERIAL NOT NULL,
    "floor_name" VARCHAR(3),

    CONSTRAINT "floors_pkey" PRIMARY KEY ("floor_id")
);

-- CreateTable
CREATE TABLE "zones" (
    "zone_id" SERIAL NOT NULL,
    "zone_name" VARCHAR(20) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "zones_pkey" PRIMARY KEY ("zone_id")
);

-- CreateTable
CREATE TABLE "_floorsTozones" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_status_hardware" ON "current_status"("hardware_id");

-- CreateIndex
CREATE UNIQUE INDEX "devices_device_name_key" ON "devices"("device_name");

-- CreateIndex
CREATE UNIQUE INDEX "machines_machine_name_key" ON "machines"("machine_name");

-- CreateIndex
CREATE INDEX "idx_logs_start_time" ON "monitor_logs"("start_time");

-- CreateIndex
CREATE UNIQUE INDEX "floors_floor_name_key" ON "floors"("floor_name");

-- CreateIndex
CREATE UNIQUE INDEX "zones_zone_name_key" ON "zones"("zone_name");

-- CreateIndex
CREATE UNIQUE INDEX "_floorsTozones_AB_unique" ON "_floorsTozones"("A", "B");

-- CreateIndex
CREATE INDEX "_floorsTozones_B_index" ON "_floorsTozones"("B");

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_floor_id_fkey" FOREIGN KEY ("floor_id") REFERENCES "floors"("floor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_hardware_id_fkey" FOREIGN KEY ("hardware_id") REFERENCES "hardware"("hardware_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "current_status" ADD CONSTRAINT "current_status_hardware_id_fkey" FOREIGN KEY ("hardware_id") REFERENCES "hardware"("hardware_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hardware" ADD CONSTRAINT "hardware_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("device_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hardware" ADD CONSTRAINT "hardware_machine_id_fkey" FOREIGN KEY ("machine_id") REFERENCES "machines"("machine_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "monitor_logs" ADD CONSTRAINT "monitor_logs_detail_id_fkey" FOREIGN KEY ("detail_id") REFERENCES "details"("detail_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_floorsTozones" ADD CONSTRAINT "_floorsTozones_A_fkey" FOREIGN KEY ("A") REFERENCES "floors"("floor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_floorsTozones" ADD CONSTRAINT "_floorsTozones_B_fkey" FOREIGN KEY ("B") REFERENCES "zones"("zone_id") ON DELETE CASCADE ON UPDATE CASCADE;

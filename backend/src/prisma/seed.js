const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  await prisma.locations.createMany({
    data: [
      { country_name: "Thailand", province_name: "Bangkok", building_name: "Parking" },
      { country_name: "Thailand", province_name: "Bangkok", building_name: "1" },
      { country_name: "Thailand", province_name: "Bangkok", building_name: "2" },
      { country_name: "Thailand", province_name: "Bangkok", building_name: "3" },
      { country_name: "Thailand", province_name: "ChiangMai", building_name: "1" },
      { country_name: "Japan", province_name: "Tokyo", building_name: "1"},
      { country_name: "Australia", province_name: "Melbourne", building_name: "1"}
    ],
    skipDuplicates: true
  });

    await prisma.machines.createMany({
        data: [
            {machine_name: "HotPressing"},
            {machine_name: "Pump"},
            {machine_name: "Compressor"},
            {machine_name: "Fan"},
            {machine_name: "Conveyor"},
            {machine_name: "Blower"},
            {machine_name: "Boiler"},
            {machine_name: "CoolingTower"},
        ],
        skipDuplicates: true
    });

    const restroom = await prisma.zones.upsert({
        where: { zone_name: "Restroom" },
        update: {},
        create: { zone_name: "Restroom", is_active: true }
    });

    const parking = await prisma.zones.upsert({
        where: { zone_name: "Parking" },
        update: {},
        create: { zone_name: "Parking", is_active: true }
    });

    const lobby = await prisma.zones.upsert({
        where: { zone_name: "Lobby" },
        update: {},
        create: { zone_name: "Lobby", is_active: true }
    });

    const cafe = await prisma.zones.upsert({
        where: { zone_name: "Cafe" },
        update: {},
        create: { zone_name: "Cafe", is_active: true }
    });

    const workshopA = await prisma.zones.upsert({
        where: { zone_name: "WorkshopA" },
        update: {},
        create: { zone_name: "WorkshopA", is_active: true }
    });

    const workshopB = await prisma.zones.upsert({
        where: { zone_name: "WorkshopB" },
        update: {},
        create: { zone_name: "WorkshopB", is_active: true }
    });

    const canteen = await prisma.zones.upsert({
        where: { zone_name: "Canteen" },
        update: {},
        create: { zone_name: "Canteen", is_active: true }
    });

    // Create floors
    const floorM1 = await prisma.floors.upsert({
        where: { floor_name: "M1" },
        update: {},
        create: { floor_name: "M1" }
    });

    const floorG = await prisma.floors.upsert({
        where: { floor_name: "G" },
        update: {},
        create: { floor_name: "G" }
    });

    const floor1 = await prisma.floors.upsert({
        where: { floor_name: "1" },
        update: {},
        create: { floor_name: "1" }
    });

    const floor2 = await prisma.floors.upsert({
        where: { floor_name: "2" },
        update: {},
        create: { floor_name: "2" }
    });

    const floor3 = await prisma.floors.upsert({
        where: { floor_name: "3" },
        update: {},
        create: { floor_name: "3" }
    });

    // First create some devices
    const device1 = await prisma.devices.upsert({
        where: { device_name: "Sensor1" },
        update: {},
        create: { device_name: "Sensor1" }
    });

    const device2 = await prisma.devices.upsert({
        where: { device_name: "Sensor2" },
        update: {},
        create: { device_name: "Sensor2" }
    });

    // Get existing machines (assuming they were created earlier)
    const hotPressing = await prisma.machines.findFirst({
        where: { machine_name: "HotPressing" }
    });

    const pump = await prisma.machines.findFirst({
        where: { machine_name: "Pump" }
    });

    const compressor = await prisma.machines.findFirst({
        where: { machine_name: "Compressor" }
    });

    const fan = await prisma.machines.findFirst({
        where: { machine_name: "Fan" }
    });

    const conveyor = await prisma.machines.findFirst({
        where: { machine_name: "Conveyor" }
    });

    const blower = await prisma.machines.findFirst({
        where: { machine_name: "Blower" }
    });

    const boiler = await prisma.machines.findFirst({
        where: { machine_name: "Boiler" }
    });

    const coolingTower = await prisma.machines.findFirst({
        where: { machine_name: "CoolingTower" }
    });

    if (!hotPressing || !pump || !compressor || !fan || !conveyor || !blower || !boiler || !coolingTower) {
        console.log("One or more machines not found. Make sure machines are seeded first.");
        return;
    }

    // Create hardware
    const hardware1 = await prisma.hardware.create({
        data: {
            machine_id: hotPressing.machine_id,
            device_id: device1.device_id
        }
    });

    const hardware2 = await prisma.hardware.create({
        data: {
            machine_id: pump.machine_id,
            device_id: device2.device_id
        }
    });

    const hardware3 = await prisma.hardware.create({
        data: {
            machine_id: compressor.machine_id,
            device_id: device1.device_id
        }
    });

    const hardware4 = await prisma.hardware.create({
        data: {
            machine_id: fan.machine_id,
            device_id: device1.device_id
        }
    });

    const hardware5 = await prisma.hardware.create({
        data: {
            machine_id: conveyor.machine_id,
            device_id: device1.device_id
        }
    });

    const hardware6 = await prisma.hardware.create({
        data: {
            machine_id: blower.machine_id,
            device_id: device1.device_id
        }
    });

    const hardware7 = await prisma.hardware.create({
        data: {
            machine_id: boiler.machine_id,
            device_id: device1.device_id
        }
    });
    const hardware8 = await prisma.hardware.create({
        data: {
            machine_id: coolingTower.machine_id,
            device_id: device1.device_id
        }
    });

    // Get existing locations and floors
    const location1 = await prisma.locations.findFirst({
        where: { building_name: "1" }
    });

    if (!location1 || !floor1) {
        console.log("Location or floor not found. Make sure they are seeded first.");
        return;
    }

    // Create details
    await prisma.details.createMany({
        data: [
            {
            location_id: location1.location_id,
            floor_id: floor1.floor_id,
            hardware_id: hardware1.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor1.floor_id,
            hardware_id: hardware2.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor1.floor_id,
            hardware_id: hardware3.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor1.floor_id,
            hardware_id: hardware4.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware1.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware2.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware3.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware4.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware5.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware6.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware7.hardware_id
            },
            {
            location_id: location1.location_id,
            floor_id: floor2.floor_id,
            hardware_id: hardware8.hardware_id
            },
    ]});

    console.log("Details created successfully!");

    // Connect floors to zones (many-to-many)
    await prisma.floors.update({
        where: { floor_name: "M1" },
        data: {
            zones: {
                connect: [
                    { zone_id: restroom.zone_id },
                    { zone_id: parking.zone_id }
                ]
            }
        }
    });

    await prisma.floors.update({
        where: { floor_name: "G" },
        data: {
            zones: {
                connect: [
                    { zone_id: lobby.zone_id },
                    { zone_id: cafe.zone_id }
                ]
            }
        }
    });

    await prisma.floors.update({
        where: { floor_name: "1" },
        data: {
            zones: {
                connect: [
                    { zone_id: workshopA.zone_id },
                    { zone_id: workshopB.zone_id },
                    { zone_id: canteen.zone_id }
                ]
            }
        }
    });

    await prisma.floors.update({
        where: { floor_name: "2" },
        data: {
            zones: {
                connect: [
                    { zone_id: restroom.zone_id }
                ]
            }
        }
    });

    await prisma.floors.update({
        where: { floor_name: "3" },
        data: {
            zones: {
                connect: [
                    { zone_id: restroom.zone_id }
                ]
            }
        }
    });

}

main()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
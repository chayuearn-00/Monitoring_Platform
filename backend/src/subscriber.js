require('dotenv/config');
const mqtt = require("mqtt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const client = mqtt.connect("mqtt://localhost:1883");
const TOPIC = "machine/status";

client.on("connect", () => {
  console.log("✅ Subscriber connected. Monitoring all details...");
  client.subscribe(TOPIC);
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    // monitor_id จาก MQTT คือ detail_id ในฐานข้อมูลเรา
    const { monitor_id, status, timestamp } = data; 
    
    const detailsId = monitor_id; 
    const newStatus = status;
    const currentTime = new Date(timestamp);

    // 1. ค้นหาสถานะปัจจุบัน (เอาจาก current_status จะเร็วที่สุด)
    const current = await prisma.current_status.findUnique({
      where: { detail_id: detailsId }
    });

    // 2. Logic: ถ้าสถานะ "เปลี่ยน" หรือ "เพิ่งเคยมีข้อมูลครั้งแรก"
    if (!current || current.status !== newStatus) {
      
      console.log(`🔄 [Detail: ${detailsId}] Status Change: ${current?.status || 'INIT'} -> ${newStatus}`);

      await prisma.$transaction(async (tx) => {
        
        // ก. ปิด Log เก่าใน monitor_logs (หาแถวที่ยังไม่มี end_time)
        const activeLog = await tx.monitor_logs.findFirst({
          where: { detail_id: detailsId, end_time: null },
          orderBy: { start_time: 'desc' }
        });

        if (activeLog) {
          const duration = Math.floor((currentTime.getTime() - activeLog.start_time.getTime()) / 1000);
          await tx.monitor_logs.update({
            where: { log_id: activeLog.log_id },
            data: { 
              end_time: currentTime,
              duration_seconds: duration > 0 ? duration : 0
            }
          });
        }

        // ข. เปิด Log ใหม่ใน monitor_logs
        await tx.monitor_logs.create({
          data: {
            detail_id: detailsId,
            status: newStatus,
            start_time: currentTime,
            // end_time ปล่อยเป็น null ไว้ก่อน
          }
        });

        // ค. อัปเดตตารางสถานะปัจจุบัน (current_status) เพื่อให้ Dashboard ดึงไปโชว์ได้ไวๆ
        await tx.current_status.upsert({
          where: { detail_id: detailsId },
          update: { status: newStatus, start_time: currentTime },
          create: { detail_id: detailsId, status: newStatus, start_time: currentTime }
        });
      });

      console.log(`✅ [Detail: ${detailsId}] Database updated successfully.`);
    }

  } catch (error) {
    console.error("❌ Subscriber Error:", error.message);
  }
});
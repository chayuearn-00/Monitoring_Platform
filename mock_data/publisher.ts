import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

const TOPIC = "machine/status";
const STATUSES = ["RUNNING", "MAINTENANCE", "DOWN"];

function getRandomStatus() {
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  return status.toUpperCase()
  
}

// 🔥 ส่งครบทุก device 1–50
function publishAll() {
  for (let i = 1; i <= 50; i++) {
    const data = {
      monitor_id: i,
      status: getRandomStatus(),
      timestamp: new Date().toISOString(),
    };

    client.publish(TOPIC, JSON.stringify(data));
    console.log("📤 Sent:", data);
  }
}

// ⏱️ ทุก 5 นาที
const INTERVAL = 5 * 60 * 1000;

// ✅ ใส่ตรงนี้!
client.on("connect", () => {
  console.log("✅ MQTT connected");

  // ยิงครั้งแรกทันที (optional แต่แนะนำ)
  publishAll();

  // 🔥 loop ทุก 5 นาที
  setInterval(publishAll, INTERVAL);
});
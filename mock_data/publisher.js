"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var client = mqtt_1.default.connect("mqtt://localhost:1883");
var TOPIC = "machine/status";
var STATUSES = ["RUNNING", "MAINTENANCE", "DOWN"];
function getRandomStatus() {
    var status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    return status.toUpperCase();
}
// 🔥 ส่งครบทุก device 1–50
function publishAll() {
    for (var i = 1; i <= 50; i++) {
        var data = {
            monitor_id: i,
            status: getRandomStatus(),
            timestamp: new Date().toISOString(),
        };
        client.publish(TOPIC, JSON.stringify(data));
        console.log("📤 Sent:", data);
    }
}
// ⏱️ ทุก 5 นาที
var INTERVAL = 5 * 60 * 1000;
// ✅ ใส่ตรงนี้!
client.on("connect", function () {
    console.log("✅ MQTT connected");
    // ยิงครั้งแรกทันที (optional แต่แนะนำ)
    publishAll();
    // 🔥 loop ทุก 5 นาที
    setInterval(publishAll, INTERVAL);
});

import app from "./app.js";
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
    console.log(JSON.stringify({
        level: "info",
        event: "server_start",
        service: "auth-api",
        host: HOST,
        port: PORT,
        env: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    }));
});
//# sourceMappingURL=server.js.map
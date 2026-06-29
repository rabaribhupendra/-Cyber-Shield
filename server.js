// ===============================
// Cyber Shield Portal - server.js
// ===============================

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index..html"));
});

// API for URL Analysis
app.post("/api/analyze", (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            status: "error",
            message: "URL is required"
        });
    }

    const keywords = [
        "free",
        "lottery",
        "gift",
        "win",
        "crypto-bonus",
        "verify-account",
        "login-banking",
        "update-password",
        "amazon-offers",
        "free-recharge",
        "paytm-cashback"
    ];

    let suspicious = false;
    let reason = "";

    if (url.toLowerCase().startsWith("http://")) {
        suspicious = true;
        reason = "Uses insecure HTTP protocol.";
    }

    for (const keyword of keywords) {
        if (url.toLowerCase().includes(keyword)) {
            suspicious = true;
            reason = `Suspicious keyword detected: ${keyword}`;
            break;
        }
    }

    if (suspicious) {
        res.json({
            safe: false,
            message: "⚠️ Warning! Suspicious URL detected.",
            reason: reason
        });
    } else {
        res.json({
            safe: true,
            message: "✅ URL appears safe.",
            reason: "No suspicious indicators found."
        });
    }
});

// Health Check
app.get("/api/status", (req, res) => {
    res.json({
        status: "Server Running",
        project: "Cyber Shield Portal"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`====================================`);
    console.log(`Cyber Shield Server Running`);
    console.log(`http://localhost:${PORT}`);
    console.log(`====================================`);
});
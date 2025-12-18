import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/email/ingest", (req, res) => {
    const {
        source,
        message_id,
        subject,
        body,
        from,
        received_at
    } = req.body;

    // Basic validation only
    if (!subject || !body) {
        return res.status(400).json({
            error: "Missing subject or body"
        });
    }

    // NO BUSINESS LOGIC HERE
    // This is PURE ingestion

    console.log("📩 Email ingested:", {
        source,
        subject,
        from
    });

    return res.json({
        status: "ingested",
        source: source || "unknown"
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`📬 Outlook Ingestion API running on port ${PORT}`);
});

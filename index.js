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

///// checking the status 
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        service: "Outlook Ingestion API",
        timestamp: new Date().toISOString()
    });
});


///////INGEST ENDPOINT

app.post("/ingest", (req, res) => {
    const {
        subject,
        body,
        from,
        received_at,
        source = "outlook"
    } = req.body;

    // Format date for demo readability: "19 Dec 2025"
    const formattedReceivedAt = received_at
        ? new Date(received_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
          })
        : new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric"
          });

    const ingestedEmail = {
        subject,
        body,
        from: from || "unknown@sender",
        received_at: formattedReceivedAt,
        source
    };

    console.log("📩 Email ingested:", ingestedEmail);

    res.status(200).json({
        status: "ingested",
        email: ingestedEmail
    });
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`📬 Outlook Ingestion API running on port ${PORT}`);
});

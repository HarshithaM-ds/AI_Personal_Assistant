import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { storeDocument, documentExists } from "../lib/gbrain-client.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Fabricated Emails between Radesh, Harshitha, and Sameer
export const fabricatedEmails = [
  {
    id: "gmail-arch-setup-101",
    from: "Radesh Botsa <botsa.radesh@gmail.com>",
    to: "Harshitha M <harshitham.ds@gmail.com>, Sameer Khan <sameer.dev@gmail.com>",
    subject: "Personal AI Assistant — Project Architecture & Team Task Breakdown",
    date: "2026-11-01T09:30:00+05:30",
    snippet: "Kickoff notes for Personal AI Assistant with GBrain, OpenClaw, and Gemini.",
    body: `Hi Harshitha and Sameer,

Hope you're both doing well. As discussed in our sprint planning, here is the architectural blueprint for our Personal AI Assistant:

1. Unified Knowledge Base (GBrain):
   - We will use GBrain backed by PostgreSQL with pgvector for semantic retrieval.
   - All email threads, calendar events, and meeting transcripts will be ingested and indexed.

2. OpenClaw Gateway Runtime:
   - Manages communication channels and multi-agent coordination across Discord, Telegram, and WhatsApp.

3. Reasoning & Multimodal Engine:
   - Powered by Gemini 2.5 Flash for high-speed analysis, email categorization, and audio transcription.

Roles & Ownership:
- Harshitha: Lead the Gmail & Google Calendar ingestion pipelines (OAuth2, full-body extraction, and 30-min sync).
- Sameer: Lead the Discord bot integration, voice note transcription pipeline, and 8 AM daily email digest.
- Radesh: Cloud deployment on Railway, Docker containerization, PostgreSQL native configuration, and WhatsApp webhook.

Let's aim to have the core modules merged and tested by mid-week.

Best regards,
Radesh Botsa
Backend & DevOps Lead`
  },
  {
    id: "gmail-ingest-status-102",
    from: "Harshitha M <harshitham.ds@gmail.com>",
    to: "Radesh Botsa <botsa.radesh@gmail.com>, Sameer Khan <sameer.dev@gmail.com>",
    subject: "Update: Gmail Ingestion Pipeline & Google Calendar Integration Completed",
    date: "2026-11-02T14:15:00+05:30",
    snippet: "Gmail 30-minute ingestion and Calendar agent are functional and storing into GBrain.",
    body: `Hi Radesh and Sameer,

Quick update on the ingestion pipeline:

1. Gmail Ingestion:
   - Implemented 30-minute recurring fetch using Google OAuth2.
   - Extracts full email bodies (not just snippets), cleans HTML tags, and deduplicates using message IDs.
   - Stored directly into GBrain using the 'email-{id}' slug format.
   - Categorizes incoming emails into:
     * Action Required (security alerts, approvals, deadlines)
     * Important (team discussions, project updates)
     * Promotions & Newsletters

2. Google Calendar Integration:
   - Calendar agent fetches today's schedule and 48-hour upcoming events.
   - Linked meeting contexts so the assistant can prepare briefings before scheduled calls.

3. Backup Storage:
   - Raw JSON records are saved under data/messages/{date}.json for offline debugging and local digest generation.

Everything is pushed to the repository. Sameer, the data/messages feed is ready for your digest generator!

Best,
Harshitha M
AI & Ingestion Lead`
  },
  {
    id: "gmail-bot-voice-103",
    from: "Sameer Khan <sameer.dev@gmail.com>",
    to: "Harshitha M <harshitham.ds@gmail.com>, Radesh Botsa <botsa.radesh@gmail.com>",
    subject: "Discord Bot, Voice Transcription & Daily Briefing Agent Ready",
    date: "2026-11-03T11:00:00+05:30",
    snippet: "Discord bot v14 with voice notes and meeting uploads tested successfully.",
    body: `Hi Team,

I've completed the Discord bot and audio processing workflows:

1. Discord Bot (discord.js v14):
   - Slash and message commands: 'summarize emails', 'search emails <query>', 'upcoming meetings', 'action items'.
   - Graceful connection handling with 15s timeout and automatic retry logic.

2. Audio & Meeting Transcription:
   - Users can drag-and-drop MP3, WAV, or WebM meeting recordings into Discord.
   - The bot sends audio to Gemini 2.5 Flash, transcribes the conversation, extracts summary, action items, decisions, and saves the full record into GBrain.
   - Short voice notes are transcribed instantly and processed as conversational commands.

3. 8 AM Daily Productivity Briefing:
   - Cron-triggered digest aggregating yesterday's unread emails, today's meetings, and pending action items delivered straight to our Discord channel.

Next step is cloud deployment verification. Radesh, let us know once Railway is ready.

Thanks,
Sameer Khan
Full Stack & Integrations Lead`
  },
  {
    id: "gmail-deploy-fix-104",
    from: "Radesh Botsa <botsa.radesh@gmail.com>",
    to: "Harshitha M <harshitham.ds@gmail.com>, Sameer Khan <sameer.dev@gmail.com>",
    subject: "Action Required: Cloud Deployment Fix & Docker Node 24 Upgrade",
    date: "2026-11-04T16:40:00+05:30",
    snippet: "Upgraded Docker base image to node:24-slim to resolve OpenClaw engine requirement.",
    body: `Hi Harshitha and Sameer,

During our automated cloud build on Railway, we encountered an engine compatibility issue:
- OpenClaw's latest package release enforced Node.js >=24.16.0.
- Our Dockerfile was previously configured on node:22-slim, causing npm install to fail.

I have updated the Dockerfile to 'node:24-slim' and verified:
1. Native PostgreSQL server starts reliably on port 5432 with pgvector v0.8.0 compiled from source.
2. Bun v1.4.4+ installs properly and links GBrain into /home/node/.bun/bin.
3. OpenClaw Gateway initializes on port 18789 without engine warnings.
4. WhatsApp webhook on port 3002 is verified with Meta Graph API.

The fix is committed to the repository. Please pull the latest main branch!

Regards,
Radesh Botsa`
  },
  {
    id: "gmail-sync-request-105",
    from: "Harshitha M <harshitham.ds@gmail.com>",
    to: "Radesh Botsa <botsa.radesh@gmail.com>, Sameer Khan <sameer.dev@gmail.com>",
    subject: "Meeting Request: Final Team Review & Live Cloud Verification Sync",
    date: "2026-11-05T10:00:00+05:30",
    snippet: "Inviting Radesh and Sameer to our final project sync on Google Meet at 3:00 PM.",
    body: `Hi Radesh and Sameer,

Great job on fixing the Docker deployment issues!

Before we prepare the final demonstration and submit our project overview, let's have a comprehensive sync today at 3:00 PM on Google Meet.

Agenda:
1. Review end-to-end cloud deployment on Railway.
2. Verify GBrain semantic queries (email search and meeting retrieval).
3. Test Discord bot commands and voice note upload pipeline.
4. Confirm WhatsApp webhook connectivity.
5. Finalize action items and project documentation.

Meeting Link: https://meet.google.com/xyz-ai-assist
Time: 3:00 PM - 3:45 PM IST

Looking forward to catching up!

Warm regards,
Harshitha M`
  },
  {
    id: "gmail-sync-confirm-106",
    from: "Sameer Khan <sameer.dev@gmail.com>",
    to: "Harshitha M <harshitham.ds@gmail.com>, Radesh Botsa <botsa.radesh@gmail.com>",
    subject: "Re: Meeting Request: Final Team Review & Live Cloud Verification Sync",
    date: "2026-11-05T10:30:00+05:30",
    snippet: "Confirming 3:00 PM meeting attendance with test audio samples ready.",
    body: `Hi Harshitha and Radesh,

Confirmed! I have added the meeting to my Google Calendar.

I've also prepared 3 sample audio recordings (a daily standup, an architectural review, and a voice command test) to test the live transcription pipeline during the meeting.

See you both at 3:00 PM.

Cheers,
Sameer`
  }
];

// 2. Fabricated Meeting Transcript between Radesh, Harshitha, and Sameer
const meetingId = "meeting-team-sprint-review-301";

const meetingMetadata = {
  title: "Personal AI Assistant — Team Sprint Review & Cloud Deployment Sync",
  participants: "Harshitha M (AI Lead), Radesh Botsa (Backend & DevOps Lead), Sameer Khan (Full Stack Lead)",
  platform: "Google Meet",
  date: "2026-11-05T15:00:00+05:30",
  duration: "45 minutes"
};

const meetingTranscript = `
Harshitha: Good afternoon Radesh and Sameer! Thanks for joining. Let's kick off our sprint review for the Personal AI Assistant. We have made tremendous progress over the last week. The goal today is to review each subsystem, verify our cloud deployment on Railway, and ensure GBrain has all our team data indexed. Radesh, could you start with the infrastructure and database status?

Radesh: Thanks Harshitha. On the cloud infrastructure side, everything is running smoothly on Railway. We solved the previous database crashes by replacing the WebAssembly PGlite with native PostgreSQL 16 compiled with pgvector v0.8.0. In addition, when OpenClaw upgraded its engine requirement to Node 24+, I transitioned our Dockerfile to node:24-slim. Both the local PostgreSQL instance and the GBrain vector indexer initialize automatically on container startup. The WhatsApp webhook is listening on port 3002, and OpenClaw Gateway is operational on port 18789.

Harshitha: That's a huge milestone, Radesh. Getting native PostgreSQL with pgvector running inside the slim container resolved all those memory permission blocks. On my side, the email and calendar ingestion pipeline is fully active. It triggers every 30 minutes, pulls up to 50 emails from Gmail, extracts the complete body, cleans any markup, and writes to GBrain using the storeEmail helper. We also have the Google Calendar agent parsing events so users can ask for upcoming meetings or get contextual briefings for whoever they are meeting next.

Sameer: Awesome. On the multi-channel front, the Discord bot is rock solid. I tested both slash commands and conversational chat. Users can ask questions like "search emails about cloud deployment" or "summarize recent meetings", and the bot retrieves the most relevant matches from GBrain and formats them with Gemini 2.5 Flash. The meeting audio pipeline also works seamlessly: if someone drops an audio file into Discord, Gemini transcribes it, extracts the key action items and decisions, and stores the structured meeting report directly in GBrain.

Harshitha: That's fantastic, Sameer. How does the 8 AM daily briefing work in practice?

Sameer: Every morning at 8:00 AM, the daily report cron script runs. It reads all emails received in the last 24 hours, categorizes them into Action Required, Important, and Newsletters, pulls today's Google Calendar agenda, extracts unresolved action items from past meetings, and compiles a clean markdown briefing posted straight into our team's Discord channel.

Harshitha: Let's formalize our decisions from this sync. First, Railway is officially confirmed as our production deployment target. Second, Node 24 is locked as the base runtime across our Docker setup. Third, Gemini 2.5 Flash is confirmed as our default LLM across summarization, transcription, and conversational orchestration. Fourth, we will pre-seed GBrain on startup with our team communication history so the assistant has rich context out of the box. Do we all agree?

Radesh: Fully agreed. The pre-seeding ensures our assistant has immediate answers even before the first 30-minute Gmail polling cycle finishes.

Sameer: Agreed! It makes the live demonstration completely self-contained.

Harshitha: Perfect. Now let's review action items:
1. Radesh will monitor the Railway deployment logs over the weekend to verify background service stability.
2. Sameer will run a final edge-case test for audio transcription with varied recording formats.
3. Harshitha will complete the test suite and finalize the project overview documentation.
4. All of us will join a final dry run demonstration on Monday before project submission.

Radesh: Sounds great. I will keep an eye on the Railway metrics.

Sameer: Will do the audio testing today itself.

Harshitha: Thank you both for your hard work and dedication. Meeting adjourned!
`;

const meetingAnalysis = {
  summary: "Comprehensive sprint review and cloud deployment sync for the Personal AI Assistant project. Attendees Harshitha M (AI Lead), Radesh Botsa (Backend & DevOps Lead), and Sameer Khan (Full Stack Lead) reviewed the complete system. Key achievements include migrating to native PostgreSQL with pgvector, upgrading Docker to node:24-slim to satisfy OpenClaw engine requirements, 30-minute recurring Gmail and Calendar ingestion, Discord bot with Gemini-powered audio transcription, and automated 8 AM daily briefings. Railway was locked as the official production cloud platform with automated GBrain pre-seeding on startup.",
  actionItems: [
    "Radesh Botsa: Monitor Railway deployment logs over the weekend to verify service stability",
    "Sameer Khan: Run final edge-case tests for audio transcription with varied formats",
    "Harshitha M: Complete test suite and finalize project overview documentation",
    "All: Conduct a final dry-run demonstration on Monday before project submission"
  ],
  decisions: [
    "Railway officially confirmed as the production cloud deployment platform",
    "Node.js 24 (node:24-slim) locked as the container base image",
    "Gemini 2.5 Flash confirmed as the default reasoning and transcription engine",
    "GBrain pre-seeding enabled on container start for immediate out-of-the-box knowledge retrieval"
  ],
  topics: [
    "Cloud infrastructure and PostgreSQL/pgvector stability on Railway",
    "OpenClaw Gateway and Node 24 engine compatibility",
    "Gmail 30-minute recurring ingestion and full-body email indexing",
    "Google Calendar integration and contextual meeting prep",
    "Discord bot v14 with voice notes and audio meeting transcription",
    "8 AM automated daily productivity briefing to Discord",
    "Sprint decisions and submission roadmap"
  ],
  keyPoints: `
- Native PostgreSQL on port 5432 with pgvector v0.8.0 eliminates previous WASM PGlite W^X memory crashes.
- Base image updated to node:24-slim for full compatibility with OpenClaw >=2026.10.
- Gmail pipeline extracts full bodies and deduplicates records into GBrain every 30 minutes.
- Discord bot provides natural language email search, meeting summaries, and audio transcription via Gemini 2.5 Flash.
- Automated daily briefing delivers actionable summaries to Discord every morning at 8 AM.
- Pre-seeding team emails and transcripts ensures instant semantic search capability in cloud deployments.
`.trim(),
  followUps: [
    "Verify Railway webhooks and public domain connectivity",
    "Perform end-to-end smoke tests on Discord bot commands",
    "Coordinate Monday dry run before final project submission"
  ]
};

// 3. Execution function
export async function injectFabricatedData() {
  console.log("🚀 Starting injection of fabricated team data (Radesh, Harshitha, Sameer)...");

  // A. Store emails in GBrain, OpenClaw memory, and local data directory
  const today = new Date().toISOString().split("T")[0];
  const dataMessagesDir = path.join(__dirname, "..", "data", "messages");
  const openclawMemoryDir = path.join(os.homedir(), ".openclaw", "workspace", "memory");

  try {
    fs.mkdirSync(dataMessagesDir, { recursive: true });
    fs.mkdirSync(openclawMemoryDir, { recursive: true });
  } catch {}

  // Update data/messages/{today}.json for digest generation
  const todayJsonPath = path.join(dataMessagesDir, `${today}.json`);
  let existingEmails = [];
  if (fs.existsSync(todayJsonPath)) {
    try {
      existingEmails = JSON.parse(fs.readFileSync(todayJsonPath, "utf8"));
    } catch {
      existingEmails = [];
    }
  }

  let emailsInjected = 0;
  for (const email of fabricatedEmails) {
    const slug = `email-${email.id}`;

    // 1. Write markdown format for OpenClaw memory
    const emailMarkdown = `# Email: ${email.subject}

**From:** ${email.from}
**To:** ${email.to}
**Date:** ${email.date}
**Subject:** ${email.subject}

## Content

${email.body}

---
_Source: Gmail | ID: ${email.id}_
`;
    try {
      fs.writeFileSync(path.join(openclawMemoryDir, `${slug}.md`), emailMarkdown, "utf8");
    } catch {}

    // 2. Store into GBrain
    const gbrainContent = `# Email: ${email.subject}

From: ${email.from}
To: ${email.to}
Subject: ${email.subject}
Date: ${email.date}

${email.body}
`;
    if (!documentExists(slug)) {
      const stored = storeDocument(slug, gbrainContent);
      if (stored) {
        console.log(`✅ Stored email [${email.id}] in GBrain: "${email.subject.substring(0, 45)}..."`);
        emailsInjected++;
      }
    } else {
      console.log(`⏭️  Email [${email.id}] already exists in GBrain.`);
    }

    // Add to existing list if not present
    if (!existingEmails.some((e) => e.id === email.id)) {
      existingEmails.push(email);
    }
  }

  // Save merged emails to local data directory
  try {
    fs.writeFileSync(todayJsonPath, JSON.stringify(existingEmails, null, 2), "utf8");
    console.log(`💾 Saved ${existingEmails.length} emails to ${todayJsonPath}`);
  } catch (err) {
    console.warn("Could not save to data/messages:", err.message);
  }

  // B. Store Meeting Transcript in GBrain
  if (documentExists(meetingId)) {
    console.log(`⏭️  Meeting [${meetingId}] already exists in GBrain. Skipping injection.`);
  } else {
    const actionItemsStr = meetingAnalysis.actionItems.map((item, i) => `${i + 1}. ${item}`).join("\n");
    const decisionsStr = meetingAnalysis.decisions.map((d, i) => `${i + 1}. ${d}`).join("\n");
    const topicsStr = meetingAnalysis.topics.map((t) => `- ${t}`).join("\n");
    const followUpsStr = meetingAnalysis.followUps.map((f) => `- ${f}`).join("\n");

    const meetingContent = [
      `# Meeting: ${meetingMetadata.title}`,
      "",
      `**Date:** ${meetingMetadata.date}`,
      `**Platform:** ${meetingMetadata.platform}`,
      `**Participants:** ${meetingMetadata.participants}`,
      `**Duration:** ${meetingMetadata.duration}`,
      "",
      "## Summary",
      meetingAnalysis.summary,
      "",
      "## Action Items",
      actionItemsStr,
      "",
      "## Decisions Made",
      decisionsStr,
      "",
      "## Topics Discussed",
      topicsStr,
      "",
      "## Key Points",
      meetingAnalysis.keyPoints,
      "",
      "## Follow-ups for Next Meeting",
      followUpsStr,
      "",
      "## Raw Transcript",
      meetingTranscript.trim(),
      "",
      "---",
      `_Source: Meeting Recording | Platform: ${meetingMetadata.platform} | ID: ${meetingId}_`
    ].join("\n");

    const storedMeeting = storeDocument(meetingId, meetingContent);
    if (storedMeeting) {
      console.log(`✅ Stored meeting [${meetingId}] in GBrain: "${meetingMetadata.title}"`);
    } else {
      console.error(`❌ Failed to store meeting [${meetingId}] in GBrain.`);
    }

    // Also save in OpenClaw memory
    try {
      fs.writeFileSync(path.join(openclawMemoryDir, `${meetingId}.md`), meetingContent, "utf8");
    } catch {}
  }

  console.log("🎉 Fabricated data injection complete!\n");
}

// Auto-run if executed directly via CLI
if (process.argv[1] && process.argv[1].endsWith("inject-fabricated-data.mjs")) {
  injectFabricatedData().catch((err) => {
    console.error("Injection error:", err);
    process.exit(1);
  });
}


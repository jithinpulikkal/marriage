import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";

const app = express();

app.use(cors());
app.use(express.json());

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3/files";
const DRIVE_FOLDER_MIME = "application/vnd.google-apps.folder";

const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

function buildQuery(params) {
    return Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
}

async function fetchJson(url) {
    if (globalThis.fetch) {
        const response = await fetch(url);
        if (!response.ok) {
            let details = "";
            try {
                const errorBody = await response.json();
                details = errorBody?.error?.message || JSON.stringify(errorBody);
            } catch (error) {
                try {
                    details = await response.text();
                } catch (innerError) {
                    details = "";
                }
            }
            const suffix = details ? `: ${details}` : "";
            throw new Error(`Drive request failed (${response.status})${suffix}`);
        }
        return response.json();
    }

    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => {
                    const isError = res.statusCode < 200 || res.statusCode >= 300;
                    if (isError) {
                        let details = "";
                        try {
                            const parsed = JSON.parse(data);
                            details = parsed?.error?.message || JSON.stringify(parsed);
                        } catch (error) {
                            details = data || "";
                        }
                        const suffix = details ? `: ${details}` : "";
                        reject(new Error(`Drive request failed (${res.statusCode})${suffix}`));
                        return;
                    }
                    try {
                        resolve(JSON.parse(data));
                    } catch (error) {
                        reject(error);
                    }
                });
            })
            .on("error", reject);
    });
}

async function listAllFiles(query, fields) {
    const selectedFields = fields || "files(id,name,mimeType,webViewLink)";
    const files = [];
    let pageToken = undefined;

    do {
        const url = `${DRIVE_API_BASE}?${buildQuery({
            q: query,
            fields: `nextPageToken,${selectedFields}`,
            pageSize: 1000,
            pageToken,
            key: API_KEY,
        })}`;

        const data = await fetchJson(url);
        if (Array.isArray(data.files)) {
            files.push(...data.files);
        }
        pageToken = data.nextPageToken;
    } while (pageToken);

    return files;
}

function toImageItem(file) {
    const id = file.id;
    return {
        id,
        name: file.name,
        viewUrl: `https://drive.google.com/uc?export=view&id=${id}`,
        thumbUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
        webViewLink: file.webViewLink || null,
    };
}

async function listFolders(parentId) {
    const query = `'${parentId}' in parents and mimeType='${DRIVE_FOLDER_MIME}' and trashed=false`;
    return listAllFiles(query, "files(id,name,mimeType)");
}

async function listImages(parentId) {
    const query = `'${parentId}' in parents and mimeType contains 'image/' and trashed=false`;
    return listAllFiles(query, "files(id,name,mimeType,webViewLink)");
}

app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "wedding-api" });
});

app.get("/api/photos", async (req, res) => {
    if (!API_KEY || !ROOT_FOLDER_ID) {
        res.status(500).json({
            message: "Missing Google Drive configuration. Set GOOGLE_DRIVE_API_KEY and GOOGLE_DRIVE_ROOT_FOLDER_ID.",
        });
        return;
    }

    try {
        const sideFolders = await listFolders(ROOT_FOLDER_ID);
        const sideRoots = sideFolders.length ? sideFolders : [{ id: ROOT_FOLDER_ID, name: "Photos" }];

        const groups = [];

        for (const side of sideRoots) {
            const categoryFolders = await listFolders(side.id);
            const categories = [];

            if (categoryFolders.length) {
                for (const category of categoryFolders) {
                    const images = await listImages(category.id);
                    categories.push({
                        name: category.name,
                        items: images.map(toImageItem),
                    });
                }
            } else {
                const images = await listImages(side.id);
                categories.push({
                    name: "All Photos",
                    items: images.map(toImageItem),
                });
            }

            groups.push({
                name: side.name,
                categories,
            });
        }

        res.json({
            updatedAt: new Date().toISOString(),
            groups,
        });
    } catch (error) {
        console.error("Failed to load photos", error);
        res.status(500).json({
            message: `Failed to load photos from Google Drive. ${error.message}`,
        });
    }
});

app.post("/api/photos", (req, res) => {
    res.status(501).json({
        message: "Upload endpoint not active yet. Planned for Phase 2 with GCS.",
    });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Wedding API running on http://localhost:${PORT}`);
});

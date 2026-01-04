'use server';

export interface CheckResult {
    status: 'online' | 'degraded' | 'offline';
    responseTime: number;
    statusCode: number;
    ssl?: {
        daysRemaining: number;
        valid: boolean;
        expiryDate: string;
    };
}

async function getSSLExpiry(hostname: string): Promise<{ daysRemaining: number; valid: boolean; expiryDate: string } | null> {
    const tls = await import('tls');
    const net = await import('net');

    return new Promise((resolve) => {
        const socket = tls.connect({
            host: hostname,
            port: 443,
            servername: hostname,
            rejectUnauthorized: false // We just want to check dates, not strictly fail on self-signed in dev
        }, () => {
            const cert = socket.getPeerCertificate();
            if (cert && cert.valid_to) {
                const validTo = new Date(cert.valid_to);
                const now = new Date();
                const msPerDay = 1000 * 60 * 60 * 24;
                const daysRemaining = Math.floor((validTo.getTime() - now.getTime()) / msPerDay);

                resolve({
                    daysRemaining,
                    valid: daysRemaining > 0,
                    expiryDate: validTo.toISOString()
                });
            } else {
                resolve(null);
            }
            socket.end();
        });

        socket.on('error', () => {
            resolve(null);
        });

        // Timeout
        socket.setTimeout(3000, () => {
            socket.destroy();
            resolve(null);
        });
    });
}

export async function checkSiteStatus(url: string): Promise<CheckResult> {
    // Ensure protocol
    let targetUrl = url;
    if (!targetUrl.startsWith('http')) {
        targetUrl = `https://${url}`;
    }

    const start = Date.now();
    let sslInfo = null;

    try {
        // Run checks in parallel if possible, but let's be sequential for simplicity first or Promise.all
        // Extract hostname for SSL check
        try {
            const urlObj = new URL(targetUrl);
            if (urlObj.protocol === 'https:') {
                sslInfo = await getSSLExpiry(urlObj.hostname);
            }
        } catch (e) {
            // Invalid URL format
        }

        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Pulse-Monitor/1.0',
            },
            // Short timeout to avoid hanging
            signal: AbortSignal.timeout(5000),
            cache: 'no-store'
        });

        const end = Date.now();
        const duration = end - start;

        let status: 'online' | 'degraded' | 'offline' = 'online';

        if (response.status >= 500) {
            status = 'offline';
        } else if (response.status >= 400) {
            status = 'degraded'; // 404s or 403s might be "degraded" or "offline" depending on definition, using degraded for now
        } else if (duration > 2000) {
            status = 'degraded';
        }

        return {
            status,
            responseTime: duration,
            statusCode: response.status,
            ssl: sslInfo || undefined
        };

    } catch (error) {
        const end = Date.now();
        return {
            status: 'offline',
            responseTime: end - start,
            statusCode: 0
        };
    }
}

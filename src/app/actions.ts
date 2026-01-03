'use server';

export interface CheckResult {
    status: 'online' | 'degraded' | 'offline';
    responseTime: number;
    statusCode: number;
}

export async function checkSiteStatus(url: string): Promise<CheckResult> {
    // Ensure protocol
    if (!url.startsWith('http')) {
        url = `https://${url}`;
    }

    const start = Date.now();
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Pulse-Monitor/1.0',
            },
            // Short timeout to avoid hanging
            signal: AbortSignal.timeout(5000)
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
            statusCode: response.status
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

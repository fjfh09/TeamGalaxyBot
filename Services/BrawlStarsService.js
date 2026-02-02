import { Client } from 'brawl-api-wrapper';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache default

class BrawlStarsService {
    constructor() {
        if (!process.env.TOKEN_B) {
            console.warn('WARNING: TOKEN_B is not set in environment variables.');
        }
        this.client = new Client(process.env.TOKEN_B);
    }

    async getPlayer(tag, forceUpdate = false) {
        const cacheKey = `player_${tag}`;
        if (!forceUpdate) {
            const cached = cache.get(cacheKey);
            if (cached) return cached;
        }

        try {
            const player = await this.client.getPlayer(tag);
            cache.set(cacheKey, player);
            return player;
        } catch (error) {
            console.error(`Error fetching player ${tag}:`, error.message);
            throw error;
        }
    }

    async getClub(tag, forceUpdate = false) {
        const cacheKey = `club_${tag}`;
        if (!forceUpdate) {
            const cached = cache.get(cacheKey);
            if (cached) return cached;
        }

        try {
            const club = await this.client.getClub(tag);
            cache.set(cacheKey, club);
            return club;
        } catch (error) {
            console.error(`Error fetching club ${tag}:`, error.message);
            throw error;
        }
    }

    async getRankingOfClubs(country = 'global') {
        const cacheKey = `ranking_clubs_${country}`;
        const cached = cache.get(cacheKey);
        if (cached) return cached;

        try {
            const ranking = await this.client.getRankingOfClubs(country);
            cache.set(cacheKey, ranking, 600); // 10 minutes cache for rankings
            return ranking;
        } catch (error) {
             console.error(`Error fetching ranking for ${country}:`, error.message);
             throw error;
        }
    }
}

export const brawlService = new BrawlStarsService();

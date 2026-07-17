import Redis from "redis";

const client = Redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

client.connect();

export async function getCache(key) {
  return await client.get(key);
}

export async function setCache(key, value, ttl = 3600) {
  await client.set(key, JSON.stringify(value), { EX: ttl });
}

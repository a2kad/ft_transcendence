// User profile structure example:
// {
//   id: number,
//   username: string,
//   displayName: string,
//   avatar: string (URL, default: '/public/default-avatar.png'),
//   wins: number,
//   losses: number
// }
import Fastify from 'fastify';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../data/database.sqlite');

export default async function userRoutes(fastify, opts) {
  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  // Register
  fastify.post('/api/register', async (request, reply) => {
    const { username, password, displayName } = request.body;
    // TODO: hash password, validate input
    try {
      await db.run('INSERT INTO users (username, password, displayName) VALUES (?, ?, ?)', [username, password, displayName]);
      reply.send({ success: true });
    } catch (err) {
      reply.code(400).send({ error: 'User already exists or invalid data.' });
    }
  });

  // Login
  fastify.post('/api/login', async (request, reply) => {
    const { username, password } = request.body;
    // TODO: hash password, validate input
    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (user) {
      // TODO: generate JWT or session
      reply.send({ success: true, user });
    } else {
      reply.code(401).send({ error: 'Invalid credentials.' });
    }
  });

  // Get profile
  fastify.get('/api/profile/:id', async (request, reply) => {
    const { id } = request.params;
    const user = await db.get('SELECT id, username, displayName, avatar FROM users WHERE id = ?', [id]);
    if (user) {
      if (!user.avatar) {
        user.avatar = '/public/default-avatar.png';
      }
      reply.send(user);
    } else {
      reply.code(404).send({ error: 'User not found.' });
    }
  });

  // Update profile
  fastify.put('/api/profile/:id', async (request, reply) => {
    const { id } = request.params;
    const { displayName, avatar } = request.body;
    await db.run('UPDATE users SET displayName = ?, avatar = ? WHERE id = ?', [displayName, avatar, id]);
    reply.send({ success: true });
  });

  // Add friend
  fastify.post('/api/friends', async (request, reply) => {
    const { userId, friendId } = request.body;
    await db.run('INSERT INTO friends (userId, friendId) VALUES (?, ?)', [userId, friendId]);
    reply.send({ success: true });
  });

  // Get friends
  fastify.get('/api/friends/:userId', async (request, reply) => {
    const { userId } = request.params;
    const friends = await db.all('SELECT friendId FROM friends WHERE userId = ?', [userId]);
    reply.send(friends);
  });

  // Get match history
  fastify.get('/api/matches/:userId', async (request, reply) => {
    const { userId } = request.params;
    const matches = await db.all('SELECT * FROM matches WHERE user1 = ? OR user2 = ? ORDER BY date DESC', [userId, userId]);
    reply.send(matches);
  });
}

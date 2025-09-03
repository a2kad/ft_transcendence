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
import bcrypt from 'bcrypt';
import { authenticate } from '../auth/jwt.js';

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../data/database.sqlite');

export default async function userRoutes(fastify, opts) {
  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  // Register
  fastify.post('/api/register', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password', 'displayName'],
        properties: {
          username: { type: 'string', minLength: 3, maxLength: 32 },
          password: { type: 'string', minLength: 6 },
          displayName: { type: 'string', minLength: 3, maxLength: 32 }
        }
      }
    }
  }, async (request, reply) => {
    const { username, password, displayName } = request.body;
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await db.run('INSERT INTO users (username, password, displayName) VALUES (?, ?, ?)', [username, hashedPassword, displayName]);
      reply.send({ success: true });
    } catch (err) {
      reply.code(400).send({ error: 'User already exists or invalid data.' });
    }
  });

  // Login
  fastify.post('/api/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', minLength: 3, maxLength: 32 },
          password: { type: 'string', minLength: 6 }
        }
      }
    }
  }, async (request, reply) => {
    const { username, password } = request.body;
    const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);
    if (user && await bcrypt.compare(password, user.password)) {
      // TODO: generate JWT or session
      reply.send({ success: true, user });
    } else {
      reply.code(401).send({ error: 'Invalid credentials.' });
    }
  });

  // Get profile
  fastify.get('/api/profile/:id', { preHandler: [authenticate] }, async (request, reply) => {
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
  fastify.put('/api/profile/:id', {
    preHandler: [authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['displayName', 'avatar'],
        properties: {
          displayName: { type: 'string', minLength: 3, maxLength: 32 },
          avatar: { type: 'string' }
        }
      },
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { displayName, avatar } = request.body;
    await db.run('UPDATE users SET displayName = ?, avatar = ? WHERE id = ?', [displayName, avatar, id]);
    reply.send({ success: true });
  });

  // Add friend
  fastify.post('/api/friends', {
    preHandler: [authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['userId', 'friendId'],
        properties: {
          userId: { type: 'integer' },
          friendId: { type: 'integer' }
        }
      }
    }
  }, async (request, reply) => {
    const { userId, friendId } = request.body;
    await db.run('INSERT INTO friends (userId, friendId) VALUES (?, ?)', [userId, friendId]);
    reply.send({ success: true });
  });

  // Get friends
  fastify.get('/api/friends/:userId', { preHandler: [authenticate] }, async (request, reply) => {
    const { userId } = request.params;
    const friends = await db.all('SELECT friendId FROM friends WHERE userId = ?', [userId]);
    reply.send(friends);
  });

  // Get match history
  fastify.get('/api/matches/:userId', { preHandler: [authenticate] }, async (request, reply) => {
    const { userId } = request.params;
    const matches = await db.all('SELECT * FROM matches WHERE user1 = ? OR user2 = ? ORDER BY date DESC', [userId, userId]);
    reply.send(matches);
  });
}

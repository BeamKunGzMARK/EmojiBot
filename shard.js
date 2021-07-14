const { ShardingManager } = require('discord.js');
const config = require('./config.json');
const manager = new ShardingManager('./bot.js', { token: config.Token,  totalShards: 'auto', })

manager.spawn()

manager.on('shardCreaten', shard => console.log(`- Spawned shard ${shard.id} -`)); // Optional
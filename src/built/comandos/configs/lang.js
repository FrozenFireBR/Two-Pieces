module.exports = {
  name: 'lang',
  aliases: ['setlang'],
  run: async (client, message, args, prefix) => {
    const setLang = new client.embed()
    .setTitle('Escolha uma linguagem | Choose a language')
    .setDescription(`๐ง๐ท -> pt\n\n๐บ๐ธ -> en`);
    message.reply({ embeds: [setLang] }).then(msg => {
      msg.react('๐บ๐ธ');
      msg.react('๐ง๐ท');
      let filter = (reaction, user) => user.id === message.author.id;
      msg.createReactionCollector({ filter, time: 90000, max: 1 }).on('collect', async (reaction, user) => {
        let map = {
          '๐บ๐ธ': 'en',
          '๐ง๐ท': 'pt',
          'pt': 'portuguรชs',
          'en': 'english'
        };
        const newLang = map[reaction.emoji.name.replace(new RegExp(':', 'g'), '')];

        client.db.ref(`Users/${message.author.id}/lang`).set(newLang);

        msg.reply(client.lang[await message.author.lang](client, 'configs', 'lang').reply(message, map[newLang]))
      })
    })
  }
}
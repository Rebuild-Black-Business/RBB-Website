require('isomorphic-fetch');

const COLORS = {
  debug: parseInt('fbe14f', 16),
  info: parseInt('2788ce', 16),
  warning: parseInt('f18500', 16),
  error: parseInt('e03e2f', 16),
  fatal: parseInt('d20f2a', 16),
};

exports.handler = function (event, context, callback) {
  try {
    const { body } = event;
    console.log('body', typeof body, body);
    console.log('event', typeof body.event, body.event);

    const payload = {
      username: 'Sentry',
      avatar_url: `https://sentry-brand.storage.googleapis.com/sentry-glyph-black.png`,
      embeds: [
        {
          title: body.project_name,
          type: 'rich',
          description: body.message,
          url: body.url,
          timestamp: new Date(body.event.received * 1000).toISOString(),
          color: COLORS[body.level] || COLORS.error,
          fields: [],
        },
      ],
    };

    if (body.event.user) {
      payload.embeds[0].fields.push({
        name: '**User**',
        value: body.event.user.username,
      });
    }

    if (body.event.tags) {
      body.event.tags.forEach(([key, value]) => {
        payload.embeds[0].fields.push({
          name: key,
          value,
          inline: true,
        });
      });
    }

    console.log('sending', payload);
    fetch(process.env.SENTRY_DISCORD_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(data => callback(null, data))
      .catch(callback);
  } catch (err) {
    console.error(err);
  }
};

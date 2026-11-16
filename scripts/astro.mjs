// Runs Astro with its anonymous usage reporting switched off, whatever the
// computer's global Astro setting says. Every npm script goes through here.
//
//   node scripts/astro.mjs dev    (same as `astro dev`)

process.env.ASTRO_TELEMETRY_DISABLED = '1';
await import('../node_modules/astro/bin/astro.mjs');

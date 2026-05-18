import fs from 'fs';
import path from 'path';

const OUTPUT = path.resolve(process.cwd(), 'audio-check-report.json');

const RECITERS = [
  { id: 'alafasy', slug: 'afs' },
  { id: 'basit', slug: 'abdul_basit_murattal' },
  { id: 'ajmy', slug: 'ajm' },
  { id: 'saad', slug: 's_gmd' },
  { id: 'minshawi', slug: 'minsh' },
  { id: 'maher', slug: 'maher' },
  { id: 'yasser', slug: 'yasser' },
  { id: 'fars', slug: 'frs_a' },
  { id: 'qtm', slug: 'qtm' },
  { id: 'shatri', slug: 'shatri' },
  { id: 'husr', slug: 'husr' },
  { id: 'sobhi', slug: 'sobhi' },
];

const AUDIO_BASES = {
  afs: 'https://server8.mp3quran.net/afs',
  s_gmd: 'https://server7.mp3quran.net/s_gmd',
  minsh: 'https://server10.mp3quran.net/minsh',
  ajm: 'https://server10.mp3quran.net/ajm',
  maher: 'https://server12.mp3quran.net/maher',
  yasser: 'https://server11.mp3quran.net/yasser',
  frs_a: 'https://server8.mp3quran.net/frs_a',
  qtm: 'https://server6.mp3quran.net/qtm',
  shatri: 'https://server11.mp3quran.net/shatri',
  husr: 'https://server13.mp3quran.net/husr',
  abdul_basit_murattal: 'https://server7.mp3quran.net/basit',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function head(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return { ok: res.ok, status: res.status, ct: res.headers.get('content-type') };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

(async () => {
  const report = { date: new Date().toISOString(), results: {} };

  console.log('Starting audio checks for', RECITERS.length, 'reciters');

  for (const rec of RECITERS) {
    console.log('Checking reciter', rec.id);
    const recReport = { working: 0, total: 114, failures: [] };
    for (let s = 1; s <= 114; s++) {
      const padded = String(s).padStart(3, '0');
      const candidates = [];
      if (AUDIO_BASES[rec.slug]) candidates.push(`${AUDIO_BASES[rec.slug]}/${padded}.mp3`);
      candidates.push(`https://download.quranicaudio.com/quran/${rec.slug}/${padded}.mp3`);

      let found = null;
      for (const c of candidates) {
        const r = await head(c);
        if (r.ok && r.ct && r.ct.includes('audio')) { found = { url: c, status: r.status, ct: r.ct }; break; }
        await sleep(60);
      }

      if (found) {
        recReport.working += 1;
      } else {
        recReport.failures.push({ surah: s, candidates });
      }

      // every 10 surahs, log progress
      if (s % 10 === 0) console.log(`  ${rec.id}: checked ${s}/114`);
    }
    report.results[rec.id] = recReport;
    // write intermediate report
    fs.writeFileSync(OUTPUT, JSON.stringify(report, null, 2));
    console.log('  finished', rec.id, 'working:', recReport.working);
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(report, null, 2));
  console.log('Final report written to', OUTPUT);
})();

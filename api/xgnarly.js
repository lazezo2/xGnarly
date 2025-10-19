const { encode } = require('../encode');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const { queryString = '', body = '', userAgent = '' } = req.body;
    const xGnarly = encode({ queryString, body, userAgent });
    res.status(200).json({ xGnarly });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

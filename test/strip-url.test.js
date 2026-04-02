const assert = require('assert');
const { stripUrl } = require('../strip-url.js');

const tests = [
  {
    name: 'strips all query params (keepId=false)',
    input: ['https://app.hubspot.com/contacts/4932755/record/0-2/946257495?eschref=%2Fcontacts%2F4932755%2Fobjects%2F0-2%2Fviews%2Fall%2Flist%3Fquery%3D%2520E-Resourcing', false],
    expected: 'https://app.hubspot.com/contacts/4932755/record/0-2/946257495'
  },
  {
    name: 'keeps id param with original casing (capital I)',
    input: ['https://www.linkedin.com/jobs/search/?alertAction=viewjobs&Id=4394660360&distance=25&f_E=6&f_SB2=49', true],
    expected: 'https://www.linkedin.com/jobs/search/?Id=4394660360'
  },
  {
    name: 'keeps id param lowercase',
    input: ['https://example.com/?foo=bar&id=999&baz=qux', true],
    expected: 'https://example.com/?id=999'
  },
  {
    name: 'keeps id param uppercase ID',
    input: ['https://example.com/?foo=bar&ID=42', true],
    expected: 'https://example.com/?ID=42'
  },
  {
    name: 'no id param and keepId=true strips all',
    input: ['https://example.com/?foo=bar&baz=qux', true],
    expected: 'https://example.com/'
  },
  {
    name: 'no query string is unchanged',
    input: ['https://example.com/path', false],
    expected: 'https://example.com/path'
  },
  {
    name: 'hash is preserved',
    input: ['https://example.com/page?foo=bar#section', false],
    expected: 'https://example.com/page#section'
  },
  {
    name: 'invalid URL returns null',
    input: ['not-a-url', true],
    expected: null
  },
  {
    name: 'whitespace is trimmed',
    input: ['  https://example.com/?foo=bar  ', false],
    expected: 'https://example.com/'
  },
  {
    name: 'M&S affiliate URL stripped (keepId=false)',
    input: ['https://www.marksandspencer.com/checked-bubble-hem-funnel-neck-jacket/p/clp61219615?color=BLACKMIX&extid=af_Editorial+Content_Clique+Inc_-_-_-_-_AWIN-ms_-_-_-_250777_&sv_campaign_id=250777&sv_tax1=affiliate&sv_tax3=Clique+Inc&sv_tax4=0&sv_affiliate_id=250777&sv1=affiliate&awc=1402_1775152779_fb6eb07c0a5ea44e053b3fc71160fb43', false],
    expected: 'https://www.marksandspencer.com/checked-bubble-hem-funnel-neck-jacket/p/clp61219615'
  },
  {
    name: 'M&S affiliate URL with keepId=true (no id param) strips all',
    input: ['https://www.marksandspencer.com/checked-bubble-hem-funnel-neck-jacket/p/clp61219615?color=BLACKMIX&sv_campaign_id=250777', true],
    expected: 'https://www.marksandspencer.com/checked-bubble-hem-funnel-neck-jacket/p/clp61219615'
  }
];

let passed = 0;
for (const { name, input, expected } of tests) {
  const result = stripUrl(...input);
  try {
    assert.strictEqual(result, expected);
    console.log(`  PASS  ${name}`);
    passed++;
  } catch {
    console.error(`  FAIL  ${name}`);
    console.error(`        expected: ${expected}`);
    console.error(`        got:      ${result}`);
  }
}

console.log(`\n${passed}/${tests.length} passed`);
if (passed < tests.length) process.exit(1);

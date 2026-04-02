const api = typeof browser !== 'undefined' ? browser : chrome;

function stripUrl(raw, keepId) {
  let url;
  try { url = new URL(raw.trim()); } catch { return null; }
  if (!keepId) { url.search = ''; return url.href; }
  let idKey = null, idVal = null;
  for (const [k, v] of url.searchParams) {
    if (k.toLowerCase() === 'id') { idKey = k; idVal = v; break; }
  }
  url.search = '';
  if (idKey !== null) url.searchParams.set(idKey, idVal);
  return url.href;
}

api.runtime.onInstalled.addListener(() => {
  for (const item of [
    { id: 'current',   title: 'Open clean link in current tab' },
    { id: 'new',       title: 'Open clean link in new tab' },
    { id: 'incognito', title: 'Open clean link in new incognito tab' },
    { id: 'sep',       type: 'separator' },
    { id: 'settings',  title: 'Settings' }
  ]) {
    api.contextMenus.create({ ...item, contexts: ['link'] });
  }
});

api.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'settings') {
    api.tabs.create({ url: api.runtime.getURL('options.html') });
    return;
  }
  const { keepId = true } = await api.storage.sync.get('keepId');
  const url = stripUrl(info.linkUrl, keepId);
  if (!url) return;
  if (info.menuItemId === 'current') api.tabs.update(tab.id, { url });
  else if (info.menuItemId === 'new') api.tabs.create({ url });
  else if (info.menuItemId === 'incognito') api.windows.create({ url, incognito: true });
});

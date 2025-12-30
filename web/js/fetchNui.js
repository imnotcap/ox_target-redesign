const isNui = typeof GetParentResourceName === 'function';
const resource = isNui ? GetParentResourceName() : 'target';

export async function fetchNui(eventName, data) {
  if (!isNui) {
    console.log('NUI Event:', eventName, data);
    return { ok: true };
  }
  
  const resp = await fetch(`https://${resource}/${eventName}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  return await resp.json();
}
export type NativeShareData = Pick<ShareData, 'files' | 'text' | 'title' | 'url'>;

function normalizeNativeShareData(data: NativeShareData): ShareData {
  return {
    ...(data.title ? { title: data.title } : {}),
    ...(data.text ? { text: data.text } : {}),
    ...(data.url ? { url: data.url } : {}),
    ...(data.files?.length ? { files: data.files } : {}),
  };
}

function hasSharePayload(data: NativeShareData) {
  return Boolean(data.title || data.text || data.url || data.files?.length);
}

export function canNativeShare(data: NativeShareData = {}) {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
    return false;
  }

  if (!hasSharePayload(data)) {
    return false;
  }

  const shareData = normalizeNativeShareData(data);

  if (shareData.files?.length) {
    return typeof navigator.canShare === 'function' && navigator.canShare(shareData);
  }

  if (typeof navigator.canShare === 'function') {
    try {
      return navigator.canShare(shareData);
    } catch {
      return true;
    }
  }

  return true;
}

export async function shareNative(data: NativeShareData) {
  if (!canNativeShare(data)) {
    throw new Error(
      data.files?.length
        ? 'native share with files is not supported'
        : 'native share is not supported',
    );
  }

  await navigator.share(normalizeNativeShareData(data));
}

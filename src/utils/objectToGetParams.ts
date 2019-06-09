export default function objectToGetParams(object: {
  [key: string]: string | number | undefined | null;
}) {
  return (
    '?' +
    Object.entries(object)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join('&')
  );
}

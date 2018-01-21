/*
 * This detection method identifies Internet Explorers up until version 11.
 *
 * Reference: https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
 */
export default function isInternetExplorerBefore(version) {
  const iematch = (/MSIE ([0-9]+)/g.exec(window.navigator.userAgent));

  return iematch ? +iematch[1] < version : false;
}

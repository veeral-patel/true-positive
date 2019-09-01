function check(s: string, regex: RegExp): boolean {
  if (s.match(regex)) {
    return true;
  }
  return false;
}

const md5Regex = /\b[A-Fa-f0-9]{32}\b/gi;
function isMD5(s: string): boolean {
  return check(s, md5Regex);
}

const sha1Regex = /\b[A-Fa-f0-9]{40}\b/gi;
function isSHA1(s: string): boolean {
  return check(s, sha1Regex);
}

const sha256Regex = /\b[A-Fa-f0-9]{64}\b/gi;
function isSHA256(s: string): boolean {
  return check(s, sha256Regex);
}

const ipv4Regex = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\[?\.\]?){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/gi;
function isIPv4(s: string): boolean {
  return check(s, ipv4Regex);
}

const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;
function isIPv6(s: string): boolean {
  return check(s, ipv6Regex);
}

const urlRegex = /(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)??(?:localhost|(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#][^\s"]*)?/gi;
function isURL(s: string): boolean {
  return check(s, urlRegex);
}

export function matchIndicator(
  indicator: string
): "MD5" | "SHA1" | "SHA256" | "OTHER" | "IPv4" | "IPv6" | "URL" {
  if (isMD5(indicator)) return "MD5";
  if (isSHA1(indicator)) return "SHA1";
  if (isSHA256(indicator)) return "SHA256";
  if (isIPv4(indicator)) return "IPv4";
  if (isIPv6(indicator)) return "IPv6";
  if (isURL(indicator)) return "URL";
  return "OTHER";
}

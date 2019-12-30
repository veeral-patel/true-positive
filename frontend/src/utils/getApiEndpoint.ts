import parseDomain from "parse-domain";

function getApiEndpointInDev(): string {
  const apiDomain = process.env.REACT_APP_API_DOMAIN;
  const parsed = parseDomain(window.location.href);

  var subdomain = "";
  if (parsed !== null) subdomain = parsed.subdomain;

  return `http://${subdomain}.${apiDomain}`;
}

function getApiEndpoint(): string {
  if (process.env.NODE_ENV === "development") return getApiEndpointInDev();
  else {
    throw "Update getApiEndpoint in getApiEndpoint.ts to support non-development environments!";
  }
}

export { getApiEndpoint };

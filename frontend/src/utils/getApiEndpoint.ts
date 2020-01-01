function getApiEndpointInDev(): string {
  return "http://localhost:4000";
}

function getApiEndpoint(): string {
  if (process.env.NODE_ENV === "development") return getApiEndpointInDev();
  else {
    throw "Update getApiEndpoint in getApiEndpoint.ts to support non-development environments!";
  }
}

export { getApiEndpoint };

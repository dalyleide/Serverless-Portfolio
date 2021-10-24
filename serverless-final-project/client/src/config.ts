const apiId = 'pav4j8aqy9.execute-api.sa-east-1'
export const apiEndpoint = `https://${apiId}.amazonaws.com/dev`

export const authConfig = {
  // Create an Auth0 application and copy values from it into this map
  domain: 'dev-70c1jbzj.us.auth0.com',            // Auth0 domain
  clientId: 'sy4fwNZfwHvSQ7OnFHGoiNTRuoALFDJG',   // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}

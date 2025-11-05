const common = require('oci-common'); // For authenticating (See https://www.npmjs.com/package/oci-common)
const aispeech = require('oci-aispeech'); // To retreive the JWT token (See https://www.npmjs.com/package/oci-aispeech)
const express = require('express');
const os = require('os');
const PORT = 8080; // Change if needed
const COMPARTMENT_ID = process.env.TF_VAR_compartment_ocid;
const PROFILE_NAME = 'OCI_SPEECH'; // As an example not to overwrite an eventual existing default profile
const PROFILE_PATH = `${os.homedir()}/.oci/config`;
const REGION = process.env.TF_VAR_region;
async function getRealtimeSessionToken(region, compartmentId) {
    try {
        // Use the AuthDetailsProvider suited for your use case.
        // Read more at - https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdk_authentication_methods.htm
        // const authenticationProvider = new common.SessionAuthDetailProvider(PROFILE_PATH, PROFILE_NAME);
        // authenticationProvider.setRegion(region);
        const authenticationProvider = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
        // Initialize the OCI AI Speech API Client
        const speechClient = new aispeech.AIServiceSpeechClient({ authenticationDetailsProvider: authenticationProvider });
        // Create a request and dependent object(s).
        const createRealtimeSessionTokenDetails = {
            compartmentId: compartmentId,
        };
        const createRealtimeSessionTokenRequest = {
            createRealtimeSessionTokenDetails: createRealtimeSessionTokenDetails,
        };
        // Send request to the Client.
        const createRealtimeSessionTokenResponse = await speechClient.createRealtimeSessionToken(createRealtimeSessionTokenRequest);
        return { realtimeSessionToken: createRealtimeSessionTokenResponse.realtimeSessionToken.token };
    } catch (e) {
        console.error(e);
        return e;
    }
}

const app = express();
app.use(express.json());
app.listen(PORT, () => {
    console.log('OCI speech token server listening on port:', PORT);
});

app.get('/getToken', async (_request, response) => {
    const token = await getRealtimeSessionToken(REGION, COMPARTMENT_ID);
    response.setHeader('Access-Control-Allow-Origin',
        '*');
    if (token.realtimeSessionToken) {
        response.send({
            compartmentId: COMPARTMENT_ID,
            region: REGION,
            token: token.realtimeSessionToken
        });
    } else {
        response.status(token.statusCode || 500).send();
    }
});

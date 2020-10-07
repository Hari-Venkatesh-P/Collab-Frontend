const base64 = require('base64url');

function setTokens(payloadFromLogin){
    sessionStorage.setItem("token",payloadFromLogin.token)
    sessionStorage.setItem("id",payloadFromLogin._id)
}

function retrievePayloadFromToken(){
    const token = sessionStorage.getItem('token')
    if(token){
        const jwtParts = token.split('.');
        const payloadInBase64UrlFormat = jwtParts[1];
        const decodedPayload = base64.decode(payloadInBase64UrlFormat);
        return JSON.parse(decodedPayload)
    }
}

function isMemberLoggedIn(){
    const payloadFromToken = retrievePayloadFromToken()
    if(payloadFromToken && payloadFromToken.role==="MEMBER"){
        return true
    }else{
        return false
    }
}

function getLoggedInUserId(){
    const payloadFromToken = retrievePayloadFromToken()
    if(payloadFromToken.id && payloadFromToken.role==="MEMBER"){
        return payloadFromToken.id
    }
}

module.exports = {
    isMemberLoggedIn,
    setTokens,
    getLoggedInUserId
}
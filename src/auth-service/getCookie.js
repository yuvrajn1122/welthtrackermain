// Function to get a specific cookie by name
function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie); // Decode in case cookies are encoded
    let cookiesArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null; // Return null if cookie is not found
}

// Usage: get the token from cookies
const token = getCookie('token'); // Assuming your cookie's name is 'token'
if (token) {
    console.log("Token retrieved from cookie:", token);
} else {
    console.log("Token not found in cookies.");
}

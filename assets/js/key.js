// I GOT API KEY FROM THIS CODE
//import { API_AUTH_KEY } from "./constants.js";
//
//function load() {
//  return localStorage.getItem("accessToken");
//}
//
//export async function getKey(name) {
//    try {
//      const response = await fetch(API_AUTH_KEY, {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//          Authorization: `Bearer ${load("accessToken")}`
//        },
//        body: JSON.stringify({
//          name: name
//        })
//      });
//      if (!response.ok) {
//        throw new Error(`Error fetching API key: ${response.statusText}`);
//      }
//  
//      const data = await response.json();
//      const apiKey = data.data.key;
//      
//      console.log("Your API Key:", apiKey);
//  
//      return apiKey;
//    } catch (error) {
//      console.error('Error:', error);
//    }
//  }
//getKey();
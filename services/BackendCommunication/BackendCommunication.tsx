/**
 * Handles all backend communication
 * Includes e.g. error handling
 */
 import axios, { AxiosError, AxiosRequestConfig } from 'axios';
 import Authentication from '../Authentification/Authentication';
 
 
 class BackendCommunication {
     private baseUrl='http://localhost:3000/api/'
 
 
 
 
     constructor() {
     }
 
     private beautifyError(err: AxiosError) {
         let backendErrMsg =
             err.response?.data.message || err.message;
         throw new Error(backendErrMsg);
     }
 

 
     /**
      * Add custom config which will be added to all requests
      */
     private makeReqConfig(): AxiosRequestConfig {
         const config: AxiosRequestConfig = {};
         const jwToken = Authentication.getCurrentUser()?.token;
         if (jwToken) {
             config.headers = { 'JWT-Authorization': `Bearer ${jwToken}` }
         }
         return config;
     }
 
     /**
      * @throws beautified error when error happened
      * @returns response from backend
      * @param url 
      */
     async get(url: string): Promise<any> {
         try {
             return await (await axios.get(this.baseUrl + url, this.makeReqConfig())).data;
         } catch (e) {
             this.beautifyError(e);
         }
     }
 
     /**
      * @throws beautified error when error happened
      * @param url 
      * @param data 
      * @returns response from backend
      */
     async post(url: string, data: any) {
         try {
             return await (await axios.post(this.baseUrl + url, data, this.makeReqConfig())).data;
         } catch (e) {
             this.beautifyError(e);
         }
     }
 
 
     /**
      * @throws beautified error when error happened
      * @param url 
      * @param data 
      * @returns response from backend
      */
     async put(url: string, data: any) {
         try {
             return await (await axios.put(this.baseUrl + url, data, this.makeReqConfig())).data;
         } catch (e) {
             this.beautifyError(e);
         }
     }
 }
 
 export default new BackendCommunication();
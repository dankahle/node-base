# node-base
A node common project for reusable node code across all node projects. This pattern affords consistency between your node projects and your frontends as well, as the standard error messages and codes support reusable UI error handling.

### features
* standardized error codes to sync all backend/frontend error codes
* standardized error classes which allow errors from other apis to be included (ExtendedError)
* configuration of node-base functionality via backend node project configuration files
* mocha/chai unit testing 
* supertest api testing
* errorHandling middleware standarization, all errors emit the same error objects and codes
* 404 handling standardization
* tv4/tv4-formats JSON schema validation. Pass in object and schema and tv4 validates returning an array of error messages.

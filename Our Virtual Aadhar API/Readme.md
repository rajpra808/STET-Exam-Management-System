# Virtual Aadhar API Created By Our Team

# Aadhar-backend

##### This is a vertual Aadhar API to verify aadhar numbers in STET system. This can be easily replaced by the original API as we developed it by considering original Aadhar API documentation.


# HOW TO USE API:

	1. Send aadhar number in the body of a JSON object using a POST request.

	2. Send GET request to the API after verification to get the registered phone number. 

	3. Send a POST request with the number in the body of a JSON object to send OTP. 

	4. Send a GET request with the entered text as part of the url to verify OTP.
---
#### Demographic Aadhar numbers stored in our database with mobile number:

| Aadhar Number  |	Mobile Number |
|---------------|--------------------|


##### Return Messages: Message containing OTP.

# STET ANDROID APPLICATION 

# Introduction

> For making process of Registration, Admit card  and Result declaration online.
# Brief Description (Non-Technical) 
- This software contains an interface for registration process (where candidate can fill their details, upload their documents and make payment),admit card and result declaration.
- Software contains three option for uploading documents:
- Select and Upload from phone storage.	
- Click and upload from phone camera.

# Brief Description (Technical) : 
- Kotlin , XML for frontend android development.
- Nodejs for backend android development.
- MongoDB for Database.
- Razorpay api for payment.
- Firebase for phone and email authentication.


# Dependencies : 
- Retrofit dependencies for callback to server.
  ```
  	"com.squareup.retrofit2:retrofit:2.3.0"
  	"com.squareup.retrofit2:adapter-rxjava2:2.3.0"
  	"com.squareup.retrofit2:converter-gson:2.3.0"
  	"io.reactivex.rxjava2:rxandroid:2.0.1"
   ```
- Firebase dependencies for authentication.
  ```
  	Connect Firebase authenication.
	"com.google.firebase:firebase-auth:19.3.2"
  ```

- Razorpay dependencies for payment.
  ```
	"com.razorpay:checkout:1.5.16"
  ```




# How to run the application:
```
 Download Code from Github.
 Open Android Studio.
 Click on File-> New-> Import Project.
 Select Directory/Folder.
 Build the project.
```
 
#  Important Points about Test Mode and Production mode:
- Test Mode:
	- User can move forward to profile page without verification of phone number,email and aadhar number.
	- User can move forward to final verification page without payment.
	- User can submit final registration without OTP verification.
- Production Mode:
	- Signup process will not be succesfull unless user verify phone number,email and aadhar number.
	- Payment is neccessary for final verification.
	- Final OTP verification is compulsary.

# User-Id and Password for testing purpose:
	phone:"6387012615" password:"Abc@123"

# APIs: 
- Razorpay api for payment through razorpay.
- Aadhar api for aadhar verification.
- Google Firebase api for phone number and email authentication.
- Nexmo api for sending sms.

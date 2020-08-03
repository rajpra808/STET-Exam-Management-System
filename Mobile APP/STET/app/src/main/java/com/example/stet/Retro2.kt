package com.example.stet


import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path


interface Retro2 {
    @POST("/users/authenticate")                //aadhar authenicate
    fun checkAadhar(@Body map: HashMap<String, String>): Call<Void?>?

    @GET("/users/{username}")                       //get phone number
    fun getPhn(@Path("username") username: String?): Call<Body1?>?

    @POST("/otp/123456789")                         //get otp
    fun getotp(@Body map: HashMap<String, String?>): Call<Void?>?

    @GET("/otp/123456789/{number}")                     //check otp
    fun matchotp(@Path("number") number: String?): Call<Void?>?

}

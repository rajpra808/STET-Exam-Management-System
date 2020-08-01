package com.example.stet


import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path


interface Retro2 {
    @POST("/users/authenticate")
    fun checkAadhar(@Body map: HashMap<String, String>): Call<Void?>?

    @GET("/users/{username}")
    fun getPhn(@Path("username") username: String?): Call<Body1?>?

    @POST("/otp/123456789")
    fun getotp(@Body map: HashMap<String, String?>): Call<Void?>?

    @GET("/otp/123456789/{number}")
    fun matchotp(@Path("number") number: String?): Call<Void?>?

}

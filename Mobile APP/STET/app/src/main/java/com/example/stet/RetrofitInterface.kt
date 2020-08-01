package com.example.stet


import android.provider.ContactsContract
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.*


interface RetrofitInterface {

    @POST("/login")
    fun executeLogin(@Body map: HashMap<String?, String?>?): Call<Void?>?

    @POST("/signup")
    fun executeSignup(@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/details")
    fun executeDetail(@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/education")
    fun executeEducation(@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/phone")
    fun getDetails(@Body map: HashMap<String?, String?>?): Call<Important?>?

    @POST("/check")
    fun check(@Body map: HashMap<String?, String?>?): Call<Void?>?

    @POST("/getpersonal")
    fun getPersonal(@Body map: HashMap<String?, String?>?): Call<Personal?>?

    @POST("/getpreferences")
    fun getPreferences(@Body map: HashMap<String?, String?>?): Call<PreferenceClass?>?

    @POST("/getEducation")
    fun getEducation(@Body map: HashMap<String?, String?>?): Call<Education?>?

    @POST("/updatedetails")
    fun updateDetail(@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/timing")
    fun timings(@Body map: HashMap<String?, String?>?): Call<Void?>?

    @GET("/timeline/{year}")
    fun timeline(@Path ("year") year:String):Call<Schedule>

    @POST("/resetpassword")
    fun resetpassword(@Body map: HashMap<String, String>): Call<Void?>?

    @GET("/showpassword/{Phone}")
    fun showpassword(@Path ("Phone") Phone:String):Call<Password>

    @POST("/payment")
    fun payment(@Body map: HashMap<String, String>):Call<Void>

    @GET("/paymentdetails/{phone}")
    fun getpayment(@Path ("phone") phone:String):Call<Payment>

    @GET("/submitted/{Phone}")
    fun submittedphone(@Path("Phone") Phone: String):Call<Void>
}
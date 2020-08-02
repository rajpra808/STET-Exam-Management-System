package com.example.stet



import retrofit2.Call
import retrofit2.http.*


interface RetrofitInterface {

    @POST("/login")
    fun executeLogin(@Body map: HashMap<String?, String?>?): Call<Void?>?
    @POST("/logout")
    fun executeSession(@Header ("cookieName") cookieName: String): Call<Void?>?
    @POST("/session")
    fun executeLogout(@Header ("cookieName") cookieName: String): Call<Void?>?

    @POST("/signup")
    fun executeSignup(@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/details")
    fun executeDetail(@Header ("cookieName") cookieName: String,@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/education")
    fun executeEducation(@Header ("cookieName") cookieName: String,@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/phone")
    fun getDetails(@Header ("cookieName") cookieName: String,@Body map: HashMap<String?, String?>?): Call<Important?>?

    @POST("/check")
    fun check(@Header ("cookieName") cookieName: String,@Body map: HashMap<String?, String?>?): Call<Void?>?

    @POST("/getpersonal")
    fun getPersonal(@Header ("cookieName") cookieName: String,@Body map: HashMap<String?, String?>?): Call<Personal?>?

    @POST("/getpreferences")
    fun getPreferences(@Header ("cookieName") cookieName: String,@Body map: HashMap<String?, String?>?): Call<PreferenceClass?>?

    @POST("/getEducation")
    fun getEducation(@Header ("cookieName") cookieName: String,@Body map: HashMap<String?, String?>?): Call<Education?>?

    @POST("/updatedetails")
    fun updateDetail(@Body map: HashMap<String, String>): Call<Void?>?

    @POST("/timing")
    fun timings(@Header ("cookieName") cookieName: String,@Body map: HashMap<String?, String?>?): Call<Void?>?

    @GET("/timeline/{year}")
    fun timeline(@Header ("cookieName") cookieName: String,@Path ("year") year:String):Call<Schedule>

    @POST("/resetpassword")
    fun resetpassword(@Body map: HashMap<String, String>): Call<Void?>?

    @GET("/showpassword/{Phone}")
    fun showpassword(@Path ("Phone") Phone:String):Call<Password>

    @POST("/payment")
    fun payment(@Header ("cookieName") cookieName: String,@Body map: HashMap<String, String>):Call<Void>

    @GET("/paymentdetails/{phone}")
    fun getpayment(@Header ("cookieName") cookieName: String,@Path ("phone") phone:String):Call<Payment>

    @GET("/submitted/{Phone}")
    fun submittedphone(@Header ("cookieName") cookieName: String,@Path("Phone") Phone: String):Call<Void>
}
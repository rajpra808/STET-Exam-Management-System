package com.example.stet


import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.*


interface Retro3 {

    //upload documents

    @Multipart
    @POST("/upload_aadhar")
    fun postImageaadhar(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_tenth")
    fun postImagetenth(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_twelveth")
    fun postImagetwelveth(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_photo")
    fun postImagephoto(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_birth")
    fun postImagebirth(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_community")
    fun postImagecommunity(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_signature")
    fun postImagesignature(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_subject")
    fun postImagesubject(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_graduationmarksheet")
    fun postImagegraduationmarksheet(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?
    @Multipart
    @POST("/upload_graduationcertificate")
    fun postImagegraduationcertificate(@Part image: MultipartBody.Part?, @Part("upload") name: RequestBody?): Call<ResponseBody?>?

    @Multipart
    @POST("/uploadmultiple")
    fun postMultipleImage(@Part image1: MultipartBody.Part, @Part image2: MultipartBody.Part): Call<ResponseBody?>?

    @POST("/documents")
    fun documents(@Body map: HashMap<String?, String?>?): Call<Void?>?

    //remove documents

    @GET("/remove/{filename}/{coll}")
    fun removefile(@Path("filename") filename: String, @Path("coll") coll: String):Call<Void?>?

    //get image

    @GET("/image/{filename}/{coll}")
    fun imagefile(@Path("filename") filename: String, @Path("coll") coll: String):Call<Image?>?

    //download admit card

    @GET("/download/{filename}/{coll}")
    fun downloadfile(@Path("filename") filename: String, @Path("coll") coll: String):Call<Image?>?

    //check for documents

    @GET("/available/{filename}/{coll}")
    fun getfile(@Path("filename") filename: String, @Path("coll") coll: String):Call<Void?>?

    /*@Multipart
    @POST("/uploadmultiple")
    fun submitNew(
        @Part files: Array<MultipartBody.Part?>?
    ): Call<Void?>?*/
}
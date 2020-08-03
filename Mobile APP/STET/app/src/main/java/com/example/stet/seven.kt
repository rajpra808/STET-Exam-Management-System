package com.example.stet

import android.Manifest
import android.app.Activity
import android.app.ProgressDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.annotation.NonNull
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import kotlinx.android.synthetic.main.page_7.*
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.*
import java.util.*
import kotlin.collections.HashMap


class seven : AppCompatActivity() {
    //documents upload

    private val PICK_IMAGE_REQUEST = 1
    private val CLICK_PHOTO = 2
    private var bit: Bitmap? = null
    private var filePath: Uri? = null


    private val URL = "https://stet2020.herokuapp.com/"
    private var bit1: Bitmap? = null
    private var bit2: Bitmap? = null
    private var bit3: Bitmap? = null
    private var bit4: Bitmap? = null
    private var bit5: Bitmap? = null
    private var bit6: Bitmap? = null
    private var bit7: Bitmap? = null
    private var bit8: Bitmap? = null
    private var bit9: Bitmap? = null
    private var bit10: Bitmap? = null
    var s: Int = 0
    var t: Int = 0
    var a:Int=0
    var b:Int=0
    var c:Int=0
    var d1:Int=0
    var e:Int=0
    var f:Int=0
    var g:Int=0
    var h:Int=0
    var i1:Int=0
    var ses=0
    var j:Int=0
    var map: HashMap<String?, String?> = HashMap()
    lateinit var phone:String
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.page_7)
        page_7_progress_bar.progress = 100
        image_10th.visibility=View.INVISIBLE
        image_12th.visibility=View.INVISIBLE
        image_aadhar.visibility=View.INVISIBLE
        image_birth.visibility=View.INVISIBLE
        image_gradc.visibility=View.INVISIBLE
        image_gradm.visibility=View.INVISIBLE
        image_signature.visibility=View.INVISIBLE
        image_subject.visibility=View.INVISIBLE
        image_photo.visibility=View.INVISIBLE
        image_community.visibility=View.INVISIBLE
        cancel_10th.visibility=View.INVISIBLE
        cancel_12th.visibility=View.INVISIBLE
        cancel_aadhar.visibility=View.INVISIBLE
        cancel_birth.visibility=View.INVISIBLE
        cancel_gradc.visibility=View.INVISIBLE
        cancel_gradm.visibility=View.INVISIBLE
        cancel_signature.visibility=View.INVISIBLE
        cancel_subject.visibility=View.INVISIBLE
        cancel_photo.visibility=View.INVISIBLE
        cancel_community.visibility=View.INVISIBLE
        phone= intent.getStringExtra("phone")
        val sharedPreferencesx = getSharedPreferences(
            "Settings",
            Context.MODE_PRIVATE
        )
        val retrofitx: Retrofit = Retrofit.Builder()
            .baseUrl("https://stet2020.herokuapp.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        var retrofitInterfacex: RetrofitInterface = retrofitx.create(RetrofitInterface::class.java)
        val cookiex:String?=sharedPreferencesx.getString("user_cookie","")
        val callx: Call<Void?>? = cookiex?.let { retrofitInterfacex.executeLogout(it) }

        callx!!.enqueue(object : Callback<Void?> {
            override fun onResponse(
                call: Call<Void?>?,
                response: Response<Void?>
            ) {
                if (response.code() == 201) {

                    val myEditx = sharedPreferencesx.edit()
                    myEditx.putBoolean("login", false).apply()
                    myEditx.putString("phone", "").apply()
                    myEditx.putString("user_cookie", "").apply()
                    Toast.makeText(
                        this@seven, getString(R.string.logkro),
                        Toast.LENGTH_LONG
                    ).show()
                    val i = Intent(this@seven, MainActivity::class.java)
                    startActivity(i)
                } else if (response.code() == 200) {

                    ses=1
                } else {
                    Toast.makeText(
                        this@seven, getString(R.string.toastslowinternet),
                        Toast.LENGTH_LONG
                    ).show()

                }
            }

            override fun onFailure(
                call: Call<Void?>?,
                t: Throwable
            ) {
                Toast.makeText(
                    this@seven, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()

            }

        })

            check("aadhar", "Aadhar_Documents", page_7_aadhar_upload)
            check("tenth", "Tenth_Documents", page_7_10th_upload)
            check("twelveth", "Twelveth_Documents", page_7_12th_upload)
            check("birthcertificate", "Birth_Certificate_Documents", page_7_birth_upload)
            check(
                "communitycertificate",
                "Community_Certificate_Documents",
                page_7_community_upload
            )
            check(
                "graduationcertificate",
                "Graduation_Certificate_Documents",
                page_7_graduationC_uplaod
            )
            check(
                "graduationmarksheet",
                "Graduation_Marksheet_Documents",
                page_7_GraduationM_upload
            )
            check("photo", "Photo_Documents", page_7_photo_upload)
            check("signature", "Signature_Documents", page_7_signature_upload)
            check("sikkimsubject", "Sikkim_Subject_Documents", page_7_subject_upload)
            page_7_next.setOnClickListener {
                if (page_7_checkbox.isChecked) {
                    if (page_7_subject_upload.text == getString(R.string.uploaded)
                        && page_7_aadhar_upload.text == getString(R.string.uploaded)
                        && page_7_birth_upload.text == getString(R.string.uploaded)
                        && page_7_signature_upload.text == getString(R.string.uploaded)
                        && page_7_photo_upload.text == getString(R.string.uploaded)
                        && page_7_10th_upload.text == getString(R.string.uploaded)
                        && page_7_12th_upload.text == getString(R.string.uploaded)
                        && page_7_community_upload.text == getString(R.string.uploaded)
                        && page_7_graduationC_uplaod.text == getString(R.string.uploaded)
                        && page_7_GraduationM_upload.text == getString(R.string.uploaded)
                    ) {
                        val sharedPreferences = getSharedPreferences(
                            "Settings",
                            Context.MODE_PRIVATE
                        )
                        val myEdit = sharedPreferences.edit()
                        myEdit.putString("documents", phone).apply()
                        val i = Intent(this, Register::class.java)
                        i.putExtra("phone", phone)
                        startActivity(i)
                    } else {
                        val i = Intent(this, Register::class.java)
                        i.putExtra("phone", phone)
                        startActivity(i)
                    }
                } else {
                    Toast.makeText(this, getString(R.string.accepttc), Toast.LENGTH_SHORT)
                        .show()
                }

            }
            page_7_back.setOnClickListener {
                val i = Intent(this, Register::class.java)
                i.putExtra("phone", phone)
                startActivity(i)


            }



            page_7_select_aadhar.setOnClickListener {
                t = 1
                page_7_aadhar_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_10th.setOnClickListener {
                t = 2
                page_7_10th_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_12th.setOnClickListener {
                t = 3
                page_7_12th_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_birth.setOnClickListener {
                t = 4
                page_7_birth_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_community.setOnClickListener {
                t = 5
                page_7_community_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_graduationC.setOnClickListener {
                t = 6
                page_7_graduationC_uplaod.visibility = View.VISIBLE
                storage()

            }
            page_7_select_graduationM.setOnClickListener {
                t = 7
                page_7_GraduationM_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_photo.setOnClickListener {
                t = 8
                page_7_photo_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_signature.setOnClickListener {
                t = 9
                page_7_signature_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_select_subject.setOnClickListener {
                t = 10
                page_7_subject_upload.visibility = View.VISIBLE
                storage()

            }
            page_7_aadhar_cam.setOnClickListener {
                t = 1
                page_7_aadhar_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_10th_cam.setOnClickListener {
                t = 2
                page_7_10th_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_12th_cam.setOnClickListener {
                t = 3
                page_7_12th_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_birth_cam.setOnClickListener {
                t = 4
                page_7_birth_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_community_cam.setOnClickListener {
                t = 5
                page_7_community_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_graduationC_cam.setOnClickListener {
                t = 6
                page_7_graduationC_uplaod.visibility = View.VISIBLE
                camera()

            }
            page_7_graduationM_cam.setOnClickListener {
                t = 7
                page_7_GraduationM_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_photo_cam.setOnClickListener {
                t = 8
                page_7_photo_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_signature_cam.setOnClickListener {
                t = 9
                page_7_signature_upload.visibility = View.VISIBLE
                camera()

            }
            page_7_subject_cam.setOnClickListener {
                t = 10
                page_7_subject_upload.visibility = View.VISIBLE
                camera()

            }
            cancel_aadhar.setOnClickListener {
                image_aadhar.visibility = View.INVISIBLE
                cancel_aadhar.visibility = View.INVISIBLE
                s = 0
            }
            cancel_photo.setOnClickListener {
                image_photo.visibility = View.INVISIBLE
                cancel_photo.visibility = View.INVISIBLE
                s = 0
            }
            cancel_10th.setOnClickListener {
                image_10th.visibility = View.INVISIBLE
                cancel_10th.visibility = View.INVISIBLE
                s = 0
            }
            cancel_12th.setOnClickListener {
                image_12th.visibility = View.INVISIBLE
                cancel_12th.visibility = View.INVISIBLE
                s = 0
            }
            cancel_gradc.setOnClickListener {
                image_gradc.visibility = View.INVISIBLE
                cancel_gradc.visibility = View.INVISIBLE
                s = 0
            }
            cancel_gradm.setOnClickListener {
                image_gradm.visibility = View.INVISIBLE
                cancel_gradm.visibility = View.INVISIBLE
                s = 0
            }
            cancel_subject.setOnClickListener {
                image_subject.visibility = View.INVISIBLE
                cancel_subject.visibility = View.INVISIBLE
                s = 0
            }
            cancel_signature.setOnClickListener {
                image_signature.visibility = View.INVISIBLE
                cancel_signature.visibility = View.INVISIBLE
                s = 0
            }
            cancel_birth.setOnClickListener {
                image_birth.visibility = View.INVISIBLE
                cancel_birth.visibility = View.INVISIBLE
                s = 0
            }
            cancel_community.setOnClickListener {
                image_community.visibility = View.INVISIBLE
                cancel_community.visibility = View.INVISIBLE
                s = 0
            }


    }

    private fun camera() {
        val permission = ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.CAMERA
        )
        if (permission != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.CAMERA),
                10
            )
        } else {

            click()
        }

    }

    private fun storage() {
        val permission = ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.READ_EXTERNAL_STORAGE
        )
        if (permission != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE),
                11
            )
        } else {

            showFileChooser()
        }


    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String?>,
        grantResults: IntArray
    ) {
        if (requestCode == 11) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                showFileChooser()
            } else {
                Toast.makeText(this, getString(R.string.permdenied), Toast.LENGTH_LONG)
                    .show()

            }
        } else if (requestCode == 10) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                click()

            } else {
                Toast.makeText(this, getString(R.string.permdenied), Toast.LENGTH_LONG)
                    .show()

            }

        }
    }
    private fun showFileChooser() {
        val intent: Intent = intent
        intent.type = "image/*"
        intent.action = Intent.ACTION_GET_CONTENT
        startActivityForResult(
            Intent(
                Intent.ACTION_PICK,
                MediaStore.Images.Media.INTERNAL_CONTENT_URI
            ),
            PICK_IMAGE_REQUEST
        )
    }

    private fun click() {
        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        if (takePictureIntent.resolveActivity(packageManager) != null) {
            startActivityForResult(takePictureIntent, CLICK_PHOTO)
        }

    }

    override fun onActivityResult(
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        super.onActivityResult(requestCode, resultCode, data)
        when (requestCode) {
            PICK_IMAGE_REQUEST -> {


                if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK && data != null && data.data != null) {
                    filePath = data.data
                    try {

                        bit = MediaStore.Images.Media.getBitmap(contentResolver, filePath)
                        s = t
                        when (t) {
                            1 -> {
                                bit1 = bit
                                image_aadhar.visibility = View.VISIBLE
                                cancel_aadhar.visibility = View.VISIBLE
                                image_aadhar.setImageBitmap(bit)

                            }
                            2 -> {
                                bit2 = bit
                                image_10th.visibility = View.VISIBLE
                                cancel_10th.visibility = View.VISIBLE
                                image_10th.setImageBitmap(bit)
                            }
                            3 -> {
                                bit3 = bit
                                image_12th.visibility = View.VISIBLE
                                cancel_12th.visibility = View.VISIBLE
                                image_12th.setImageBitmap(bit)
                            }
                            4 -> {
                                bit4 = bit
                                image_birth.visibility = View.VISIBLE
                                cancel_birth.visibility = View.VISIBLE
                                image_birth.setImageBitmap(bit)
                            }
                            5 -> {
                                bit5 = bit
                                image_community.visibility = View.VISIBLE
                                cancel_community.visibility = View.VISIBLE
                                image_community.setImageBitmap(bit)
                            }
                            6 -> {
                                bit6 = bit
                                image_gradc.visibility = View.VISIBLE
                                cancel_gradc.visibility = View.VISIBLE
                                image_gradc.setImageBitmap(bit)
                            }
                            7 -> {
                                bit7 = bit
                                image_gradm.visibility = View.VISIBLE
                                cancel_gradm.visibility = View.VISIBLE
                                image_gradm.setImageBitmap(bit)
                            }
                            8 -> {
                                bit8 = bit
                                image_photo.visibility = View.VISIBLE
                                cancel_photo.visibility = View.VISIBLE
                                image_photo.setImageBitmap(bit)
                            }
                            9 -> {
                                bit9 = bit
                                image_signature.visibility = View.VISIBLE
                                cancel_signature.visibility = View.VISIBLE
                                image_signature.setImageBitmap(bit)
                            }
                            10 -> {
                                bit10 = bit
                                image_subject.visibility = View.VISIBLE
                                cancel_subject.visibility = View.VISIBLE
                                image_subject.setImageBitmap(bit)
                            }

                        }
                    } catch (e: IOException) {
                        e.printStackTrace()
                    }
                }
            }

            CLICK_PHOTO -> {

                if (requestCode == CLICK_PHOTO && resultCode == Activity.RESULT_OK) {
                    try {


                        val extras = data?.extras
                        val bitmap = extras?.get("data") as Bitmap
                        bit = bitmap
                        s = t
                        when (t) {
                            1 -> {
                                bit1 = bit
                                image_aadhar.visibility = View.VISIBLE
                                cancel_aadhar.visibility = View.VISIBLE
                                image_aadhar.setImageBitmap(bit)

                            }
                            2 -> {
                                bit2 = bit
                                image_10th.visibility = View.VISIBLE
                                cancel_10th.visibility = View.VISIBLE
                                image_10th.setImageBitmap(bit)
                            }
                            3 -> {
                                bit3 = bit
                                image_12th.visibility = View.VISIBLE
                                cancel_12th.visibility = View.VISIBLE
                                image_12th.setImageBitmap(bit)
                            }
                            4 -> {
                                bit4 = bit
                                image_birth.visibility = View.VISIBLE
                                cancel_birth.visibility = View.VISIBLE
                                image_birth.setImageBitmap(bit)
                            }
                            5 -> {
                                bit5 = bit
                                image_community.visibility = View.VISIBLE
                                cancel_community.visibility = View.VISIBLE
                                image_community.setImageBitmap(bit)
                            }
                            6 -> {
                                bit6 = bit
                                image_gradc.visibility = View.VISIBLE
                                cancel_gradc.visibility = View.VISIBLE
                                image_gradc.setImageBitmap(bit)
                            }
                            7 -> {
                                bit7 = bit
                                image_gradm.visibility = View.VISIBLE
                                cancel_gradm.visibility = View.VISIBLE
                                image_gradm.setImageBitmap(bit)
                            }
                            8 -> {
                                bit8 = bit
                                image_photo.visibility = View.VISIBLE
                                cancel_photo.visibility = View.VISIBLE
                                image_photo.setImageBitmap(bit)
                            }
                            9 -> {
                                bit9 = bit
                                image_signature.visibility = View.VISIBLE
                                cancel_signature.visibility = View.VISIBLE
                                image_signature.setImageBitmap(bit)
                            }
                            10 -> {
                                bit10 = bit
                                image_subject.visibility = View.VISIBLE
                                cancel_subject.visibility = View.VISIBLE
                                image_subject.setImageBitmap(bit)
                            }
                        }

                    } catch (e: IOException) {
                        e.printStackTrace()
                    }

                }
            }
        }
        page_7_aadhar_upload.setOnClickListener {
            if (s == 1) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_aadhar_upload.text == getString(R.string.uploaded)) {
                    remove("aadhar", "Aadhar_Documents", retrofitInterface2)
                } else {

                }
                multipartImageUploadaadhar(bit1, retrofitInterface2, "aadhar", page_7_aadhar_upload)
            }
        }
        page_7_10th_upload.setOnClickListener {
            if (s == 2) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_10th_upload.text == getString(R.string.uploaded)) {
                    remove("tenth", "Tenth_Documents", retrofitInterface2)
                } else {

                }
                multipartImageUploadtenth(bit2, retrofitInterface2, "tenth", page_7_10th_upload)
            }
        }
        page_7_12th_upload.setOnClickListener {
            if (s == 3) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_12th_upload.text == getString(R.string.uploaded)) {
                    remove("twelveth", "Twelveth_Documents", retrofitInterface2)
                } else {

                }
                multipartImageUploadtwelveth(
                    bit,
                    retrofitInterface2,
                    "twelveth",
                    page_7_12th_upload
                )
            }
        }
        page_7_birth_upload.setOnClickListener {
            if (s == 4) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_birth_upload.text == getString(R.string.uploaded)) {
                    remove("birthcertificate", "Birth_Certificate_Documents", retrofitInterface2)
                } else {

                }
                multipartImageUploadbirth(
                    bit,
                    retrofitInterface2,
                    "birthcertificate",
                    page_7_birth_upload
                )
            }

        }
        page_7_community_upload.setOnClickListener {
            if (s == 5) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_community_upload.text == getString(R.string.uploaded)) {
                    remove(
                        "communitycertificate",
                        "Community_Certificate_Documents",
                        retrofitInterface2
                    )
                } else {

                }
                multipartImageUploadcommunity(
                    bit,
                    retrofitInterface2,
                    "communitycertificate",
                    page_7_community_upload
                )
            }
        }
        page_7_graduationC_uplaod.setOnClickListener {
            if (s == 6) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_graduationC_uplaod.text == getString(R.string.uploaded)) {
                    remove(
                        "graduationcertificate",
                        "Graduation_Certificate_Documents",
                        retrofitInterface2
                    )
                } else {

                }
                multipartImageUploadgradc(
                    bit,
                    retrofitInterface2,
                    "graduationcertificate",
                    page_7_graduationC_uplaod
                )
            }
        }
        page_7_GraduationM_upload.setOnClickListener {
            if (s == 7) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_GraduationM_upload.text == getString(R.string.uploaded)) {
                    remove(
                        "graduationmarksheet",
                        "Graduation_Marksheet_Documents",
                        retrofitInterface2
                    )
                } else {

                }
                multipartImageUploadgradm(
                    bit,
                    retrofitInterface2,
                    "graduationmarksheet",
                    page_7_GraduationM_upload
                )
            }
        }
        page_7_photo_upload.setOnClickListener {
            if (s == 8) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_photo_upload.text == getString(R.string.uploaded)) {
                    remove("photo", "Photo_Documents", retrofitInterface2)
                } else {

                }
                multipartImageUploadphoto(bit, retrofitInterface2, "photo", page_7_photo_upload)
            }
        }
        page_7_signature_upload.setOnClickListener {
            if (s == 9) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_signature_upload.text == getString(R.string.uploaded)) {
                    remove("signature", "Signature_Documents", retrofitInterface2)
                } else {

                }
                multipartImageUploadsignature(
                    bit,
                    retrofitInterface2,
                    "signature",
                    page_7_signature_upload
                )
            }
        }
        page_7_subject_upload.setOnClickListener {
            if (s == 10) {
                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()
                var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
                if (page_7_subject_upload.text == getString(R.string.uploaded)) {
                    remove("sikkimsubject", "Sikkim_Subject_Documents", retrofitInterface2)
                } else {

                }
                multipartImageUploadsubject(
                    bit,
                    retrofitInterface2,
                    "sikkimsubject",
                    page_7_subject_upload
                )
            }

        }

    }


    private fun multipartImageUploadaadhar(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone + "_" + str + ".png")

            val bos = ByteArrayOutputStream()
            mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
            val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
            val fos = FileOutputStream(file)
            fos.write(bitmapdata)
            fos.flush()
            fos.close()
            val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
            val body =
                MultipartBody.Part.createFormData("upload", file.name, reqFile)
            val name = RequestBody.create(MediaType.parse("text/plain"), phone)
            val req: Call<ResponseBody?>? = retrofitInterface2?.postImageaadhar(body, name)
            req!!.enqueue(object : Callback<ResponseBody?> {
                override fun onResponse(
                    call: Call<ResponseBody?>?,
                    response: Response<ResponseBody?>
                ) {
                    if (response.code() == 200) {
                        Toast.makeText(
                            applicationContext,
                            getString(R.string.uploaded),
                            Toast.LENGTH_SHORT
                        ).show()
                        bt.text = getString(R.string.uploaded)
                        image_aadhar.visibility=View.INVISIBLE
                        cancel_aadhar.visibility=View.INVISIBLE
                        bt.background = getDrawable(R.drawable.button_shape2)
                        progress2.dismiss()
                        map["Aadhar"] = phone + "_" + str + ".png"
                        a = 1
                    } else {
                        map["Aadhar"] = "NA"
                    }
                    progress2.dismiss()
                }

                override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                    Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                        .show()
                    t.printStackTrace()
                    map["Aadhar"] = "NA"
                    progress2.dismiss()
                }
            })
        }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun multipartImageUploadtenth(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone + "_" + str + ".png")

            val bos = ByteArrayOutputStream()
            mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
            val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
            val fos = FileOutputStream(file)
            fos.write(bitmapdata)
            fos.flush()
            fos.close()
            val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
            val body =
                MultipartBody.Part.createFormData("upload", file.name, reqFile)
            val name = RequestBody.create(MediaType.parse("text/plain"), phone)
            val req: Call<ResponseBody?>? = retrofitInterface2?.postImagetenth(body, name)
            req!!.enqueue(object : Callback<ResponseBody?> {
                override fun onResponse(
                    call: Call<ResponseBody?>?,
                    response: Response<ResponseBody?>
                ) {
                    if (response.code() == 200) {
                        Toast.makeText(
                            applicationContext,
                            getString(R.string.uploaded),
                            Toast.LENGTH_SHORT
                        ).show()
                        bt.text = getString(R.string.uploaded)
                        image_10th.visibility=View.INVISIBLE
                        cancel_10th.visibility=View.INVISIBLE
                        bt.background = getDrawable(R.drawable.button_shape2)
                        progress2.dismiss()
                        map["tenth"] = phone + "_" + str + ".png"
                        b = 1
                    } else {
                        map["tenth"] = "NA"
                    }
                    progress2.dismiss()
                }

                override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                    Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                        .show()
                    t.printStackTrace()
                    progress2.dismiss()
                    map["tenth"] = "NA"
                }
            })
        }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun multipartImageUploadtwelveth(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone+"_"+str+".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? = retrofitInterface2?.postImagetwelveth(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_12th.visibility=View.INVISIBLE
                            cancel_12th.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            map["twelveth"] = phone + "_" + str + ".png"
                            c = 1
                        } else {
                            map["twelveth"] = "NA"
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                        map["twelveth"] = "NA"
                    }
                })
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun multipartImageUploadsubject(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone+"_"+str+".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? = retrofitInterface2?.postImagesubject(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_subject.visibility=View.INVISIBLE
                            cancel_subject.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            map["subject"] = phone + "_" + str + ".png"
                            d1 = 1
                        } else {
                            map["subject"] = "NA"
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                        map["subject"] = "NA"
                    }
                })
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun multipartImageUploadgradc(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone+"_"+str+".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? =
                    retrofitInterface2?.postImagegraduationcertificate(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_gradc.visibility=View.INVISIBLE
                            cancel_gradc.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            e = 1
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                    }
                })
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun multipartImageUploadgradm(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone + "_" + str + ".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? =
                    retrofitInterface2?.postImagegraduationmarksheet(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_gradm.visibility=View.INVISIBLE
                            cancel_gradm.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            f = 1
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                    }
                })
            }
            } catch (e: FileNotFoundException) {
                e.printStackTrace()
            } catch (e: IOException) {
                e.printStackTrace()
            }

    }
    private fun multipartImageUploadphoto(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone+"_"+str+".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? = retrofitInterface2?.postImagephoto(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_photo.visibility=View.INVISIBLE
                            cancel_photo.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            g = 1
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                    }
                })
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun remove(str:String,coll:String,retrofitInterface2: Retro3?)
    {
        val progress2 = ProgressDialog(this)
        progress2.setMessage(getString(R.string.removefile)+"$str.png  :) ")
        progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
        progress2.isIndeterminate = true
        progress2.show()
        val req: Call<Void?>? = retrofitInterface2?.removefile( phone+"_"+str+".png",coll)
        req!!.enqueue(object : Callback<Void?> {
            override fun onResponse(
                call: Call<Void?>?,
                response: Response<Void?>
            ) {
                if (response.code() == 200) {
                    Toast.makeText(
                        applicationContext,
                        getString(R.string.fileremooved),
                        Toast.LENGTH_SHORT
                    ).show()
                    progress2.dismiss()
                    h=1
                }
                progress2.dismiss()
            }

            override fun onFailure(call: Call<Void?>?, t: Throwable) {

                Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                    .show()
                t.printStackTrace()
                progress2.dismiss()
            }
        })
    }
    private fun check(str:String, coll:String, bt: Button )
    {
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
        val req: Call<Void?>? = retrofitInterface2?.getfile( phone+"_"+str+".png",coll)
        req!!.enqueue(object : Callback<Void?> {
            override fun onResponse(
                call: Call<Void?>?,
                response: Response<Void?>
            ) {
                if (response.code() == 200) {
                    bt.text=getString(R.string.uploaded)
                    bt.background = getDrawable(R.drawable.button_shape2)

                }

            }
            override fun onFailure(call: Call<Void?>?, t: Throwable) {

                Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                    .show()
                t.printStackTrace()

            }
        })
    }
    private fun multipartImageUploadcommunity(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone+"_"+str+".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? = retrofitInterface2?.postImagecommunity(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_community.visibility=View.INVISIBLE
                            cancel_community.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            h = 1
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                    }
                })
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun multipartImageUploadsignature(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone+"_"+str+".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? = retrofitInterface2?.postImagesignature(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_signature.visibility=View.INVISIBLE
                            cancel_signature.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            i1 = 1
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                    }
                })
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
    private fun multipartImageUploadbirth(
        mBitmap: Bitmap?,
        retrofitInterface2: Retro3?,
        str: String,
        bt: Button
    ) {
        try {
            val progress2 = ProgressDialog(this)
            progress2.setMessage(getString(R.string.uploading)+" $str.png  :) ")
            progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress2.isIndeterminate = true
            progress2.show()
            val filesDir = applicationContext.filesDir
            val file = File(filesDir, phone+"_"+str+".png")

                val bos = ByteArrayOutputStream()
                mBitmap?.compress(Bitmap.CompressFormat.PNG, 0, bos)
                val bitmapdata = bos.toByteArray()
            var filesize = bitmapdata.size
            var filesizeInKB = filesize / 102400
            if (filesizeInKB > 100) {
                progress2.dismiss()
                Toast.makeText(this, getString(R.string.filesize), Toast.LENGTH_LONG).show()
            } else {
                val fos = FileOutputStream(file)
                fos.write(bitmapdata)
                fos.flush()
                fos.close()
                val reqFile = RequestBody.create(MediaType.parse("image/*"), file)
                val body =
                    MultipartBody.Part.createFormData("upload", file.name, reqFile)
                val name = RequestBody.create(MediaType.parse("text/plain"), phone)
                val req: Call<ResponseBody?>? = retrofitInterface2?.postImagebirth(body, name)
                req!!.enqueue(object : Callback<ResponseBody?> {
                    override fun onResponse(
                        call: Call<ResponseBody?>?,
                        response: Response<ResponseBody?>
                    ) {
                        if (response.code() == 200) {
                            Toast.makeText(
                                applicationContext,
                                getString(R.string.uploaded),
                                Toast.LENGTH_SHORT
                            ).show()
                            bt.text = getString(R.string.uploaded)
                            image_birth.visibility=View.INVISIBLE
                            cancel_birth.visibility=View.INVISIBLE
                            bt.background = getDrawable(R.drawable.button_shape2)
                            progress2.dismiss()
                            j = 1
                        }
                        progress2.dismiss()
                    }

                    override fun onFailure(call: Call<ResponseBody?>?, t: Throwable) {

                        Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                            .show()
                        t.printStackTrace()
                        progress2.dismiss()
                    }
                })
            }
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }





    private fun setLocate(Lang: String) {
        val locale = Locale(Lang)
        val config = Configuration()

        config.locale = locale
        baseContext.resources.updateConfiguration(config, baseContext.resources.displayMetrics)

        val editor = getSharedPreferences("Settings", Context.MODE_PRIVATE).edit()
        editor.putString("My_Lang", Lang)
        editor.apply()
    }
    private fun loadLocate() {
        val sharedPreferences = getSharedPreferences("Settings", Activity.MODE_PRIVATE)
        val language = sharedPreferences.getString("My_Lang", "")
        if (language != null) {
            setLocate(language)
        }
    }
}

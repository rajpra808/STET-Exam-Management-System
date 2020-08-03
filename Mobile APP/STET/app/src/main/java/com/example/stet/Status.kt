package com.example.stet

//import android.R

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.graphics.Bitmap
import android.graphics.Bitmap.CompressFormat
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Color
import android.media.MediaScannerConnection
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.status.*
import org.w3c.dom.Document
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.util.*


class Status : AppCompatActivity() {
    //status page

    var Phone:String=""
    private val BASE_URL = "https://stet2020.herokuapp.com/"
    private val URL = BASE_URL
    var ses=0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.status)
        val phone: String = intent.getStringExtra("phone")
        Phone=phone
       /* status_back.setOnClickListener {
            val i = Intent(this, third::class.java)
            i.putExtra("phone", phone)
            startActivity(i)

        }*/
        val sharedPreferencesx = getSharedPreferences(
            "Settings",
            Context.MODE_PRIVATE
        )
        val retrofitx: Retrofit = Retrofit.Builder()
            .baseUrl("https://stet2020.herokuapp.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        //check session
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
                        this@Status, getString(R.string.logkro),
                        Toast.LENGTH_LONG
                    ).show()
                    val i = Intent(this@Status, MainActivity::class.java)
                    startActivity(i)
                } else if (response.code() == 200) {

                    ses=1
                } else {
                    Toast.makeText(
                        this@Status, getString(R.string.toastslowinternet),
                        Toast.LENGTH_LONG
                    ).show()

                }
            }

            override fun onFailure(
                call: Call<Void?>?,
                t: Throwable
            ) {
                Toast.makeText(
                    this@Status, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()

            }

        })

            image(phone, "photo", "Photo_Documents", status_view_photo)
            image(phone, "signature", "Signature_Documents", status_view_signature)
            val retrofit: Retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            var retrofitInterface: RetrofitInterface =
                retrofit.create(RetrofitInterface::class.java)
            val map: HashMap<String?, String?> = HashMap()
            map["Phone1"] = phone
            val sharedPreferences = getSharedPreferences(
                "Settings",
                Context.MODE_PRIVATE
            )
            val cookie: String? = sharedPreferences.getString("user_cookie", "")
            //get personal
            val call1: Call<Personal?>? = cookie?.let { retrofitInterface.getPersonal(it, map) }
            call1!!.enqueue(object : Callback<Personal?> {
                override fun onResponse(
                    call: Call<Personal?>?,
                    response: Response<Personal?>
                ) {
                    if (response.code() == 200) {

                        val result = response.body()

                        if (result != null) {
                            status_view_aadhar.text = result.Aadhar
                            status_view_address.text = result.AddressOne
                            status_view_candidate.text =
                                result.Fname + " " + result.Mname + " " + result.Lname
                            status_view_mother.text =
                                result.MFname + " " + result.MMname + " " + result.MLname
                            status_view_father.text =
                                result.FHFname + " " + result.FHMname + " " + result.FHLname
                            status_view_dist.text = result.DistrictOne
                            status_view_dob.text = result.DOB
                            status_view_gender.text = result.gender
                            status_view_state.text = result.StateOne
                            status_view_email.text = result.Email1
                            status_view_mobile.text = result.Phone1
                            status_view_registration_no.text=result.Phone1
                            staus_view_pin.text = result.PinCodeOne
                            status_view_father_husband.text = result.FH
                            status_view_address2.text =
                                result.AddressTwo + " " + result.DistrictTwo + " " + result.StateTwo
                            status_view_community.text = result.Category
                            status_view_mobile2.text = result.Phone2
                            status_view_email2.text = result.Email2


                        }


                    }
                }

                override fun onFailure(
                    call1: Call<Personal?>?,
                    t: Throwable
                ) {
                    Log.d("Failure", t.message)
                    Toast.makeText(
                        this@Status, t.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            })
            val map3: HashMap<String?, String?> = HashMap()
            map3["Phone"] = phone
            //get acdemics
            val call3: Call<Education?>? = retrofitInterface.getEducation(cookie, map3)
            call3!!.enqueue(object : Callback<Education?> {
                override fun onResponse(
                    call: Call<Education?>?,
                    response: Response<Education?>
                ) {
                    if (response.code() == 200) {

                        val result = response.body()



                        if (result != null) {
                            status_application_view_percentage.text = result.Percentage
                            status_application_view_uni.text = result.University
                            status_application_view_prof_quali.text =
                                result.ProfessionalQualification
                            status_application_view_min_quali.text = result.MinQualification
                            status_application_view_category.text = result.ApplicationCategory
                            status_application_view_paper_choice.text = result.PaperLanguage

                        }

                    } else {

                    }
                }

                override fun onFailure(
                    call: Call<Education?>?,
                    t: Throwable
                ) {
                    Log.d("Failure", t.message)
                    Toast.makeText(
                        this@Status, t.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            })
            //get payment
            val call4: Call<Payment> = retrofitInterface.getpayment(cookie, phone)
            call4!!.enqueue(object : Callback<Payment> {
                override fun onResponse(
                    call: Call<Payment>,
                    response: Response<Payment>
                ) {
                    if (response.code() == 200) {

                        val result = response.body()

                        if (result != null) {
                            status_view_tran_ID.text = result.paymentId.toString()
                            status_view_transaction.text = result.date.toString()
                            status_view_payment_mode.text = getString(R.string.online)
                        }


                    } else {


                    }

                }

                override fun onFailure(
                    call: Call<Payment>,
                    t: Throwable
                ) {
                    Log.d("Failure", t.message)
                    Toast.makeText(
                        this@Status, t.message,
                        Toast.LENGTH_LONG
                    ).show()
                }
            })
            check("aadhar", "Aadhar_Documents", status_view_certi4)
            check("tenth", "Tenth_Documents", status_view_certi5)
            check("twelveth", "Twelveth_Documents", status_view_certi6)
            check("birthcertificate", "Birth_Certificate_Documents", status_view_certi1)
            check("communitycertificate", "Community_Certificate_Documents", status_view_certi2)
            check("graduationcertificate", "Graduation_Certificate_Documents", status_view_certi8)
            check("graduationmarksheet", "Graduation_Marksheet_Documents", status_view_certi7)
            check("sikkimsubject", "Sikkim_Subject_Documents", status_view_certi3)
            status_print.setOnClickListener {
                val content: LinearLayout = findViewById(R.id.print)
                val file = saveBitMap(
                    this,
                    content
                );    //which view you want to pass that view as parameter
                if (file != null) {
                    status_print.visibility = View.VISIBLE
                    Toast.makeText(this, getString(R.string.regisfile), Toast.LENGTH_LONG).show()
                } else {
                    status_print.visibility = View.VISIBLE
                    Toast.makeText(this, getString(R.string.oopsfilenot), Toast.LENGTH_LONG).show()
                }
            }


    }
    //check for documents
    private fun check(str:String,coll:String,text: TextView)
    {
        val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        var retrofitInterface2: Retro3? = retrofit.create(Retro3::class.java)
        val req: Call<Void?>? = retrofitInterface2?.getfile( Phone+"_"+str+".png",coll)
        req!!.enqueue(object : Callback<Void?> {
            override fun onResponse(
                call: Call<Void?>?,
                response: Response<Void?>
            ) {
                if (response.code() == 200) {
                    text.text=getString(R.string.Uploaded)
                }

            }
            override fun onFailure(call: Call<Void?>?, t: Throwable) {

                Toast.makeText(applicationContext, t.message, Toast.LENGTH_SHORT)
                    .show()
                t.printStackTrace()

            }
        })
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
    //saving status page
    private fun saveBitMap(
        context: Context,
        drawView: View
    ): File? {
        val pictureFileDir = File(
            Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
            "RegistrationForm"
        )
        if (!pictureFileDir.exists()) {
            val isDirectoryCreated: Boolean = pictureFileDir.mkdirs()
            if (!isDirectoryCreated) Log.i(
                "ATG",
                "Can't create directory to save the image"
            )
            return null
        }
        status_print.visibility=View.INVISIBLE
        val filename: String =
            pictureFileDir.path + File.separator + System.currentTimeMillis().toString() + "registrationform.png"
        val pictureFile = File(filename)
        val bitmap = getBitmapFromView(drawView)
        try {
            pictureFile.createNewFile()
            val oStream = FileOutputStream(pictureFile)
            bitmap.compress(CompressFormat.PNG, 100, oStream)
            oStream.flush()
            oStream.close()
        } catch (e: IOException) {
            e.printStackTrace()
            Log.i("TAG", "There was an issue saving the image.")
        }

        scanGallery(context, pictureFile.getAbsolutePath())
        return pictureFile
    }

    private fun getBitmapFromView(view: View): Bitmap {

        val returnedBitmap =
            Bitmap.createBitmap(view.width, view.height, Bitmap.Config.ARGB_8888)
        Toast.makeText(this@Status,view.width.toString() +" "+view.height.toString(),Toast.LENGTH_LONG).show()
        val canvas = Canvas(returnedBitmap)
        val bgDrawable = view.background
        if (bgDrawable != null) {
            bgDrawable.draw(canvas)
        } else {
            canvas.drawColor(Color.WHITE)
        }
        view.draw(canvas)
        return returnedBitmap
    }

    private fun scanGallery(cntx: Context, path: String) {
        try {
            MediaScannerConnection.scanFile(
                cntx,
                arrayOf(path),
                null
            ) { path, uri -> }
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
        }
    }
    fun image(phone:String,str: String,coll: String,id:ImageView){
        val retrofit1: Retrofit = Retrofit.Builder()
            .baseUrl(URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        var retrofitInterface1: Retro3? = retrofit1.create(Retro3::class.java)
        val call:Call<Image?>? = retrofitInterface1?.imagefile(phone+"_"+str+".png",coll)
        call!!.enqueue(object : Callback<Image?>{
            override fun onFailure(call: Call<Image?>, t: Throwable) {
                Toast.makeText(this@Status,t.message,Toast.LENGTH_SHORT).show()
            }
            override fun onResponse(call: Call<Image?>, response: Response<Image?>) {
               if(response.code()==200)
               {
                   val Res: Image? =response.body()
                   if(Res!=null)
                   {
                       val st: String =Res.imageURL
                       val pureBase64Encoded:String  = st.substring(st.indexOf(",")  + 1);
                       val decodedString: ByteArray = android.util.Base64.decode(pureBase64Encoded, android.util.Base64.DEFAULT)
                       val decodedByte =
                           BitmapFactory.decodeByteArray(decodedString, 0, decodedString.size)
                       id.setImageBitmap(decodedByte)
                       Toast.makeText(this@Status,getString(R.string.Imagefetched),Toast.LENGTH_SHORT).show()
                   }
               }
            }

        })


    }



}
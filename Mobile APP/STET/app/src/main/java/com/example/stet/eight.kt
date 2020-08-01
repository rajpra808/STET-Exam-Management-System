package com.example.stet

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import com.google.firebase.FirebaseException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException
import com.google.firebase.auth.PhoneAuthCredential
import com.google.firebase.auth.PhoneAuthProvider
import com.wajahatkarim3.easyvalidation.core.collection_ktx.containsList
import com.wajahatkarim3.easyvalidation.core.collection_ktx.validEmailList
import kotlinx.android.synthetic.main.page_8.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.*
import java.util.concurrent.TimeUnit

class eight : AppCompatActivity() {
    private val BASE_URL = "https://stet2020.herokuapp.com/"
    private var mAuth: FirebaseAuth? = null
    var codeSent: String? = null
    var P = 0
    var auth2: FirebaseAuth = FirebaseAuth.getInstance()
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.page_8)
        loadLocate()
        page_8_progress_bar.progress = 100
        var phone: String = intent.getStringExtra("phone")
        mAuth = FirebaseAuth.getInstance()
        val map: HashMap<String?, String?> = HashMap()

        map["venue"]="Sikkim"
        map["eno"]="12345678"
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        var retrofitInterface2: RetrofitInterface = retrofit.create(RetrofitInterface::class.java)
        val y:Int= Calendar.getInstance().get(Calendar.YEAR)
        val year:String=y.toString()
        val call: Call<Schedule> = retrofitInterface2.timeline(year)

        call!!.enqueue(object : Callback<Schedule> {
            override fun onResponse(
                call: Call<Schedule>,
                response: Response<Schedule>
            ) {
                if (response.code() == 200) {
                    val time: Schedule? =response.body()
                    if (time != null) {

                        map["exam_date"]=time.date_of_examination.toString()

                    }

                } else if (response.code() == 404) {
                    Toast.makeText(
                        this@eight, getString(R.string.currentyear),
                        Toast.LENGTH_LONG
                    ).show()
                }
            }

            override fun onFailure(
                call: Call<Schedule>,
                t: Throwable
            ) {
                Toast.makeText(
                    this@eight, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()

            }

        })
        val map1: HashMap<String?, String?> = HashMap()
        map1["Phone1"] = phone

        val call1: Call<Personal?>? = retrofitInterface2.getPersonal(map1)
        call1!!.enqueue(object : Callback<Personal?> {
            override fun onResponse(
                call: Call<Personal?>?,
                response: Response<Personal?>
            ) {
                if (response.code() == 200) {

                    val result = response.body()

                    if (result != null) {

                        map["address"]=result.AddressOne
                        map["mname"]=result.Mname
                        map["fname"]=result.Fname
                        map["lname"]=result.Lname
                        map["ffname"]=result.FHFname
                        map["fmname"]=result.FHMname
                        map["flname"]=result.FHLname
                        map["mfname"]=result.MFname
                        map["mmname"]=result.MMname
                        map["mlname"]=result.MLname
                        map["category"]=result.Category
                        map["aadhar"]=result.Aadhar
                        map["district"]=result.DistrictOne
                        map["state"]=result.StateOne
                        map["pincode"]=result.PinCodeOne
                        map["email"]=result.Email1
                        map["dob"]=result.DOB
                        map["sex"]=result.gender
                        map["phone"]= result.Phone1
                    }


                }
            }

            override fun onFailure(
                call1: Call<Personal?>?,
                t: Throwable
            ) {
                Log.d("Failure", t.message)
                Toast.makeText(
                    this@eight, t.message,
                    Toast.LENGTH_LONG
                ).show()
            }
        })
        val map3: HashMap<String?, String?> = HashMap()
        map3["Phone"] = phone
        val call2: Call<Education?>? = retrofitInterface2.getEducation(map3)
        call2!!.enqueue(object : Callback<Education?> {
            override fun onResponse(
                call: Call<Education?>?,
                response: Response<Education?>
            ) {
                if (response.code() == 200) {

                    val result = response.body()

                    if (result != null) {
                        map["exam"]=result.ApplicationCategory

                    }


                }
                else {

                    Toast.makeText(
                        this@eight, getString(R.string.toastslowinternet),
                        Toast.LENGTH_LONG
                    ).show()
                }

            }

            override fun onFailure(
                call: Call<Education?>?,
                t: Throwable
            ) {
                Log.d("Failure", t.message)
                Toast.makeText(
                    this@eight, t.message,
                    Toast.LENGTH_LONG
                ).show()
            }
        })


        page_8_submit.setOnClickListener {
            if (P == 1) {
                Toast.makeText(this, getString(R.string.registrationsuccessfull), Toast.LENGTH_SHORT).show()
                val current = LocalDateTime.now()
                val formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
                val formatted = current.format(formatter)
                map["Date"] = formatted
                var retrofitInterface: RetrofitInterface =
                    retrofit.create(RetrofitInterface::class.java)
                val call3: Call<Void?>? = retrofitInterface.timings(map)
                call3!!.enqueue(object : Callback<Void?> {
                    override fun onResponse(
                        call: Call<Void?>?,
                        response: Response<Void?>
                    ) {
                        if (response.code() == 200) {

                            val i = Intent(this@eight, third::class.java)
                            i.putExtra("phone", phone)
                            startActivity(i)
                        }
                    }

                    override fun onFailure(
                        call: Call<Void?>?,
                        t: Throwable
                    ) {
                        Log.d("Failure", t.message)
                        Toast.makeText(
                            this@eight, t.message,
                            Toast.LENGTH_LONG
                        ).show()
                    }
                })


            }
        }
        page_8_sendotp.setOnClickListener {
            sendVerificationCode(phone)
        }
        page_8_verify.setOnClickListener {
            if (codeSent != null) {
                verifySignInCode()
            }
        }

    }

    private fun verifySignInCode() {
        val code: String = page_8_enter_otp.text.toString()
        val credential = PhoneAuthProvider.getCredential(codeSent!!, code)
        signInWithPhoneAuthCredential(credential)
    }

    private fun signInWithPhoneAuthCredential(credential: PhoneAuthCredential) {
        mAuth!!.signInWithCredential(credential)
            .addOnCompleteListener(
                this
            ) { task ->
                if (task.isSuccessful) {
                    Toast.makeText(
                        applicationContext,
                        getString(R.string.verificationsuccessfull),
                        Toast.LENGTH_LONG
                    ).show()
                    page_8_verify.text = getString(R.string.Verified)
                    P = 1
                    page_8_verify.background = getDrawable(R.drawable.button_shape2)
                    page_8_enter_otp.visibility = View.INVISIBLE
                    page_8_sendotp.visibility = View.INVISIBLE
                    page_8_otp.visibility = View.INVISIBLE


                } else {
                    if (task.exception is FirebaseAuthInvalidCredentialsException) {
                        Toast.makeText(
                            applicationContext,
                            getString(R.string.incorrectcode), Toast.LENGTH_LONG
                        ).show()

                    }
                }
            }
    }

    private fun sendVerificationCode(phn: String) {

        val phone = "+91$phn"
        if (phone.isEmpty()) {
            return
        }
        if (phone.length < 10) {
            return
        }
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
            phone,
            60,
            TimeUnit.SECONDS,
            this,
            mCallbacks
        )

    }

    private var mCallbacks: PhoneAuthProvider.OnVerificationStateChangedCallbacks =
        object : PhoneAuthProvider.OnVerificationStateChangedCallbacks() {


            override fun onVerificationCompleted(phoneAuthCredential: PhoneAuthCredential) {

            }

            override fun onVerificationFailed(e: FirebaseException) {
                Log.d("error", e.toString())
            }

            override fun onCodeSent(
                s: String,
                forceResendingToken: PhoneAuthProvider.ForceResendingToken
            ) {
                super.onCodeSent(s, forceResendingToken)
                codeSent = s
                page_8_sendotp.text = getString(R.string.resendotp)
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

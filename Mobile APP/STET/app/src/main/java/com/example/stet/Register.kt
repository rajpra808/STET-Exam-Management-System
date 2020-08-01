package com.example.stet

import android.app.Activity
import android.app.ProgressDialog
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import kotlinx.android.synthetic.main.register.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*

class Register : AppCompatActivity() {
    private val BASE_URL = "https://stet2020.herokuapp.com/"
    var a=0
    var b=0
    var c=0
    var d=0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.register)
        val progress = ProgressDialog(this@Register)
        progress.setMessage(getString(R.string.loading))
        progress.setProgressStyle(ProgressDialog.STYLE_SPINNER)
        progress.isIndeterminate = true
        progress.show()
        val phone: String = intent.getStringExtra("phone")
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        var retrofitInterface: RetrofitInterface = retrofit.create(RetrofitInterface::class.java)
        val map: HashMap<String?, String?> = HashMap()
        map["Phone1"] = phone
        val call1: Call<Personal?>? = retrofitInterface.getPersonal(map)
        call1!!.enqueue(object : Callback<Personal?> {
            override fun onResponse(
                call: Call<Personal?>?,
                response: Response<Personal?>
            ) {
                if (response.code() == 200) {

                    val result = response.body()

                    if (result != null) {

                        register_personal.background = getDrawable(R.drawable.button_shape2)
                        a=1
                    } else {
                        progress.dismiss()
                    }


                }
            }

            override fun onFailure(
                call1: Call<Personal?>?,
                t: Throwable
            ) {
                Log.d("Failure", t.message)
                Toast.makeText(
                    this@Register, t.message,
                    Toast.LENGTH_LONG
                ).show()
            }
        })
        val map2: HashMap<String?, String?> = HashMap()
        map2["Phone"] = phone
        val call2: Call<Education?>? = retrofitInterface.getEducation(map2)
        call2!!.enqueue(object : Callback<Education?> {
            override fun onResponse(
                call: Call<Education?>?,
                response: Response<Education?>
            ) {
                if (response.code() == 200) {

                    val result = response.body()

                    if (result != null) {
                        register_professional.background = getDrawable(R.drawable.button_shape2)
                        b=1
                        progress.dismiss()
                    }


                } else {

                    progress.dismiss()
                }

            }

            override fun onFailure(
                call: Call<Education?>?,
                t: Throwable
            ) {
                Log.d("Failure", t.message)
                Toast.makeText(
                    this@Register, t.message,
                    Toast.LENGTH_LONG
                ).show()
            }
        })

        val call3: Call<Payment> = retrofitInterface.getpayment(phone)
        call3!!.enqueue(object : Callback<Payment> {
            override fun onResponse(
                call: Call<Payment>,
                response: Response<Payment>
            ) {
                if (response.code() == 200) {

                    val result = response.body()

                    if (result != null) {
                        register_payment.background = getDrawable(R.drawable.button_shape2)
                        c=1
                        progress.dismiss()
                    }


                } else {

                    progress.dismiss()
                }

            }

            override fun onFailure(
                call: Call<Payment>,
                t: Throwable
            ) {
                Log.d("Failure", t.message)
                Toast.makeText(
                    this@Register, t.message,
                    Toast.LENGTH_LONG
                ).show()
            }
        })
        progress.dismiss()
        val sharedPreferences = getSharedPreferences(
            "MySharedPref",
            Context.MODE_PRIVATE
        )
        if (sharedPreferences.getString("documents", "")==phone) {
            register_documents.background = getDrawable(R.drawable.button_shape2)
           d=1
        }
        register_personal.setOnClickListener {
            val i = Intent(this, fourth::class.java)
            i.putExtra("phone", phone)
            startActivity(i)
        }
        register_professional.setOnClickListener {
            val i = Intent(this, five::class.java)
            i.putExtra("phone", phone)
            startActivity(i)
        }
        register_payment.setOnClickListener {
            val i = Intent(this, six::class.java)
            i.putExtra("phone", phone)
            startActivity(i)
        }
        register_documents.setOnClickListener {
            val i = Intent(this, seven::class.java)
            i.putExtra("phone", phone)
            startActivity(i)
        }
        register_submit.setOnClickListener {
            if(a==1&&b==1&&d==1) {
                val i = Intent(this, eight::class.java)
                i.putExtra("phone", phone)
                startActivity(i)
            }
            else
            {
                Toast.makeText(this@Register,getString(R.string.allthree),Toast.LENGTH_SHORT).show()
            }
        }
        register_back.setOnClickListener {
            val i = Intent(this, third::class.java)
            i.putExtra("phone", phone)
            startActivity(i)
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
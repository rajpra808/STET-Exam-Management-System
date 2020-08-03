package com.example.stet

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.razorpay.Checkout
import com.razorpay.PaymentData
import com.razorpay.PaymentResultListener
import com.razorpay.PaymentResultWithDataListener
import kotlinx.android.synthetic.main.page_6.*
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.*
import kotlin.collections.HashMap

class six : Activity(), PaymentResultWithDataListener {

    //payment activity

    val TAG:String = six::class.toString()
    private val BASE_URL = "https://stet2020.herokuapp.com/"
    var Phone:String=""
    var Fees:String=""
    var ses=0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.page_6)
        Checkout.preload(applicationContext)
        val phone: String = intent.getStringExtra("phone")
        Phone=phone
        page_6_progress_bar.progress = 100
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

        //check for session

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
                        this@six, getString(R.string.logkro),
                        Toast.LENGTH_LONG
                    ).show()
                    val i = Intent(this@six, MainActivity::class.java)
                    startActivity(i)
                } else if (response.code() == 200) {

                    ses=1
                } else {
                    Toast.makeText(
                        this@six, getString(R.string.toastslowinternet),
                        Toast.LENGTH_LONG
                    ).show()

                }
            }

            override fun onFailure(
                call: Call<Void?>?,
                t: Throwable
            ) {
                Toast.makeText(
                    this@six, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()

            }

        })

            page_6_next.setOnClickListener {
                val i = Intent(this, Register::class.java)
                i.putExtra("phone", phone)
                startActivity(i)
            }
            page_6_back.setOnClickListener {
                val i = Intent(this, Register::class.java)
                i.putExtra("phone", phone)
                startActivity(i)
            }
            page_6_pay.setOnClickListener {
                val fees = 40000
                Fees = fees.toString()
                val activity: Activity = this
                val co = Checkout()
                try {
                    val options = JSONObject()
                    options.put("name", "STET Application")
                    options.put("description", "Registration Fee Charges")
                    options.put("image", "https://s3.amazonaws.com/rzp-mobile/images/rzp.png")
                    options.put("currency", "INR")
                    options.put("amount", fees)
                    val prefill = JSONObject()
                    prefill.put("email", "9198239087r@gmail.com")
                    prefill.put("contact", "6387012615")
                    options.put("prefill", prefill)
                    co.open(activity, options)
                } catch (e: Exception) {
                    Toast.makeText(
                        activity,
                        getString(R.string.errorpayment) + e.message,
                        Toast.LENGTH_LONG
                    ).show()
                    e.printStackTrace()
                }
            }

    }

        //payment functions
        override fun onPaymentError(errorCode: Int, errorDescription: String?, paymentData: PaymentData?) {
            Toast.makeText(this, " Payment Failed Error $errorCode : $errorDescription",Toast.LENGTH_LONG).show()

        }
        @RequiresApi(Build.VERSION_CODES.O)
        override fun onPaymentSuccess(rzpPaymentId: String?, paymentData: PaymentData?) {
            val retrofit:Retrofit=Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            val retrofitInterface:RetrofitInterface=retrofit.create(RetrofitInterface::class.java)
            val map:HashMap<String,String> = HashMap()
            val current = LocalDateTime.now()
            val formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
            val formatted = current.format(formatter)
            map["phone"]=Phone
            map["userContact"]=paymentData?.userContact.toString()
            map["userEmail"]=paymentData?.userEmail.toString()
            map["data"]=paymentData?.data.toString()
            map["paymentId"]=rzpPaymentId.toString()
            map["signature"]=paymentData?.signature.toString()
            map["date"]=formatted
            map["amount"]=Fees
            val sharedPreferences = getSharedPreferences(
                "Settings",
                Context.MODE_PRIVATE
            )
            val cookie:String?=sharedPreferences.getString("user_cookie","")
            val call: Call<Void>? = cookie?.let { retrofitInterface.payment(it,map) }
            call!!.enqueue(object : Callback<Void> {
                override fun onFailure(call: Call<Void>, t: Throwable) {
                    Toast.makeText(this@six,getString(R.string.poorinternet),Toast.LENGTH_SHORT).show()
                }

                override fun onResponse(call: Call<Void>, response: Response<Void>) {

                    if(response.code()==200)
                    {
                        Toast.makeText(this@six,getString(R.string.paymentstored),Toast.LENGTH_SHORT).show()
                    }

                }

            })
           // Toast.makeText(this, "Payment Successful: $rzpPaymentId \n data: ${paymentData?.signature} ${paymentData?.userContact} ${paymentData?.userEmail} ${paymentData?.data} ${paymentData?.externalWallet}",Toast.LENGTH_LONG).show()
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


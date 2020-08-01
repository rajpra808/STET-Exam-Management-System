package com.example.stet

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import kotlinx.android.synthetic.main.page_1.*
import kotlinx.android.synthetic.main.timeline.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*

class Timeline : AppCompatActivity() {
    private val BASE_URL = "https://stet2020.herokuapp.com/"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.timeline)
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        var retrofitInterface: RetrofitInterface = retrofit.create(RetrofitInterface::class.java)
        val y:Int= Calendar.getInstance().get(Calendar.YEAR)
        val year:String=y.toString()
        val call: Call<Schedule> = retrofitInterface.timeline(year)

        call!!.enqueue(object : Callback<Schedule> {
            override fun onResponse(
                call: Call<Schedule>,
                response: Response<Schedule>
            ) {
                if (response.code() == 200) {
                    val time: Schedule? =response.body()
                    if (time != null) {
                        app_announce.text=time.application_announced_date
                        registration_start.text=time.registration_start_date
                        registration_end.text=time.registration_end_date
                        admit_card.text=time.date_of_admit_card
                        exam_date.text=time.date_of_examination
                        result.text=time.date_of_result_declaration
                    }

                } else if (response.code() == 404) {
                    Toast.makeText(
                        this@Timeline, "Current Year Not Found",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }

            override fun onFailure(
                call: Call<Schedule>,
                t: Throwable
            ) {
                Toast.makeText(
                    this@Timeline, "Poor Internet Try again",
                    Toast.LENGTH_LONG
                ).show()

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
}


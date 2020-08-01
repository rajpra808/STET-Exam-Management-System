package com.example.stet

//import android.R
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import kotlinx.android.synthetic.main.page_3.*
import kotlinx.android.synthetic.main.page_8.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*
import kotlin.collections.HashMap


class third : AppCompatActivity() {

    lateinit var Phone: String
    //private val BASE_URL = "http://192.168.43.114:3000"
    private val BASE_URL = "https://stet2020.herokuapp.com/"
    var t=0
    var x=0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.page_3)
        setSupportActionBar(findViewById(R.id.toolbar))
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setDisplayShowHomeEnabled(true)
        supportActionBar!!.title = "STET APPLICATION"
        val phone: String = intent.getStringExtra("phone")
        Phone = phone
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        var retrofitInterface: RetrofitInterface = retrofit.create(RetrofitInterface::class.java)


        val call: Call<Void> =
            retrofitInterface.submittedphone(phone)
        call!!.enqueue(object : Callback<Void> {
            override fun onResponse(
                call: Call<Void>,
                response: Response<Void>
            ) {
                if (response.code() == 200) {
                    Log.d("1", "2")
                    page_3_register.background=getDrawable(R.drawable.button_shape2)
                    t=1
                    x=1
                } else if (response.code() == 404) {
                x=1
                }
            }

            override fun onFailure(
                call: Call<Void>,
                t: Throwable
            ) {
                Log.d("0", t.message)
                x=0
                call.cancel()

            }
        })
        page_3_register.setOnClickListener {
            if(x!=0) {
                if (t != 1) {
                    val i = Intent(this, Register::class.java)
                    i.putExtra("phone", phone)
                    startActivity(i)
                } else {

                    Toast.makeText(
                        this@third,
                        "Already submitted registration form",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
            else
            {
                Toast.makeText(
                    this@third,
                    "Please Check your internet",
                    Toast.LENGTH_SHORT
                ).show()
            }


        }


    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        val inflater = menuInflater
        inflater.inflate(R.menu.menu, menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.home -> {

                val it = Intent(this, Home1::class.java)
                startActivity(it)
                return true
            }
            R.id.status -> {
                val it = Intent(this, Status::class.java)
                it.putExtra("phone", Phone)
                startActivity(it)
                return true
            }
            R.id.Help -> {
                val it = Intent(this, Help::class.java)
                it.putExtra("phone", Phone)
                startActivity(it)
                return true
            }
            R.id.admit -> {
                val it = Intent(this, SecondActivity::class.java)
                it.putExtra("phone", Phone)
                startActivity(it)
                return true
            }
            R.id.language -> {
                showChangeLang()
                return true
            }
            R.id.FAQs -> {
                val it = Intent(this, FAQS::class.java)
                it.putExtra("phone", Phone)
                startActivity(it)
                return true
            }
            R.id.timeline -> {
                val it = Intent(this, Timeline::class.java)
                it.putExtra("phone", Phone)
                startActivity(it)

                return true
            }
            R.id.bot -> {
                val it = Intent(this, ChatBot::class.java)
                it.putExtra("phone", Phone)
                startActivity(it)

                return true
            }
            R.id.logout -> {
                val sharedPreferences = getSharedPreferences(
                    "MySharedPref",
                    Context.MODE_PRIVATE
                )
                val myEdit = sharedPreferences.edit()
                myEdit.putBoolean("login", false).apply()
                myEdit.putString("phone", "").apply()
                val i = Intent(this@third, MainActivity::class.java)
                startActivity(i)
                return true
            }
        }
        return super.onOptionsItemSelected(item)
    }
    private fun showChangeLang() {

        val listItems = arrayOf("English","हिन्दी","नेपाली")
        val sharedPreferences = getSharedPreferences("Settings", Activity.MODE_PRIVATE)
        val language = sharedPreferences.getString("My_Lang", "")
        var t=0
        when (language) {
            "en" -> {
                t=0
            }
            "hi" -> {
                t=1
            }
            "ne" -> {
                t=2
            }
        }
        val mBuilder = AlertDialog.Builder(this@third)
        mBuilder.setTitle("Choose Language")
        mBuilder.setSingleChoiceItems(listItems, t) { dialog, which ->
            if (which == 0) {
                setLocate("en")
                recreate()
            } else if (which == 1) {
                setLocate("hi")
                recreate()
            } else if(which==2){
                setLocate("ne")
                recreate()
            }
            dialog.dismiss()

        }
        val mDialog = mBuilder.create()

        mDialog.show()
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

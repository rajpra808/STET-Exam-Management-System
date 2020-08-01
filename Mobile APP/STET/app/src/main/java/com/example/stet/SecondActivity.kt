package com.example.stet

import android.app.Activity
import android.app.ProgressDialog
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.graphics.BitmapFactory
import android.os.Bundle
import android.os.Environment
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.admitcard_info.*
import org.bson.Document
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.util.*



class SecondActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.admitcard_info)
        val phone=intent.getStringExtra("phone")
        download.setOnClickListener {
            if(phone!="0") {
                image(phone, "admit", "fs")
            }
            else
            {
                Toast.makeText(this,"LOGIN IN AGAIN TO DOWNLOAD ADMIT CARD",Toast.LENGTH_SHORT).show()
            }
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
    fun image(phone:String,str: String,coll: String){
        val retrofit1: Retrofit = Retrofit.Builder()
            .baseUrl("https://stet2020.herokuapp.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        val progress2 = ProgressDialog(this)
        progress2.setMessage("Downloading Admitcard......")
        progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
        progress2.isIndeterminate = true
        progress2.show()
        var retrofitInterface1: Retro3? = retrofit1.create(Retro3::class.java)
        val call: Call<Image?>? = retrofitInterface1?.downloadfile(phone+"_"+str+".pdf",coll)
        call!!.enqueue(object : Callback<Image?> {
            override fun onFailure(call: Call<Image?>, t: Throwable) {
                Toast.makeText(this@SecondActivity,t.message, Toast.LENGTH_SHORT).show()
                progress2.dismiss()
            }
            override fun onResponse(call: Call<Image?>, response: Response<Image?>) {
                if(response.code()==200)
                {
                    val Res: Image? =response.body()
                    progress2.dismiss()
                    if(Res!=null)
                    {
                        val st: String =Res.imageURL
                        progress2.dismiss()
                        val pureBase64Encoded:String  = st.substring(st.indexOf(",")  + 1);
                        val decodedString: ByteArray = android.util.Base64.decode(pureBase64Encoded, android.util.Base64.DEFAULT)
                        val myExternalFile = File(
                            Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS),
                            "AdmitCard"
                        )
                        val filename: String =
                            myExternalFile.path + File.separator + System.currentTimeMillis().toString() + "admitcard.png"
                        try {
                            val fileOutPutStream = FileOutputStream(filename)
                            fileOutPutStream.write(decodedString)
                            fileOutPutStream.close()
                            Toast.makeText(this@SecondActivity,"File Saved in Downloads/AdmitCard", Toast.LENGTH_LONG).show()
                            download.background=getDrawable(R.drawable.button_shape2)
                        } catch (e: IOException) {
                            e.printStackTrace()
                        }

                    }
                }
                else
                {
                    progress2.dismiss()
                    Toast.makeText(this@SecondActivity,"Admit card not generated", Toast.LENGTH_SHORT).show()

                }
                progress2.dismiss()
            }

        })

    }
}
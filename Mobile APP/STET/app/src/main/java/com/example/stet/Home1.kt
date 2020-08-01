package com.example.stet

import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.opengl.Visibility
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import kotlinx.android.synthetic.main.homepage.*
import java.util.*

class Home1 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.homepage)
        homepage_btn.setOnClickListener {
            showChangeLang()
        }
        homepage_admitCard.setOnClickListener {
            val intent = Intent(this, SecondActivity::class.java)
            intent.putExtra("phone","0")
            startActivity(intent)
        }

        homepage_examPattern.setOnClickListener {
            val intent2 = Intent(this, ThirdActivity::class.java)
            startActivity(intent2)
        }


        homepage_prepare.setOnClickListener {
            val intent4 = Intent(this, FourthActivity::class.java)
            startActivity(intent4)
        }

        homepage_applicationForm.setOnClickListener {
            val intent5 = Intent(this, FifthActivity::class.java)
            startActivity(intent5)
        }

        homepage_eligibilityCriteria.setOnClickListener {
            val intent6 = Intent(this, SixthActivity::class.java)
            startActivity(intent6)
        }

        homepage_timeline.setOnClickListener {
            val intent7 = Intent(this, Timeline::class.java)
            startActivity(intent7)
        }

        homepage_click_here.setOnClickListener {
            val intent8 = Intent(this, MainActivity::class.java)
            startActivity(intent8)
        }
        homepage_syllabus.setOnClickListener {
            val intent8 = Intent(this, NinthActivity::class.java)
            startActivity(intent8)
        }






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
        val mBuilder = AlertDialog.Builder(this@Home1)
        mBuilder.setTitle(getString(R.string.chooselang))
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
package com.example.stet

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.view.MotionEvent
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import kotlinx.android.synthetic.main.faqs.*
import java.util.*

class FAQS : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.faqs)
        val phone: String = intent.getStringExtra("phone")
        loadLocate()
        faq_q1.setOnTouchListener { v, event ->
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> faq_a1.visibility = View.VISIBLE
            }

            v?.onTouchEvent(event) ?: true
        }
        faq_q2.setOnTouchListener { v, event ->
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> faq_a2.visibility = View.VISIBLE
            }

            v?.onTouchEvent(event) ?: true
        }
        faq_q3.setOnTouchListener { v, event ->
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> faq_a3.visibility = View.VISIBLE
            }

            v?.onTouchEvent(event) ?: true
        }
        faq_q4.setOnTouchListener { v, event ->
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> faq_a4.visibility = View.VISIBLE
            }
            v?.onTouchEvent(event) ?: true
        }
        faq_q5.setOnTouchListener { v, event ->
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> faq_a5.visibility = View.VISIBLE
            }
            v?.onTouchEvent(event) ?: true
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
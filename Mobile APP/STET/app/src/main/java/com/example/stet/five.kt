package com.example.stet

import android.app.Activity
import android.app.ProgressDialog
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import com.wajahatkarim3.easyvalidation.core.view_ktx.validator
import kotlinx.android.synthetic.main.page_5.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*


class five : AppCompatActivity() {
    //this file for academics purpose.

    private val BASE_URL = "https://stet2020.herokuapp.com/"
    var ses=0
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.page_5)
        page_5_progress_bar.progress = 100
        val phone: String = intent.getStringExtra("phone")
        loadLocate()
        //shared preference to get user_cookie
        val sharedPreferencesx = getSharedPreferences(
            "Settings",
            Context.MODE_PRIVATE
        )
        val retrofitx: Retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        var retrofitInterfacex: RetrofitInterface = retrofitx.create(RetrofitInterface::class.java)
        val cookiex:String?=sharedPreferencesx.getString("user_cookie","")
        val callx: Call<Void?>? = cookiex?.let { retrofitInterfacex.executeLogout(it) }
        //callback for check session
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
                        this@five, getString(R.string.logkro),
                        Toast.LENGTH_LONG
                    ).show()
                    val i = Intent(this@five, MainActivity::class.java)
                    startActivity(i)
                } else if (response.code() == 200) {

                    ses=1
                } else {
                    Toast.makeText(
                        this@five, getString(R.string.toastslowinternet),
                        Toast.LENGTH_LONG
                    ).show()

                }
            }

            override fun onFailure(
                call: Call<Void?>?,
                t: Throwable
            ) {
                Toast.makeText(
                    this@five, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()

            }

        })

            val retrofit: Retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
            val sharedPreferences = getSharedPreferences(
                "Settings",
                Context.MODE_PRIVATE
            )
            val cookie: String? = sharedPreferences.getString("user_cookie", "")
            var retrofitInterface: RetrofitInterface =
                retrofit.create(RetrofitInterface::class.java)
            val map: HashMap<String?, String?> = HashMap()
            map["Phone"] = phone
            val progress = ProgressDialog(this)
            progress.setMessage(getString(R.string.loadingprof))
            progress.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress.isIndeterminate = true
            progress.show()
            //callback for loading academics from db
            val call3: Call<Education?>? = cookie?.let { retrofitInterface.getEducation(it, map) }
            call3!!.enqueue(object : Callback<Education?> {
                override fun onResponse(
                    call: Call<Education?>?,
                    response: Response<Education?>
                ) {
                    if (response.code() == 200) {

                        val result = response.body()

                        if (result != null) {
                            page_5_spin_min_qualification.setSelection(getSpinMinaqual(result.MinQualification))
                            page_5_spin_prof_qualification.setSelection(getSpinProfessQual(result.ProfessionalQualification))
                            page_5_enter_university.setText(result.University)
                            page_5_enter_percentage.setText(result.Percentage)
                            page_5_spin_category.setSelection(getSpinApplicationCategory(result.ApplicationCategory))
                            page_5_spin_language.setSelection(getSpinLanguage(result.PaperLanguage))
                            page_5_next.text = getString(R.string.update)
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
                        this@five, getString(R.string.poorinternet),
                        Toast.LENGTH_LONG
                    ).show()
                }
            })
            progress.dismiss()

            page_5_next.setOnClickListener {
                val progress = ProgressDialog(this)
                progress.setMessage(getString(R.string.storingprof))
                progress.setProgressStyle(ProgressDialog.STYLE_SPINNER)
                progress.isIndeterminate = true
                progress.show()
                if (validPercentage(page_5_enter_percentage, 4) == 0
                    && validUniversity(page_5_enter_university) == 0
                    && validSpinner(page_5_spin_category) == 0
                    && validSpinner(page_5_spin_language) == 0
                    && validSpinner(page_5_spin_min_qualification) == 0
                    && validSpinner(page_5_spin_prof_qualification) == 0
                    && page_5_chechbox.isChecked
                ) {
                    val myFirstDocument: HashMap<String, String> = HashMap()
                    myFirstDocument["Phone"] = phone
                    myFirstDocument["Percentage"] = page_5_enter_percentage.text.toString()
                    myFirstDocument["University"] = page_5_enter_university.text.toString()
                    myFirstDocument["MinQualification"] =
                        page_5_spin_min_qualification.selectedItem.toString()
                    myFirstDocument["ProfessionalQualification"] =
                        page_5_spin_prof_qualification.selectedItem.toString()
                    myFirstDocument["ApplicationCategory"] =
                        page_5_spin_category.selectedItem.toString()

                    myFirstDocument["PaperLanguage"] = page_5_spin_language.selectedItem.toString()
                    val sharedPreferences = getSharedPreferences(
                        "Settings",
                        Context.MODE_PRIVATE
                    )
                    //callback for storing academics data in db
                    val cookie: String? = sharedPreferences.getString("user_cookie", "")
                    val call: Call<Void?>? =
                        cookie?.let { it1 ->
                            retrofitInterface.executeEducation(
                                it1,
                                myFirstDocument
                            )
                        }
                    call!!.enqueue(object : Callback<Void?> {
                        override fun onResponse(
                            call: Call<Void?>?,
                            response: Response<Void?>
                        ) {
                            if (response.code() == 200) {
                                Log.d("Success", "Data Stored")
                                Toast.makeText(
                                    this@five,
                                    getString(R.string.datastored), Toast.LENGTH_LONG
                                ).show()
                                val i = Intent(this@five, Register::class.java)
                                i.putExtra("phone", phone)
                                startActivity(i)
                                progress.dismiss()
                            } else {
                                Toast.makeText(
                                               this@five,
                            getString(R.string.toastslowinternet), Toast.LENGTH_LONG
                            ).show()
                            progress.dismiss()
                        }

                        }

                        override fun onFailure(
                            call: Call<Void?>?,
                            t: Throwable
                        ) {
                            Log.d("Failure", t.message)
                            Toast.makeText(
                                this@five, getString(R.string.poorinternet),
                                Toast.LENGTH_LONG
                            ).show()
                            progress.dismiss()


                        }
                    })

                } else {
                    if (page_5_chechbox.isChecked) {

                        Toast.makeText(this, getString(R.string.checkerror), Toast.LENGTH_LONG)
                            .show()
                    } else {
                        Toast.makeText(this, getString(R.string.accepttc), Toast.LENGTH_SHORT)
                            .show()
                    }
                    progress.dismiss()

                }


        }
        page_5_back.setOnClickListener {
            val i = Intent(this, Register::class.java)
            i.putExtra("phone", phone)
            startActivity(i)


        }

    }

    private fun validUniversity(editText: EditText): Int {   //check for valid university
        var x = 0
        editText.text.toString().validator()
            .nonEmpty()
            .noNumbers()
            .addErrorCallback {
                editText.error = getString(R.string.validuniversity)
                x = 1
            }
            .addSuccessCallback {
                x = 0
            }
            .check()
        return x
    }

    private fun validPercentage(editText: EditText, d: Int): Int {   //check for valid percentage
        var x = 0
        editText.text.toString().validator()
            .nonEmpty()
            .validNumber()
            .maxLength(d + 1)
            .minLength(2)
            .addErrorCallback {
                editText.error = getString(R.string.enterupto) + d + getString(R.string.digitonlu)
                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }

    private fun validSpinner(Spinner1: Spinner): Int {   //check for spinner
        var x = 0
        if (Spinner1.selectedItem.toString().trim() == "Select") {
            x = 1
            Toast.makeText(this, getString(R.string.selectone), Toast.LENGTH_LONG).show()
        }

        return x
    }

    private fun getSpinApplicationCategory(str: String?): Int {   //get spin index

        val list = resources.getStringArray(R.array.application_category)
        val i = 1
        for (i in 1..3) {
            if (list[i] == str) {
                return i
            }
        }
        return 0
    }

    private fun getSpinLanguage(str: String?): Int {

        val list = resources.getStringArray(R.array.language_choice)
        val i = 1
        for (i in 1..6) {
            if (list[i] == str) {
                return i
            }
        }
        return 0
    }

    private fun getSpinMinaqual(str: String?): Int {

        val list = resources.getStringArray(R.array.min_qualification)
        val i = 1
        for (i in 1..2) {
            if (list[i] == str) {
                return i
            }
        }
        return 0
    }

    private fun getSpinProfessQual(str: String?): Int {

        val list = resources.getStringArray(R.array.prof_qualification)
        val i = 1
        for (i in 1..4) {
            if (list[i] == str) {
                return i
            }
        }
        return 0
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

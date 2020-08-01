package com.example.stet

//import android.R
import android.app.Activity
import android.app.ProgressDialog
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import com.wajahatkarim3.easyvalidation.core.view_ktx.validator
import kotlinx.android.synthetic.main.page_1_signup.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*


class ten : AppCompatActivity() {

    private val BASE_URL = "https://stet2020.herokuapp.com/"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        loadLocate()
        setContentView(R.layout.page_1_signup)
        page_1_signup_back.setOnClickListener {
            val i = Intent(this, MainActivity::class.java)
            startActivity(i)
        }

        page_1_signup_verify.setOnClickListener {
            val progress = ProgressDialog(this)
            progress.setMessage("Checking Credentials :) ")
            progress.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress.isIndeterminate = true
            progress.show()

            if (validName(page_1_signup_name_et) == 0 && validEmail(page_1_signup_email_et) == 0
                && validNumber(
                    page_1_signup_phn_et,
                    10
                ) == 0 && validNumber(page_1_signup_Edtaadhar, 12) == 0
                && isValidPassword(page_1_signup_Edtpass) == 0
            ) {


                val retrofit: Retrofit = Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build()

                var retrofitInterface: RetrofitInterface =
                    retrofit.create(RetrofitInterface::class.java)
                val map: HashMap<String?, String?> = HashMap()
                map["phone"] = page_1_signup_phn_et.text.toString()
                map["email"] = page_1_signup_email_et.text.toString()
                map["aadhar"] = page_1_signup_Edtaadhar.text.toString()
                val call1: Call<Void?>? = retrofitInterface.check(map)
                call1!!.enqueue(object : Callback<Void?> {
                    override fun onResponse(
                        call: Call<Void?>?,
                        response: Response<Void?>
                    ) {
                        if (response.code() == 201) {
                            Toast.makeText(
                                this@ten,
                                "Phone number  already registered",
                                Toast.LENGTH_SHORT
                            ).show()
                            progress.dismiss()
                        } else if (response.code() == 202) {
                            Toast.makeText(
                                this@ten,
                                "Email-id already registered",
                                Toast.LENGTH_SHORT
                            ).show()
                            progress.dismiss()

                        } else if (response.code() == 203) {
                            Toast.makeText(
                                this@ten,
                                "Aadhar number  already registered",
                                Toast.LENGTH_SHORT
                            ).show()
                            progress.dismiss()

                        } else {
                            val i = Intent(this@ten, second::class.java)
                            i.putExtra("Name", page_1_signup_name_et.text.toString())
                            i.putExtra("Email", page_1_signup_email_et.text.toString())
                            i.putExtra("Phone", page_1_signup_phn_et.text.toString())
                            i.putExtra("Aadhar", page_1_signup_Edtaadhar.text.toString())
                            i.putExtra("Password", page_1_signup_Edtpass.text.toString())
                            progress.dismiss()
                            startActivity(i)
                        }
                    }

                    override fun onFailure(
                        call1: Call<Void?>?,
                        t: Throwable
                    ) {
                        Log.d("Failure", t.message)
                        Toast.makeText(
                            this@ten, "Poor Internet Try again",
                            Toast.LENGTH_LONG
                        ).show()
                        progress.dismiss()
                    }
                })

                /*   val map: HashMap<String?, String?> = HashMap()
                   map["phone"] = page_1_signup_phn_et.text.toString()
                   val call1: Call<Void?>? = retrofitInterface.checkPhone(map)
                   call1!!.enqueue(object : Callback<Void?> {
                       override fun onResponse(
                           call: Call<Void?>?,
                           response: Response<Void?>
                       ) {
                           p = if (response.code() == 200) {
                               Toast.makeText(
                                   this@ten,
                                   "Phone number already registered",
                                   Toast.LENGTH_SHORT
                               ).show()
                               1
                           } else {
                               0
                           }
                       }

                       override fun onFailure(
                           call1: Call<Void?>?,
                           t: Throwable
                       ) {
                           Log.d("Failure", t.message)
                           Toast.makeText(
                               this@ten, t.message,
                               Toast.LENGTH_LONG
                           ).show()
                           p = 2
                       }
                   })

                   val map1: HashMap<String?, String?> = HashMap()
                   map1["email"] = page_1_signup_email_et.text.toString()
                   val call2: Call<Void?>? = retrofitInterface.checkEmail(map1)
                   call2!!.enqueue(object : Callback<Void?> {
                       override fun onResponse(
                           call: Call<Void?>?,
                           response: Response<Void?>
                       ) {
                           e = if (response.code() == 200) {
                               Toast.makeText(
                                   this@ten,
                                   "Email ID already registered",
                                   Toast.LENGTH_SHORT
                               ).show()
                               1
                           } else {
                               0
                           }
                       }

                       override fun onFailure(
                           call1: Call<Void?>?,
                           t: Throwable
                       ) {
                           Log.d("Failure", t.message)
                           Toast.makeText(
                               this@ten, t.message,
                               Toast.LENGTH_LONG
                           ).show()
                           e = 2
                       }
                   })

                   val map2: HashMap<String?, String?> = HashMap()
                   map2["aadhar"] = page_1_signup_Edtaadhar.text.toString()
                   val call3: Call<Void?>? = retrofitInterface.checkAadhar(map2)
                   call3!!.enqueue(object : Callback<Void?> {
                       override fun onResponse(
                           call: Call<Void?>?,
                           response: Response<Void?>
                       ) {
                           a = if (response.code() == 200) {
                               Toast.makeText(
                                   this@ten,
                                   "Aadhar number already registered",
                                   Toast.LENGTH_SHORT
                               ).show()

                               1
                           } else {
                               if(p==0 && e==0 && c==0)
                               {
                                   val i = Intent(this@ten, second::class.java)
                                   i.putExtra("Name", page_1_signup_name_et.text.toString())
                                   i.putExtra("Email", page_1_signup_email_et.text.toString())
                                   i.putExtra("Phone", page_1_signup_phn_et.text.toString())
                                   i.putExtra("Aadhar", page_1_signup_Edtaadhar.text.toString())
                                   i.putExtra("Password", page_1_signup_Edtpass.text.toString())
                                   startActivity(i)
                               }
                               0
                           }
                       }

                       override fun onFailure(
                           call1: Call<Void?>?,
                           t: Throwable
                       ) {
                           Log.d("Failure", t.message)
                           Toast.makeText(
                               this@ten, t.message,
                               Toast.LENGTH_LONG
                           ).show()
                           a = 2
                       }
                   })*/

            } else {
                progress.dismiss()
                Toast.makeText(this@ten, "Check Error", Toast.LENGTH_SHORT).show()
            }
        }

    }

    private fun validName(editText: EditText): Int {
        var x = 2
        editText.text.toString().validator()
            .nonEmpty()
            .noNumbers()
            .addErrorCallback {
                editText.error =
                    "Enter only Alphabets\n No Numbers are allowed"

                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }

    private fun validNumber(editText: EditText, d: Int): Int {
        var x = 2
        editText.text.toString().validator()
            .nonEmpty()
            .onlyNumbers()
            .addErrorCallback {
                editText.error = "Enter $d digit Number Only"
                x = 1
            }
            .addSuccessCallback {
                x = if (editText.text.toString().length == d) {
                    0
                } else {
                    editText.error = "Enter $d digit Number Only"
                    1
                }

            }

            .check()
        return x
    }

    private fun validEmail(editText: EditText): Int {
        var x = 2
        editText.text.toString().validator()
            .validEmail()
            .nonEmpty()
            .addErrorCallback {
                editText.error = "Enter valid email-id"
                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }

    private fun isValidPassword(editText: EditText): Int {
        var x = 2
        editText.text.toString().validator()
            .minLength(6)
            .nonEmpty()
            .atleastOneSpecialCharacters()
            .atleastOneNumber()
            .atleastOneLowerCase()
            .atleastOneUpperCase()
            .addErrorCallback {
                editText.error =
                    "Atleast one Uppercase\none LowerCase\none Special Character\none Number"
                x = 1
            }
            .addSuccessCallback {
                x = 0
            }
            .check()
        return x
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

package com.example.stet

import android.app.Activity
import android.app.DatePickerDialog
import android.app.DatePickerDialog.OnDateSetListener
import android.app.ProgressDialog
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.RadioButton
import android.widget.Spinner
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.example.stet.R
import com.wajahatkarim3.easyvalidation.core.view_ktx.validator
import kotlinx.android.synthetic.main.page_4.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*


class fourth : AppCompatActivity() {
    //for storing personal details
    private lateinit var gender: String
    private lateinit var husbandorfather: String
    private val BASE_URL = "https://stet2020.herokuapp.com/"
    var ch: Int = 0
    var ses=0
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.page_4)
        loadLocate()
        page_4_progressBar.progress = 100
        page_4_enter_phn_no_1.text = intent.getStringExtra("phone")
        //to get user_cookie

        val sharedPreferencesx = getSharedPreferences(
            "Settings",
            Context.MODE_PRIVATE
        )
        //retrofit builder
        val retrofitx: Retrofit = Retrofit.Builder()
            .baseUrl("https://stet2020.herokuapp.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        //retrofit instance
        var retrofitInterfacex: RetrofitInterface = retrofitx.create(RetrofitInterface::class.java)
        val cookiex:String?=sharedPreferencesx.getString("user_cookie","")
        //check session callback
        val callx: Call<Void?>? = cookiex?.let { retrofitInterfacex.executeLogout(it) }

        callx!!.enqueue(object : Callback<Void?> {
            override fun onResponse(
                call: Call<Void?>?,
                response: Response<Void?>
            ) {
                if (response.code() == 201) {
                    //session expired
                    val myEditx = sharedPreferencesx.edit()
                    myEditx.putBoolean("login", false).apply()
                    myEditx.putString("phone", "").apply()
                    myEditx.putString("user_cookie", "").apply()
                    Toast.makeText(
                        this@fourth, getString(R.string.logkro),
                        Toast.LENGTH_LONG
                    ).show()
                    val i = Intent(this@fourth, MainActivity::class.java)
                    startActivity(i)
                } else if (response.code() == 200) {
                    //session valid
                    ses=1
                } else {
                    Toast.makeText(
                        this@fourth, getString(R.string.toastslowinternet),
                        Toast.LENGTH_LONG
                    ).show()

                }
            }

            override fun onFailure(
                call: Call<Void?>?,
                t: Throwable
            ) {
                Toast.makeText(
                    this@fourth, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()

            }

        })
        page_4_back.setOnClickListener {
            val i = Intent(this, Register::class.java)
            i.putExtra("phone", page_4_enter_phn_no_1.text.toString())
            startActivity(i)
        }
        //for date picker dob
        page_4_calender.setOnClickListener {
            val datePickerDialog: DatePickerDialog


            val mYear = 1999

            val mMonth = 5

            val mDay = 8
            datePickerDialog = DatePickerDialog(
                this,
                OnDateSetListener { _, year, monthOfYear, dayOfMonth ->
                    page_4_enter_dob.setText(
                        dayOfMonth.toString() + "-"
                                + (monthOfYear + 1) + "-" + year
                    )

                }, mYear, mMonth, mDay
            )
            datePickerDialog.show()

        }
        val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        var retrofitInterface: RetrofitInterface = retrofit.create(RetrofitInterface::class.java)
        val map: HashMap<String?, String?> = HashMap()

        map["phone"] = page_4_enter_phn_no_1.text.toString()
        val sharedPreferences = getSharedPreferences(
            "Settings",
            Context.MODE_PRIVATE
        )
        val cookie:String?=sharedPreferences.getString("user_cookie","")
        // fetching signup details  from db
        val call1: Call<Important?>? = cookie?.let { retrofitInterface.getDetails(it,map) }
        call1!!.enqueue(object : Callback<Important?> {
            override fun onResponse(
                call: Call<Important?>?,
                response: Response<Important?>
            ) {
                if (response.code() == 200) {
                    Log.d("Success", "Data Stored")
                    val result = response.body()

                    if (result != null) {
                        page_4_enter_email_1.text = result.email
                        page_4_enter_aadhar_no.text = result.aadhar
                    }


                } else {

                }
            }

            override fun onFailure(
                call1: Call<Important?>?,
                t: Throwable
            ) {
                Log.d("Failure", t.message)
                Toast.makeText(
                    this@fourth, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()
            }
        })

        val map2: HashMap<String?, String?> = HashMap()
        map2["Phone1"] = page_4_enter_phn_no_1.text.toString()
        val progress2 = ProgressDialog(this)
        progress2.setMessage(getString(R.string.loadingpers))
        progress2.setProgressStyle(ProgressDialog.STYLE_SPINNER)
        progress2.isIndeterminate = true
        progress2.show()
        //for fetching personal info from db
        val call2: Call<Personal?>? = cookie?.let { retrofitInterface.getPersonal(it,map2) }
        call2!!.enqueue(object : Callback<Personal?> {
            override fun onResponse(
                call: Call<Personal?>?,
                response: Response<Personal?>
            ) {
                if (response.code() == 200) {

                    val result = response.body()

                    if (result != null) {
                        page_4_enter_fname.setText(result.Fname)
                        page_4_enter_mname.setText(result.Mname)
                        page_4_enter_lname.setText(result.Lname)
                        page_4_enter_father_fname.setText(result.FHFname)
                        page_4_enter_father_mname.setText(result.FHMname)
                        page_4_enter_father_lname.setText(result.FHLname)
                        page_4_enter_mother_fname.setText(result.MFname)
                        page_4_enter_mother_mname.setText(result.MMname)
                        page_4_enter_mother_lname.setText(result.MLname)
                        if (result.FH == "Father") {
                            page_4_father.isChecked = true
                        } else if (result.FH == "Husband") {
                            page_4_husband.isChecked = true
                        }
                        if (result.gender == "Male") {
                            page_4_male.isChecked = true
                        } else if (result.gender == "Female") {
                            page_4_female.isChecked = true
                        } else if (result.gender == "Others") {
                            page_4_other.isChecked = true
                        }
                        page_4_enter_dob.setText(result.DOB)
                        page_4_enter_postal_address_1.setText(result.AddressOne)
                        page_4_enter_postal_address_2.setText(result.AddressTwo)
                        page_4_enter_postal_address_district_1.setText(result.DistrictOne)
                        page_4_enter_postal_address_district_2.setText(result.DistrictTwo)
                        page_4_enter_postal_zip_1.setText(result.PinCodeOne)
                        page_4_enter_postal_zip_2.setText(result.PinCodeTwo)
                        page_4_enter_phn_no_2.setText(result.Phone2)
                        page_4_enter_email_2.setText(result.Email2)
                        page_4_spin_community.setSelection(getSpinCommunity(result.Category))
                        page_4_spin_states_1.setSelection(getSpinState(result.StateOne))
                        page_4_spin_states_2.setSelection(getSpinState(result.StateTwo))
                        ch = 1
                        page_4_next.text = getString(R.string.update)
                        progress2.dismiss()

                    } else {
                        ch = 0
                        progress2.dismiss()
                    }


                }
            }

            override fun onFailure(
                call1: Call<Personal?>?,
                t: Throwable
            ) {
                Log.d("Failure", t.message)
                Toast.makeText(
                    this@fourth, getString(R.string.poorinternet),
                    Toast.LENGTH_LONG
                ).show()
            }
        })
        progress2.dismiss()
        page_4_next.setOnClickListener {
            val progress = ProgressDialog(this)
            progress.setMessage(getString(R.string.storingpers))
            progress.setProgressStyle(ProgressDialog.STYLE_SPINNER)
            progress.isIndeterminate = true
            progress.show()
            if (validName(page_4_enter_fname) == 0
                && validName(page_4_enter_lname) == 0
                && validName(page_4_enter_father_fname) == 0
                && validName(page_4_enter_father_lname) == 0
                && validName(page_4_enter_mother_fname) == 0
                && validName(page_4_enter_mother_lname) == 0
                && validHusbandorFather(page_4_father, page_4_husband) == 0
                && additional(
                    page_4_enter_postal_address_district_2,
                    page_4_enter_postal_address_2,
                    page_4_enter_postal_zip_2,
                    page_4_spin_states_2
                ) == 0
                && validNumber(page_4_enter_phn_no_2, 10) == 0
                && validNumber(page_4_enter_postal_zip_1, 6) == 0
                && validEmail(page_4_enter_email_2) == 0
                && validDOB(page_4_enter_dob) == 0
                && validSpinner(page_4_spin_community) == 0
                && validSpinner(page_4_spin_states_1) == 0
                && validAddress(page_4_enter_postal_address_1) == 0
                && validAddress(page_4_enter_postal_address_district_1) == 0
                && validGender(page_4_male, page_4_female, page_4_other) == 0
                && page_4_checkbox.isChecked
            ) {

                var state2: String = page_4_spin_states_2.selectedItem.toString()
                if (state2 == "Select") {
                    state2 = ""
                }
                val Personal: HashMap<String, String> = HashMap()
                Personal["Fname"] = page_4_enter_fname.text.toString()
                Personal["Mname"] = page_4_enter_mname.text.toString()
                Personal["Lname"] = page_4_enter_lname.text.toString()
                Personal["gender"] = gender
                Personal["FH"] = husbandorfather
                Personal["FHFname"] = page_4_enter_father_fname.text.toString()
                Personal["FHMname"] = page_4_enter_father_mname.text.toString()
                Personal["FHLname"] = page_4_enter_father_lname.text.toString()
                Personal["MFname"] = page_4_enter_mother_fname.text.toString()
                Personal["MMname"] = page_4_enter_mother_mname.text.toString()
                Personal["MLname"] = page_4_enter_mother_lname.text.toString()
                Personal["DOB"] = page_4_enter_dob.text.toString()
                Personal["Category"] = page_4_spin_community.selectedItem.toString()
                Personal["Aadhar"] = page_4_enter_aadhar_no.text.toString()
                Personal["AddressOne"] = page_4_enter_postal_address_1.text.toString()
                Personal["DistrictOne"] = page_4_enter_postal_address_district_1.text.toString()
                Personal["StateOne"] = page_4_spin_states_1.selectedItem.toString()
                Personal["PinCodeOne"] = page_4_enter_postal_zip_1.text.toString()
                Personal["AddressTwo"] = page_4_enter_postal_address_2.text.toString()
                Personal["DistrictTwo"] = page_4_enter_postal_address_district_2.text.toString()
                Personal["StateTwo"] = state2
                Personal["PinCodeTwo"] = page_4_enter_postal_zip_2.text.toString()
                Personal["Phone1"] = page_4_enter_phn_no_1.text.toString()
                Personal["Phone2"] = page_4_enter_phn_no_2.text.toString()
                Personal["Email1"] = page_4_enter_email_1.text.toString()
                Personal["Email2"] = page_4_enter_email_2.text.toString()
                val sharedPreferences = getSharedPreferences(
                    "Settings",
                    Context.MODE_PRIVATE
                )
                val cookie:String?=sharedPreferences.getString("user_cookie","")
                val call: Call<Void?>? =
                    cookie?.let { it1 -> retrofitInterface.executeDetail(it1,Personal) }
                //for storing personal details in db
                call!!.enqueue(object : Callback<Void?> {
                    override fun onResponse(
                        call: Call<Void?>?,
                        response: Response<Void?>
                    ) {
                        if (response.code() == 200) {
                            Log.d("Success", "Data Stored")
                            Toast.makeText(
                                this@fourth,
                                getString(R.string.datastored), Toast.LENGTH_LONG
                            ).show()

                            val it = Intent(this@fourth, Register::class.java)
                            progress.dismiss()
                            it.putExtra("phone", page_4_enter_phn_no_1.text.toString())
                            startActivity(it)
                        } else {
                            progress.dismiss()
                        }
                    }

                    override fun onFailure(
                        call: Call<Void?>?,
                        t: Throwable
                    ) {
                        Log.d("Failure", t.message)
                        Toast.makeText(
                            this@fourth,  getString(R.string.poorinternet),
                            Toast.LENGTH_LONG
                        ).show()
                        progress.dismiss()
                    }
                })


            } else {
                if (page_4_checkbox.isChecked) {
                    Toast.makeText(this,  getString(R.string.checkerror), Toast.LENGTH_LONG).show()
                } else {
                    Toast.makeText(this,  getString(R.string.accepttc), Toast.LENGTH_SHORT).show()
                }
                progress.dismiss()
            }


        }
    }
    // checking additional address
    private fun additional(
        page4EnterPostalAddressDistrict2: EditText,
        page4EnterPostalAddress2: EditText,
        page4EnterPostalzip2: EditText,
        page4SpinStates2: Spinner
    ): Int {
        var x = 0
        x = if ((validAddress(page4EnterPostalAddressDistrict2) == 0 && validAddress(
                page4EnterPostalAddress2
            ) == 0 && validNumber(
                page4EnterPostalzip2,
                6
            ) == 0 && validSpinner(page4SpinStates2) == 0) || (page4EnterPostalAddress2.text.toString() == "" && page4EnterPostalAddressDistrict2.text.toString() == "" && page4EnterPostalzip2.text.toString() == "" && page4SpinStates2.selectedItem.toString() == "Select")
        ) {
            0

        } else {
            Toast.makeText(
                this@fourth,
                getString(R.string.additional),
                Toast.LENGTH_SHORT
            ).show()
            1
        }
        return x

    }
    //valid dob or not
    private fun validDOB(editText: EditText): Int {
        var x = 0
        editText.text.toString().validator()
            .nonEmpty()
            .addErrorCallback {
                editText.error = getString(R.string.enterdob)
                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }
    //valid spinner
    private fun validSpinner(Spinner1: Spinner): Int {
        var x = 0
        if (Spinner1.selectedItem.toString().trim() == "Select") {
            x = 1
            Toast.makeText(this,  getString(R.string.selectone), Toast.LENGTH_SHORT).show()
        }

        return x
    }
    //valid address
    private fun validAddress(editText: EditText): Int {
        var x = 0
        editText.text.toString().validator()
            .nonEmpty()
            .addErrorCallback {
                editText.error = getString(R.string.validaddress)
                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }
    //valid gender
    private fun validGender(
        radioButton1: RadioButton,
        radioButton2: RadioButton,
        radioButton3: RadioButton
    ): Int {
        var x: Int
        if (radioButton1.isChecked || radioButton2.isChecked || radioButton3.isChecked) {
            x = 0
            gender = if (radioButton1.isChecked) {
                "Male"
            } else if (radioButton2.isChecked) {
                "Female"
            } else {
                "Others"
            }
        } else {
            Toast.makeText(this, getString(R.string.selectgender), Toast.LENGTH_LONG).show()
            x = 1
        }
        return x
    }

    private fun validHusbandorFather(radioButton1: RadioButton, radioButton2: RadioButton): Int {
        var x: Int
        if (radioButton1.isChecked || radioButton2.isChecked) {
            x = 0
            husbandorfather = if (radioButton1.isChecked) {
                "Father"
            } else {
                "Husband"
            }
        } else {
            Toast.makeText(this,  getString(R.string.selectone), Toast.LENGTH_LONG).show()
            x = 1
        }
        return x
    }

    private fun validName(editText: EditText): Int {
        var x = 0
        editText.text.toString().validator()
            .nonEmpty()
            .noNumbers()
            .addErrorCallback {
                editText.error =
                    getString(R.string.validname)

                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }

    private fun validNumber(editText: EditText, d: Int): Int {
        var x = 0
        editText.text.toString().validator()
            .nonEmpty()
            .validNumber()
            .onlyNumbers()
            .maxLength(d)
            .minLength(d)
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

    private fun validEmail(editText: EditText): Int {
        var x = 0
        editText.text.toString().validator()
            .validEmail()
            .nonEmpty()
            .addErrorCallback {
                editText.error = getString(R.string.validemail)
                x = 1
            }
            .addSuccessCallback {
                x = 0

            }
            .check()
        return x
    }

    private fun validMName(editText: EditText): Int {
        var x = 0
        x = if (validName(editText) == 0 || editText.text.toString() == "") {
            0
        } else {
            1
        }
        return x
    }

    private fun getSpinState(str: String?): Int {

        val list = resources.getStringArray(R.array.states)
        val i = 1
        for (i in 1..28) {
            if (list[i] == str) {
                return i
            }
        }
        return 0
    }

    private fun getSpinCommunity(str: String?): Int {

        val list = resources.getStringArray(R.array.community)
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

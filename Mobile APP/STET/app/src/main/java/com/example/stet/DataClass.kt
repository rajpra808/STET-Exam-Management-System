package com.example.stet

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class DataClass(
    var FirstName: String?,
    var MiddleName: String?,
    var LastName: String?,
    var FathersName: String?,
    var MothersName: String?,
    var Gender: String?,
    var DOB: String?,
    var Community: String? = null,
    var AadharNO: String? = null,
    var EmailID: String? = null,
    var PhoneNo: String? = null,
    var PostalAdd: String? = null,
    var PostalZip: String? = null,
    var State: String? = null,
    var PhoneVerified: Boolean? = null,
    var EmailVerified: Boolean? = null,
    var ApplicationCategory: String? = null,
    var PaperLanguage: String? = null,
    var MinQualification: String? = null,
    var QualiPercentage: String? = null,
    var ProfQualification: String? = null,
    var University: String? = null

) : Parcelable

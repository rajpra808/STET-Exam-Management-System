const express = require('express')
const bcrypt = require('bcryptjs');
const app = express()
const bodyParser = require('body-parser')
let cookieParser = require('cookie-parser');
fs = require('fs-extra')
app.use(bodyParser.urlencoded({ extended: true }))
const mongoClient = require('mongodb').MongoClient
const port = process.env.PORT
require('events').EventEmitter.prototype._maxListeners = 100;
ObjectId = require('mongodb').ObjectId
var mongoose = require('mongoose');
var multer = require('multer')
var path = require('path');
var crypto = require('crypto');
var Grid = require('gridfs-stream');
app.use(cookieParser());
const GridFsStorage = require("multer-gridfs-storage");
//const url="mongodb://localhost:27017"
const myurl = "mongodb+srv://mobile_app:test@stet-osuvn.mongodb.net/"
const url = "mongodb+srv://mobile_app:test@stet-osuvn.mongodb.net/Mongodb"
mongoClient.connect(myurl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
        console.log("error in connecting to mongodb")
    }
    else {
        console.log("Connected")
        const myDb = db.db('Mongodb')
        const collection = myDb.collection('signups')

        
        app.post('/signup', (req, res) => {
            
            const hash=bcrypt.hashSync(req.body.password,10)
                
           
            const newUser = {

                Name: req.body.name,
                Email_id: req.body.email,
                Phone_no: req.body.phone,
                Password: hash,
                Aadhar_no: req.body.aadhar

            }
            const query = { Email_id: newUser.Email_id }
            collection.findOne(query, (err, result) => {
                if (result == null) {
                    collection.insertOne(newUser, (err, result) => {
                        var randomNumber = Math.random().toString();
                        randomNumber = randomNumber.substring(2, randomNumber.length);
                        const user = {
                            "cookieName": result.Phone_no+"_"+randomNumber,
                            "from": Date.now(),
                            'to': 900000 + Date.now()
                        }
                        myDb.collection('Session').insertOne(user, function (err, resu) {
                            if (err)
                                return err;
                            else
                                console.log(user);
                        })
                        res.cookie('cookieName', result.Phone_no+"_"+randomNumber, { maxAge: 900000, httpOnly: true });
                        res.status(200).send()
                        
                    })
                }
                else {
                    res.status(400).send()
                    res.end(result)
                }
            })
                
        })



        app.get('/', (req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1> STET Application </h1>');
        })

        app.post('/login', (req, res) => {
            const query = {
                Phone_no: req.body.phone
                
            }


            collection.findOne(query, (err, result) => {
                if (result != null) {
                    var hash=result.Password;
                    const rs=bcrypt.compareSync(req.body.password,hash)
                        if(rs)
                        {
                            var randomNumber = Math.random().toString();
                            randomNumber = randomNumber.substring(2, randomNumber.length);
                            
                            const user = {
                                "cookieName": result.Phone_no+"_"+randomNumber,
                                "from": Date.now(),
                                "to":Date.now()+ 900000
                            }
                            myDb.collection('Session').insertOne(user, function (err, resu) {
                                if (err)
                                    return err;
                                else
                                    console.log(user);
                            })
                            res.cookie('cookieName', result.Phone_no+"_"+randomNumber, { maxAge: 900000, httpOnly: true });
                            res.status(200).send()
                        }
                        else
                        {
                            res.status(404).send()
                        }
                   
                    
                }
                else {
                    res.status(404).send()
                }
            }
            )
        })
        app.post('/logout', (req, res) => {
            var cookiez = req.headers.cookiename;
             var cookie=cookiez.substring(11,cookiez.length);
            if (cookie === undefined) {
                res.status(404).send();
            }
            else {

                myDb.collection('Session').findOne({ "cookieName": cookie }, function (err, result) {
                    if (err)
                        return err;
                    else if (result != null) {
                        console.log(result.to);
                        res.status(200).send();
                    }
                    else {
                        res.status(201).send();
                    }

                })


            }
        })
        app.post('/session', (req, res) => {
            var cookiez = req.headers.cookiename;
            var cookie=cookiez.substring(11,cookiez.length);
            if (cookie === undefined) {
                res.status(404).send();
            }
            else {
                myDb.collection('Session').findOne({ "cookieName": cookie }, function (err, result) {
                    if (err) {
                        return err;
                    }
                    else if (result != null) {
                       // res.sendStatus(200);
                        const t=Date.now()
                        console.log(t);
                        console.log(result.to);
                        if(t<=result.to)
                        {
                        res.sendStatus(200);
                        }
                        else
                        {
                           res.sendStatus(201);
                        }
                    }
                    else {
                        res.sendStatus(201);
                    }
                })
            }
            
        })
        app.post('/phone', (req, res) => {

            myDb.collection('signups').findOne({ Phone_no: req.body.phone }, function (err, result) {
                if (err) {
                    throw err;
                }
                if (result != null) {
                    const objToSend = {
                        name: result.Name,
                        email: result.Email_id,
                        aadhar: result.Aadhar_no
                    }
                    res.status(200).send(JSON.stringify(objToSend));
                }
                else {
                    res.status(404).send();
                }

            })


        });
        app.get('/submitted/:Phone', (req, res) => {

            myDb.collection('registration').findOne({ phone: req.params.Phone }, function (err, result) {
                if (err) {
                    throw err;
                }
                if (result != null) {

                    res.status(200).send();
                }
                else {
                    res.status(404).send();
                }

            })


        });
        app.post('/check', (req, res) => {

            myDb.collection('signups').findOne({ $or: [{ Phone_no: req.body.phone }, { Aadhar_no: req.body.aadhar }, { Email_id: req.body.email }] }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result == null) {
                    res.status(400).send();
                }
                else if (result != null) {
                    myDb.collection('signups').findOne({ Aadhar_no: req.body.aadhar }, function (err, result1) {
                        if (err) {
                            throw err;
                        }
                        else if (result1 == null) {
                            myDb.collection('signups').findOne({ Email_id: req.body.email }, function (err, result2) {
                                if (err) {
                                    throw err;
                                }
                                else if (result2 == null) {
                                    myDb.collection('signups').findOne({ Phone_no: req.body.phone }, function (err, result3) {
                                        if (err) {
                                            throw err;
                                        }
                                        else if (result3 == null) {
                                            res.status(400).send();
                                        }
                                        else if (result3 != null) {
                                            res.status(201).send();
                                        }
                                    })
                                }
                                else if (result2 != null) {
                                    res.status(202).send();
                                }
                            })
                        }
                        else if (result1 != null) {
                            res.status(203).send();
                        }
                    })

                }
            })



        })
        app.post('/getpersonal', (req, res) => {
            myDb.collection('personals').findOne({ Phone_Number: req.body.Phone1 }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result == null) {
                    res.status(404).send();
                }
                else if (result != null) {
                    const objToSend = {
                        Fname: result.Fname,
                        Mname: result.Mname,
                        Lname: result.Lname,
                        gender: result.Gender,
                        FH: result.FH,
                        FHFname: result.FHFname,
                        FHMname: result.FHMname,
                        FHLname: result.FHLname,
                        MFname: result.MFname,
                        MMname: result.MMname,
                        MLname: result.MLname,
                        DOB: result.DOB,
                        Category: result.Category,
                        Aadhar: result.Aadhar,
                        AddressOne: result.AddressOne,
                        DistrictOne: result.DistrictOne,
                        StateOne: result.StateOne,
                        PinCodeOne: result.PinCodeOne,
                        AddressTwo: result.AddressTwo,
                        DistrictTwo: result.DistrictTwo,
                        StateTwo: result.StateTwo,
                        PinCodeTwo: result.PinCodeTwo,
                        Phone1: result.Phone1,
                        Email1: result.Email1,
                        Phone2: result.Phone2,
                        Email2: result.Email2
                    }
                    res.status(200).send(JSON.stringify(objToSend));
                }
            })
        });

        app.post('/getEducation', (req, res) => {
            myDb.collection('academics').findOne({ Phone_Number: req.body.Phone }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result == null) {
                    res.status(404).send();
                }
                else if (result != null) {
                    const objToSend = {
                        MinQualification: result.Min_Qual,
                        ProfessionalQualification: result.Pro_Qual,
                        Percentage: result.Percentage,
                        University: result.University,
                        PaperLanguage: result.Language,
                        ApplicationCategory: result.App_Category,
                        Phone: result.Phone_Number
                    }
                    res.status(200).send(JSON.stringify(objToSend));
                }
            })
        });
        app.post('/details', (req, res) => {

            const newUser = {
                Fname: req.body.Fname,
                Mname: req.body.Mname,
                Lname: req.body.Lname,
                Gender: req.body.gender,
                FH: req.body.FH,
                FHFname: req.body.FHFname,
                FHMname: req.body.FHMname,
                FHLname: req.body.FHLname,
                MFname: req.body.MFname,
                MMname: req.body.MMname,
                MLname: req.body.MLname,
                DOB: req.body.DOB,
                Category: req.body.Category,
                Aadhar: req.body.Aadhar,
                AddressOne: req.body.AddressOne,
                DistrictOne: req.body.DistrictOne,
                StateOne: req.body.StateOne,
                PinCodeOne: req.body.PinCodeOne,
                AddressTwo: req.body.AddressTwo,
                DistrictTwo: req.body.DistrictTwo,
                StateTwo: req.body.StateTwo,
                PinCodeTwo: req.body.PinCodeTwo,
                Phone1: req.body.Phone1,
                Phone2: req.body.Phone2,
                Email1: req.body.Email1,
                Email2: req.body.Email2,
                Phone_Number: req.body.Phone1
            }
            myDb.collection('personals').findOne({ Phone_Number: req.body.Phone1 }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result == null) {
                    const collection2 = myDb.collection('personals')
                    collection2.insertOne(newUser, (err, result2) => {
                        res.status(200).send()
                    })
                }
                else if (result != null) {
                    const User = {
                        $set:
                        {
                            Fname: req.body.Fname,
                            Mname: req.body.Mname,
                            Lname: req.body.Lname,
                            Gender: req.body.gender,
                            FH: req.body.FH,
                            FHFname: req.body.FHFname,
                            FHMname: req.body.FHMname,
                            FHLname: req.body.FHLname,
                            MFname: req.body.MFname,
                            MMname: req.body.MMname,
                            MLname: req.body.MLname,
                            DOB: req.body.DOB,
                            Category: req.body.Category,
                            Aadhar: req.body.Aadhar,
                            AddressOne: req.body.AddressOne,
                            DistrictOne: req.body.DistrictOne,
                            StateOne: req.body.StateOne,
                            PinCodeOne: req.body.PinCodeOne,
                            AddressTwo: req.body.AddressTwo,
                            DistrictTwo: req.body.DistrictTwo,
                            StateTwo: req.body.StateTwo,
                            PinCodeTwo: req.body.PinCodeTwo,
                            Phone1: req.body.Phone1,
                            Phone2: req.body.Phone2,
                            Email1: req.body.Email1,
                            Email2: req.body.Email2,

                        }
                    };
                    const collection2 = myDb.collection('personals')
                    collection2.updateOne({ Phone_Number: req.body.Phone1 }, User, (err, result2) => {
                        res.status(200).send()
                    })
                }

            })
        })

        app.post('/education', (req, res) => {
            const newUser = {
                Min_Qual: req.body.MinQualification,
                Pro_Qual: req.body.ProfessionalQualification,
                Percentage: req.body.Percentage,
                University: req.body.University,
                Language: req.body.PaperLanguage,
                App_Category: req.body.ApplicationCategory,
                Phone_Number: req.body.Phone
            }
            myDb.collection('academics').findOne({ Phone_Number: req.body.Phone }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result == null) {
                    const collection2 = myDb.collection('academics')
                    collection2.insertOne(newUser, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).send()
                    })
                }
                else if (result != null) {
                    const User = {
                        $set: {
                            Min_Qual: req.body.MinQualification,
                            Pro_Qual: req.body.ProfessionalQualification,
                            Percentage: req.body.Percentage,
                            University: req.body.University,
                            Language: req.body.PaperLanguage,
                            App_Category: req.body.ApplicationCategory,
                            Phone_Number: req.body.Phone
                        }
                    };
                    const collection2 = myDb.collection('academics')
                    collection2.updateOne({ Phone_Number: req.body.Phone }, User, (err, result2) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).send()
                    })
                }


            })

        })

        app.post('/timing', (req, res) => {
            const newUser = {
                fname: req.body.fname,
                mname: req.body.mname,
                lname: req.body.lname,
                ffname: req.body.ffname,
                fmname: req.body.fmname,
                flname: req.body.flname,
                mfname: req.body.mfname,
                mmname: req.body.mmname,
                mlname: req.body.mlname,
                category: req.body.category,
                aadhar: req.body.aadhar,
                dob: req.body.dob,
                address: req.body.address,
                district: req.body.district,
                state: req.body.state,
                pincode: req.body.pincode,
                sex: req.body.sex,
                phone: req.body.phone,
                email: req.body.email,
                exam: req.body.exam,
                exam_date: req.body.exam_date,
                venue: req.body.venue,
                eno: req.body.eno,
                Date: req.body.Date,


            }
            const collection2 = myDb.collection('registration')
            if (newUser != null) {
                collection2.insertOne(newUser, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    console.log(newUser);
                    res.status(200).send()
                })
            }

        })
        app.get('/available/:filename/:coll', (req, res) => {
            mongoClient.connect(url, function (err, client) {
                if (err) {
                    throw err;

                }
                const db = client.db('Mongodb');
                const collection = db.collection(req.params.coll + '.files');
                const collectionChunks = db.collection(req.params.coll + '.chunks');
                collection.findOne({ filename: req.params.filename }, { _id: 1 }, function (err, obj) {
                    if (err) return cb(err);
                    if (obj != null) {
                        return res.status(200).send();

                    }
                    else {
                        return res.status(404).send();
                    }

                });

            })
        });
        app.get('/paymentdetails/:phone', (req, res) => {
            myDb.collection('Payment_Details').findOne({ phone: req.params.phone }, function (err, result) {
                if (err)
                    throw err;
                else if (result != null) {
                    res.status(200).json({
                        "date": result.date,
                        "paymentId": result.paymentId
                    });
                }
                else {
                    res.status(404).send();
                }

            })
        })
        app.get('/remove/:filename/:coll', (req, res) => {
            mongoClient.connect(url, function (err, client) {
                if (err) {
                    throw err;

                }
                const db = client.db('Mongodb');
                const collection = db.collection(req.params.coll + '.files');
                const collectionChunks = db.collection(req.params.coll + '.chunks');
                collection.findOne({ filename: req.params.filename }, { _id: 1 }, function (err, obj) {

                    if (err) throw err;
                    if (obj != null) {
                        collection.deleteOne(obj, function (err) {
                            if (err) return res.json({
                                "error": err
                            });
                            else {
                                collectionChunks.findOne({ files_id: obj._id }, { _id: 1 }, function (err, obj2) {

                                    if (err) throw err; // don't forget to handle error/

                                    collectionChunks.deleteOne(obj2, function (err) {
                                        if (err) return res.json({
                                            "error": err
                                        });
                                        else {

                                            return res.status(200).json(obj2);
                                        }
                                    })



                                });

                            }
                        })
                    }
                    else {
                        return res.status(404).send();
                    }

                });

            })
        });

        app.get('/image/:filename/:coll', (req, res) => {
            let fileName = req.params.filename;
            mongoClient.connect(url, function (err, client) {
                if (err) {
                    throw err;
                }
                const db = client.db('Mongodb');
                const collection = db.collection(req.params.coll + '.files');
                const collectionChunks = db.collection(req.params.coll + '.chunks');
                collection.find({ filename: fileName }).toArray(function (err, docs) {
                    if (err) {
                        throw err;
                    }
                    if (!docs || docs.length === 0) {
                        return res.status(400).send()
                    } else {

                        collectionChunks.find({ files_id: docs[0]._id })
                            .sort({ n: 1 }).toArray(function (err, chunks) {
                                if (err) {
                                    throw err;
                                }
                                if (!chunks || chunks.length === 0) {
                                    return res.status(404).send()
                                }
                                let fileData = [];
                                for (let i = 0; i < chunks.length; i++) {
                                    fileData.push(chunks[i].data.toString('base64'));
                                }
                                let finalFile = 'data:' + docs[0].contentType + ';base64,'
                                    + fileData.join('');
                                console.log("File")
                                res.status(200).json(
                                    { "imageURL": finalFile }
                                )
                            });
                    }
                });
            });
        });

        app.get('/download/:filename/:coll', (req, res) => {
            let fileName = req.params.filename;
            mongoClient.connect(url, function (err, client) {
                if (err) {
                    throw err;
                }
                const db = client.db('Mongodb');
                const collection = db.collection(req.params.coll + '.files');
                const collectionChunks = db.collection(req.params.coll + '.chunks');
                collection.find({ filename: fileName }).toArray(function (err, docs) {
                    if (err) {
                        throw err;
                    }
                    if (!docs || docs.length === 0) {
                        return res.status(400).send()
                    } else {

                        collectionChunks.find({ files_id: docs[0]._id })
                            .sort({ n: 1 }).toArray(function (err, chunks) {
                                if (err) {
                                    throw err;
                                }
                                if (!chunks || chunks.length === 0) {
                                    return res.status(404).send()
                                }
                                let fileData = [];
                                for (let i = 0; i < chunks.length; i++) {
                                    fileData.push(chunks[i].data.toString('base64'));
                                }
                                let finalFile = 'data:' + docs[0].contentType + ';base64,'
                                    + fileData.join('');
                                console.log("File")
                                res.status(200).json(
                                    { "imageURL": finalFile }
                                )
                            });
                    }
                });
            });
        });

        app.get('/timeline/:year', (req, res) => {
            const collection2 = myDb.collection('Timeline')
            collection2.findOne({ year: req.params.year }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result != null) {
                    const newUser = {
                        application_announced_date: result.application_announced_date,
                        registration_start_date: result.registration_start_date,
                        registration_end_date: result.registration_end_date,
                        date_of_admit_card: result.date_of_admit_card,
                        date_of_examination: result.date_of_examination,
                        date_of_result_declaration: result.date_of_result_declaration
                    }
                    res.status(200).send(JSON.stringify(newUser));
                }
                else if (result == null) {
                    res.status(404).send();
                }
            })
        })

        app.get('/showpassword/:Phone', (req, res) => {
            const collection2 = myDb.collection('signups')
            collection2.findOne({ Phone_no: req.params.Phone }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result != null) {
                    const newUser = {
                        password: result.Password
                    }
                    res.status(200).send(JSON.stringify(newUser));
                }
                else if (result == null) {
                    res.status(404).send();
                }
            })
        })
        app.post('/resetpassword', (req, res) => {
            const collection2 = myDb.collection('signups')
            collection2.findOne({ Phone_no: req.body.phone }, function (err, result) {
                if (err) {
                    throw err;
                }
                else if (result != null) {
                    const hash=bcrypt.hashSync(req.body.password,10)
                
                    const User = {
                        $set: {
                            Password: hash
                        }
                    }
                    collection2.updateOne({ Phone_no: req.body.phone }, User, (err, result2) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).send()

                    })
                    
                }
                else if (result == null) {
                    res.status(404).send();
                }
            })
        })
        app.post('/payment', (req, res) => {
            const newUser = {
                "phone": req.body.phone,
                "userContact": req.body.userContact,
                "userEmail": req.body.userEmail,
                "data": req.body.data,
                "paymentId": req.body.paymentId,
                "signature": req.body.signature,
                "amount": req.body.amount,
                "date": req.body.date
            }
            myDb.collection('Payment_Details').insertOne(newUser, (err, result) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(200).send();
                }
            })
        })
    }

})
const promise = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const conn1 = mongoose.connection;
let gfs1;
conn1.once('open', () => {
    gfs1 = new mongoose.mongo.GridFSBucket(conn1.db, {
        bucketName: "Aadhar_Documents"                            // Bucketname will be collection name
    });
});

storage1 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Aadhar_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_aadhar",
    multer({
        storage: storage1
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn2 = mongoose.connection;
let gfs2;

conn2.once('open', () => {
    gfs2 = new mongoose.mongo.GridFSBucket(conn2.db, {
        bucketName: "Tenth_Documents"                            // Bucketname will be collection name
    });
});

storage2 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Tenth_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_tenth",
    multer({
        storage: storage2
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn3 = mongoose.connection;
let gfs3;

conn3.once('open', () => {
    gfs3 = new mongoose.mongo.GridFSBucket(conn3.db, {
        bucketName: "Twelveth_Documents"                            // Bucketname will be collection name
    });
});

storage3 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Twelveth_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_twelveth",
    multer({
        storage: storage3
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn4 = mongoose.connection;
let gfs4;

conn4.once('open', () => {
    gfs4 = new mongoose.mongo.GridFSBucket(conn4.db, {
        bucketName: "Sikkim_Subject_Documents"                            // Bucketname will be collection name
    });
});

storage4 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Sikkim_Subject_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_subject",
    multer({
        storage: storage4
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn5 = mongoose.connection;
let gfs5;

conn5.once('open', () => {
    gfs5 = new mongoose.mongo.GridFSBucket(conn5.db, {
        bucketName: "Signature_Documents"                            // Bucketname will be collection name
    });
});

storage5 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Signature_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_signature",
    multer({
        storage: storage5
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn6 = mongoose.connection;
let gfs6;

conn6.once('open', () => {
    gfs6 = new mongoose.mongo.GridFSBucket(conn6.db, {
        bucketName: "Photo_Documents"                            // Bucketname will be collection name
    });
});

storage6 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Photo_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_photo",
    multer({
        storage: storage6
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });


const conn7 = mongoose.connection;
let gfs7;

conn7.once('open', () => {
    gfs7 = new mongoose.mongo.GridFSBucket(conn7.db, {
        bucketName: "Birth_Certificate_Documents"                            // Bucketname will be collection name
    });
});

storage7 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Birth_Certificate_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_birth",
    multer({
        storage: storage7
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn8 = mongoose.connection;
let gfs8;

conn8.once('open', () => {
    gfs8 = new mongoose.mongo.GridFSBucket(conn8.db, {
        bucketName: "Graduation_Certificate_Documents"                            // Bucketname will be collection name
    });
});

storage8 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Graduation_Certificate_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_graduationcertificate",
    multer({
        storage: storage8
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn9 = mongoose.connection;
let gfs9;

conn9.once('open', () => {
    gfs9 = new mongoose.mongo.GridFSBucket(conn9.db, {
        bucketName: "Graduation_Marksheet_Documents"                            // Bucketname will be collection name
    });
});

storage9 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Graduation_Marksheet_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_graduationmarksheet",
    multer({
        storage: storage9
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });

const conn10 = mongoose.connection;
let gfs10;

conn10.once('open', () => {
    gfs10 = new mongoose.mongo.GridFSBucket(conn10.db, {
        bucketName: "Community_Certificate_Documents"                            // Bucketname will be collection name
    });
});

storage10 = new GridFsStorage({
    db: promise,                                         //here in case of diskstorage we use storage but in case of GridFS db will be used.
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = (file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Community_Certificate_Documents'
                };
                resolve(fileInfo);
            });
        });
    }
});
app.post(
    "/upload_community",
    multer({
        storage: storage10
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        console.log(req.file.filename);
        return res.status(200).end();
    });



app.use(express.json())
app.listen(port, () => {
    console.log("Listening on port 3000..")

})


const express = require('express');
const app = express();
const PORT = 8081;//process.env.PORT||
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fs = require('fs-extra')
var path = require("path");
const mongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId
const DB = require('./db.js');
const User = DB.admit_card;
const puppeteer = require('puppeteer'); 
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
var cors = require('cors');

app.use(express.static(__dirname + '/public')); // change to whichever directory has images, should contain card.css
app.use(cors());
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const url = "MONGOURI"

const back_url = "http://localhost:" + PORT;
console.log(back_url);

const conn = mongoose.createConnection("MONGOURItest?retryWrites=true&w=majority");

// Init gfs
let gfs;
let buffer;


conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('Photo_Documents');
});

if(process.env.NODE_ENV === 'production')
{
	app.use(express.static('client/build/'));
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
}

mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) {
        console.log("error in connecting to mongodb")
    }
    else {
        console.log("Connected")
        const myDb = db.db('Mongodb')
        
        app.get('/total', (req, res) => {
            const collection = myDb.collection('signups')
            collection.count({}, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        "total": result
                    });
                }
            })
        })

        app.get('/stats', (req, res) => {
            Details = {
                sex:{},
                exam:{},
                category:{},
            }
            const collection = myDb.collection('registration')
            
            var options = {
                projection: {
                  sex: 1,
                  category: 1,
                  exam: 1,
                },
              };
            
            collection.find({},options).toArray(function(err,result){
                if (err) {
                    console.log(err);
                    res.status(400).json("Error: " + err);
                  } else {
                    Details.sex.Male = result.filter((obj) => obj.sex === "Male").length;
                    Details.sex.Female = result.filter((obj) => obj.sex === "Female").length;
                    Details.sex.Others = result.filter((obj) => obj.sex === "Others").length;
                    Details.exam.primary = result.filter((obj) => obj.exam === "Primary Teacher").length;
                    Details.exam.gtart = result.filter((obj) => obj.exam === "GT Art").length;
                    Details.exam.gtscience = result.filter((obj) => obj.exam === "GT Science").length;
                    Details.category.general = result.filter((obj) => obj.category === "General").length;
                    Details.category.obc = result.filter((obj) => obj.category === "OBC").length;
                    Details.category.sc = result.filter((obj) => obj.category === "SC").length;
                    Details.category.st = result.filter((obj) => obj.category === "ST").length;
                    Details.amount = (result.length)*400;
                    Details.registerd = result.length;   
                }

                res.send(Details);
            })
        })

        
        app.get('/alldetails/:user', (req, res) => {
            var User = {}
            myDb.collection('personals').findOne({ "Phone_Number": req.params.user }, function (err, result) {
                if (err)
                    throw err
                else if (result != null) {
                    
                    User.Fname = result.Fname
                    User.Mname = result.Mname
                    User.Lname = result.Lname
                    User.gender = result.Gender
                    User.FH = result.FH
                    User.FHFname = result.FHFname
                    User.FHMname = result.FHMname
                    User.FHLname = result.FHLname
                    User.MFname = result.MFname
                    User.MMname = result.MMname
                    User.MLname = result.MLname
                    User.DOB = result.DOB
                    User.Category = result.Category
                    User.Aadhar = result.Aadhar
                    User.AddressOne = result.AddressOne
                    User.DistrictOne = result.DistrictOne
                    User.StateOne = result.StateOne
                    User.PinCodeOne = result.PinCodeOne
                    User.AddressTwo = result.AddressTwo
                    User.DistrictTwo = result.DistrictTwo
                    User.StateTwo = result.StateTwo
                    User.PinCodeTwo = result.PinCodeTwo
                    User.Phone = result.Phone1
                    User.Phone2 = result.Phone2
                    User.Email1 = result.Email1
                    User.Email2 = result.Email2
                }
            })

            myDb.collection('Education').findOne({ "Phone_Number": req.params.user }, function (err, result) {
                if (err)
                    throw err
                else if (result != null) {
                    User.MinQualification = result.Min_Qual;
                    User.ProfessionalQualification = result.Pro_Qual;
                    User.Percentage = result.Percentage;
                    User.University = result.University;
                    User.PaperLanguage = result.Language;
                    User.ApplicationCategory = result.ApplicationCategory;
                }

            })

            myDb.collection('Payment_Details').findOne({ "phone": req.params.user }, function (err, result) {
                if (err)
                    throw err
                else if (result != null) {
                    User.UserContact = result.userContact
                    User.paymentEmail = result.userEmail
                    User.paymentId = result.paymentId
                    User.payment_date = result.date
                    User.payment_signature = result.signature
                    User.amount = result.amount
                }

            })
            myDb.collection('registration').findOne({ "Phone": req.params.user }, function (err, result) {
                if (err)
                    throw err
                else if (result != null) {
                    User.FinalSubmissionDate = result.date
                }
                res.send(JSON.stringify(User));
            })

        })
        
        app.get('/allusers', (req, res) => {
            var array=[];
            myDb.collection("signups").find({}).toArray(function (err, result) {
                if (err) {
                    return;
                }
                else {
                    var count = result.length
                    result.forEach((item) => {
                            var newUser = {
                                 "id":item.Phone_no,
                                "Name": item.Name,
                                "Email":item.Email_id,
                                "Aadhar": item.Aadhar_no,
                                "Phone": item.Phone_no
                            }
                            array.push(newUser)
                    });
                    res.send(JSON.stringify(array))
                }
            })
        });

        app.get('/submittedusers', (req, res) => {
            var array=[];
            myDb.collection("registration").find({}).toArray(function (err, result) {
                if (err) {
                    return;
                }
                else {
                    var i = 0
                    var count = result.length
                    result.forEach(item => {
                        let newUser = {
                            "id":item.phone,
                            "Name":item.fname+" "+item.lname,
                            "Email":item.email,
                            "Aadhar": item.aadhar,
                            "Phone": item.phone,
                            "Role": item.exam,
                        }
                        array.push(newUser)
                    });
                    res.send(JSON.stringify(array))  
                }
            })
        });

        //=============== PDF ROUTES BEGIN =========================================

    app.get('/pdf/:fname/:lname/:ffname/:flname/:dob/:exam/:eno/:address/:venue/:exam_date/:sex/:img',function(req,res){
        const data = {
            fname: req.params.fname,
            lname: req.params.lname,
            ffname: req.params.ffname,
            flname: req.params.flname,
            dob: req.params.dob,
            img: req.params.img,
            simg: '/sikkim.png',
            exam: req.params.exam,
            eno: req.params.eno,
            address: req.params.address,
            venue: req.params.venue,
            exam_date: req.params.exam_date,
            sex: req.params.sex
        };
        res.render('ejs_admit.html', {data: data});
    });
    async function findData({phone}){
        return new Promise(async function(resolve, reject){
        const user = await User.findOne({ phone });
        if(user==null)
            resolve(null);
        else
        {
            const data = {
                fname: user.fname,
                lname: user.lname,
                ffname: user.ffname,
                flname: user.flname,
                dob: user.dob,
                img: `${user.phone}_photo.png`,
                exam: user.exam,
                eno: user.eno,
                address: user.address,
                venue: user.venue,
                exam_date: user.exam_date,
                sex: user.sex,
                phone: user.phone
            };
            resolve(data);
        }
    });
    }
    app.post('/pdf/generate', function(req, res){
        console.log(req.body);  
        var phone = req.body.phone;
        (async () => {
            const data = await findData({phone});               // declare function
            if(data == null){
                console.log("Phone number not found");
                res.sendStatus(404);
            }
            else
            {
                const browser = await puppeteer.launch();     // run browser
                const page = await browser.newPage();         // create new tab
                //await page.addStyleTag({path : "../public/card.css"});
                await page.goto(back_url + `/pdf/${data.fname}/${data.lname}/${data.ffname}/${data.flname}/${data.dob}/${data.exam}/${data.eno}/${data.address}/${data.venue}/${data.exam_date}/${data.sex}/${data.img}`, {waitUntil: 'load', timeout: 0 });  // go to page
                await page.emulateMedia('screen');            // use screen media
                buffer = await page.pdf({path: data.phone + '_admit.pdf', displayHeaderFooter: true, printBackground: true});  // generate pdf
                //upload.single(buffer);
                await browser.close();                       // close browser
                
                var bucket = new mongodb.GridFSBucket(myDb);
                
                fs.createReadStream('./'+ data.phone + '_admit.pdf').
                    pipe(bucket.openUploadStream(data.phone + '_admit.pdf')).
                    on('finish', function() {
                    console.log('done!');
                    });
                    fs.unlink('./'+ data.phone + '_admit.pdf', (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                });
                res.sendStatus(200);
            }
            })();
    });
    app.post('/pdf/regenerate', async function(req, res){
        console.log(req.body);
        var phone = req.body.phone;
        const data = await findData({phone});
        if(data == null){
            console.log("Phone number not found");
            res.sendStatus(404);
        }
        else
        {
            console.log(data);  
            await deletePDF(data.phone); 
            (async () => {
            const browser = await puppeteer.launch();     // run browser
            const page = await browser.newPage();         // create new tab
            await page.goto(back_url + `/pdf/${data.fname}/${data.lname}/${data.ffname}/${data.flname}/${data.dob}/${data.exam}/${data.eno}/${data.address}/${data.venue}/${data.exam_date}/${data.sex}/${data.img}`, {waitUntil: 'load', timeout: 0 });  // go to page
            await page.emulateMedia('screen');            // use screen media
            buffer = await page.pdf({path: data.phone + '_admit.pdf', displayHeaderFooter: true, printBackground: true});  // generate pdf
            await browser.close();                       // close browser
            var bucket = new mongodb.GridFSBucket(myDb);
        
            fs.createReadStream('./'+ data.phone + '_admit.pdf').
            pipe(bucket.openUploadStream(data.phone + '_admit.pdf')).
            on('finish', function() {
                console.log('done!');
            });
            fs.unlink('./'+ data.phone + '_admit.pdf', (err) => {
                if (err) {
                console.error(err)
                return
                }
            });
            res.sendStatus(200);
            })();
        }
    })
    app.post('/generate_all', function(req, res){
        User.find({}, (err, users)=>{
        console.log("I am Alive");
        if(err)
            console.log(err);
        
        users.map(async function(user){
            console.log("I can feel it");
            const data = {
                fname: user.fname,
                lname: user.lname,
                ffname: user.ffname,
                flname: user.flname,
                dob: user.dob,
                img: `${user.phone}_photo.png`,
                exam: user.exam,
                eno: user.eno,
                address: user.address,
                venue: user.venue,
                exam_date: user.exam_date,
                sex: user.sex
            };
            const browser = await puppeteer.launch();     // run browser
            const page = await browser.newPage();         // create new tab
            //await page.addStyleTag({path : "../public/card.css"});
            await page.goto(back_url + `/pdf/${data.fname}/${data.lname}/${data.ffname}/${data.flname}/${data.dob}/${data.exam}/${data.eno}/${data.address}/${data.venue}/${data.exam_date}/${data.sex}/${data.img}`, {waitUntil: 'load', timeout: 0 });  // go to page
            await page.emulateMedia('screen');            // use screen media
            buffer = await page.pdf({path: user.phone + '_admit.pdf', displayHeaderFooter: true, printBackground: true});  // generate pdf
            //upload.single(buffer);
            await browser.close();                       // close browser    
            var bucket = new mongodb.GridFSBucket(myDb);
            
            fs.createReadStream('./'+ user.phone + '_admit.pdf').
                pipe(bucket.openUploadStream(user.phone + '_admit.pdf')).
                on('finish', function() {
                console.log('done!');
                });
                fs.unlink('./'+ user.phone + '_admit.pdf', (err) => {
                if (err) {
                    console.error(err)
                    return
                }
                });
            });
        }).then(function(){res.send(200);});
    });

    app.post('/regenerate_all', function(req, res){
        var myquery = { };
        myDb.collection("fs.files").deleteMany(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        });
        myDb.collection("fs.chunks").deleteMany(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        });

        User.find({}, (err, users)=>{
            console.log("I am Alive");
            if(err)
            console.log(err);
            
            users.map(async function(user){
            console.log("I can feel it");
            const data = {
                fname: user.fname,
                lname: user.lname,
                ffname: user.ffname,
                flname: user.flname,
                dob: user.dob,
                img: `${user.phone}_photo.png`,
                exam: user.exam,
                eno: user.eno,
                address: user.address,
                venue: user.venue,
                exam_date: user.exam_date,
                sex: user.sex
            };
            const browser = await puppeteer.launch();     // run browser
            const page = await browser.newPage();         // create new tab
            //await page.addStyleTag({path : "../public/card.css"});
            await page.goto(back_url + `/pdf/${data.fname}/${data.lname}/${data.ffname}/${data.flname}/${data.dob}/${data.exam}/${data.eno}/${data.address}/${data.venue}/${data.exam_date}/${data.sex}/${data.img}`, {waitUntil: 'load', timeout: 0 });  // go to page
            await page.emulateMedia('screen');            // use screen media
            buffer = await page.pdf({path: user.phone + '_admit.pdf', displayHeaderFooter: true, printBackground: true});  // generate pdf
            //upload.single(buffer);
            await browser.close();                       // close browser
            var bucket = new mongodb.GridFSBucket(myDb);
        
            fs.createReadStream('./'+ user.phone + '_admit.pdf').
            pipe(bucket.openUploadStream(user.phone + '_admit.pdf')).
            on('finish', function() {
                console.log('done!');
            });
            fs.unlink('./'+ user.phone + '_admit.pdf', (err) => {
                if (err) {
                console.error(err)
                return
                }
            });
        });  
    }).then(function(){res.send(200);});
    });

    app.get('/pdf/admit_card.pdf', function(req, res){
    res.send(buffer);
    })

    app.post('/register', async function(req, res){
        // if (await User.findOne({ username: req.body.eno })) {
        //     throw 'Username "' + req.body.eno + '" is already taken';
        // }
        const user = new User(req.body);
        await user.save()
        .then(()=>res.json({}))
        .catch(err=>next(err));
    })

    app.get('/image/:filename', function(req, res){
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
            }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
        });
    });

    async function deletePDF(phone){
    return new Promise(async function(resolve, reject){
        var fileid;
        var myquery = { filename: phone + "_admit.pdf"};
        var foundfile = await myDb.collection("fs.files").findOne(myquery);
        console.log(foundfile);
        fileid = foundfile._id;
        myDb.collection("fs.files").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        });
        myquery = {files_id: fileid};
        myDb.collection("fs.chunks").deleteMany(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        });
        resolve(1);
    });
    }

//=================== PDF ROUTES END ==================================
    }
})


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

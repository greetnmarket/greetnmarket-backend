var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConnect = require('./utils/db');

var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');
var imgMngrRouter = require('./routes/img-mngr');
var categoriesRouter = require('./routes/categories');
var subCategoriesRouter = require('./routes/subcategories');
var framesRouter = require('./routes/frames-mngr');
var userReportRouter = require("./routes/helpsupport");
var mainBannerRouter = require("./routes/mainBanner");
const offerBannerRouter = require("./routes/offerBanner");
var commonSubCategoryRouter = require("./routes/commonSubCategories");
var paymentsRouter = require("./routes/payments");
var textBnrRouter = require("./routes/subCtgTextBanner");
var languagesRouter = require('./routes/languages');
var commonRouter = require("./routes/commonWrapper");
var upcomingFestivalRouter = require("./routes/upcomingFestivalBanner");
var vidMngrRouter = require("./routes/video-mngr");

const cors=require('cors');
const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/img', imgMngrRouter);
app.use('/categories', categoriesRouter);
app.use('/subcategories', subCategoriesRouter);
app.use('/frame', framesRouter);
app.use('/report', userReportRouter);
app.use('/mainbanner', mainBannerRouter);
app.use('/offerbanner', offerBannerRouter);
app.use('/cmnsubctg', commonSubCategoryRouter);
app.use('/payments', paymentsRouter);
app.use('/textbanner', textBnrRouter)
app.use('/lang', languagesRouter);
app.use('/common', commonRouter);
app.use('/upcomingfestival', upcomingFestivalRouter);
app.use('/vid', vidMngrRouter);

try {
    dbConnect.connect();
} catch (err) {
    console.log(err);
}

module.exports = app;

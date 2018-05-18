const morgan = require('morgan');
const app = express();

const blogPostRouter = require('./blogPostRouter');

//log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFIle(_dirname + '/views/index.html');
});

//when requests come into '/blog-posts' route them to the express
//router instances that are imported.
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
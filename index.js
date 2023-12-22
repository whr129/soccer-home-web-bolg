import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

const port = 3000;
const app = express();

var comment_s = [];
comment_s.push({ author: "PlayerOne", text: "I think a 4-3-3 formation offers great balance for attack and defense.", datePosted: "2023-03-16" });
console.log(comment_s);
var threads = [
    {
        title: "Best Soccer Tactics for Modern Game",
        originalPost: "What do you think are the most effective tactics in today's soccer landscape, considering the recent changes in how the game is played?",
        author: "SoccerFan123",
        datePosted: "2023-03-15",
        comments: [
            { author: "PlayerOne", text: "I think a 4-3-3 formation offers great balance for attack and defense.", datePosted: "2023-03-16" },
            { author: "CoachMike", text: "It's all about high pressing and quick transitions now.", datePosted: "2023-03-17" }
        ]
    },
    {
        title: "2023's Top Contenders for the Champions League",
        originalPost: "Who are your picks for this year's Champions League top contenders and why?",
        author: "ChampionFan",
        datePosted: "2023-02-28",
        comments: [
            { author: "GoalScorer98", text: "Manchester City looks strong this season, especially in their midfield.", datePosted: "2023-03-01" },
            { author: "DefenderDuo", text: "Never count out Bayern Munich, their squad depth is remarkable.", datePosted: "2023-03-02" }
        ]
    },
    {
        title: "The Greatest Soccer Players of All Time",
        originalPost: "Let's settle this debate: who are the top five greatest soccer players in history?",
        author: "HistoryBuff",
        datePosted: "2023-01-10",
        comments: [
            { author: "OldTimer", text: "It's all about Pele, Maradona, Messi, Ronaldo, and Zidane.", datePosted: "2023-01-12" },
            { author: "NewGenFan", text: "You've got to consider Messi and Ronaldo, but don't forget about players like Cruyff and Beckenbauer.", datePosted: "2023-01-13" }
        ]
    }
    // More discussion threads can be added here
];


var matches = [
    // UEFA Champions League Matches
    { league: "UEFA Champions League", teamA: "Real Madrid", teamB: "Liverpool", score: "3-1", date: "2023-05-28" },
    { league: "UEFA Champions League", teamA: "Bayern Munich", teamB: "PSG", score: "2-3", date: "2023-04-07" },
    { league: "UEFA Champions League", teamA: "Chelsea", teamB: "Atletico Madrid", score: "2-0", date: "2023-03-17" },
    { league: "UEFA Champions League", teamA: "Manchester City", teamB: "Borussia Dortmund", score: "2-1", date: "2023-04-06" },
    { league: "UEFA Champions League", teamA: "Juventus", teamB: "FC Porto", score: "1-2", date: "2023-03-09" },

    // English Premier League
    { league: "English Premier League", teamA: "Manchester United", teamB: "Arsenal", score: "0-1", date: "2023-09-04" },
    { league: "English Premier League", teamA: "Liverpool", teamB: "Manchester City", score: "2-2", date: "2023-10-03" },

    // La Liga
    { league: "La Liga", teamA: "FC Barcelona", teamB: "Real Madrid", score: "1-3", date: "2023-10-24" },
    { league: "La Liga", teamA: "Atletico Madrid", teamB: "Sevilla", score: "2-0", date: "2023-05-12" },

    // Serie A
    { league: "Serie A", teamA: "AC Milan", teamB: "Inter Milan", score: "1-2", date: "2023-02-21" },
    { league: "Serie A", teamA: "Juventus", teamB: "Napoli", score: "2-1", date: "2023-04-07" },

    // Bundesliga
    { league: "Bundesliga", teamA: "Bayern Munich", teamB: "Borussia Dortmund", score: "3-2", date: "2023-03-06" },
    { league: "Bundesliga", teamA: "RB Leipzig", teamB: "Bayer Leverkusen", score: "1-1", date: "2023-04-26" },

    // Ligue 1
    { league: "Ligue 1", teamA: "PSG", teamB: "Lyon", score: "4-2", date: "2023-03-21" },
    { league: "Ligue 1", teamA: "Marseille", teamB: "Lille", score: "1-1", date: "2023-05-16" }
];


var teams = [
    {
        teamName: "FC Barcelona",
        year: 1899,
        stadium: "Camp Nou",
        history: "Founded in 1899 by a group of Swiss, English, and Catalan footballers led by Joan Gamper."
    },
    {
        teamName: "Manchester United",
        year: 1878,
        stadium: "Old Trafford",
        history: "Originally founded as Newton Heath LYR Football Club in 1878, the club changed its name to Manchester United in 1902."
    },
    {
        teamName: "Liverpool FC",
        year: 1892,
        stadium: "Anfield",
        history: "Founded in 1892, Liverpool has won nineteen League titles, six European Cups, and numerous other trophies."
    },
    {
        teamName: "Real Madrid CF",
        year: 1902,
        stadium: "Santiago Bernabéu Stadium",
        history: "Founded on 6 March 1902 as Madrid Football Club, the club has traditionally worn a white home kit since inception."
    },
    {
        teamName: "Bayern Munich",
        year: 1900,
        stadium: "Allianz Arena",
        history: "Founded in 1900 by eleven football players, led by Franz John, Bayern Munich has become the most successful club in German football history."
    },
    {
        teamName: "Manchester City",
        year: 1880,
        stadium: "Etihad Stadium",
        history: "Founded in 1880 as St. Mark's (West Gorton), Manchester City moved to the City of Manchester Stadium in 2003."
    },
    {
        teamName: "Paris Saint-Germain",
        year: 1970,
        stadium: "Parc des Princes",
        history: "Founded in 1970, PSG has become one of France's most successful clubs, known for its high-profile signings."
    }
];

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // getMonth() returns 0-11
const day = today.getDate();
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;


var filePath = ["/images/barcelona.png", "/images/munited.png", "/images/liverpool.png", "/images/realmadrid.png", "/images/bayern.png", "/images/mcity.png", "/images/psg.jpeg"];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//Home Page
app.get("/", (req, res) => {
    res.render("index.ejs");
});

//Features Page
app.get("/features", (req, res) => {
    res.render("features.ejs");
});

//Teams
//Teams home page
app.get("/info", (req, res) => {
    res.render("info.ejs", {
        team : teams,
        teamPic : filePath
    });
});

//Create a new Team
app.get("/newteam", (req, res) => {
    res.render("teamform.ejs");
});

//Delete a existed team
app.get("/deleteTeam/:index", (req, res) => {
    let index = parseInt(req.params.index);
    // Check if the index is within the bounds of the teams array
    if (index >= 0 && index < teams.length) {
        teams.splice(index, 1);
        filePath.splice(index, 1);
        res.redirect("/info");
        // res.render("info.ejs", {
        //     team : teams,
        //     teamPic : filePath
        // });
    } else {
        // Handle cases where the index is out of bounds
        res.status(404).send("Team not found");
    }
});

//use multer middleware
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/Users/wanghongran/Desktop/full-stack/soccer-blog-web-app/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage })

//Get the information and add to the information list
app.post("/submitTeam", upload.single('teamPic'), (req, res) => {
    console.log(req.body);
    if (req.file) {
    //poccess the path of the image
    let words = req.file["path"].split("/");
    let remainingWords = words.slice(7);
    let newStr = remainingWords.join("/");
    newStr = "/" + newStr;
    console.log(newStr);
    teams.push(req.body);
    filePath.push(newStr);
    res.redirect("/info");
    // res.render("info.ejs", {
    //     team : teams,
    //     teamPic : filePath
    // });
    } else {
        res.render("teamform.ejs", {
            noImg : true
        });
    }
});

//Edit a existed team
//Get the request
app.get("/editTeam/:index", (req, res) => {
    let index = parseInt(req.params.index);

    // Check if the index is within the bounds of the teams array
    if (index >= 0 && index < teams.length) {
        res.render("teamform.ejs", {
            teamIfo: teams,
            teamImg: filePath,
            index: index
        });
    } else {
        // Handle cases where the index is out of bounds
        res.status(404).send("Team not found");
    }
});

//Error control: when user mistakenly input /editTeam
app.get("/editTeam", (req, res) => {
    res.render("info.ejs", {
        team : teams,
        teamPic : filePath
    });
});

//Get the modified form
app.post("/editTeamForm/:index" , upload.single('teamPic'), (req, res) => {
    let index = parseInt(req.params.index);
    // Check if the index is within the bounds of the teams array
    if (index >= 0 && index < teams.length) {
        //renew the array
        teams[index] = req.body;
        if (req.file) {
            let words = req.file["path"].split("/");
            let remainingWords = words.slice(7);
            let newStr = remainingWords.join("/");
            newStr = "/" + newStr;
            console.log(newStr);
            filePath[index] = newStr;
        }
        //render the file
        res.redirect("/info");
        // res.render("info.ejs", {
        //     team : teams,
        //     teamPic : filePath
        // });
    } else {
        // Handle cases where the index is out of bounds
        res.status(404).send("Team not found");
    }
});


//Matches
//Matches home page
app.get("/match", (req, res) => {
    res.render("match.ejs", {
        match : matches
    });
});

//Add a new match
app.get("/addMatch", (req, res) =>{
    res.render("matchform.ejs");
});

app.post("/submitMatch", (req, res) => {
    //console.log(req.body);
    //poccess the path of the image
    matches.push(req.body);
    res.redirect("/match");
        //alternative method
        // res.render("match.ejs", {
        //     match : matches
        // });
});

//Upload a existed match
//Get the request
app.get("/uploadMatch/:index", (req, res) => {
    let index = parseInt(req.params.index);
    // Check if the index is within the bounds of the matches array
    if (index >= 0 && index < matches.length) {
        //console.log(index);
        res.render("matchform.ejs", {
            matchInfo: matches,
            index: index
        });
    } else {
        // Handle cases where the index is out of bounds
        res.status(404).send("Match not found");
    }
});

//Get the modified form
app.post("/editMatchForm/:index" , (req, res) => {
    let index = parseInt(req.params.index);
    // Check if the index is within the bounds of the matches array
    if (index >= 0 && index < matches.length) {
        //renew the array
        matches[index] = req.body;
        console.log(req.body);
        res.redirect("/match");
        //alternative method
        // res.render("match.ejs", {
        //     match : matches
        // });
    } else {
        // Handle cases where the index is out of bounds
        res.status(404).send("Team not found");
    }
});

//Delete a existed match
app.get("/deleteMatch/:index", (req, res) => {
    let index = parseInt(req.params.index);
    // Check if the index is within the bounds of the matches array
    if (index >= 0 && index < matches.length) {
        matches.splice(index, 1);
        res.redirect("/match");
        //alternative method
        // res.render("match.ejs", {
        //     match : matches
        // });
    } else {
        // Handle cases where the index is out of bounds
        res.status(404).send("Match not found");
    }
});

//Comments
app.get("/comment", (req, res) => {
    res.render("comment.ejs", {
        thread : threads,
        date : formattedDate,
        comment_s : comment_s
    });
});

//Render certain thread
app.get("/thread/:index", (req, res) => {
    let index = parseInt(req.params.index);
    if (index >= 0 && index < threads.length) {
        res.render("thread.ejs", {
            thread : threads[index],
            index : index,
            date : formattedDate
        });
    }
    else {
        res.send("Thread not found");
    }
});

//Submit a new thread
app.post("/newThread", (req, res) =>{
    req.body["comments"] = [];
    threads.push(req.body);
    //console.log(req.body);
    res.redirect("/comment");
});

//Submit a new comment
app.post("/submitComment/:index", (req, res) => {
    let index = parseInt(req.params.index);
    if (index >= 0 && index < threads.length) {
        threads[index].comments.push(req.body);
        res.redirect("/thread/" + index);
    } else {
        res.send("Thread not found");
    }
});

//About
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(port, (req, res) =>{
    console.log(`Server is running on Port ${port}`);
});
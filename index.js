var rp = require('request-promise');

async function main() {
    var url = `https://www.reddit.com/r/EntExchange/comments/pzfn0c/h_tubo_evic_w_paypal_gs/.json?limit=100`; // url of the post
    var needle = /Ed[\s,']|edstnt/gi; // a regular expression to find
    var names = [];

    var res = await rp({uri: url, json: true}); //download the page
    var top_level_comments = res["1"].data.children;
    top_level_comments.forEach(function(comment) {
        var found = comment.data.body.match(needle);
        var name = comment.data.author;
        if (found && !~names.indexOf(name)) { // found the needle and name isnt on the list already
            names.push(name);
        }
    })

    var winner_index = Math.floor(Math.random() * names.length);
    var winning_name = names[winner_index];
    console.log(`The winner is: ${winning_name}`);
}

main();
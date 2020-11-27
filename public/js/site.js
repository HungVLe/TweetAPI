var TwitApp = window.TwitApp || {};

(function scopeWrapper($) {

    TwitApp.postTweet = function (event) {
        event.preventDefault();
        var newTweetComment = {
            "comment": document.getElementById('newTweet').value
        }
        fetch('/comment', {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            method: "POST",
            body: JSON.stringify(newTweetComment)
        })
            .then(response => response.json())
            .then(result => {
                console.log('Result:', result);
            })
    }

    TwitApp.getTweets = function () {
        var search = $('#search').val();
        const url = '/tweets/' + search;
        fetch(url).then(function (response) {
            return response.json()
        })
            .then(function (data) {
                console.log(data)
                outputTweets(data.statuses)
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            })
    }

    TwitApp.deleteTweet = function (event) {
        event.preventDefault();
        var tweetIdToDelete = {
            "id": document.getElementById('tweetIdToDelete').value
        }
        console.log(tweetIdToDelete)
        fetch('/delete', {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            method: "POST",
            body: JSON.stringify(tweetIdToDelete)
        })
            .then(response => response.json())
            .then(result => {
                console.log('Result:', result);
            })

    }

    function outputTweets(data) {
        var outputTweets = $('#outputTweets')
        outputTweets.html('');
        data.forEach(function (item, i) {
            console.log(item);
            let hyper = `<a href="https://twitter.com/i/web/status/${item.id_str}" target="_blank">${item.id_str}</a>`;
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.innerHTML = `<b>Tweet ID:</b> ${hyper} </br>
            <b>Tweet User:</b> <i>${item.user.name}</i> </br>
            <b>♥Retweet count:</b> ${item.retweet_count} </br>
            <b>Tweet content:</b> ${item.text}`;
            li.appendChild(span);
            outputTweets.append(li);
        })
    }

}(jQuery));
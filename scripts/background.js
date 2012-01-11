/***************************************************************************
   Copyright 2011 Ramkumar Shankar
   
   This file is part of Opera extension Hacker News Dial.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   
***************************************************************************/

window.addEventListener('load', function () {

    var dataItems = [];
    var url = "http://api.ihackernews.com/page"
    var my_JSON = '';
    var timer = null;

    function init() {        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                my_JSON= JSON.parse(xhr.responseText);
                processData(my_JSON);
            }
        }
        xhr.send(null);
    }

    function processData(my_JSON) {
        var i=0;
        for (i=0; i < my_JSON.items.length; i++) {
            dataItems.push({
                title      : my_JSON.items[i].title,
                url        : my_JSON.items[i].url,
                points     : my_JSON.items[i].points,
                comments   : my_JSON.items[i].commentCount,
                postedTime : my_JSON.items[i].postedAgo,
                postedBy   : my_JSON.items[i].postedBy
            })
        }
        updateDisplay();
    }
    
    function updateDisplay(i) {
        var index = (i||0) % dataItems.length;
        var next = index + 1;
        document.getElementById('title').textContent = dataItems[index].title;
        document.getElementById('comments').textContent = dataItems[index].comments + " Comments";
        document.getElementById('points').textContent = dataItems[index].points + " Points";
        
        if (opera.contexts.speeddial) {
            var sd = opera.contexts.speeddial;
            sd.url = dataItems[index].url;
        }
        timer = setTimeout(function(){updateDisplay(next)}, 10 * 1000);
    }
    
    init();

}, false);
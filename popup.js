
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

    $(document).ready(function(){
	$('body').on('click', 'a', function(){
	    chrome.tabs.create({url: $(this).attr('href')});
	    return false;
	});
    });
    var url = tabs[0].url;
    // http%3A%2F%2Fi.imgur.com%2FmRgMzib.gif
    $.getJSON("https://www.reddit.com/submit.json?url=" + url, function(data){
	//alert(data.data.children.length)
	
	holder = $('#holder');
	var num_results = 0;
	if(data.data){
	    num_results = data.data.children.length;
	}
	
	holder.html("<div><span id='num_results'>" + num_results + "</span> results</div>")
	
	if(data.data){
	    $.each(data.data.children, function(k, v){
		var i = v.data;
		
		var a = $("<a>")
		a.attr("href", "https://www.reddit.com" + i.permalink)
		a.addClass("subA")

		subSpan = $("<span>")
		subSpan.addClass("subSpan")
		subSpan.html(i.subreddit)
		
		a.append(subSpan)
		
		voteSpan = $("<span>")
		voteSpan.addClass("voteSpan")
		if(i.score == 1){
		    voteSpan.html(i.score + " point")
		}else{
		    voteSpan.html(i.score + " points")
		}
		
		
		var d = $("<div class='itemDiv realItems'>")
		d.attr("title", i.title)
		d.append(a, voteSpan)
		
		holder.append(d)
	    });
	}
	
	var a = $("<a>")
	a.attr("href", "https://www.reddit.com/submit?url=" + url + "&resubmit=true")
	
	submitSpan = $("<span>")
	submitSpan.addClass("submitSpan")
	submitSpan.html("submit new?")
	
	a.append(submitSpan)
	var d = $("<div id='submit_new' class='itemDiv'>")
	d.append(a)
	holder.append(d);

    })
});

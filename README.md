This module was developed for [longtail.guru](https://longtail.guru) and serves the purpose of scraping the automatic keyword suggestion functions of the following web services:

* Google
* Bing
* Qwant
* Duckduckgo
* Amazon
* Otto
* Playstore
* Youtube
* Youporn
* Ebay

## Example

	suggest.google('how do you', function(suggests) {
		response.json(suggests);
	});
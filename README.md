
# longtail	

*longtail* retrieves keywords from the suggest functions of many different search engines including Google, YouTube &amp; Amazon.

It is the engine behind [longtail.guru](https://longtail.guru)

[![NPM](https://nodei.co/npm/longtail.png)](https://nodei.co/npm/longtail/)

## Supported search engines

* Google
* Bing
* Duckduckgo
* Amazon
* Otto
* Playstore
* Youtube
* Youporn
* Ebay
* Instagram

## Installation

	npm install longtail

## Example

	longtail.google('waschmaschine', function(err, suggests){
		if (!err) {
			console.log(suggests);
		}
		else {
			console.log('Google: Error', err);
		}
	})

	/*

	Output:

	[
		'waschmaschine anschließen',
		'waschmaschine angebot',
		'waschmaschine aeg',
		'waschmaschine aeg lavamat',
		'waschmaschine amazon',
		'waschmaschine a+++',
		'waschmaschine ablaufschlauch',
		'waschmaschine auf englisch',
		'waschmaschine abfluss',
		'waschmaschine abbauen',
		'waschmaschine entkalken',
		'waschmaschine englisch',
		'waschmaschine ersatzteile',
		'waschmaschine entsorgen',
		…
	]

	 */
	
## Documentation 

### google(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### bing(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### duckduckgo(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### amazon(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### otto(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### playstore(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### youtube(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### youporn(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### ebay(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of strings with suggested keywords

### instagram(keyword, cb)

* *string* **keyword**
* *function* **cb(err, suggests)**
	* *function* err: Error object, null if no error occurred
	* *array* suggests: array of objects, sorted by the *media_count* key, the number of photos/videos for the hashtag, empty array if no results could be found

``[{
	media_count: 6354,
	name: 'schuhemachenglücklich',
	id: 10340169668000754
},
{
	media_count: 8366,
	name: 'schuhcoholic',
	id: 10340305931504870
}]``

## License

MIT

## Author

[Justus Blümer](http://www.justusbluemer.de)
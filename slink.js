/**
 *
 *
 *
 *
 */


Slink = function() {}


Slink.sites = {
	twitter:{
		name:'Twitter',
		urlf:'http://twitter.com/',
		icon:'icons/twitter.png'
	},
	linkedin:{
		name:'LinkedIn',
		urlf:'http://www.linkedin.com/profile/view?id=',
		icon:'icons/linkedin.png'
	},
	delicious:{
		name:'Delicious',
		urlf:'http://www.delicious.com/',
		icon:'icons/delicious.png'
	}
}


/**
 * @todo Handle sites with differing URL formats
 */
Slink.socialLink = function(site, userid, usertext) {
	return '<a href="' + site.urlf + userid
						+ '" title="Visit '
						+ usertext
						+ ' on '
						+ site.name
						+ '"><img src="'
						+ site.icon + '" /></a>';
}


/**
 *
 */
Slink.webLink = function(url, text) {
	return '<a href="' + url + '">' + text +'</a>';
}


Slink.slinkify = function() {

	$("span[class^=slink]").each(function(){

		myspan = $(this);

		/** @todo What if multiple classes? */
		spanname = myspan.attr('class');
		slinkid  = spanname.replace(/slink-/, '');

		// if there's no setup for this key, bail
		if (!slinkconf[slinkid]) {
			return;
		}

		linkText   = myspan.html();
		socialHTML = '';

		// add link to pal's homepage
		if (slinkconf[slinkid]['web']) {
			linkHTML = Slink.webLink(slinkconf[slinkid]['web'], linkText)
		} else {
			linkHTML = linkText;
		}

		// add some social links
		for (network in slinkconf[slinkid]['networks'] ) {
			if ( Slink.sites[network] ) {
				site = Slink.sites[network];
				socialHTML += Slink.socialLink(site, slinkconf[slinkid]['networks'][network], linkText);
			}
		}

		newHTML = linkHTML;
		if ( socialHTML ) {
			newHTML += '&nbsp;' + socialHTML;
		}
		myspan.html(newHTML);
	}
)};


$(document).ready(Slink.slinkify);

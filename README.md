# SWMF inspection form repo

go to the [GitHub Pages-hosted site](https://seo59025.github.io/SWMF-form/) to use it

long and boring essay as follows:

---

# Not As Janky: The SWMF Form’s New Look

_An informal discussion on the current and future iterations of the SWMF inspection forms_

**Andi Meadwell**

## Introduction and ramblings

I created an updated web-based version of the SWMF inspection form after identifying that it was a bottleneck in the storm system analysis pipeline. This new form loads as an HTML form in the user’s web browser and allows the user to input values for various SWMF attributes, then generate a CSV list to copy or to download. This CSV can easily be imported to a spreadsheet to better analyze the collected data, notably the overall score of each SWMF. The score is calculated as the sum of all multiplications of the assigned score by the number of times it was assigned; scores of zero each contribute zero towards the overall score, ones contribute one point each, twos contribute two, and threes contribute three. Not Inspected and Not Applicable do not count towards the final score. The user may also print a version of the form after completion, either saving as PDF or printing, via the browser print dialog window. This print-friendly format only displays attributes which did not score zero or N/A, i.e., it will include facility and inspection information at the top, notes at the bottom, and only interestingly scored values in the middle. The printer version also includes the calculated score at the very top and bottom of the document, for ease of analysis.

However, this new form is not perfect—big surprise, I’m sure. For one thing, it relies on the user manually importing form data to the relevant spreadsheet or database. It also has no ability to accept inspection photos, as I ran out of time to implement that; besides, I couldn’t have easily improved the photos archival process significantly without dealing with server-side scripting and databases, and I intentionally avoided doing that. Actually, I think the fact that this form is completely front end and self-contained is a benefit, as it makes it very easy to support going forward. Simply copy the single index.html file and you’re good to go. One can even use the form without a webserver, as browsers support opening local HTML files.

I will now cover some ways that this form can be improved in the future. Initially, I had wanted to do some of these things for this first iteration, but I quickly realized that it would have been implausible to teach myself back-end web development and also develop a functional database to handle form submissions. As previously mentioned, I had also considered improving the way photos were stored, but without back-end stuff, there wasn’t much more I could do for it that couldn’t be done with some “clever” Word “formatting,” i.e., pressing the spacebar a whole lot to align captions.

## Improvements sorted from smallest to largest by effective scope

### Web-based photo form

For incremental improvements, I would like to see a fully front-end photo form, which would allow the user to drag and drop a photo into a box, and then to enter a caption/note for that photo. It would assign a number to the photo automatically based on how many photos have been entered. (1,2,3,…,n) The form would initially load only one drag and drop box/caption/figure number section and dragging a photo there would trigger the creation of a new section immediately underneath, so that if the user has input n photos, there will exist n+1 photo sections. The form would also update whenever the user removes a section (perhaps via a button) by effectively shifting all the below sections upward, so that the section with figure number n now has figure number n-1. This form could be exported as a PDF (perhaps by using the browser print dialog, as I have done with the inspection form) where photos are elegantly aligned (perhaps in a 2×2 grid on each page) with their associated figure numbers and caption/notes easy to visually scan (use font size, weight, alignment for this). This new photo form would ideally be its own entity independent of the other inspection form, though including a link from one to the other wouldn’t be a bad idea.

### Server-side back-end development

For a slightly more fundamental upgrade, there would be server-side back-end magic introduced. This magic would likely involve PHP scripts to handle form submissions from the existing web form (note to future editors of that code: I am very sorry for the virtual lack of comments in there, hopefully you can figure it out) and pass the important stuff off to a SQL database or similar. This would all have to run on some central server though, and would require some ongoing maintenance. Photos could likely be handled similarly, though I do not have the experience to say whether this would be a good idea or not. It also seems like a very easy way to make a very very large database file, unless some additional photo compression/resizing is completed before saving. This database could then be queried for manual analysis, and the photos (which could be linked to specific issues on the inspection form maybe? Though this could definitely be tricky—likely easier to mention in the notes field which photo figure number is for which issue when submitting the inspection form) could be consulted if a problem is identified. Perhaps someone will take it upon themselves to develop a server-side script to automatically analyze this data???? If this is you, I am very impressed.

In the case that this is a bit too much, (perhaps it’s impractical to develop and maintain server-side solutions) there exist form submission services that allow one to send form submissions to web-based services, which will then handle form data in place of a dedicated back-end script on one’s own server. Some of these services will send an email or have the data accessible via web portal. Data could then be entered in the form, submitted, and collected in one location (email, web portal) for ease of storage and analysis without anyone ever having messed around with PHP and SQL. Customized Excel queries might be your friend if you decide to pursue the email route—ask your friendly neighbourhood search engine for help.

### GIS integration

As mentioned by some of the permanent staff, the ultimate end goal (for now) would be to transition the SWMF forms entirely to GIS software, so that the information could be linked to a location or map layer dedicated to SWMFs. There could likely be some overlap between the HTML form and the GIS system. For instance, form submissions could automatically be pushed to a GIS-linked database of SWMF information. This would avoid the need to create another form to run via the GIS Collector app (or similar) which would accomplish the same thing. The form could use the SWMF identification number to link to the relevant SWMF location on the GIS database. A script could also be used to compare the input Facility Name with the one on GIS file, which would only link the new data if the facility number and name agreed to a large enough degree. (do a soft comparison to allow for misspellings or mistyped numbers)

Additionally, one might be able to extract GPS metadata from photos as submitted on the form, then use that information when querying the database to display specific point locations for each photo taken. This might be implementable by the GIS team, but if not, a dedicated query/analysis procedure would have to be developed to pull image locations and display them on a map.

## Conclusion

I’ve got big dreams for this form! Hopefully some of them will come to fruition. Perhaps this form can be used as a template or case study for the implementation of other field inspection/data collection forms to be developed and deployed in the future. I learned a lot during the creation of this updated web form, and I hope it can be a starting point for some other young-at-heart soul to learn something new about web development and data processing.

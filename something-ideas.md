# something-ideas

### 2022-11-02 17:21 - seriah's music box

I was thinking about how I play music, which are many-hour sets of music selected by someone else, I effectively listen to recorded radio. I don't know if you remember taping the radio during disco saturday night to hopefully get a good mixtape -- but my cuts were never very good because I had to press the record and play button at the same time (why??????), so I didn't get the timing so well often. anyway, I never really *owned* that exact song but made an inferior recording of it. that's one part of it.

now consider something I noticed when reading "[fifth gospel](/steiner/fifth-gospel.md)" online, I couldn't really find the pdf[^1] and archive.org had it available. the way it works is they have an artificial limitation imposed to circumvent copyright, which is that all of the libraries registered in the index have physical copies of the book, so the number of people that can read the book simultaneously is the number of physical copies.

now, I'm thinking about seriah's music collection. he has physical copies of all of his music somewhere, but the digital is much easier to manage so he's mp3ed his collection.

---

so here's the idea: we recreate gatunes music player like we had it before but instead of youtube videos, we just start with seriah's music collection. other people browsing it can say they also have a physical copy (and I guess can verify it -- sorta like a collectors measuring contest).

same thing: the number of physial copies available in the network is the number of people that can play (or broadcast) the song simultaneously.

---

the next thing to do is to create a blockchain sort of thing where you have a digital receipt that you "own" the physical copy of it (like a NFT), but the NFT has its own blockchain of rentals and expirey.

because the file is available, if someone wants to just play the song, they can do that, but this system is part of a larger system which is cataloguing all the music and figuring out who has the physical copies, which then these tokens can be exchanged or traded, sorta like black market art -- where the rarity is the important thing (gatta justify those large cash transfers, hehe).

[1]: so hard to search these days -- when information should be increasing, things should be increasingly easier to find cause more probability that someone has put it on the internet somewhere. I believe this is the result of people moving more and more to platforms with formatted and structured content, instead of putting their own stuff up there in more raw (or published) form.

#### 2023-02-10 12:38 - derivative works

I just love this one mix that I'm listening to called "Andromeda - Amiga 2021". the thing is that I want to change out some parts of the mix like in the beginning of the thing is kinda slow. I don't want to make the song (it's 1:12:17) to be longer or shorter -- just want want to swap out that part for something faster and blends right into the opening song.

therefore, I think it'd be really cool if I could swap out parts of a song. imagine you're a musician and you think you could do that part better. I'd want to, not only listen to the song "my way", but I also want to offer that improved bit that I did, to others.

it's also really important to, when making a remix, make it possible to *easily* find derivative works for a section based on a sort of "quality" -- like I'd want to be able to search for a derivative work of that section that is, say "more punchy" (or less). the creators of the derivative works will be able to self-describe their work with these qualities as well as users suggesting/voting for the qualities that describe the section/work.

it'd also be cool to have an ability to compose your own derivative work, sourced by others. eventually, this will turn into a fruity-loops sort of sampling setup where there are so many samples, you could make songs without needing to ever touch an instrument; meanwhile, the really awesome and serious guys will go to more effort to make their own samples and synths.

you know, now that I think about it, I'd want to do this as a windows program, not a website, that way torrent can be used, and not all parts of the torrent (or some distributed fs) needs to be downloaded to get the samples -- also this would require wayyy too much IndexDB storage, so like yeah -- you want this to be distributed so that anyone can get it.

man, there are so many good ideas. next time I'm going to sit down and try and consolidate this into a more fleshed out concept. I also noticed after mentioning the technology that I shouldn't really worry about the platform, but on the functionality and interface to it. you know, for me, the imprtant thing for me to start with is the general idea of what I want and go right into the interface, thinking nothing about the platform limitations and then just figuring out how to make technology do what I want. working on the interface also shows me other new options that could be expanded into the implementation and also gives the interface a sort of framework.

quick little bit on that: one of the mistakes that I didn't do so much in tuenti is because we had to show the interfaces to each other and zaryn, so we drew them on the board, even before beginning to program. same (kinda) with gatunes -- but I had this habit of wanting to start programming before I knew what it looked like, because I don't have visuals, so it seems useless to me (which  is why I liked working with designers so much) -- however, it's an extremely import part of the creative process to figure out the shape of the data by figuring out the inputs. that tells me what are the boxes I'm putting things in, so then from there I'm figuring out what ways tto display the content of those boxes *in the technology*. the thing is, that doesn't get me the implementation. that gets me an idea ready to be imlemented -- which isn't useful. furthermore, because ideas are always changing, I can never keep up with the constant flow of iprovements that I can make to the idea. so conceptualising the interface for me (a non-visual person) into a physical medium is *extremely* important for discovering new limitations to overcome, cause those are the new ideas.

#### 2023-03-02 18:26 - ability to set some sectcions of a song to be random harmonically similar sections

sometimes I want to hear the same set, but I'd love very slightly different variations on the section, so I can hear the same thing in a slightly new way.

### 2022-11-07 18:07 - cell calculator

this is a spreadsheet app written in your favourite language for your favourite OS that talks to elixir. the elixir backend just has concept of other cells. the address space is infinite (hashes), and cells are found at a predictable pattern, like A1 will always refer to (0,1) or whatever (as the designer for the spreadsheet or whatever you're making) you define the cells and their dimensions.

the nice thing about hashing is that memorable names can be selected for the control cells (the ones that take a value/obv). these cells are all refered to by the various tables. each cell is an elixir/erlang function that can get/set/call other cells, which will then perform calculations. each table has a number of inputs (by name), and from those the table is populated.

you can then imagine all of the cells of the table as virtual, meaning they're not instantiated. when they're read, the erlang function is compiled (if necessary) and run, then (optionally) the data is saved.

this allows for complex programs to update each other's cells. this was the original intention of the obv stuff I was working on. each cell is a value, but when it becomes a function, it's a transform/compute.

---

the idea then is that any web app or any language can interface with these different cells. they'll become the databases for future forms of web data I think... think about writing a web app like this, where the tables are all dynamicly calculated cells, then anyone could write their own catalogues of data and make them available for other people. I suppose using them to organise social things could be possible, but I want to make it easy to write something like this program I'm using here, but have it able to retrieve and save data about the documents. making notes, blogs, spreadsheets, logs, etc. will all be very easy. later building a blockchain system to make it permanent is a future task.

### 2023-03-07 14:33 - chrome extension: highlighter

I read a lot of stories and things on wikipedia the browser. often times I get really confused when there are a lot of references to the same person or thing with different names. for example, in the plot description of this movie, https://en.wikipedia.org/wiki/Ready_Player_One_(film)
you can see that it refers to the same character by their name and avatar:
Art3mis, Samantha
Parzival, Wade
etc.

I'd like to be able to highlight those names and assign each of them a different color. that way, when I'm reading it, I can identify them (ex. Art3mis and Samantha)  visually with the same color (even though the article is switching between the avatar's name and the character's name)..

another (more difficult) example of this, which is really what I'm going for, would be to do the same with more complicated searches (like regex), for example reading the illiad: https://home.ubalt.edu/ntygfit/ai_01_pursuing_fame/ai_01_tell/iliad03.htm

Atrides, Menelaus, etc
Atreus' son, Agamemnon, son of'Atreus, etc.
Laertes' son, the great tactician, Odysseus, etc.
(land of the) Achaean[s], (land of the) Argive[s], Greek[s], etc.

it gets really complicated for me to remember all of these things, and so to make it easier on myself when I return to read it, or to show/teach it to others, it'd be pretty great to automatically highlight all of these characters and their epithets visually.

other examples are Shakespeare plays and stuff like that. for example today (and the reason I'm writing this), I set out to study Pericles, and has 3 derivative works with different names for some of the characters, so not only would I love to have each of the many characters highlighted in the original play, it'd be great to see their same name highlighted in alternate versions also.
https://internetshakespeare.uvic.ca/Library/Texts/Per/index.html

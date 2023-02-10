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

### 2022-11-07 18:07 - cell calculator

this is a spreadsheet app written in your favourite language for your favourite OS that talks to elixir. the elixir backend just has concept of other cells. the address space is infinite (hashes), and cells are found at a predictable pattern, like A1 will always refer to (0,1) or whatever (as the designer for the spreadsheet or whatever you're making) you define the cells and their dimensions.

the nice thing about hashing is that memorable names can be selected for the control cells (the ones that take a value/obv). these cells are all refered to by the various tables. each cell is an elixir/erlang function that can get/set/call other cells, which will then perform calculations. each table has a number of inputs (by name), and from those the table is populated.

you can then imagine all of the cells of the table as virtual, meaning they're not instantiated. when they're read, the erlang function is compiled (if necessary) and run, then (optionally) the data is saved.

this allows for complex programs to update each other's cells. this was the original intention of the obv stuff I was working on. each cell is a value, but when it becomes a function, it's a transform/compute.

---

the idea then is that any web app or any language can interface with these different cells. they'll become the databases for future forms of web data I think... think about writing a web app like this, where the tables are all dynamicly calculated cells, then anyone could write their own catalogues of data and make them available for other people. I suppose using them to organise social things could be possible, but I want to make it easy to write something like this program I'm using here, but have it able to retrieve and save data about the documents. making notes, blogs, spreadsheets, logs, etc. will all be very easy. later building a blockchain system to make it permanent is a future task.

# rts-concept

I just got out of the shower and I noticed that I think I can finally put into words good portions of my rts concept now.

### play style

though the game can be played as 1v1, this is not the intended format. the way the game is designed is that there is 1 person responsible for the macro game (commander?) and then a bunch of (captains?) that are actually microing the units in battle. the idea is that the commander is responsible for seeing the big picture and getting the proper units out to the proper place so that the captains can fight the battles. the captain's position is pretty cool because they're the ones that get all of the kills, so when the stats come up, it'll reflect the skill of the captains to work together and do proper surrounds and micro all of the units well.

for the commander, I see this as being a very little apm position. most of their entire job will be done before the game begins in setting up the AI and the build orders that he'll select from during the game. most of his job will actually be observing and ensuring that the proper things are arriving to the right spots. obviously the better his AI program is and his capacity to control it, means that expansion and resource management is pretty much just pointing and clicking. since he's mostly observing, his entire job is just to intuitively see the battles playing out the way he expects them to go.

AI is a huge part of this game, so lots of resources will be devoted to going into building programs which get the entity data from the server and doing something with it. therefore, you could imagine that the pro teams employ teams of programmers to ensure that their AI is up to date with the meta and well trained and operating properly in the current meta. the AI programming team is just as much a part of the team's overall performance, and I even see it necessary that they could even do hotfixes and changes to the code during the game if necessary.

### environment

because the game is designed for large macro battles, I see quick games happening on a single planet/world, but the larger games are designed to play out over potentially a few hours or more.

the way that I see the environment is containing more than one world/planet, and so we can imagine that this is set sometime in the future as a sort of galactic games. there are a number of worlds and these are persistent, so the damage done to the terrain of the planet will continue until that planet is finally decomissioned. decommissioning can happen between games, or after a best of 3 or whenever. the point is that the planets are specifically designed and created to have balanced and fun games (usually pretty symmetric and stuff). games are held within the bounds of some stars. I suppose a tetrahedron (4 stars) is possible but let's imagine 8 stars in the shape of a cube. they're held in place artificially and these create the point light sources for the planets within this game environment.

you can imagine that for a small game of say 5v5, there may only be 7-8 planets, with each team starting at opposite ends of the cube on their home planet.

in implementation, imagine a tesselated sphere made up of triangles. unfold it so it's flat and you'll get a weird shape. all around the eges, we'll consider these to be sorta like warp portals so everything looks flat, but if you drive off the border, you just reappear on the other side of the flattened sphere. obviously the terrain will retain its height and features when being unfolded. the unfolding is just an illusion to make the maths simple cause it's easier to fight battles on a flat environment. when zooming out to the atmosphere (like for directing air units), I guess if you get too wide of an angle you'll want to see the curvature, but I really like the idea of having the AI think in cartesian coordinates, so that programming an AI more approachable.

as the game goes along, there are various stages that take place, like landing on a fully occupied planet and also battles that are to be fought on the planet. depending on the technology allowed (remember, this is contrived so everything from the planets to the technology is designed to have a good game), this will cause different styles of play. I imagine that some will be more fun than others -- and this will eventually develop itself a sort of super meta. the inspiration for these pre-seeded planets is something like the maps in starcraft where the mineral patches are prearranged in a way where you have a pretty equal and fair conditions (I imagine the unequal ones would only be used in certain setups where one guy starts with a good setup and it's a competition to see how long he can defend it for).

### single planet setup

I do want to also imagine quick/casual games of maybe only 10-20m are also possible too on single maps which are more in the line of starcraft. I suppose that these too can be played with a team or 1v1, (especially cool if you're good at programming and also microing, you could totally dominate). in this setup, your "teammates" are replaced by your own AIs -- a kind of "supreme commander" (hehe).

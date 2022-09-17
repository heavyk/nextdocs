# captain of industry notes

inspired by things I've encountered while playing myself or watching [JD's videos](https://www.youtube.com/c/JDPlays/videos) (or both).

- blueprint mode is extremely hard to see what I'm doing. after a while it just becomes a mess of blue. an option to enable normal view or to show the schematic of the build in a conceptual way would be nice while building.

- in a mess of pipes with many connections, it's difficult to see where it goes. it'd be nice to have a button or something to show the complete path the pipe/belt takes and what resources ports it's connecting to.

- impossible to see the direction a connected pipe is going in blueprint mode. same suggestion as above, putting an arrow on the indicated path, to see the direction

- it's difficult to visualise all of the schematic of the build. it'd be nice to have a way visualise all of the paths the resources are taking (without the pretty models), being able to see that view, it'd be possible to see at a glance directions things are going and where I can access a nearby belt/pipe

- when placing retaining walls (or any building), there isn't an indicator of the hight of the building. (not that important because it's possible to use the mining delegations to see the hight)

- often times when copying settings, a smokestack will lose its recipe when clicking and dragging settings. buildings  only with strictly the same type (or perhaps similar types like blast furnace 1 and 2) should copy recipes.

- sometimes I want to copy only a certain setting (like priority) between buildings (in for example a power plant), but I don't want them to lose their other settings. it'd be cool to be able to set what settings get pasted -- so, like if I copy some settings, I should be able to enable pasting of:
  - priority
  - recipe
  - paused
  - etc.

- upgrading a belt with a lot of connections is pretty painful. if there were an upgrade tool (like the unity tool), this process would be a lot easier (click and drag or point and click)

- later on in the game when I have a large population, it doesn't matter so much, but it's annoying to constantly have to adjust the amount of workers on world resources. it'd be cool to set a range of minimum and maximum level for the resource, and also a priority (in case I set a range on more than one)

- storage alerts are kinda wierd -- it would be easier to just press the alert button and then instead of selecting from a dropdown, pull two sliders for minimum and/or maximum alert (like the target fertilization slider)

- there is a bug where if I upgrade a world resource, I can no longer "load cargo" until I cancel the upgrade. it'd be cool if any of the world resources, when loading cargo, it continues to load forever until I do something else with the boat.

- loading cargo to upgrade a world resource and/or a settlement is really confusing. it'd be nicer if I could just set the cargo that I want them to load on the ship. this enables the boat to be used as a temporary storage. to offset this, a loaded boat stould cost more diesel.

- if I have a bunch of a resource (wood, oil, etc.) loaded on the ship after collecting from a world resource, it's annoying to have to clear up space in the shipyard to unload the cargo. it'd be cool if trucks could access the boat's cargo directly.

- often times I go to copy or to cut something and my mouse is already over an element, so it cuts/copies the element under my mouse. not really a problem because I should easily be able to place it back where it was. however, because it always centres the thing I copied to my mouse, there's often a big jump. additionally, if I need to line up a specific set of pipes, the pipes I need to look at require me to move the mouse so far off screen, it's hard to see what I'm doing, forcing me to zoom out and just try to click it down and then zoom in to look

- like in the previous case, often times when blueprinting, I click a thing down and it's not quite aligned or I accidentally cut something (or right click or press layers button, etc.) and the design goes away entirely or it loses half of its pipes because the mouse accidentally jumped right before I clicked. an undo button would be really good to try placing it again or to put the cut pipe/machine back where it was.

- I believe this is a unity bug because I've seen the same behaviour in roguebook, which also uses unity engine, but on a slow machine or when the click handler has to do a lot of things each click, and say the mouse has moved slightly from where it was previously, the game doesn't register the click in the locaton where I pressed the button but where my mouse is a few ms later. I see this all the time trying to lay a pipe or a belt and I click when it's green and go in the direction that I want to go, and a good quarter of a second after I clicked it, it finally decides to start the pipe nowhere near where I clicked the button (on reguebook, this is when you click on a highlighted item and the game does nothing).

- it is very difficult to remove existing infrastructure and to replace it with a new thing seemlessly. the most difficult is replacing a storage 1/2 with a storage 3/4. I have the space already allocated for it to go, but maybe my belts will need to move around a little bit. it'd be nice to be able superimpose a blueprint over an existing building so that the deconstruction and construction phase can happen simultaneously (much like how construction is done in real-life). so for anything that requires the removal cargo, if the new infrastructure contains storage for the new items, it could just move them over to the new location. this would be especially helpful for upgrading factories, where the storage contents will just move over a few tiles or whatever.

- when unity building a large number of things, there isn't an indicator how many parts (it just shows unity cost) are required to build the things highlighted vs how many I presently have. it'd be cool just to get the tool tip (like the cost of building a factory has), at least when I don't have the required amount of parts, so that I know that only a portion of it will be built.

- often times I'm clicking and dragging, a popup from one of the buildings shows up and eats the mouse event. or, I click and drag a mining designation but the little "PAUSED" box eats the event. pretty easy to fix: when clicking and dragging in the world, the main interface shouldn't interact with the mouse, so item tooltips, popups, and things shouldn't show until the mouse button that first clicked inside of the world is released.

---

liquids and gasses don't at all behave intuitively. when I click on a pipe, I see a number 15/30 -- and that should mean to me that the pipe is half full. when the pipe fills up, 30/30, then I have pressure and the machine should start to run.

ignoring changes in elevation, a pipe should fill up something like a tank does, meaning that there will be liquid or gas along the entire pipe. it's a minor difference, but the effect is the same, namely that it takes a lot longer for a long pipe to fill up than a short one.

in the case of gasses (steam, hydrogen), I'd probably remove the elevation restriction (if any), but just the same, the pipe won't gain pressure until it's completely filled.

this opens up an interesting conversation though, which is how the pipe should be perceived with many connectors. likely, in the code, each pipe segment is updated individually -- so therefore, it's probably best to keep that and only calculate each pipe segment's pressure.

---

- inside of blueprint mode, once I've placed a pipe or building, it'd be nice to be able to upgrade (and also downgrade) the blueprint.
- it'd also be nice to convert from u-shaped conveyor to flat -- and if possible, even from conveyor to pipe (though that may be a bit harder)

- it'd be nice to be able to assign storage to tree harvesters, so that the trucks assigned to them are just putting the trees in a box instead of running across the map

- it'd be nice to have buildings that have full output, no input, or whatever automatically release their workers to do other tasks. that way, if I have factories sitting around with no work to do, they aren't taking population.

- it'd be cool to be able to plant trees and also have trees reduce air pollution as well.

- making ramps go up elevation is quite difficult. if I lay down a conveyor, and then I cut it and put it down with shift held, it copies the section, so then I shift it up an elevation, and even though the ramp is under height 4, it still won't let me place it. conveyors can't ride on top of each other up or down slopes.

- small bug that if I hold shift when deleting a pipe, it begins to deconstruct, but then if I hold ctrl (to unity delete) the pipe and select a section (or hold shift to delete the whole section), it doesn't unity delete the pipe

- "cannot find valid pillars placement" is pretty annoying. without the ability to control where the pillars are placed, it feels a silly restraint.
  - sometimes it requires me to delete entire sections of pipe because they went over the top of a balancer, and when putting them back, now it can't find pillars placement.
  - it also happens sometimes where I copy and paste something and the paste cannot find pillars so those bits don't copy.
  - if I run 6 pipes next to each other at height 2, it's often the case that the pillars don't line up with each other and can be diagonal, so it blocks truck traffic.
  - one potential solution would be the ability to move the pillars up or down the pipe a bit (within their valid range)

- it takes forever to add servers to a data centre. three possible solutions are:
  - hold shift to add 5 at a time
  - "max" button which adds as many as can be added
  - a slider like the buckets/boxes to set how full you want the data centre to be.

- it would be really nice to be able to click and drag a priority to a whole block of buildings.

- small bug: if I click on upgrade a building, then pause the upgrade, then cancel the upgrade, the blue paused icon stays on top of the building until I reload from a save.

- small bug: when the tree harvester has a tree in its claw, if I tell it to move to another place on the map where it can't go, it gives me the error, then I tell it to go to a new spot it can go. the truck comes to get the tree, the truck gets the wood, but the tree doesn't disappear from the claw. it cuts down another tree still with the tree in its claw. after another truck comes, it's fine again.

- bug: I'm not totally sure the conditions which produce this bug. I think it's something to do with scrapping the tree harvestor while he's paused. then if I try to recover him, he goes back to trying to harvest trees, and scrap doesn't do anything, and neither does pause. neither does unselecting the tree he wants to harvest. even more amazingly he can drive under belts and through buildings. it seems like a bad fsm state, probably from trying to scrap while being paused.

- small bug: clicking on the recipe for glass will show me the recipe for making PCB in robotics assembly 2, when I don't even have robotics assembly 1 yet.

- small bug: the recipe for toxic slurry in wastewater treatment is shown when I right click on brine.

- it'd be nice if crude oil pumps could have the same notification system as boxes, but no need for the full ones so I can alert if < 30%, 20%, 10%, empty (also see above suggestion for slideable alerts)

- it'd be nice if the green chevrons that show something is being queued for upgrade, but then when it actually starts the upgrade process, it'd be cool if it changed colours again so that when I unity build the upgrades, I have confirmation that it started the upgrade.

- instead of assigning a truck to a single box, I want to assign a truck to a zone which contains various boxes and their whole job is to service the boxes/buildings in that zone

- in the research, it'd be nice if there were a list of researches, and the ability to reorder them. to make it easy, if trying to drag a research up to before one of its dependencies, just place the research below its dependency and flash the parent dependent red or something.

- instead of up and down arrows to reorder recipes, it'd be nicer if there were like two/three horizontal bars showing that the recipe can be dragged up or down to reorder it.

- when clicking on a save game, it'd be nice to see the game time as well as the local time (and perhaps a few other statistics which can help me identify which autosave is the right one to load)

- it'd be kinda cool to see some update on the loading screen. I notice the first seconds are loading things into GPU memory, then a few seconds after nothing (why?) the CPU goes up real high, so this is probably deserialisation of terrain and producing the 3D model from the resource layers... etc.

- it'd be cool if the excavators temporarily prioritised the material of the truck that's waiting to be loaded. that would save various trips of low amounts of dirt when digging out a mountain with some green on the top.

- it'd also be cool if fuel station trucks could also take jobs to fill up fluid storages with diesel instead of sitting idle (see trucks assigned to a zone rather than a single box suggestion above). another way to do it could just be to allow a truck to be assigned to more than one entity (assign on truck rather than on entity)

- it'd also be cool if there were a way to set an alert on the global supply and have the border colour of the item on the right show below (or above) a certain level

- small annoyance: if I cut a belt that is attached to an existing belt, it removes the connector, and if I paste it right back where it was, it doesn't reput the connector. one easy way to fix this is just to make an easy way to make a connector (I know I can just copy and paste one, but if it's at a different hight, I have to match its height)

- it'd be nice to get stats on the balancer showing how much throughput each port is doing (same for pipes, not just how full they are)

- a query or overlay system to show machines that have not turned on in a period of time. this is useful for debugging because I often times don't see a pipe reversed direction or something stupid, so I don't know that the building isn't even running. it's also a good periodic check to go around the island and look for machines to be paused.

### design/upgrade planner mode

it'd be really cool to have a sort of virtual workshop of infinite space with conveyors and pipes coming out of nowhere which are just magical sources and sinks for belts and pipes. in this mode (de)construction time is instant and the blue hue isn't present so I can see what I'm clicking on. this is the place where you design/load/save the blueprints, then later paste them into the world.

so, for example, if I want to blueprint out something, I can create a source pipe that, for example, produces 60 water/min and another that produces 100 copper ore and maybe 10 sulfur ... etc.

the point of this workshop is to test the machine as if it's running without needing to save the game, build it, figure out all of the bugs in the build, then reload the game and make the changes. the whole point is to test the setup before building it.

by being able to plan out the whole thing and see it working with all of the inputs and outputs, this will dramatically decrease the number of "whoops I missed a belt" moments (and other similar silly mistakes).

perhaps a total resource consumption and production output panel would also be really cool too, as I can never seem to remember all of the exact values a design produces and consumes.

in a future version of this, it'd be nice to also copy existing terrain and/or infrastructure (present in the map) to ensure that the design will actually fit onto the terrain and/or to ensure the upgrade goes smoothely.

### mining and dumping designations

when clicking on a mining designation, it'd be cool to have a little icon on the (bottom?) of the square that links me back to the tower, because it's often the case that I cannot remember which tower is which designation.

it'd also be nice to be able to resize the designation like resizing a window in OSX or windows (click and drag the side of it). move would also be nice, but move can be accomplished with two resizes.

in addition to the icon which links me back to the tower, it'd be nice to have an ability to draw within the mining designation in some lines which look like arrows (click and drag to draw lines. right click to delete) where these lines define the angle of attack for the miners or dumperd. in implementation, these lines resolve to "weights" or priority of mining squares (higher priority squares get mined/dumped first). this is especially useful if I don't want want my miners to dig theirselves into a hole, prioritise digging out the high traffic part first or dumping to expand the throughfare first before the main part.

### balancers and sorters

often times I want to just have a balancer act sort of like a network hub, and then inside of it, I want to be able to set paths, the interface would be the same as the balancer is already, but in addition to the priority, I could also set which item would go into each input/output.

perhaps later an advanced hub could have not only more ports -- for example, of 16 ports square, or some longer -- or maybe even expandable, so that I could make a hub the size I wanted, like say I wanted a 12x6 one... I could do that (within limits of course, so a 1000x2 hub couldn't be built)

then, same thing: when I click on each port, I can set the item(s) I want output on that port and also its priority or not.

### progression of points of view

I noticed on the way back that the COI interface now is the physical/3d layout of the game, but then above that, is what I called "planner mode" and "schematic mode" where parts of the world would blend together with a conceptual layout. this is effectively 4d. the next one that I didn't copy and paste in here because the idea has transformed again is the beginnings of a conceptual (5d) point of view, but not from the perspective of time. instead each concept is a physical instance the "reaity" mode of the conceptual plane. each plane has its lower frequencies pertaining to its own perspective of "reality mode" -- so, like for example the lower plane of the astral is the reality mode imagination, and from there and with increasingly more complexity, the image starts to become invisible.

conceptual mode also has a reality mode as well, and that was what I was describing in COI notes that I didn't copy and paste here yet. things behave differently depending on the essence they're imbued with.

to demostrate, let's figure out the next four: imagine that now I can see that there is a physical structure, but there is something there that makes the physical structure unique and this is its essence.

you'll notice that you want a stable environcent, and you can't have concepts running around all over the place and causing trouble, so the buddhic perspective (6d) is the one that sees the "ecosystem" and is constantly putting in stablilising forces to keep any number of concepts from craating a cascading disaster. this interface is all about keeping all of those constructed concepts balanced, which are servicing all of the industry autonomously.

the one after that is symbolic, and that's where things lose their physicality. this is something like probabbilities and statistics; something that has no real physical representation -- something like a spreadsheet which is defining symbolic groups and making sure that under alarming conditions, it'll make an action in response.

obviously the one after that is a perspective of desire where you can express in symbolic form what you want: "I want you to take off the side of this mountain" "go from here over to here" etc. I don't know how to explain the pure desire perspective, because it would be something of chaos, and everything undesirable. the absolute "worst" thing that could be happening. this is where you find bugs in the system. you can propose disaster scenarios and save the scenarios to notice when they happen, then from the perspective of the lower layer take an action in response.

the desire perspective can also do a symbolic approach to the same perspective, so like "I'd like this to be producing 400 wood", and when it's not or looks to be a way that I want (or don't want) in the future, tell me about it.

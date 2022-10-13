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

- why no coal power plant?
  - I know I can use a coal boiler to then put the steam into the advanced power generators, but most countries still run their power plants on coal.
  - what I mean is, a discrete power plant building like the diesel generator where it inputs coal and outputs power and exhaust. thees would make really awesome backup generators (I guess this would be a good mod addition)

- ability to remove xxx may collapse because of uneven terrain.

- small bug: when setting the mine control tower area, if the diggers are returning to the tower, they return all the way to the tower instead of going to the new area I just selected

- small bug: I noticed that grouped delivery for upgrades does not happen. for example, if I upgrade a cargo depot from small to medium modules, 6 trucks will bring over 20 steel instead of 2 trucks of 60 steel.

- small bug: if there are many trucks doing diggers, and one has dirt (for example), it should continue to wait for more dirt instead of going to dump only with a very suboptimal load (like 6 dirt for example). with other trucks waiting, the truck should continue to wait for more dirt (especially if there is still dirt in the mining designation)

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

### multiple select

being able to select multiple things at a time would be really useful. a panel should pop up with all of their common options.. so, for example if I selected a few factories and some pipes, I should be able to set the priorities of the factories, even though pipes don't have a priority. this will be helpful for setting priority on a group of buildings.

likewise, if pipes and belts are selected, toggle direction should also be available so that a group of pipes/belts can have their direction toggled.

standard manipulation of pressing ctrl (able to be rebound) could toggle if a piece is selected and shift (also able to be rebound) should inclusively add more pieces. this will help to (de)select belts/pipes that are layered on top of another.

---

one really cool thing that I would love to be able to do (in planning mode -- not sure how to do it in physical structures) is to select some factories (or belts/pipes) and then be able to drag it to another location, and the belts/pipes will lengthen/shorten appropriately to accomodate for the new position. obviously if the pipes can't find a spot it should turn red or something to indicate that the desired move operation won't go through if the user releases the mouse button. this will dramatically cut down on tediusly having to move every single pipe individually just cause I want to move a whole part of the factory over one square.

there is potential imporovement as well to be had with selection for copy and pasting parts of the factory (of which I'll keep thinking), but for now, I think being able to (de)select items would dramatically improve laying out factories with copy and paste

### undo button

at the very minimum, I really want an undo button when planning out structures. it doesn't matter so much for me in physical mode, cept maybe I accidentally click on a pipe with the bulldozer selected. however, the one physical thing that I really want to be able to undo is, only when the game is paused, I'd like to be able to undo an accidental overy eager use of the unity tool. even if the resources haven't even been spent (cause the game is paused), often times I unity something only to see half of it turn blue, only to realise that I didn't have as much unity as I thought I did, so it'd be better to just unity the pipes and let the trucks deliver the factories.

### next stage of industry: conceptual designs

the way that I visualised the next stage of industry is no longer confined entirely to the ground. I could see that instead of trucks, you would have these sort of hovering drones that can do all of the truck's work (moving resources around).

all of the resources available now in COI are all physical resources (steel, glass, etc.), so now, imagine a new set of resources that are entirely abstract (having no physical counterpart), such as: durability, strength, agility, etc. these different abstract concepts, should be considered to be anything.

the way that these abstract components are created (of which, the trucks, tree harvesters, and perhaps even the ship) are all a part of, so let's say we're looking at the pickup. we know those need vehicle parts, which theirselves are composed of other physical parts (iron, glass, steel, etc.) and these are used to construct the vehicle. the pickup blueprint is a conceptual design that contains behaviour programming (ie the logic used to retrieve the next queued task, pick up the items and take them to their destination). since most of their logic is going to be picking up things and moving them to another location, this logic can probably be generalised.

the idea here is to begin to make specialty vehicles that do certain things with available resources on the island. a good example of this is the tree harvestor or the excavator. one can see that the logic for the small excavator, excavator, and mega excavator is all identical, and the only defining difference is the model, its physical dimensions, and it's quantities.

if we now consider these values (speed, shovel size, etc) to all be a function of some abstract values, such as strength and agility, we know can begin to make a spectrum of different sized excavators with varying load sizes. this gives the blueprint a functionally defined set of tradeoffs. so, if you were to put in more strength, you sacrifice agility, and so you go from small excavator style to mega excavator. the conceptual values input into the abstract blueprint not only affect the model and physical dimensions, but also the parts necessary to build the machine.

both the tree harvestors and excavators would be the very first "conceptual designs" put into the game, and the vehicle depot will be the first "instantiator" of these conceptual designs. obviously, it should be noted that the instantiator of the conceptual design cannot produce vehicles that are larger than some max size. therefore, the vehicle depots should be considered as the first "instantiators" of these abstract concepts.

---

the abstract values, should also be produced as well, something similar to research, in that let's say you have an excavator blueprint, it'll be required to have some other factories that produce these abstract quantites and produce a blueprint from them. the extractor is a generic design, and so then when "researching" an excavator upgrade, you have the excavator design, and you play around with the abstract quantities and find the sizes and dimensions that are best for you. after that, the abstract R&D factories(?) produces the required abstract quantities to produce the new blueprint design. once the quantites are fulfilled and the recipe is created, now in the depot the new extractor can be built.

the other thing that I think would be sorta cool would be a sort of quasi-abstract part, that itself has a physical and then an "infused" abstract quantity to it. these parts are required to build advanced machines and its these abstract quantities that give the machine a sort of character to it, affecting not only the behaviour of the machine, but they could also be considered like a sort of modifier to its performance as well.

later on: entire factory design bluprints (really any type of physical object - not just vehicles) can be modified with these abstract quantities, and those abstract quantities will translate into something like requirements for the factory. you know that x things will output y quantity of parts, so you want a factory blueprint that fulfills those abstract requirements. you can probably see how this will later come into play as a good way to organise and manage the different sections of the greater factory as a whole and ensure the various parts are producing and operating according to their abstract dimensions.

much later on: the creation of these abstract quantities can eventually be used to "fuel" certain "living" things.. trucks run on diesel, but humans run on creativity and food. we have a physical requirement (food), but then you can see that for advanced tech (something like google), you can't just give a worker food and outputs the chrome browser and a search engine; these are, in fact produced as a result of efficiency and crativity.

to explain from a development standpoint, the other day I started reading about [google's SRE](https://sre.google/) where they apply software design principles to real-world operations. you can imagine that the chrome brower design team is something similar/reverse of this, where the web/youtube has a growing set of needs to continue to provide APIs capable of -- you know, like when youtube first started, the videos were max 10m long and 480p in resolution. nowadays, they're 4/8K and much longer, so you have video files that will no loger even come close to fitting in RAM anymore and need access to the GPU, so someone has to figure out how to make a web component that can fulfill the requirements of playing an 8K video on appropriate hardware. the product, drives the tech requirements, so you can imagine the product has certain abstract requirements, but the development team of that technology has to sorta mirror those abstract requirements. you're not going to expect a team of graphic designers (having visual, artistic, and aesthetic qualities) to create an efficient video player. they may be able to produce a video player, but a dev team with performance, structure, and perfection qualities will produce a way diffrent video player than a dev team focused on aesthetics the dev team is "fueled" sorta by the same concepts that they're producing. an operations team will produce operations as a refection of their conceptual framework (like SRE).

to explain this now from a human standpoint, let's say you have an education system, and you want to produce students that have some abstract capability, then the teachers and the school should, like the dev team consume some of the same resources that it's producing. OK, I'll revisit this idea a bit in the future.

now, consider something like an insect or a sort of automaton/drone (biological machines I guess). these beings, having some part of their behaviour defined, should they're also be influenced by their environment. you can imagine that these abstract concepts produce a sort of aura around them, and so a in certain environments, they get a sort of boost or degredation in performance depending on how prevalent their sympathetic concepts are in their environment. this idea interests me in that I think it would be kind of fun to produce a sort of ecosystem of autonomous createres that behave in accordance to their environments. the one thing that I love about islands is they all have such unique wildlife on them, and from island to island (like going from tenerife to la gomera or lanzarote), I noticed similarities in wildlife, but also some major things changed (especially between tenerife and lanzarote). each island "feels" very different from the others and produces slightly different products. I would even consider that the land itself is infused with a sort of conceptal essence inspiring certain types of thought more than others.

### progression of points of view

on the island, you're seeing the physical, but then zoom out far enough and the physical view doesn't make much sense (the parts are too small to make out). likewise, in the schematic/planning view, zooming in too far kinda doesn't make so much of sense (like wireframe of a 3d model doesn't make too much sense zoomed in really far sometimes, unless working on a specific vertex arrangement), and it's nice to see all the traces of the factory and the information presented on those routes, but again zoom out past a certain point and those traces stop making so much sense (big jumble of lines). zoomed in where the physical view, the conceptual view doesn't make much sense. however, zoomed out, the conceptual view (with its auras) makes it a lot easier to see how the different areas of the factory are doing and (kinda like a heatmap), it's easy to see at a glance where the hotspots of problems are. this gives a progression from a physical to a more and more macro/higher level view as one progresses up the levels of view to see the different parts of the are behaving and  interacting with each other.

roughly speaking, the even layers are more focused on informational/reactionary perception, combinining aspects of the above and below (odd) action layers. meanwhile the odd action layers contain information, but are mostly concerned with action and results. so for example, it's good to plan and test everything in schematic/planner mode, but ultimately those need to be put into "reality" to get their effect.

I see it so that at any zoom position, only perhaps 2-3 layers are really relevant at any zoom position because each layer takes more and more complex views and simplifies it into something appropriate for that zoom level. let's go up the levels...

#### physical/reality mode

already implemented. play COI to see it.

#### schematic/planner mode

above the physical COI interface is what I called "planner mode" and "schematic mode" where parts of the world would blend together with a bit of an informational perspective on the physical layout. I can see the flow of different things both in its ideal capacity, but also in its real world (statistical) summary of the movement of things on these traces. it'd be nice to have an additional dimension added (like the colour/thickness of the line to show traffic conjestion or speed/quantity)) and also easy way to see what is going where. this is effectively 4d (3d space + informational dimension). the concept of time would be nice to see in this perspcetive as well, so that the different paths can be looked at temporally through statistics and probabilities (in comparison to their ideal throughput). obviously the point of the statistics is so that alarms can be notified when individual sections have an alarming statistical output (I don't know enough of statistics to say 100% how to do this, but I imagine that this combines quite well with the symbolic/compartmentalised layer below).

#### conceptual mode

this mode takes the conceptual designs idea above and turns it into a perspective where the 3d spatial dimensions also contain some information but also behavioural/conceptual aspect (the environment), then adds to it all of the different entities (trucks, factories and such) and adds each of their resulting effects on its environment. I see it kind of like auras, as this view is meant to be used kind of zoomed somewhat far out. if we now think of these conceptual values as having a sort of "aura" or area of effect, where if the concept is met, then it's good, but if it's not met, then it's bad (like a team that likes efficiency concept, but is forced to work on silly/inefficient things like officework -- this has produces a negative aura).

quick note: I don't really know how well to translate this well into a game, but for me these auras have a sort of frequency to them, so for example officework isn't incompatible with efficiency, but if the officework is itself costing a lot of time that can be used elsewhere, then officework is perceived as inefficient and produces a negative aura in opposition to the officework meaning that it'll slow all officework-similar vibration tasks in its area of effect. instead of looking at it exactly as a frequency, we can do a fourier transform on the frequency and divide it into frequency bands. each "concept" gets an array of (ie 32) [-1,1] values which represent its frequency of the aura and then simple addition can be used to compare the compatibility/amplification of its aura. not totally sure on this...

#### buddhic/balancing mode

currently I'm looking at this layer as a sort of gradient of auras (subject to change, but I'm drawing on the conceptual mode for this), but what's important to note here that in this view it's easy to see how the different things interact with each other and therefore, at a glance, I can see how stable environment is. I don't want have vehicles/machines/parts of the factory negatively affecting the interests of other sections/parts of the island, so this view simplifes that perspective.

this perspective can also be seen as the balance between the non-physical (symbolic, desire) and the tangible (physical, conceptual). so, for example, when something is out of balance, that creates a new desire (like we need more of x part here), or maybe when something is in balance, then it creates a surplus of a thing, which then needs to have something done with it (add more storage or trade it away, build something with it, etc.)

this layer also can be looked at from the perspective of the layers right above and below it, so for example in the symbolic layer above, everything needs to be well compartmentalised and each of the parts should be producing/consuming the right amount of things. if items are not consumed rapidly enough, you'll get backed up (see JD's videos for more on that), and getting backed up can cause a cascading disaster. so surplus is sometimes bad. in addition, deficit can also be bad for obvious reasons, especially if other parts of the factory depend on that resource. an example of this is sulfur. too much sulfur can be turned into rubber, but if you're not building any belts, that rubber can stack up and it'll get backed up. presently, this is mitigated on the physical layer by putting a balancer and overflowing into a mixer. obviously, it'd be nice to have a way to cause that scenario to produce a desire to consume more rubber and so therefore build a surplus of electronics, etc.

now, if we look at this same layer of balance from the conceptual level, we'll see a sort of ecosystem of conceptual parts each consuming and producing conceptual components, which then in turn modifies the production of various physical things (see previous section on concepts area of effect). in a case of imbalance, you want to create attractors (also desire layer), which attract/repel (in)compatible concepts from that area.

this view can simulate scenarios of various conditons (symbolic or conceptual) which then dispatches a reaction to that by doing something else (like modifying a variable in the symbolic, creating a desire). I don't yet see really clearly at the moment how the reactions should take place on the more tangible layers (physical, conceptual) though...

#### symbolic mode

next here is the symbolic layer. this is where things lose their physicality, meaning that the structure of the logic and symbols does not need to have the same shape as the physical factory. it's possible to think of this layer sort of like looking at block diagrams or a spreadsheet. each "cell" is a sort of part that relates to another part in a formulaic way. each part has other parts, so for example a crude oil distillery has a number of different inputs and outputs, but that distillery has multiple different parts each with its own inputs and outputs. parts of parts. everything is a part and interacts with another part. visually, I see this more like a diagram, but I suppose a tabular data (spreadsheet) look to the same diagram could also be useful.

in implementation, I see each of the things as an "observable/obv" (I use dominic tarr's work as inspiration here) which has a value (like a cell in a spereadsheet), and when that value changes, it calls a number of callbacks which then transform that value and store it into another cell/obv (again, like a spreadsheet).

as an example, let's go back to the distillery. setup all of the inputs and outputs for all of the bits, and running at full speed, everything works propery, but then say for example I have a huge surplus of diesel and now all of a sudden I no longer am producing enough fuel gas to run my power plant, and not enough sour water to create enough rubber, etc. I can see under a lot of different circumstances how those conditions will cascade out symbolically to other parts of the factory.

you'll notice that this layer shares a lot in common with the balanced/buddhic layer. from here on, they all kinda blend togther a bit (because they're not so physical). the easiest way to see this layer as being the manifestation of the desire and big-picture layers. all layers below this one are a manifestation of this layer. the whole ecosystem perceived as a series of parts here which then *should* all have a "perfect" efficiency relationship between one another (ie balanced and performant). all things are perceived and run with pure numbers and symbols, like a math problem. things planned out here means that all things on the physical layer *should* run properly, but because of unestimated conditions (weather, terrain failures, mine depletion, etc), things can and do go wrong in the physical. this, like the conceptual, looks at the ideal from a parts standpoint rather than from a conceptual (standpoint).

to see the conceptual ideas in action, we need to look at the relations between the different parts on a conceptual/essential level.

#### big-picture mode

though I define this as a separate layer, this layer is largely an extension of the symbolic layer, and it's also very similar to the planning/schematic layer, but it's more concerned, not with the physical units, but with the conceptual relationships between the units. it can be seen as the conceptual planning mode, because I want to be able to look at the setup in a symbolic layout and then see how the physical units get altered by changes in the conceptual essences. like the previous layer, I want to be able to play with the values and setup new conceptual situations, and see how those play out, set alarms and produce reactions to certain (conceptual) conditions.

this mode combines the lower symbolic layer and the above desire mode.

#### desire mode

this mode interacts pretty directly with the symbolic layer in one perspective (perhaps it should be part of the symbolic layer), in that I want to be able to set a desired production/consumption for a specific part of the whole setup -- a sort of goal, or ideal

obviously the one after that is a perspective of desire where you can express in symbolic form what you want: "I want you to take off the side of this mountain" "go from here over to here" etc. I don't know how to explain the pure desire perspective, because it would be something of chaos, and everything undesirable. the absolute "worst" thing that could be happening. this is where you find bugs in the system. you can propose disaster scenarios and save the scenarios to notice when they happen, then from the perspective of the lower layer take an action in response.

the desire perspective can also do a symbolic approach to the same perspective, so like "I'd like this to be producing 400 wood", and when it's not or looks to be a way that I want (or don't want) in the future, tell me about it.


### random idea not necessary to COI

- what if autosaves went in the background and didn't pause the game. at the end of the save sequence, you could pause the game and briefly while you check to see what entities are outdated, update those before outputting onto disk, which is also done in the background.
  - a further expansion to the idea is to not make it ever pause the game by getting everything ready and then only in the update loop ensure locations are correct and fire off the save thread.

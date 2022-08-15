
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

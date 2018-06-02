# Angular UX Behavior Directive
This Angular UX directive is used for recording user behavior and sending it to Google Analytics (or any other tracking service).

Since directives are available throughout Angular applications, hooking up events to various elements is extremely simple. Let's begin with the obvious.

## How to Use

1. Include the Google Analytics tracking code toward the bottom of the index.html of your Angular application. Make sure you are not using the analytics.js implementation of Google Analytics.

2. Import the directive and declare it in `app.module.ts`.

`````typescript
import { UxBehaviorDirective } from './directives/ux-behavior/ux-behavior.directive';

@NgModule({
  declarations: [
	UxBehaviorDirective
  ]
})
`````

3. Start adding the directive to any element you'd like tracked like so:

`````html
<button appUxBehavior 
    uxAction="click" 
    uxLabel="MyPage:MyButton1"
    uxCategory="My Category Group"
    >
        My Button
</button>
`````

That's all. Test it out by clicking, hover, and whatever else you've hooked up and check that your actions are being recorded in Google Analytics.

## Currently Supported Events
The following are the events that are currently supported. 

### Mouse

* click
* mouseover
* mouseout

### Keyboard

* keydown
* keyup

## How to Implement as a Submodule
Obviously, one can copy the source, download it, or clone it. However, using this as a (git submodule|https://git-scm.com/book/en/v2/Git-Tools-Submodules) offers some interesting benefits. Assuming you're already working in a git repo, you can get going by doing this:

1. From your directives folder, clone the directive in a subfolder:
`````
git submodule add https://github.com/ArtBlue/angular-ux.git ux-behavior
`````

Using submodules allows for repo modularity whereby one repo can reside inside another. The changes of the submodule repo are tracked separately. Pulling in changes for your main repo will not pull in the changes checked into a submodule. This allows you to pull in changes made to this directive whenever updates are pushed.

2. To pull in new changes made to the directive, you'd go into the submodule folder and do this:

`````
git submodule update --remote --merge
`````

3. As soon as you start using git submodules, your git commands need to be tweaked a bit to maintain a seamless workflow. For one, others who clone your main project repo, will need to also clone the submodule repo(s):

`````
git clone --recurse-submodules https://github.com/MyProjectUrl MyProject
`````

For more information about using git submodules, check out the documentation: https://git-scm.com/book/en/v2/Git-Tools-Submodules

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
    uxType="click" 
    uxName="MyPage:MyButton1">
        My Button
</button>
`````

That's all. Test it out by clicking, hover, and whatever else you've hooked up.

## Currently Supported Events
The following are the events that are currently supported. 

### Mouse

* click
* mouseover
* mouseout

### Keyboard

* keydown
* keyup


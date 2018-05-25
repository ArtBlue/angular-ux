import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appUxBehavior]'
})
export class UxBehaviorDirective implements OnInit {

	readonly directiveName = 'UX Behavior Directive';
	readonly supportedEvents = [
		{ type: 'click', kind: 'native', source: 'mouse' },
		{ type: 'mouseover', kind: 'native', source: 'mouse' },
		{ type: 'mouseout', kind: 'native', source: 'mouse' },
		{ type: 'keyup', kind: 'native', source: 'keyboard' },
		// only mouse and keyboard events are currently hooked up
		// included to demonstrate the additional possible events 
		{ type: 'scroll', kind: 'native', source: 'window' },
		// no proprietary (custom) events are currently hooked up
		// included to demonstrate the additional possible events 
		{ type: 'visible', kind: 'proprietary', source: 'window' }
	];

	// add interfaces for each vendor
	private supportedVendors = [
		{
			name: 'Google Analytics',
			method: this.sendGoogleAnalyticsEvent
		}
	]

	@Input() uxType: any;
	@Input() uxName: any;
	constructor(
		public el: ElementRef
	) { }

	public ngOnInit() {
		this.setBehavior();
	}

	private setBehavior() {
		let uxEvent = this.supportedEvents.find(obj => obj.type === this.uxType);

		if (!uxEvent) {
			return console.error(this.directiveName + ' does not support event type of ' + this.uxType);
		}

		// @todo remove once the first proprietary event is added 
		if (uxEvent.kind !== 'native') {
			return console.error(this.directiveName + ' does not currently support proprietary events.');
		}

		switch (uxEvent.source) {
			case 'mouse':
			case 'keyboard':
				return this.setMouseKeyboardBehavior(uxEvent.source, uxEvent.type, this.uxName);
		}

		// if ux event is not caught by now, it is not supported
		return console.error(this.directiveName + ' does not currently support the kind of event you are trying to track.');		
	}

	private setMouseKeyboardBehavior(source: string, type: string, name: string) {
		let instance = this;
		this.el.nativeElement.addEventListener(type, function() {
			// loop through supported vendors and call the event 'send' method
			instance.supportedVendors.forEach((vendor) => {
				// we're using separate methods for firing event methods for each vendor
				// since each one may have specific implementation
				vendor.method(source, type, name);
			});
		});
	}

	// vendor-specific event integrations
	// @todo these should be moved out into their own files at some point

	private sendGoogleAnalyticsEvent(source: string, type: string, name: string) {
		console.log('Google Analytics event firing...');
		(<any>window).gtag('event', type, {
			'event_label': source,
			'event_category': name
		});
	}

}

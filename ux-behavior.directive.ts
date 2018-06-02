import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appUxBehavior]'
})
export class UxBehaviorDirective implements OnInit {

	readonly directiveName = 'UX Behavior Directive';
	readonly supportedEvents = [
		{ action: 'click', kind: 'native', source: 'mouse' },
		{ action: 'mouseover', kind: 'native', source: 'mouse' },
		{ action: 'mouseout', kind: 'native', source: 'mouse' },
		{ action: 'keyup', kind: 'native', source: 'keyboard' },
		{ action: 'kedown', kind: 'native', source: 'keyboard' }
	];

	readonly supportedVendors = [
		{
			name: 'Google Analytics',
			method: this.sendGoogleAnalyticsEvent
		}
	]

	@Input() uxAction: string;
	@Input() uxLabel: string;
	@Input() uxCategory: string;

	constructor(
		public el: ElementRef
	) { }

	public ngOnInit() {
		this.setBehavior();
	}

	/**
	 * Checks if the behavior is supported, and if so, directs the 
	 * setting of the behavior to the specific method to handle that
	 * type of behavior.
	 */
	private setBehavior() {
		let supportedEvent = this.supportedEvents.find(obj => obj.action === this.uxAction);

		if (!supportedEvent) {
			return console.error(this.directiveName + ' does not support event type of ' + this.uxAction);
		}

		// fail fast, currently supporting native behaviors only
		if (supportedEvent.kind !== 'native') {
			return console.error(this.directiveName + ' does not currently support proprietary events.');
		}

		switch (supportedEvent.source) {
			case 'mouse':
			case 'keyboard':
				return this.setMouseKeyboardBehavior(supportedEvent.action, this.uxLabel, this.uxCategory);
		}

		// if ux event is not caught by now, it is not supported
		return console.error(this.directiveName + ' does not currently support the kind of event you are trying to track.');
	}

	/**
	 * Sets the mouse and keyboard listeners for the element of interest
	 * @param supportedAction the supported action we want to record
	 * @param label the UX label passed into the directive
	 * @param category the UX category passed into the directive
	 */
	private setMouseKeyboardBehavior(supportedAction: string, label: string, category: string) {
		let instance = this;
		this.el.nativeElement.addEventListener(supportedAction, function() {
			// loop through supported vendors and call the event 'send' method
			instance.supportedVendors.forEach((vendor) => {
				// we're using separate methods for firing event methods for each vendor
				// since each one may have specific implementation
				vendor.method(supportedAction, label, category);
			});
		});
	}

	/**
	 * Google Analytics vendor-specific event integration
	 * @param supportedAction the supported action we want to record
	 * @param label the UX label passed into the directive
	 * @param category the UX category passed into the directive
	 */
	private sendGoogleAnalyticsEvent(supportedAction: string, label: string, category: string) {
		console.log('Google Analytics event firing...');
		(<any>window).gtag('event', supportedAction, {
			'event_label': label,
			'event_category': category
		});
	}

}

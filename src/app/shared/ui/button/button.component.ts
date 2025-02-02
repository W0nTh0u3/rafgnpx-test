import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'es-button',
    standalone: true,
    template: `
    <button
        [type]="type"
        [disabled]="disabled"
        (click)="onClick.emit($event)"
        class="button"
        [class.block]="block"
        [class.disabled]="disabled"
        [class.icon-only]="iconOnly"
        [class.small]="size === 'small'"
        [class.secondary]="variant === 'secondary'"
    >
            <ng-content></ng-content>
    </button>
    `,
    styles: `
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 100;
        font-size: 0.875rem;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        letter-spacing: 0.025em;
    }

    .block {
        display: flex;
        width: 100%;
    }

    .button:hover:not(.disabled) {
        background-color: #000000;
    }

    /* Secondary variant */
    .secondary {
        background-color: var(--background-color);
        color: var(--primary-color);
    }

    .secondary:hover:not(.disabled) {
        background-color: var(--background-color);
    }

    /* Disabled state */
    .disabled {
        background-color: var(--disabled-btn-color) !important;
        color: #A9A9A9 !important;
        cursor: not-allowed !important;
    }

    /* Icon-only variant */
    .icon-only {
        width: 48px;
        height: 48px;
        padding: 0;
    }

    /* Small variant */
    .small {
        padding: 0.5rem;
        font-size: 0.75rem;
        min-height: 32px;
        min-width: 32px;
    }

    .small.icon-only {
        width: 32px;
        height: 32px;
        padding: 0;
    }

    .icon {
        font-size: 1.25rem;
        line-height: 1;
    }

    .small .icon {
        font-size: 1rem;
    }

    /* You might want to add a proper icon font or SVG icons */
  `
})
export class ButtonComponent {
    @Input() type: 'button' | 'submit' = 'button';
    @Input() disabled = false;
    @Input() iconOnly = false;
    @Input() block = false;
    @Input() size: 'default' | 'small' = 'default';
    @Input() variant: 'primary' | 'secondary' = 'primary';
    @Output() onClick = new EventEmitter<MouseEvent>();
} 
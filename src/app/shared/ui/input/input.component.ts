import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'es-input',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true,
		}
	],
	template: `
    <div class="input-container">
      <div class="input-wrapper">
        @if (label) {
          <label [for]="id" class="input-label">
            {{ label }}
          </label>
        }
        <input
          [type]="showPassword ? 'text' : type"
          [id]="id"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onTouched()"
          [placeholder]="placeholder"
          class="input-field"
          [disabled]="disabled"
        >
        @if (type === 'password') {
          <button 
            type="button"
            class="password-toggle"
            (click)="togglePassword()"
            tabindex="-1"
          >
            @if (showPassword) {
              👁️
            } @else {
              👁️‍🗨️
            }
          </button>
        }
      </div>
    </div>
  `,
	styles: `
    .input-container {
		width: 100%;
		margin-bottom: 1rem;
    }

    .input-wrapper {
		display: flex;
		position: relative;
		width: 100%;
    }

    .input-label {
		position: absolute;
		top: 10px;
		left: 1rem;
		font-size: 0.75rem;
		color: #94A3B8;
		pointer-events: none;
		letter-spacing: 0.025em;
    }

    .input-field {
		width: 100%;
		padding: 1.5rem 1rem 0.25rem;
		border: 1px solid #E2E8F0;
		border-radius: 4px;
		font-size: 0.875rem;
		background: white;
		transition: all 0.2s ease;
		outline: none;
		height: 2rem;
		color: #1a1a1a;
		letter-spacing: 0.025em;
    }

    .input-field::placeholder {
      	color: #94A3B8;
    }

    .input-field:focus {
		border-color: #94A3B8;
		box-shadow: 0 0 0 1px #94A3B8;
    }

    .input-field:disabled {
		background-color: #F3F4F6;
		cursor: not-allowed;
    }

    .input-field[type="password"] {
      padding-right: 3rem; /* Space for the toggle button */
    }

    .password-toggle {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: #94A3B8;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .password-toggle:hover {
      color: #64748B;
    }
  `
})
export class InputComponent implements ControlValueAccessor {
	@Input() type = 'text';
	@Input() label = '';
	@Input() placeholder = 'Type name';
	@Input() id = crypto.randomUUID();

	value = '';
	disabled = false;
	showPassword = false;

	onChange: any = () => { };
	onTouched: any = () => { };

	togglePassword(): void {
		this.showPassword = !this.showPassword;
	}

	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	onInput(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.value = input.value;
		this.onChange(this.value);
	}
}

import { BOOKING_URL } from '@/content';

export function BookLink({ className, ...props }) {
    return (
        <a
            {...props}
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            Book a call
            <span className="sr-only"> (opens in a new tab)</span>
        </a>
    );
}

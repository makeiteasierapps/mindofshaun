import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold outline-none transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]',
    {
        variants: {
            variant: {
                default:
                    'rounded-[6px] bg-brass text-ground fine-hover:hover:bg-brass-hover',
                outline:
                    'rounded-[6px] border border-border bg-transparent text-bone fine-hover:hover:bg-raised',
                secondary:
                    'rounded-[6px] border border-border bg-raised text-bone fine-hover:hover:bg-panel',
                link: 'h-auto min-h-12 bg-transparent px-0 text-bone underline-offset-[4px] fine-hover:hover:underline active:scale-100',
            },
            size: {
                default: 'h-12 px-[18px] text-[15px]',
                icon: 'size-11 p-0',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Button({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    ...props
}) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };

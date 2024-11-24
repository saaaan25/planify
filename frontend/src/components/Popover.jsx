"use client"

import * as Popover from '@radix-ui/react-popover';

const PopoverTemplate = ({ trigger, content }) => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                {trigger}
            </Popover.Trigger>
            <Popover.Content 
                className="
                    bg-grey_1
                    shadow-md 
                    rounded-md 
                    z-50
                "
                side='left'
                sideOffset={5}
            >
                {content}
            </Popover.Content>
        </Popover.Root>
    );
}

export default PopoverTemplate
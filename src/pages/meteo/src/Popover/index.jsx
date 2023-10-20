import {
    Popover as LibPopover,
    PopoverTrigger,
    PopoverContent,
    PopoverDescription,
} from './Popover';
import './Popover.css';

export default function Popover({ content, children }) {
    return (
        <LibPopover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent className="Popover">
                <PopoverDescription>{content}</PopoverDescription>
            </PopoverContent>
        </LibPopover>
    );
}

import React from 'react';
import {Badge} from "@/components/ui/badge";

const BadgeWrapper = ({children, variant}) => {
    return (
        <Badge className='rounded-full' variant={variant}>{children}</Badge>
    );
};

export default BadgeWrapper;
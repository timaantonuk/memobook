import React from 'react';
import {Badge} from "@/components/ui/badge";

const BadgeWrapper = ({children, variant}) => {
    return (
        <Badge variant={variant}>{children}</Badge>
    );
};

export default BadgeWrapper;